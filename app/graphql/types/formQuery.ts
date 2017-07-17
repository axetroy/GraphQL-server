/**
 * Created by axetroy on 17-7-14.
 */
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

/**
 * 用户请求列表的query
 */
export default new GraphQLInputObjectType({
  name: 'formQuery',
  fields: {
    limit: {
      // limit是必填
      type: new GraphQLNonNull(GraphQLInt),
      description: '每一页数据的个数'
    },
    page: {
      type: GraphQLInt,
      description: '第n页数据'
    },
    skip: {
      type: GraphQLInt,
      description: '跳过第n条数据'
    },
    sort: {
      type: GraphQLString,
      description: '排序方式'
    },
    keyJson: {
      type: GraphQLString,
      description: 'JSON格式的字符串'
    }
  }
});

export interface FormQuery$ {
  limit: number;
  page?: number;
  skip?: number;
  sort?: string;
  keyJson?: string;
}

export interface Query$ {
  query: FormQuery$;
}
