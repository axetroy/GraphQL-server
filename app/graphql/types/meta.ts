/**
 * Created by axetroy on 17-7-14.
 */

import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

/**
 * 返回的meta信息
 */
export default new GraphQLObjectType({
  name:'meta',
  fields: {
    count: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    page: {
      type: GraphQLInt
    },
    skip: {
      type: GraphQLInt
    },
    num: {
      type: GraphQLInt
    },
    sort: {
      type: GraphQLString
    },
    keyJson: {
      type: GraphQLString
    }
  }
})