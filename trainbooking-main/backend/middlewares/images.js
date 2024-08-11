import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      req.profile=uniqueSuffix+ '-' +file.fieldname+'.jpg'
      cb(null, uniqueSuffix+ '-' +file.fieldname+'.jpg')
    }
  })
  // console.log(storage);
  const upload = multer({ storage: storage })
  // console.log(upload);
  
  export default upload;