import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
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
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    async (req, res, next) => {
      const response = await verifyToken(req, res, next);
      if (isSecuredPath(req) && response.status !== 200)
        return res
          .writeHead(response.status)
          .end(JSON.stringify({ error: response.message }));

      sapper.middleware({
        session: () => {
          return {
            authenticated: response.status === 200,
          };
        },
      })(req, res, next);
    }
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
