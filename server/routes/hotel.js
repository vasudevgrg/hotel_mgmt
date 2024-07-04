const express= require("express");
const { uploadMiddleware } = require("../middlewares/cloudinary");
const { createHotel, updateurl, search, handleCookie, handleCitySuggesstion, handleCitySuggestion } = require("../controllers/hotel");
const router= express.Router();

router.post("/createhotel", createHotel );
router.post("/updateurl", updateurl);
router.post("/search", search);
router.get("/checkcookie", handleCookie);
router.get("/cities/suggestions",handleCitySuggestion);

module.exports=router;