const jwt = require("jsonwebtoken");

const JSW_SECRET = "AmitIsagoodboy";

const fetchuser=(req,res,next)=>{
    //Get The USer Form the jwt token and id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Enter Vallid TokenID"})
    }
    try {
        const data=jwt.verify(token,JSW_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Enter Vallid Token"})
    }
}
module.exports = fetchuser;