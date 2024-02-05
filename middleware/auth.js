const jwt = require('jsonwebtoken');

const auth = async(req,res,next) =>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({msg:'unauthorized'})
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const payload = jwt.verify(token,process.env.jwt_secret)
    req.user = {userId:payload.userId};
    next()
    
  } catch (error) {
    return res.status(401).json({msg:"Auth Failed"})
    
  }

  
}
module.exports = auth