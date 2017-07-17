/**
 * Created by axetroy on 17-7-13.
 */

interface Meta$ {
  page: number;
  limit: number;
  count: number;
  skip?: number;
  num?: number;
  sort?: string;
  keyJson?: string;
}

interface List$ {
  data?: any[];
  meta?: Meta$;
}

import { GraphQLNonNull } from 'graphql';

import PostType from '../../types/post';
import FormQuery, { Query$ } from '../../types/formQuery';
import PostModal from '../../../modals/post.modal';
import generateListType from '../../types/generate-list';
import { RFC3339NanoMaper } from '../../../utils';

/**
    graphQL example:

    query Me {
      posts(query: {page: 0,limit: 10, sort: "-title"}) {
        data {
          title
          content
          author
          id
          active
          createAt
          updateAt
        }
        meta{
          count, page, limit, num
        }
      }
    }
 */

export default {
  type: generateListType('posts', PostType),
  args: {
    query: {
      name: 'query',
      type: new GraphQLNonNull(FormQuery)
    }
  },
  async resolve(root: Object, params: Query$, options: any) {
    const { page = 0, limit = 10, sort = '-createAt' } = params.query;
    // 校验sort字段
    if (/^[\+\-]\w+$/.test(sort) === false) {
      throw new Error(
        `Invalid sort field ${sort}, It must be prefix as '+' for '-'.`
      );
    }
    const sortArray: string[] = sort.match(/^([\+\-])(\w+)$/) || [];
    const sortDir: string | null = sortArray[1];
    const sortField: string | null = sortArray[2];
    let list: List$ = {};
    try {
      const modal = PostModal.find({ active: true });
      let data: any[] = await modal
        .limit(limit)
        .skip(page * limit)
        .sort({
          [sortField]: sortDir === '+' ? 1 : sortDir === '-' ? -1 : -1
        })
        .exec();
      data = data.map(v => v.toJSON()).map(RFC3339NanoMaper);

      // 计算meta信息
      const num = await modal.count().exec();
      const total = await PostModal.find({ active: true }).count().exec();
      list.data = data;
      list.meta = {
        page,
        limit,
        count: total,
        num,
        sort: sort
      };
    } catch (err) {
      throw err;
    }
    return list;
  }
};
