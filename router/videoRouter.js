import express from 'express';
import routes from '../routes';
import {
  videoGetUpload,
  videoPostUpload,
  video_detail,
  edit_video,
  delete_video,
} from '../controller/videoController';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, videoGetUpload);
videoRouter.post(routes.upload, videoPostUpload);
// edit video
videoRouter.get(routes.edit_video, edit_video);

videoRouter.get(routes.delete_video, delete_video);
videoRouter.get(routes.videos_detail(), video_detail);

export default videoRouter;
