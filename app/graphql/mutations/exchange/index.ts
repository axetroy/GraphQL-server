/**
 * Created by axetroy on 17-7-17.
 */
/**
 * Created by axetroy on 17-7-14.
 */

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat
} from 'graphql';
import ExchangeType, { ExchangeInputType } from '../../types/exchange';
import ExchangeModal from '../../../modals/exchange.modal';

import { RFC3339NanoMaper } from '../../../utils';

export default {
  /**
   graphQL example

   mutation Post($exchange: Exchange) {
      createExchange(exchange: $exchange) {
        from
        to
        rate
        createAt
        updateAt
      }
    }

   { "exchange":  {"from": "DMC", to:"CNY": rate: "0.6"}}
   */
  createExchange: {
    type: ExchangeType,
    description: 'Create Exchange',
    args: {
      exchanger: {
        type: new GraphQLInputObjectType({
          name: 'Exchanger',
          fields: {
            from: {
              type: new GraphQLNonNull(GraphQLString),
              description: 'from currency'
            },
            to: {
              type: new GraphQLNonNull(GraphQLString),
              description: 'to currency'
            },
            rate: {
              type: new GraphQLNonNull(GraphQLFloat),
              description: 'exchange rate, fromCurrency = rate * toCurrency'
            }
          }
        })
      }
    },
    async resolve(root: any, { exchanger }: any, ctx: any) {
      const { from, to, rate } = exchanger;
      try {
        const doc: any = await ExchangeModal.create({
          from,
          to,
          rate
        });
        return RFC3339NanoMaper(doc.toJSON());
      } catch (err) {
        throw err;
      }
    }
  },
  /**
    graphQL example

    mutation Exchange($exchanger: ExchangeInput) {
      updateExchange(exchanger: $exchanger) {
        from
        to
        rate
        createAt
        updateAt
      }
    }

   {
     "exchanger": {
       "id": "1b306ed2-5f9e-4c9d-a28f-15016cebb16e",
       "from": "DMC",
       "to": "CNY",
       "rate": 0.1
     }
   }
   */
  updateExchange: {
    type: ExchangeType,
    description: 'Update Exchange',
    args: {
      exchanger: {
        type: ExchangeInputType
      }
    },
    async resolve(root: any, { exchanger }: any, ctx: any) {
      const { id, from, to, rate, active } = exchanger;
      try {
        const doc: any = await ExchangeModal.findOne({ id }).exec();
        if (rate !== undefined) {
          doc.rate = rate;
        }
        if (active !== undefined) {
          doc.active = active;
        }
        await doc.save();
        return RFC3339NanoMaper(doc.toJSON());
      } catch (err) {
        throw err;
      }
    }
  }
};
