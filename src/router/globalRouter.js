import express from 'express';
import passport from 'passport';
import routes from '../routes';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  facebookLogin,
  postFacebookLogin,
  naverLogin,
  postNaverLogin,
  kakaoLogin,
  postkakaoLogin,
  getMe,
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { toHeaderUserAvatar, onlyPublic, onlyPrivate } from '../middleware';

const globalRouter = express.Router();

globalRouter.get(routes.home, toHeaderUserAvatar, home);
globalRouter.get(routes.join, toHeaderUserAvatar, onlyPublic, getJoin);
globalRouter.post(
  routes.join,
  toHeaderUserAvatar,
  onlyPublic,
  postJoin,
  postLogin
);
globalRouter.get(routes.login, toHeaderUserAvatar, onlyPublic, getLogin);
globalRouter.post(routes.login, toHeaderUserAvatar, onlyPublic, postLogin);
// Github
globalRouter.get(routes.github, toHeaderUserAvatar, githubLogin);
globalRouter.get(
  routes.githubCallback,
  toHeaderUserAvatar,
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogin
);
// Facebook
globalRouter.get(routes.facebook, toHeaderUserAvatar, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  toHeaderUserAvatar,
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  postFacebookLogin
);
globalRouter.get(routes.naver, toHeaderUserAvatar, naverLogin);
globalRouter.get(
  routes.naverCallback,
  toHeaderUserAvatar,
  passport.authenticate('naver', { failureRedirect: '/login' }),
  postNaverLogin
);
globalRouter.get(routes.kakao, toHeaderUserAvatar, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  toHeaderUserAvatar,
  passport.authenticate('kakao', { failureRedirect: '/login' }),
  postkakaoLogin
);
globalRouter.get(routes.me, toHeaderUserAvatar, getMe);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, toHeaderUserAvatar, search);

export default globalRouter;
