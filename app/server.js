"use strict";
/**
 * Created by axetroy on 17-7-13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
const express = require("express");
const graphql_1 = require("graphql");
const graphqlHTTP = require("express-graphql");
// Import WelcomeController from controllers entry point
const index_1 = require("./schema/index");
// Create a new express application instance
const app = express();
// The port the express app will listen on
const PORT = Number(process.env.PORT) || 3000;
app.use('/', graphqlHTTP({
    schema: index_1.default,
    // rootValue: root,
    graphiql: true //Set to false if you don't want graphiql enabled
}));
app.post('/graphql', (req, res) => {
    //GraphQL executor
    graphql_1.graphql(index_1.default, req.body)
        .then((result) => {
        res.status(200).json(result);
    });
});
// Serve the application at the given port
app.listen(PORT, () => {
    // Success callback
    console.log(`Listening at http://localhost:${PORT}/`);
});
