import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, discard } from 'feathers-hooks-common';
import { STUDENT } from '../../constants/Roles';
import { ACTIVE } from '../../constants/Status';
import SetCreatedByQuery from '../../hooks/SetCreatedByQuery';
import SetDefaultItem from '../../hooks/SetDefaultItem';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      hashPassword('password'),
      SetDefaultItem('status', ACTIVE),
      discard('role'),
      SetDefaultItem('role', STUDENT),
    ],
    update: [disallow()],
    patch: [hashPassword('password'), authenticate('jwt'), SetCreatedByQuery()],
    remove: [authenticate('jwt'), SetCreatedByQuery()],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
