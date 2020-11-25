import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const uploadVideo = multerVideo.single('videoFile');

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
