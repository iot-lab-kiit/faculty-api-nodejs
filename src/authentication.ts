import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService } from '@feathersjs/authentication';
import { Application } from './declarations';
import { FirebaseJWTStrategy } from './firebase';
import { expressOauth } from '@feathersjs/authentication-oauth';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);
  authentication.register('firebase', new FirebaseJWTStrategy(app));

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
