const { verify } = require("jsonwebtoken");
  

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json( {error : "User not log in"});
  }
  
  try {
    const validToken = verify(accessToken, "mySecret");
    
    req.email = validToken;
    if (validToken) {
      return next();
    } 
  } catch (err) {
    console.log(err)
    return res.json({error: err})
  }
};

module.exports = { validateToken };