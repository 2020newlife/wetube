import routes from './routes';

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 'admin',
  };
  next();
};
