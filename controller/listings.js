const Listing = require("../models/listing.js");

// 1. INDEX ROUTE
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

// 2. NEW ROUTE (Render Form)
module.exports.AddnewListing = (req, res) => {
    res.render("./listings/new.ejs");
};

// 3. CREATE ROUTE (Post Data)
module.exports.NewListing = async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;

    // FIX: Check if file exists before accessing path
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newlisting.image = { filename, url };
    }
    
    await newlisting.save();
    req.flash("success", "New listing has been added successfully");
    res.redirect("/listings");
};

// 4. SHOW ROUTE
module.exports.ShowListing = async (req, res) => {
    let { id } = req.params;
    // Tip: If you have reviews later, chain .populate("reviews") here too
    const listing = await Listing.findById(id).populate("owner"); 
    
    if (!listing) {
        req.flash("error", "The requested listing does not exist");
        res.redirect("/listings");
    } else {
        res.render("./listings/show.ejs", { listing });
    }
};

// 5. EDIT ROUTE (Render Form)
module.exports.EditListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The requested page does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_300");
    res.render("./listings/edit.ejs", { listing,originalImageUrl });
    
};

// 6. UPDATE ROUTE
module.exports.UpdateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Image update logic
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing has been updated");
    res.redirect(`/listings/${id}`);
};

// 7. DESTROY ROUTE
module.exports.DestroyListing = async (req, res) => {
    let { id } = req.params;
    // FIX: Removed the unnecessary {...req.body.listing} argument
    await Listing.findByIdAndDelete(id); 
    
    req.flash("success", "Listing has been deleted");
    res.redirect("/listings");
};