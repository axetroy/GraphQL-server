/**
 * Created by axetroy on 17-7-13.
 */

import * as mongoose from 'mongoose';
import mongo from '../service/mongo';

const Post = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  },
  updateAt: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

export default mongo.model('posts', Post);
