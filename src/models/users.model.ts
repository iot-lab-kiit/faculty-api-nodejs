// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { ADMIN, STUDENT } from '../constants/Roles';
import { ACTIVE, BANNED, DELETED } from '../constants/Status';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
      },
      role: {
        type: Number,
        default: STUDENT,
        enum: [STUDENT, ADMIN],
      },
      status: {
        type: Number,
        default: ACTIVE,
        enum: [ACTIVE, DELETED, BANNED],
      },
    },
    {
      timestamps: true,
    },
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
