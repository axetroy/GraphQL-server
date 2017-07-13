/**
 * Created by axetroy on 17-7-13.
 */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import * as _ from 'lodash';

const items = [
  {
    title: 'This is 1st post',
    author: 'axetroy',
    content: 'First post content',
    create_at: new Date(),
    update_at: new Date(),
    id: 1
  },
  {
    title: 'This is 2sc post',
    author: 'axetroy',
    content: '2 post content',
    create_at: new Date(),
    update_at: new Date(),
    id: 2
  },
  {
    title: 'This is 3tr post',
    author: 'axetroy',
    content: '3 post content',
    create_at: new Date(),
    update_at: new Date(),
    id: 3
  },
  {
    title: 'This is 4 post',
    author: 'axetroy',
    content: '4 post content',
    create_at: new Date(),
    update_at: new Date(),
    id: 4
  },
  {
    title: 'This is 5 post',
    author: 'axetroy',
    content: '5 post content',
    create_at: new Date(),
    update_at: new Date(),
    id: 5
  }
];


const ArticleType = new GraphQLObjectType({
  name: "article",
  description: "article list",
  fields: {
    id: {
      type: GraphQLString,
      description: "item id"
    },
    title: {
      type: GraphQLString,
      description: "item title"
    },
    content: {
      type: GraphQLString,
      description: "item price"
    },
    create_at: {
      type: GraphQLString,
      description: "create date"
    },
    update_at: {
      type: GraphQLString,
      description: "update date"
    }
  }
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Me',
    fields: {
      name: {
        type: GraphQLString,
        resolve() {
          return 'Axetroy';
        }
      },
      email: {
        type: GraphQLString,
        resolve() {
          return 'troy450409405@gmail.com';
        }
      },
      last_login: {
        type: GraphQLString,
        resolve(){
          return new Date().toISOString();
        }
      },
      article: {
        type: ArticleType,
        description: "Article",
        args: {
          id: {
            type: GraphQLInt,
            required: true    //itemId required for query
          }
        },
        resolve: function (root, obj, ctx) {
          console.log(obj);
          const {id} = obj;
          const result = _.find(items, (v, i) => i === id);
          return result || {};
        }
      }
    }
  })
});