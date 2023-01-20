// faculties-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { ACTIVE, DELETED, REJECTED, UNDER_REVIEW } from '../constants/Status';

export default function (app: Application): Model<any> {
  const modelName = 'faculties';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { 
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avgTeachingRating: {
      type: Number,
      default: 0,
    },
    avgMarkingRating: {
      type: Number,
      default: 0,
    },
    avgAttendanceRating: {
      type: Number,
      default: 0,
    },
    avgOverallRating: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: ACTIVE,
      enum: [ACTIVE, DELETED, REJECTED, UNDER_REVIEW],
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
