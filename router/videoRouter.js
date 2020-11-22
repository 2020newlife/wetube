import express from 'express';
import routes from '../routes';
import {
  video_home,
  video_getUpload,
  video_postUpload,
  video_detail,
  getEdit_video,
  postEdit_video,
  delete_video,
} from '../controllers/videoController';
import { uploadVideo } from '../middleware';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, video_getUpload);
videoRouter.post(routes.upload, uploadVideo, video_postUpload);
// edit video
videoRouter.get(routes.edit_video(), getEdit_video);
videoRouter.post(routes.edit_video(), postEdit_video);

videoRouter.get(routes.delete_video(), delete_video);
videoRouter.get(routes.video_detail(), video_detail);

export default videoRouter;
