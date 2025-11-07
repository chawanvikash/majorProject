const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync.js");

const passport=require("passport");
const localStrategy=require("passport-local");
const {savedRedirecrUrl}=require("../middleware.js");





router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const  registerdUser= await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Airhouse!");
            res.redirect("/listings");  
        });
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
});

router.post("/login",savedRedirecrUrl,passport.authenticate("local",{failureRedirect:"login",failureFlash:true}),
async(req,res)=>{
    req.flash("success","Welcome back to Airhouse")
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are loggout out");
        res.redirect("/listings");
    })
})


module.exports=router;