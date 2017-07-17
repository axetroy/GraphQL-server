/**
 * Created by axetroy on 17-7-13.
 */

import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import mutations from '../graphql/mutations';
import queries from './queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Me',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name:'Mutation',
    fields: mutations
  })
});