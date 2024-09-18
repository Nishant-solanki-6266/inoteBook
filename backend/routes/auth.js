// const express=require('express');
// const User=require('../models/User')
// const router=express.Router();

// //Create a User using:Post  "api/auth/" Dostn't require Auth
// router.post('/',(req,res)=>{
//     console.log(req.body);
//     const user= new User(req.body);
//    user.save()
//     res.send(req.body);
// })
// module.exports=router;
///////////////////////////
/*...................... */
const express = require('express');
const { model } = require('mongoose');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs')
const Jwt=require('jsonwebtoken')
var fetchuser=require('../middleware/fetchUser')
const JWT_SECRET='Harryisagood$boy';
// Route:1, Create a new  User using : POST "/api/auth/".No login required
router.post('/craeteuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a  valid Email').isEmail(),
    body('password', "password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    //    console.log(req.body);
    //    const user=new User(req.body)
    //   user.save(); ye bad me hata di thi
    // console.log(req);
    /* if there are errors, return bad request and the errors*/
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    /* Check whether the user this email exits already */
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" })
        }
        
        // create a new user
        const salt= await bcrypt.genSalt(10);
      const  secPass=  await bcrypt.hash( req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        
        //jwt token use
        const data={
            user:{
                id:user.id
        }}
        const authtoken= Jwt.sign(data,JWT_SECRET)
        console.log(jwtData);
        success=true;
        res.json({ success,authtoken})
        //  ye line me phle chala rha tha 46 lecture tk uske bad commment kiya
        // res.json(user)
        // .then(user=>res.json(user))
        // .catch(errors=>{console.log(errors)
        // res.json({errors:'Please enter a unique valur for email',message:errors.message})})


        // res.send(req.body) ydi hmne allready res.json upr kr diya hai to ye krne ki jarurat nhi hai
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some Error occured");
    }
})
// Route 2:Authenticate a user using:Post "api/auth/login"
router.post('/login', [
    body('email', 'Enter a  valid Email').isEmail(),
    body('password', 'password cannot be blancks').exists(),
], async (req, res) => {
   let success=false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user= await User.findOne({email})
        if(!user){
            success=false;
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare= await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=Jwt.sign(data,JWT_SECRET)
        success=true;
        res.json({ success,authtoken})
    }catch (error) {
        console.error(error.message);
        res.status(500).send("internal server Error");
    }
})
//Route3: get logeddin User Details using:Post"/api/auth/getuser".
router.post('/getuser', fetchuser, async (req, res) => {
try{
    Userid=req.user.id
    const user=await User.findById(Userid).select("-password")
    res.send(user)
} catch(error) {
    console.error(error.message);
    res.status(500).send("internal server Error");

}})
module.exports = router;
