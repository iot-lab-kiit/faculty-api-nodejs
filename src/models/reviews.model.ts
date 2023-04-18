// reviews-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { ACTIVE, DELETED, REJECTED, UNDER_REVIEW } from '../constants/Status';

export default function (app: Application): Model<any> {
  const modelName = 'reviews';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      review: {
        type: String,
        required: true,
      },
      rating: {
        teaching: {
          points: {
            type: Number,
          },
          description: {
            type: String,
          },
        },
        marking: {
          points: {
            type: Number,
          },
          description: {
            type: String,
          },
        },
        attendance: {
          points: {
            type: Number,
          },
          description: {
            type: String,
          },
        },
        overall: {
          points: {
            type: Number,
          },
          desciption: {
            type: String,
          },
        },
      },
      faculty: {
        type: Schema.Types.ObjectId,
        ref: 'faculties',
        required: true,
      },
      subject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      status:{
        type: Number,
        enum: [ACTIVE, DELETED, REJECTED, UNDER_REVIEW]
      }
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
