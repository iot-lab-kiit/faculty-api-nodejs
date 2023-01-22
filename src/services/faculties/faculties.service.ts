// Initializes the `faculties` service on path `/faculties`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Faculties } from './faculties.class';
import createModel from '../../models/faculties.model';
import hooks from './faculties.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'faculties': Faculties & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$regex', '$search'],
  };

  // Initialize our service with any options it requires
  app.use('/faculties', new Faculties(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('faculties');

  service.hooks(hooks);
}
