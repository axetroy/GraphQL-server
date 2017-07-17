/**
 * Created by axetroy on 17-7-13.
 */

import * as mongoose from 'mongoose';
import mongo from '../service/mongo';

import * as uuidv4 from 'uuid/v4';

const Post = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    ['default']: uuidv4
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    require: true,
    ['default']: 1
  },
  createAt: {
    type: Date,
    required: true,
    ['default']: Date.now
  },
  updateAt: {
    type: Date,
    required: true,
    ['default']: Date.now
  },
  active: {
    type: Boolean,
    required: true,
    ['default']: true
  }
});

export default mongo.model('exchanges', Post);
