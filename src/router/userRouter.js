import express from 'express';
import routes from '../routes';
import {
  getEdit_profile,
  postEdit_profile,
  getChange_password,
  postChange_password,
  user_detail,
} from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.user_detail(), onlyPrivate, user_detail);

userRouter.get(routes.edit_profile, onlyPrivate, getEdit_profile);
userRouter.post(
  routes.edit_profile,
  onlyPrivate,
  uploadAvatar,
  postEdit_profile
);
userRouter.get(routes.change_password, onlyPrivate, getChange_password);
userRouter.post(routes.change_password, onlyPrivate, postChange_password);

// 기존에는 변수에 export를 해줬는데 그럴 경우 변수만 익스포트 되고
// 아래처럼 할 경우 전체가 다 익스포트 된다.
export default userRouter;

// userRouter.get('/', (req, res) => {
//   res.send('user home');
// });
// userRouter.get('/edit', (req, res) => {
//   res.send('user edit');
// });
// userRouter.get('/password', (req, res) => {
//   res.send('user password');
// });