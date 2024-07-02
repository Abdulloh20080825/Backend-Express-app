export default (req, res, next) => {
  console.log(req.cookies);
  const isAuth = req.cookies.token ? true : false;
  console.log(isAuth);
  res.locals.token = isAuth;
  next();
};
