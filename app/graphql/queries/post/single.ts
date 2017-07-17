/**
 * Created by axetroy on 17-7-13.
 */

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Types } from 'mongoose';

import postType from '../../types/post';
import postModal from '../../../modals/post.modal';
import { RFC3339NanoMaper } from '../../../utils';

interface postQueryOneParams$ {
  id: string;
}

/**
    graphQL example

    query Me{
      post(id: "c4fafe67-9044-4c06-9167-98d3f49a4814"){
        title
        content
        author
        id
        active
        createAt
        updateAt
      }
    }
 */
export default {
  type: postType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, { id }: postQueryOneParams$, options: any) {
    try {
      const doc: any = await postModal.findOne({ id: id }).exec();
      return RFC3339NanoMaper(doc.toJSON());
    } catch (err) {
      throw err;
    }
  }
};
