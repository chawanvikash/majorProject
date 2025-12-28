const Listing =require("../models/listing.js");


module.exports.index=async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

module.exports.AddnewListing=(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.EditListing=async (req,res)=>{
     let {id}=req.params;
    const listing= await Listing.findById(id);
     if(!listing){
        req.flash("error","the requested page  does not exist");
        res.redirect("/listings");
        }
        else{
            res.render("./listings/edit.ejs",{listing});
        }
  
};
module.exports.UpdateListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing has been updated");
    res.redirect(`/listings/${id}`);
};
module.exports.DestroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id,{...req.body.listing});
    req.flash("success","listing has been deleted");
    res.redirect("/listings");
};
module.exports.ShowListing=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate("owner");
    if(!listing){
        req.flash("error","the requested listing does not present");
        res.redirect("/listings");
        }
        else{
             res.render("./listings/show.ejs",{listing});
        }
   
};
module.exports.NewListing=async(req,res)=>{
    
    const newlisting =new Listing(req.body.listing);
    newlisting.owner=req.user._id;    
    await newlisting.save();
    req.flash("success","new listing has been added succesfully");
    res.redirect("/listings");
}