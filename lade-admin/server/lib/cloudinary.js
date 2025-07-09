import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config(); //Getting files loaded into process.env

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export default cloudinary;
