/**
 * Created by axetroy on 17-7-13.
 */

import { GraphQLNonNull, GraphQLString } from 'graphql';

import ExchangeType from '../../types/exchange';
import ExchangeModal from '../../../modals/exchange.modal';
import { RFC3339NanoMaper } from '../../../utils';

/**
    graphQL example
    query Me {
      exchange(id: "1b306ed2-5f9e-4c9d-a28f-15016cebb16e") {
        from
        to
        rate
        id
        active
        createAt
        updateAt
      }
    }
 */
export default {
  type: ExchangeType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, { id }: any, options: any) {
    try {
      const doc: any = await ExchangeModal.findOne({ id: id }).exec();
      if (!doc) {
        throw new Error(`Can't found the exchange with given id : ${id}`);
      }
      return RFC3339NanoMaper(doc.toJSON());
    } catch (err) {
      throw err;
    }
  }
};
