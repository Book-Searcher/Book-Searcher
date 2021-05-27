import sirv from 'sirv';
import polka from 'polka';
import * as sapper from '@sapper/server';
import { verifyToken, isSecuredPath } from '@utils/authJwt.js';
import { instantiateDb } from '@db/_mongo.js';
import cookieParser from 'cookie-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const { json } = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

instantiateDb().then(console.log('db is instantiated'));
export default polka()
  .use(
    cookieParser(),
    json(),
    sirv('static', { dev }),
    async (req, res, next) => {
      req.auth = await verifyToken(req, res, next);
      next();
    },
    (req, res, next) => {
      if (isSecuredPath(req) && req.auth.status !== 200)
        res
          .writeHead(req.auth.status)
          .end(JSON.stringify({ error: req.auth.message }));
      next();
    },
    sapper.middleware({
      // eslint-disable-next-line no-unused-vars
      session: (req, res, next) => {
        return {
          authenticated: req.auth.status === 200,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
