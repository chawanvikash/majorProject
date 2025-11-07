const express=require("express");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");


const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");





router.get("/",wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs");
});

router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(async (req,res)=>{
     let {id}=req.params;
    const listing= await Listing.findById(id);
     if(!listing){
        req.flash("error","the requested page  does not exist");
        res.redirect("/listings");
        }
        else{
            res.render("./listings/edit.ejs",{listing});
        }
  
}));

router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing has been updated");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id,{...req.body.listing});
    req.flash("success","listing has been deleted");
    res.redirect("/listings");
}));


router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate("owner");
    if(!listing){
        req.flash("error","the requested listing does not present");
        res.redirect("/listings");
        }
        else{
             res.render("./listings/show.ejs",{listing});
        }
   
}));

router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res)=>{
    
    const newlisting =new Listing(req.body.listing);
    newlisting.owner=req.user._id;    //
    await newlisting.save();
    req.flash("success","new listing has been added succesfully");
    res.redirect("/listings");
}));

module.exports=router;