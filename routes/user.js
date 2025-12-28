const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync=require("../utils/wrapAsync.js");

const passport=require("passport");
const localStrategy=require("passport-local");
const {savedRedirecrUrl}=require("../middleware.js");

const userController=require("../controller/user.js");

router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(savedRedirecrUrl,passport.authenticate("local",{failureRedirect:"login",failureFlash:true}),
    userController.logIn);

router.get("/logout",userController.logOut)


module.exports=router;