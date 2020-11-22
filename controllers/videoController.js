// import { videos } from '../db';
import routes from '../routes';
import Video from '../models/Video';

//user
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);

    res.render('home', { pageTitle: 'Root', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Root', videos: [] });
  }
};

export const search = (req, res) => {
  // Es5
  //const searchingBy = req.query.searchWrd;
  // Es6
  const {
    query: { searchWrd: searchingBy },
  } = req;
  console.log(req.query);
  res.render('video/search', { pageTitle: 'Search', searchingBy, videos });
};

//video
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
  });
  console.log(newVideo);
  // To Do : 비디오 저장 및 업로드
  res.redirect(routes.video_detail(newVideo.id));
};
export const video_detail = (req, res) => {
  res.render('video/video_detail', { pageTitle: 'Video Detail' });
};
export const edit_video = (req, res) => {
  res.render('video/edit_video', { pageTitle: 'Edit Video' });
};
export const delete_video = (req, res) => {
  res.render('video/delete_video', { pageTitle: 'Delete Video' });
};
