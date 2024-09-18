var jwt=require('jsonwebtoken')
const JWT_SECRET='Harryisagood$boy';

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add id  to request id

    const token=req.header('auth-token')
    // iska mtlb humm auth token leke aaye. request ke header se
    
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user;
   
        next();
        // next isliye ki isse hm jha ise import krege vha agla function chlega mtlb (next) ho jayegA
        
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"});

    }
}
module.exports=fetchuser;