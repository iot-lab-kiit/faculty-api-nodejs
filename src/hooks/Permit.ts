import { Forbidden, NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { ADMIN, STUDENT } from '../constants/Roles';

/**
 * @description check permission for the user.
 * @param role {"Member"|"Employee"|"Admin"}
 * @constructor
 */
const Permit = (role: number) => (context: HookContext) => {
  const { params } = context;

  if (typeof params.provider === 'undefined') return context;

  const { user } = params.authentication?.payload;

  if (!user) return context;

  const { roles } = user;

  if (roles.indexOf(role) < 0)
    throw new Forbidden('You are not allowed to perform this action!');

  return context;
};

Permit.is =
  (...roles: (number[] | number)[]) =>
    async (context: HookContext) => {
      const { user } = context.params.authentication?.payload

      if (!user) throw new NotAuthenticated();

      const { role } = user;

      return roles.some((each) => each === role);
    };

Permit.MEMBER = Permit(STUDENT);
Permit.ADMIN = Permit(ADMIN);


export default Permit;
