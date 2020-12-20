import express from 'express';
import routes from '../routes';
import {
  postAddComment,
  postDeleteComment,
  postRegisterView,
} from '../controllers/videoController';
import { onlyPrivate } from '../middleware';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.postComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
