/**
 * Created by axetroy on 17-7-13.
 */
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType
} from 'graphql';

const FIELDS = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'exchange id'
  },
  active: {
    type: GraphQLBoolean,
    description: 'exchange is active or not'
  },
  from: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'exchange from currency'
  },
  to: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'exchange to currency'
  },
  rate: {
    type: new GraphQLNonNull(GraphQLFloat),
    description: 'exchange rate'
  },
  createAt: {
    type: GraphQLString,
    description: 'exchange create date'
  },
  updateAt: {
    type: GraphQLString,
    description: 'exchange update date'
  }
};

export default new GraphQLObjectType({
  name: 'Exchange',
  fields: FIELDS
});

export const ExchangeInputType = new GraphQLInputObjectType({
  name: 'ExchangeInput',
  fields: {
    id: FIELDS.id,
    active: FIELDS.active,
    from: FIELDS.from,
    to: FIELDS.to,
    rate: FIELDS.rate
  }
});
