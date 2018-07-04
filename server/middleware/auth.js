require('dotenv').config()
const jwt = require('jsonwebtoken')


  function auth(req, res, next){

    jwt.verify(req.headers.token, process.env.secretKey, function(err, decoded) {
      if(decoded){
        req.decoded = decoded
        next()
      } 
      else {
        res.status(403)
        .send({
          message: "invalid token"
        })
      }
    })
  }

module.exports = auth;