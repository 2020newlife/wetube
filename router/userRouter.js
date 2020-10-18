import express from 'express';
import routes from '../routes';
import { editProfile, userDetail } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.userDetail, userDetail);

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
