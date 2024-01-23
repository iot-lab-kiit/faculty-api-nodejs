import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../hooks/SetCreatedBy';
import { disallow, iff } from 'feathers-hooks-common';
import Permit from '../../hooks/Permit';
import { ADMIN } from '../../constants/Roles';
import SetDefaultItem from '../../hooks/SetDefaultItem';
import { ACTIVE, UNDER_REVIEW } from '../../constants/Status';
import SetDefaultQuery from '../../hooks/SetDefaultQuery';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import search from 'feathers-mongodb-fuzzy-search';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('firebase')],
    find: [
      SetDefaultQuery('status', ACTIVE),
      search({
        fields: ['name', 'code'],
      }),
    ],
    get: [SetDefaultQuery('status', ACTIVE)],
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
