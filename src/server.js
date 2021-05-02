import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { verifyToken } from '@utils/authJwt.js';
import { instantiateDb } from '@db/_mongo.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const { json } = require('body-parser');
const dotenv = require('dotenv');
const FileStore = new sessionFileStore(session);
dotenv.config();

instantiateDb().then(() => {
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
        session: (req, res) => ({
          token: req.session.token,
          userId: req.session.userId,
        }),
      })
    )
    .listen(PORT, (err) => {
      if (err) console.log('error', err);
    });
});
