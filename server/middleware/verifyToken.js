const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.unauthorized({msg : "You are not authenticated!"});
      req.user = user;
      
      next();
    });
  } else {
    return res.invalid({ msg: "Token is not valid!" });;
  }
}

module.exports = verify;