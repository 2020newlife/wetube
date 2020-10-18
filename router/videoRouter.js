import express from 'express';
import routes from '../routes';
import {
  video_upload,
  video_detail,
  edit_video,
  delete_video,
} from '../controller/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.upload, video_upload);
videoRouter.get(routes.edit_video, edit_video);
videoRouter.get(routes.delete_video, delete_video);
videoRouter.get(routes.videos_detail, video_detail);

export default videoRouter;
