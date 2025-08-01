const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const userCtrl={
    //!register
    register:asyncHandler((req,res)=>{}),
    login:asyncHandler((req,res)=>{}),
    profile:asyncHandler((req,res)=>{}),
}
module.exports=userCtrl