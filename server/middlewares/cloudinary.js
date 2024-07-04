const cloudinary = require("../config/cloudinary");

const uploadImage = async (imagePath) => {

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
     
      const result = await cloudinary.uploader.upload(req.file, options);
      console.log(result);
      next();
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

const uploadMiddleware=async (req, res, next)=>{
    try {
  
        const result = await cloudinary.uploader.upload(req.file , {
           folder:'hotel_pic'
        });
        console.log(result.secure_url);
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
      }
};

module.exports={uploadMiddleware}


