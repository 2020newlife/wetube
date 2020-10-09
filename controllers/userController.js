export const join = (req, res) => res.render('join', { pageTitle: 'Join' });
export const login = (req, res) => res.send('로그인 화면!');
export const logout = (req, res) => res.send('로그아웃 화면!');
