import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../hooks/SetCreatedBy';
import { disallow, iff, isNot } from 'feathers-hooks-common';
import SetCreatedByQuery from '../../hooks/SetCreatedByQuery';
import Permit from '../../hooks/Permit';
import { ADMIN } from '../../constants/Roles';
import SetDefaultItem from '../../hooks/SetDefaultItem';
import { ACTIVE } from '../../constants/Status';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [SetCreatedBy(), SetDefaultItem('status', ACTIVE)],
    update: [disallow()],
    patch: [SetCreatedByQuery()],
    remove: [iff(isNot(Permit.is(ADMIN)), SetCreatedByQuery())]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
