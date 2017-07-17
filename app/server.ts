/**
 * Created by axetroy on 17-7-13.
 */

import * as express from 'express';
import { graphql } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
const fs = require('fs');
const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));

import CONFIG from './config';

import schema from './graphql';

const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.get('/token/:token', (req, res) => {
  const cert = fs.readFileSync(CONFIG.userPubPath, 'utf8');
  jwt
    .verifyAsync(req.params.token, cert)
    .then((decoded: any) => {
      if (new Date(decoded.exp * 1000) > new Date()) {
        res.status(200).json({ error: [{ message: 'Token has expired' }] });
      } else {
        res.status(200).json(decoded);
      }
    })
    .catch((err: Error) => {
      res.status(200).json({ error: [{ message: 'Invalid token' }] });
    });
});

app.use(
  '/api/v1/graphql',
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true //Set to false if you don't want graphiql enabled
  })
);

app.post('/graphql', (req, res) => {
  //GraphQL executor
  graphql(schema, req.body).then(result => {
    res.status(200).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
