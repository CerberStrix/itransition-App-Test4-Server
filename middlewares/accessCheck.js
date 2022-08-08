const { UsersBase } = require('../models') ;

const accessCheck = async (req, res, next) => {
  const email = req.params.email;
  const user = await UsersBase.findOne({ where: { email: email}});
  if(user.status === 'Blocked') {
    return res.json({error: "User is blocked"});
  }
  return next();
};

module.exports = { accessCheck };