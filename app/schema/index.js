"use strict";
/**
 * Created by axetroy on 17-7-13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const _ = require("lodash");
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
const ArticleType = new graphql_1.GraphQLObjectType({
    name: "article",
    description: "article list",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            description: "item id"
        },
        title: {
            type: graphql_1.GraphQLString,
            description: "item title"
        },
        content: {
            type: graphql_1.GraphQLString,
            description: "item price"
        },
        create_at: {
            type: graphql_1.GraphQLString,
            description: "create date"
        },
        update_at: {
            type: graphql_1.GraphQLString,
            description: "update date"
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'Me',
        fields: {
            name: {
                type: graphql_1.GraphQLString,
                resolve() {
                    return 'Axetroy';
                }
            },
            email: {
                type: graphql_1.GraphQLString,
                resolve() {
                    return 'troy450409405@gmail.com';
                }
            },
            last_login: {
                type: graphql_1.GraphQLString,
                resolve() {
                    return new Date().toISOString();
                }
            },
            article: {
                type: ArticleType,
                description: "Article",
                args: {
                    id: {
                        type: graphql_1.GraphQLInt,
                        required: true //itemId required for query
                    }
                },
                resolve: function (root, obj, ctx) {
                    console.log(obj);
                    const { id } = obj;
                    const result = _.find(items, (v, i) => i === id);
                    return result || {};
                }
            }
        }
    })
});
