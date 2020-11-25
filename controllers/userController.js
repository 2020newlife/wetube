import passport from 'passport';
import routes from '../routes';
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

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// user
export const edit_profile = (req, res) =>
  res.render('user/edit_profile', { pageTitle: 'Edit Profile' });
export const change_password = (req, res) =>
  res.render('user/change_password', { pageTitle: 'Change Password' });
export const user_detail = (req, res) =>
  res.render('user/user_detail', { pageTitle: 'User Detail' });
