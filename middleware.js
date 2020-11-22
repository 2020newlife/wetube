import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 'admin',
  };
  next();
};

export const uploadVideo = multerVideo.single('videoFile');
