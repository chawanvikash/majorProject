const mongoose = require('mongoose');
const initdData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log(`connection successful`);
        
        initdDB(); 
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airhouse');
};

const initdDB = async () => {
    
    await Listing.deleteMany({});
    console.log("Existing data deleted.");

   
    initdData.data = initdData.data.map((obj) => ({
        ...obj, 
        owner: '6908de98cd1d029ebac20fc4' 
    }));

    
    await Listing.insertMany(initdData.data);
    console.log("Data has been saved/initialized.");
    
};

