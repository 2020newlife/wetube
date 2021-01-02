import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import routes from './routes';
import User from './models/User';

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: 'ap-northeast-2',
  s3BucketEndpoint: true,
  endpoint: 'http://ilsun-suntube.s3.ap-northeast-2.amazonaws.com',
  // ilsuntube => 사용자 부분에서 사용자 이름
  // ilsun-suntube => S3 이름  -> 이거 인 듯해서 이걸로 넣음
});

// upload to local
// const multerVideo = multer({ dest: 'uploads/videos/' });
// const multerAvatar = multer({ dest: 'uploads/avatars/' });

// upload to aws s3
const multerVideo = multer({
  storage: multerS3({
    s3, // key
    acl: 'public-read', // access control lists
    bucket: `${process.env.AWS_BUCKET}/video`, // 안에 폴더 하나 더 만들기
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3, // key
    acl: 'public-read', // access control lists
    bucket: `${process.env.AWS_BUCKET}/avatar`, // 안에 폴더 하나 더 만들기
  }),
});

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');

// multerAvatar.sing()의 인자로는 <input>의 name 속성값이 들어간다.

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const toHeaderUserAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.locals.headerUser = user || null;
  } catch (error) {
    console.log(error);
  }
  next();
};

// user
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
