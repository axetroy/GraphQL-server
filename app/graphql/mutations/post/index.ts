/**
 * Created by axetroy on 17-7-14.
 */

import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLBoolean
} from 'graphql';
import * as uuidv4 from 'uuid/v4';
import PostType from '../../types/post';
import PostModal from '../../../modals/post.modal';

import { RFC3339NanoMaper } from '../../../utils';

export default {
  /**
    graphQL example

    mutation Post($title: String!, $content: String!) {
      createPost(title: $title, content: $content) {
        title
        createAt
        updateAt
        active
        id
      }
    }

   {"title": "hello world 123","content": "this is post content"}
   */
  createPost: {
    type: PostType,
    description: 'Create Post',
    args: {
      title: {
        name: 'title',
        type: new GraphQLNonNull(GraphQLString)
      },
      content: {
        name: 'content',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root: any, { title, content }: any, ctx: any) {
      const now = Date.now();
      let doc;
      try {
        doc = await PostModal.create({
          title,
          content,
          author: 'admin',
          createAt: now,
          updateAt: now,
          active: true,
          id: uuidv4()
        });
        return doc.toJSON();
      } catch (err) {
        throw err;
      }
    }
  },
  /**
    graphQL example

    mutation Post($post: PostUpdate) {
      updatePost(post: $post) {
        title
        createAt
        updateAt
        active
        id
      }
    }


   {
     "post": {
       "id": "c4fafe67-9044-4c06-9167-98d3f49a4814",
       "title": "modify title",
       "content": "modify content",
       "active": true
     }
   }
   */
  updatePost: {
    type: PostType,
    description: 'Update Post',
    args: {
      post: {
        type: new GraphQLInputObjectType({
          name: 'PostUpdate',
          fields: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            },
            title: {
              type: GraphQLString
            },
            content: {
              type: GraphQLString
            },
            active: {
              type: GraphQLBoolean
            }
          }
        })
      }
    },
    async resolve(root: any, { post }: any, ctx: any) {
      try {
        const doc: any = await PostModal.findOne({ id: post.id }).exec();
        // 不存在或未激活
        if (!doc || doc.active === false) {
          throw new Error(`Can't found the post in database`);
        } else {
          if (post.title) {
            doc.title = post.title;
          }
          if (post.content) {
            doc.content = post.content;
          }
          if (post.active !== undefined && post.active !== null) {
            doc.active = post.active;
          }
          doc.updateAt = new Date();
          await doc.save();
          return RFC3339NanoMaper(doc.toJSON());
        }
      } catch (err) {
        throw err;
      }
    }
  },
  removePost: {
    type: GraphQLString,
    args: {
      id: {
        type: new GraphQLList(GraphQLString)
      }
    },
    async resolve(root: any, { id }: any, ctx: any) {
      try {
        const doc: any = await PostModal.findById(id).exec();
        if (doc) {
          doc.active = false;
          doc.save();
          return {};
        } else {
          throw new Error(`Can't found the post in database`);
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
