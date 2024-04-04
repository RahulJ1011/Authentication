const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const verifyUser = async(req,res,next)=>
{
  try
  {
    const token = req.headers.authorization.split(" ")[1]

    if(!token)
    {
      return res.status(404).json({msg:"token not found"})
    }
    const user = await jwt.verify(token,process.env.JWT)
    req.user = user
    next()
  }
  catch(err)
  {
    console.log(err)
    return res.status(403).json({msg:err.message})
  }
}

module.exports = {verifyUser}