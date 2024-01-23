import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, discard } from 'feathers-hooks-common';
import { STUDENT } from '../../constants/Roles';
import { ACTIVE } from '../../constants/Status';
import SetCreatedByQuery from '../../hooks/SetCreatedByQuery';
import SetDefaultItem from '../../hooks/SetDefaultItem';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('firebase')],
    get: [authenticate('firebase')],
    create: [
      SetDefaultItem('status', ACTIVE),
      discard('role'),
      SetDefaultItem('role', STUDENT),
    ],
    update: [disallow()],
    patch: [authenticate('firebase'), SetCreatedByQuery()],
    remove: [authenticate('firebase'), SetCreatedByQuery()],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      //protect('password'),
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
