/**
 * Created by axetroy on 17-7-13.
 */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import {graphql} from 'graphql';
import * as graphqlHTTP from  'express-graphql';

// Import WelcomeController from controllers entry point
import schema from './schema/index';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const PORT: number = Number(process.env.PORT) || 3000;

app.use('/', graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true  //Set to false if you don't want graphiql enabled
}));

app.post('/graphql', (req, res) => {
  //GraphQL executor
  graphql(schema, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
});

// Serve the application at the given port
app.listen(PORT, () => {
  // Success callback
  console.log(`Listening at http://localhost:${PORT}/`);
});