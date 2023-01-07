const multer = require('multer');
const path = require('path');
const pathToImages = path.resolve(__dirname, '../petsImages');
 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathToImages); // where we want to save it
  
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));// the name of the uploaded file
    },
  });
  
  const upload = multer({ storage: storage });
  
  module.exports = { upload };
  