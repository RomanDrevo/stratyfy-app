
module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  console.log("----aaaaa: ", req.query);

  if (!req.query.isAdmin) return res.status(403).send('Access denied.');

  next();
};
