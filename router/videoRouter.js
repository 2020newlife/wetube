import express from 'express';
import routes from '../routes';
import {
  video_home,
  video_getUpload,
  video_postUpload,
  video_detail,
  edit_video,
  delete_video,
} from '../controllers/videoController';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, video_getUpload);
videoRouter.post(routes.upload, video_postUpload);
// edit video
videoRouter.get(routes.edit_video, edit_video);

videoRouter.get(routes.delete_video, delete_video);
videoRouter.get(routes.video_detail(), video_detail);

export default videoRouter;
