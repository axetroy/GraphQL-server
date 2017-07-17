/**
 * Created by axetroy on 17-7-13.
 */
import CONFIG from '../config';
import * as mongoose from 'mongoose';

const NODE_ENV = process.env.NODE_ENV;

const field =
  NODE_ENV === 'production' ? 'dm' : NODE_ENV === 'test' ? 'test' : 'localhost';

// let mongoose = require('mongoose');

// mongoose["Promise"] = Promise;
mongoose.connect(
  `mongodb://${CONFIG.db.host}/${field}`,
  {
    // "useMongoClient": true,
  }
);

export default mongoose;
