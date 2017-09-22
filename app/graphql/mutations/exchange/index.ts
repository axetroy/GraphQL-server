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
  GraphQLFloat,
  GraphQLObjectType
} from 'graphql';
import ExchangeType, { ExchangeInputType } from '../../types/exchange';
import ExchangeModal from '../../../modals/exchange.modal';

import { RFC3339NanoMaper } from '../../../utils';

const ExchangerType = new GraphQLInputObjectType({
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
});

export default {
  /**
   graphQL example

    mutation Exchange($exchanger: Exchanger) {
      doubleBindExchange(exchanger: $exchanger){
        from to rate
      }
    }

    query Me{
      exchanges(query: {limit:10}){
        data{
          from
          to
          rate
        }
        meta{
          num count page limit
        }
      }
    }
   */
  doubleBindExchange: {
    type: ExchangeType,
    description: 'Create Exchange in double bind direction',
    args: {
      exchanger: {
        type: ExchangerType
      }
    },
    async resolve(root: any, { exchanger }: any, ctx: any) {
      const { from, to, rate } = exchanger;
      let from2toDoc: any;
      let to2fromDoc: any;
      try {
        from2toDoc = await ExchangeModal.findOne({ from, to }).exec();
        from2toDoc.rate = rate;
        await from2toDoc.save();
      } catch (err) {
        from2toDoc = await ExchangeModal.create({
          from,
          to,
          rate
        });
      }
      try {
        to2fromDoc = await ExchangeModal.findOne({ from: to, to: from }).exec();
        to2fromDoc.rate = 1 / rate;
        await to2fromDoc.save();
      } catch (err) {
        to2fromDoc = await ExchangeModal.create({
          from: to,
          to: from,
          rate: 1 / rate
        });
      }
      return RFC3339NanoMaper(from2toDoc.toJSON());
    }
  },
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
        type: ExchangerType
      }
    },
    async resolve(root: any, { exchanger }: any, ctx: any) {
      const { from, to, rate } = exchanger;
      let haveExistThisExchange: boolean = false;
      try {
        const doc: any = await ExchangeModal.findOne({ from, to }).exec();
        haveExistThisExchange = !!doc;
      } catch (err) {}

      if (haveExistThisExchange) throw new Error(`Duplicate exchange`);

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
  },
  exchange: {
    type: new GraphQLObjectType({
      name: 'ExchangeOutput',
      fields: {
        from: {
          type: new GraphQLNonNull(GraphQLString)
        },
        to: {
          type: new GraphQLNonNull(GraphQLString)
        },
        rate: {
          type: new GraphQLNonNull(GraphQLFloat)
        },
        amount: {
          type: new GraphQLNonNull(GraphQLFloat)
        },
        value: {
          type: new GraphQLNonNull(GraphQLFloat)
        }
      }
    }),
    description: 'Exchange currency',
    args: {
      exchanger: {
        type: new GraphQLInputObjectType({
          name: 'ExchangeExchange',
          fields: {
            from: {
              type: new GraphQLNonNull(GraphQLString)
            },
            to: {
              type: new GraphQLNonNull(GraphQLString)
            },
            amount: {
              type: new GraphQLNonNull(GraphQLFloat)
            }
          }
        })
      }
    },
    async resolve(root: any, { exchanger }: any, ctx: any) {
      const { from, to, amount } = exchanger;
      let exchange: any;
      try {
        const doc: any = await ExchangeModal.findOne({ from, to }).exec();
        const rate: number = doc.rate;
        const value: number = amount * rate;
        exchange = RFC3339NanoMaper(doc.toJSON());
        exchange.amount = amount;
        exchange.value = value;
        return exchange;
      } catch (err) {
        throw new Error(
          `Can't exchange ${from} to ${to}, The exchange did't set`
        );
      }
    }
  }
};
