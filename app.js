const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');

const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsLayouts = require("express-ejs-layouts");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const listingsRoute=require("./routes/listing.js");
const userRoute=require("./routes/user.js");



app.use(express.urlencoded({extended :true}));
app.use(express.json());

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(ejsLayouts);
app.set('layout', 'layouts/boilerplate');


main()
.then(()=>{
    console.log(`connection successful`);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airhouse');

  
};

const sessionOptions = {
    secret: "averygoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
});



app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        username:"vicky",
        email:"vicky@gmil.com",
    });
    const registeredUser= await User.register(fakeUser,"hello123");
    res.send(registeredUser);

})

app.use("/listings",listingsRoute);
app.use("/",userRoute);

app.get("/",(req,res)=>{
    res.send("Root is absolutely working");
});

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"));
});

app.use((err,req,res,next)=>{
    let {status=401,message="Page not Found"}=err;
    res.render("error.ejs" ,{message,status});   
});

app.listen(8080,()=>{
    console.log(`listening on port 8080`);
})