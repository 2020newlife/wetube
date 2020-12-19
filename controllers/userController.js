import passport from 'passport';
import routes from '../routes';
import Video from '../models/Video';
import User from '../models/User';

// golbal
export const getJoin = (req, res) =>
  res.render('user/join', { pageTitle: 'Join' });
export const postJoin = async (req, res, next) => {
  // es6 방식으로 req.body의 데이터를 받아온다.
  const {
    body: { name, email, password, password2 },
  } = req;
  // 두 비밀번호가 일치하지 않을 경우
  if (password !== password2) {
    res.status(400);
    res.render('user/join', { pageTitle: 'Join' });
  } else {
    // 회원가입 로직 추가
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do : 로그인 로직 추가
  }
};
export const getLogin = (req, res) => {
  res.render('user/login', { pageTitle: 'Login' });
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
//   console.log(accessToken, refreshToken, profile, cb);
// };

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // export const githubLoginCallback = async (_______, ______, profile, cb) => {
  // github에서 성공적으로 로그인되고 돌아와서 실행되는 함수
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url, name, email },
  } = profile; // profile 안의 변수 가지고 오기
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
      // 콜백함수, err는 null, user를 전해주니 github에 찾았다는 것 알려줌,
      // 시리얼라이즈해서 세션 만들어서 쿠키에 저장가능
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const facebookLogin = passport.authenticate('facebook');

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email },
  } = profile; // profile 안의 변수 가지고 오기
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Naver
export const naverLogin = passport.authenticate('naver');

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: { id, profile_image, displayName, email },
  } = profile; // profile 안의 변수 가지고 오기
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name: displayName || null,
      naverId: id,
      avatarUrl: profile_image,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};
// console.log(accessToken, refreshToken, profile, done);

// profile_image displayName

// Kakao
export const kakaoLogin = passport.authenticate('kakao');

export const postkakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
  // ) => {
  //   console.log(accessToken, refreshToken, profile, done);
  // };
) => {
  const {
    id,
    username: name,
    _json: {
      properties: { profile_image },
      kakao_account: { email },
    },
  } = profile; // profile 안의 변수 가지고 오기
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl: profile_image,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};
// profile_image_url, email,

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// user

export const getMe = async (req, res) => {
  const { user } = req;
  const videos = await Video.find({ creator: user._id });
  // 유저프로필에 비디오 추가할 경우 videos 추가해서 넘겨줘야 프로필 수정, 비밀번호 변경 post 시 에러 안 남
  res.render('user/user_detail', { pageTitle: 'User Details', user, videos });
};

export const user_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    // const user = await User.findById(id).populate('videos');
    // console.log(user);
    // console.log(user.videos);
    // 문제해결됨 => videoBlock에 video src 경로에 `${}`추가 안해서 오류 난 거였음
    const user = await User.findById(id);
    const videos = await Video.find({ creator: id });
    // console.log(videos);
    // console.log(`user.videos: ${user.videos}`);
    // console.log(`user.videos: ${user.videos}`);
    res.render('user/user_detail', {
      pageTitle: 'User Details',
      user,
      videos,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEdit_profile = (req, res) =>
  res.render('user/edit_profile', { pageTitle: 'Edit Profile' });

export const postEdit_profile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      // DB 바꾸기
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl, // 혹시 변경 안 할 시 null 들어갈 수도 있는 것 방지
    });
    // // req 바꾸기
    // req.user.name = name;
    // req.user.email = email;
    // req.user.avatarUrl = file ? file.path : req.user.avartarUrl;
    res.redirect(routes.me);
  } catch (error) {
    res.redirect('user/edit_profile', { pageTitle: 'Edit Profile' });
  }
};

export const getChange_password = (req, res) =>
  res.render('user/change_password', { pageTitle: 'Change Password' });

export const postChange_password = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400); // 크롬이 비밀번호 업데이트 못하게 하기
      res.redirect(`/users/${routes.change_password}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me); // passport-local-mongoose 의 changePasswordl() 매서드를 통해 form 태그에서 전소된 값을 받아 업데이트할 수 있다.

    // 아래는 Steve 블로그 사람 코드인데, 위에 코드만으로도 변경 잘 됨
    // if문 return; 다음에 추가되어있음
    // const user = await User.findOne({
    //   email: req.user.email
    // });
    // console.log(req.user);
    // await user.setPassword(newPassword);
    // await user.save();
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.change_password}`);
    console.log(error);
  }
};
