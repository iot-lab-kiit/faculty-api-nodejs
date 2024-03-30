import * as firebaseAdmin from 'firebase-admin';
import logger from './logger';
import { Application } from './declarations';
import { AuthenticationRequest, JWTStrategy } from '@feathersjs/authentication';
import { Params } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { initializeFirebaseAdmin } from './lib/firebase-admin';


export class FirebaseJWTStrategy extends JWTStrategy {
  constructor(app: Application) {
    super();
    initializeFirebaseAdmin(app);
  }

  async authenticate(
    authentication: AuthenticationRequest,
    params: Params,
    ..._rest: any[]
  ): Promise<{
    accessToken: any;
    authentication: { strategy: string; accessToken: any; payload: any };
  }> {
    try {
      const token = authentication.accessToken ?? authentication.access_token;
      const user = await firebaseAdmin.auth().verifyIdToken(token);
      if (!user) {
        throw new NotAuthenticated();
      }
      let existingUser = await this.getEntity(user.uid, params);

      /**
       * Only create/update the user if the params.provider is rest.
       *
       * Params.provider will be rest when this is triggered by /authentication endpoint.
       * Params.provider will be undefined when this is triggered by a service call/authenticate hook (e.g. users.create)
       */
      if (params.provider === 'rest') {
        logger.info('params.provider is rest, creating/updating user');
        existingUser = !existingUser ? await this.createEntity(user, params) : await this.updateEntity(existingUser, user, params);
      }

      return {
        accessToken: token,
        authentication: {
          strategy: this.name!!,
          accessToken: token,
          payload: {
            user: existingUser
          },
        },
      };
    } catch (e) {
      logger.error(e);
      throw new NotAuthenticated();
    }
  }

  async getEntity(id: string, params: Params): Promise<any> {
    const result = await this.entityService.find({
      query: {
        uid: id,
      },
      ...params,
      paginate: false,
    });
    if (!result) {
      return null;
    }
    const entity = result.find((entry: any) => entry.uid == id);
    return entity;
  }

  async createEntity(user: DecodedIdToken, params: Params) {
    const data = await this.getEntityData(user, null, params);
    return await this.entityService.create(data, params);
  }

  async updateEntity(
    existingEntity: any,
    user: DecodedIdToken,
    params: Params,
  ) {
    const id = existingEntity['_id'];
    const data = await this.getEntityData(user, existingEntity, params);
    return await this.entityService.patch(id, data, params);
  }

  async getEntityData(
    user: DecodedIdToken,
    _existingEntity?: any,
    _params?: Params,
  ) {
    let email = user.email;
    // For Edge cases where email is not provided in the token
    if (!email) {
      const record = await firebaseAdmin.auth().getUser(user.uid);
      email = record.providerData[0].email;
    }
    return {
      uid: user.uid,
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
    };
  }
}
