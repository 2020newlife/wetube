// import { videos } from '../db';
import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';
import User from '../models/User';

// user
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    // console.log(videos);
    // console.log(`home_vidoes:${videos}`);
    // 문제해결됨 => videoBlock에 video src 경로에 `${}`추가 안해서 오류 난 거였음
    res.render('home', { pageTitle: 'Root', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Root', videos: [] });
  }
};

export const search = async (req, res) => {
  // Es5
  // const searchingBy = req.query.searchWrd;
  // Es6
  const {
    query: { searchWrd: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    });
  } catch (error) {
    console.log(error);
  }

  res.render('video/search', { pageTitle: 'Search', searchingBy, videos });
};

// video
export const video_getUpload = (req, res) => {
  res.render('video/video_upload', { pageTitle: 'Upload' });
};
export const video_postUpload = async (req, res) => {
  // console.log(req.file);
  const {
    body: { title, description },
    file: { location }, // 파일에서 path 받아오기 -> s3 로 변경 후 location으로 변경해야함 .
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  // 비디오 저장 및 업로드
  // req.user.videos.push(newVideo._id);
  // req.user.save();
  res.redirect(routes.video_detail(newVideo.id));
};
export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    const comments = await Comment.find({ videoId: id });
    // populate은 type이 object id일 때만 불러올 수 있음
    // console.log(video);
    res.render('video/video_detail', {
      pageTitle: 'Video Detail',
      video,
      comments,
    });
    console.log(video);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEdit_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    /*
    // ------------------------------------------------------------------
    // ISSUE: this not working
    const video = await Video.findById(id);
    console.log(video.creator); // 5c59528c08578e13cedaf540
    console.log(req.user.id); // 5c59528c08578e13cedaf540
    console.log(typeof video.creator); // object
    console.log(typeof req.user.id); // string
    console.log(video.creator == req.user.id); // true
    console.log(video.creator === req.user.id); // false
    if (video.creator !== req.user.id) {
      throw Error('not authorized');
    } else {
      res.render('editVideo', { pageName: `Edit ${video.title}`, video });
    }
    => populate 해야지 일치하게 나옴
    */

    // ------------------------------------------------------------------
    // this works fine
    const video = await Video.findById(id).populate('creator');

    if (video.creator.id !== req.user.id) {
      throw Error('not authorized');
    } else {
      res.render('video/edit_video', {
        pageTitle: `Edit $(video.title)`,
        video,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEdit_video = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  console.log(id, title, description);
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// export const delete_video = (req, res) => {
//   console.log(req);
// };

export const delete_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(`id: ${id}`);
  try {
    /* ISSUE: not working
    const video = await Video.findById(id);
     */
    const video = await Video.findById(id).populate('creator');
    if (video.creator.id !== req.user.id) {
      // console.log(video.creator.id);
      // console.log(req.user.id);
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      await Video.save();
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
    res.send({ views: video.views });
  } catch (error) {
    res.status(400);
  } finally {
    // 마지막은 무조건 이렇게 의미
    res.end();
  }
};
