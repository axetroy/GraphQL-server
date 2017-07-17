/**
 * Created by axetroy on 17-7-13.
 */
import CONFIG from '../config';
import * as mongoose from 'mongoose';

// let mongoose = require('mongoose');

// mongoose["Promise"] = Promise;
mongoose.connect(`mongodb://${CONFIG.db.host}/post`, {
  // "useMongoClient": true,
});

export default mongoose;