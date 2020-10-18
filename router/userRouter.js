import express from 'express';
import routes from '../routes';
import {
  edit_profile,
  change_password,
  user_detail,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get(routes.edit_profile, edit_profile);
userRouter.get(routes.change_password, change_password);
userRouter.get(routes.user_detail, user_detail);

//기존에는 변수에 export를 해줬는데 그럴 경우 변수만 익스포트 되고
//아래처럼 할 경우 전체가 다 익스포트 된다.
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
