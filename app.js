import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
import globalRouter from './router/globalRouter';
import apiRouter from './router/apiRouter';
import { localMiddleware } from './middleware';
import routes from './routes';

import './passport';

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 사용자가 만든 미들웨어 설정
app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
