// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users
const USERS = '/users';
//  :id로 입력하면 변하는 값이라는걸 인식한다.
const USERS_DETAIL = '/:id';
const ME = '/me';
const EDIT_PROFILE = '/me/edit-profile';
const CHANGE_PASSWORD = '/me/edit-profile/change-password';
// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';
// Facebook
const FB = '/auth/facebook';
const FB_CALLBACK = '/auth/facebook/callback';
// Naver
const NAVER = '/auth/naver';
const NAVER_CALLBACK = '/auth/naver/callback';
// Kakao
const KAKAO = '/auth/kakao';
const KAKAO_CALLBACK = '/auth/kakao/callback';

// Videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// api
const API = '/api';
const REGISTER_VIEW = '/:id/view';
const POST_COMMENT = '/:id/comment';
const DELETE_COMMENT = '/:id/delete';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  user_detail: id => {
    if (id) return `/users/${id}`;
    return USERS_DETAIL;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  edit_profile: EDIT_PROFILE,
  me: ME,
  change_password: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  video_detail: id => {
    if (id) return `/videos/${id}`;
    return VIDEO_DETAIL;
  },
  edit_video: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  delete_video: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  api: API,
  postComment: POST_COMMENT,
  deleteComment: DELETE_COMMENT,
  registerView: REGISTER_VIEW,
};

export default routes;
