const router = require("express").Router();
const {ceratePhotoLibrary,getAllPhoto,getPhotoLibrary} = require("../controllers/PhotoLibrary");

// to create photo library image
router.post("/create-photoLibrary",ceratePhotoLibrary);

// to get all the photo for library

router.get("/get-photos",getAllPhoto);

// to get photo library with pagination system

router.get("/photo-library",getPhotoLibrary);

module.exports = router;
