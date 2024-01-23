import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config();

export default function (app: Application): void {
  mongoose.connect(process.env.MONGODB_URL as string).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose);
}
