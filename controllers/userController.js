export const join = (req, res) => res.render('join', { pageTitle: 'Join' });
export const login = (req, res) => res.send('로그인 화면!');
export const logout = (req, res) => res.send('로그아웃 화면!');
export const editProfile = (req, res) => {
  res.render('editProfile', {
    pageTitle: 'Edit Your Profile',
  });
};
export const userDetail = (req, res) => {
  res.render('userDetail', {
    pageTitle: 'user detail',
  });
};
