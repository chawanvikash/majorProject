const mongoose =require("mongoose");
const  Schema=mongoose.Schema;
const passLocMongo=require("passport-local-mongoose");

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
    },

});



UserSchema.plugin(passLocMongo);

const User=mongoose.model("User",UserSchema);



module.exports=User;

