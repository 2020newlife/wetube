import { videos } from '../db';

export const home = (req, res) => {
  res.render('home', {
    pageTitle: 'Main',
    videos,
  });
};
export const search = (req, res) => {
  const {
    query: { term: searchTerm },
  } = req;
  //   const searchTerm = req.query.term;
  res.render('search', {
    pageTitle: 'Search',
    searchTerm,
  });
};
