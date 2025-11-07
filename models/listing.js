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
        type:String,
        set:(v)=>v===" "?"https://img.freepik.com/free-photo/gorgeous-foggy-…3921310624bad865e81514a3b5a23407e83b54f934&w=1480":v,
        default:"https://img.freepik.com/free-photo/gorgeous-foggy-…3921310624bad865e81514a3b5a23407e83b54f934&w=1480",
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