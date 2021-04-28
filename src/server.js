import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const { json } = require('body-parser');
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { verifyToken } from './utils/authJwt';
const dotenv = require('dotenv');

dotenv.config();
const FileStore = new sessionFileStore(session);

polka()
  .use(verifyToken)
  .use(
    json(),
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000,
      },
      store: new FileStore({
        path: '.sessions',
      }),
    }),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      // eslint-disable-next-line no-unused-vars
      session: (req, res) => {
        return {
          token: req.session.token,
          userId: req.session.userId,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
