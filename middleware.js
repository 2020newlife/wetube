import routes from './routes';

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Suntube';
  res.locals.routes = routes;
  next();
};
