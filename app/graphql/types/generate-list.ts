/**
 * Created by axetroy on 17-7-14.
 */
import {
  GraphQLType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import MetaType from './meta';

/**
 * 生成列表的类型
 * 为了方便同意meta信息
 */
export default function (name: string, item: GraphQLType):GraphQLType {
  return new GraphQLObjectType({
    name: name,
    fields: {
      data: {
        type: new GraphQLList(item),
        description: 'Data list'
      },
      meta: {
        type: MetaType,
        description: 'The meta information for the list'
      }
    }
  })
}