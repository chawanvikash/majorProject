const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,      // Fixed: was 'cloud_api'
    api_secret: process.env.CLOUD_SECRET_KEY // Fixed: was 'cloud_secret' & fixed 'KET' typo
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'AirHouse_Dev',
        allowed_formats: ['png', 'jpg', 'jpeg'], // Fixed: typo 'allowerdFormat'
    },
});

module.exports = {
    storage,
    cloudinary
};
