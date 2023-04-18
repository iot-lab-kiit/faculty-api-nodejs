import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

const ProfanityCheck = () => async (context: HookContext ) => {
  const { app, data } = context;
  const { review } = data;
  if (false) throw new BadRequest('Failed Profanity Check');
  return context;
};

export default ProfanityCheck;
