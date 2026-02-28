const express=require("express");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");

const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const ListingController=require("../controller/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.NewListing));

router.get("/new",isLoggedIn,ListingController.AddnewListing);

router.route("/:id")
    .get(wrapAsync(ListingController.ShowListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.UpdateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(ListingController.DestroyListing))
    ;

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.EditListing));

module.exports=router;