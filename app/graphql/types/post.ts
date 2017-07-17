/**
 * Created by axetroy on 17-7-13.
 */
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

const TYPE = {
  name: 'Post',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'post id'
    },
    active: {
      type: GraphQLBoolean,
      description: 'post is active or not'
    },
    title: {
      type: GraphQLString,
      description: 'post title'
    },
    content: {
      type: GraphQLString,
      description: 'post content'
    },
    createAt: {
      type: GraphQLString,
      description: 'post create date'
    },
    updateAt: {
      type: GraphQLString,
      description: 'post update date'
    },
    author: {
      type: GraphQLString,
      description: 'post author'
    }
  }
};

export default new GraphQLObjectType(TYPE);
export { TYPE };
