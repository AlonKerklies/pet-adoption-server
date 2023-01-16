const multer = require('multer');
const path = require('path');
const pathToImages = path.resolve(__dirname, '../petsImages');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

  // const diskStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {     
  //       console.log("inside multer");
  //     cb(null, pathToImages); // where we want to save it
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //     console.log("inside uniqueSuffix");
  //     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));// the name of the uploaded file
  //   },
  // });
  

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
  });
  

  const cloudStorage = new CloudinaryStorage({
      cloudinary: cloudinary,
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
    });
    
  const upload = multer({
   
    //  storage: storage,
     storage: cloudStorage,
    });
    console.log('upload = multersssssss');
  const generateUrl = (req, res, next) =>{
    console.log('generateUrl = multersssssss'); 
    req.body.imageUrl = req.file.path;
     console.log("-generateUrl--req.file.path-",req.file.path);
    next();
  }
  
  module.exports = { upload , generateUrl};




//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {     
//         console.log("inside multer");
//       cb(null, pathToImages); // where we want to save it
  
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       console.log("inside uniqueSuffix");
//       cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));// the name of the uploaded file
//     },
//   });
  