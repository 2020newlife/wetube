import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });
const multerAvatar = multer({ dest: 'uploads/avatars/' });
export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');
// multerAvatar.sing()의 인자로는 <input>의 name 속성값이 들어간다.

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

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
