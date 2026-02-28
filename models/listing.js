const mongoose =require("mongoose");
const  Schema=mongoose.Schema;
const User=require("./user");

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,

    },
    image:{
        
        filename:String,
        url:String,
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

const Listing=  mongoose.model("Listing",ListingSchema);
module.exports=Listing;