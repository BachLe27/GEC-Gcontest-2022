const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => { 
      cb(null, 'uploads');
   },
   filename: (req, file, cb) => { 
      const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null,  filename + '-' + file.originalname);
   }
});

const upload = multer({storage: storage});

module.exports = upload;