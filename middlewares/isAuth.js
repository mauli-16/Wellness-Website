const jwt=require('jsonwebtoken')
const isAuthenticated=async(req,res,next)=>{
    console.log('Is Auth middleware');
    //!get token from header
    const headerObj=req.headers;
    const token=headerObj.authorization.split(' ')[1];
 
    
    console.log(token);
    
    //verify token
    const verifyToken=jwt.verify(token,'anykey',(err,decoded)=>{
        if(err){
            return false
        }
        else{
            return decoded
        }
    })
    console.log(verifyToken);
    
    //save the user
    if(verifyToken){
        req.user=verifyToken.id
        next()
    }
    else{
        const err=new Error('Token expired please login again')
        next(err);
    }
    

    
}
module.exports=isAuthenticated