//golbal
export const join = (req, res) =>
  res.render('user/join', { pageTitle: 'Join' });
export const login = (req, res) =>
  res.render('user/login', { pageTitle: 'Login' });
export const logout = (req, res) =>
  res.render('user/logout', { pageTitle: 'Logout' });
//user
export const edit_profile = (req, res) =>
  res.render('user/edit_profile', { pageTitle: 'Edit Profile' });
export const change_password = (req, res) =>
  res.render('user/change_password', { pageTitle: 'Change Password' });
export const user_detail = (req, res) =>
  res.render('user/user_detail', { pageTitle: 'User Detail' });
