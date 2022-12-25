import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../hooks/SetCreatedBy';
import { disallow, iff } from 'feathers-hooks-common';
import { ADMIN } from '../../constants/Roles';
import { ACTIVE, UNDER_REVIEW } from '../../constants/Status';
import Permit from '../../hooks/Permit';
import SetDefaultItem from '../../hooks/SetDefaultItem';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      SetCreatedBy(),
      iff(Permit.is(ADMIN), SetDefaultItem('status', ACTIVE)).else(
        SetDefaultItem('status', UNDER_REVIEW),
      ),
    ],
    update: [disallow()],
    patch: [Permit(ADMIN)],
    remove: [Permit(ADMIN)],
  },

  after: {
    all: [],
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
