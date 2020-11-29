// import { videos } from '../db';
import routes from '../routes';
import Video from '../models/Video';

// user
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    // console.log(videos);

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
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  // 비디오 저장 및 업로드
  req.user.videos.push(newVideo._id);
  req.user.save();
  res.redirect(routes.video_detail(newVideo.id));
};
export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // populate은 type이 object id일 때만 불러올 수 있음
    res.render('video/video_detail', {
      pageTitle: 'Video Detail',
      video,
    });
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
    const video = await Video.findById(id);
    res.render('video/edit_video', { pageTitle: `Edit $(video.title)`, video });
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
  console.log(id);
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
