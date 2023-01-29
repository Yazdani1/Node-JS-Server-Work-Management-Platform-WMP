const router = require("express").Router();
const {saveFavouriteTPI,getFavouriteTPI,deleteFavouriteTPI} = require("../controllers/favourite_tpi");

// to save favourite tpi id
router.post("/save-favourite-tpi",saveFavouriteTPI);

// to get all favourite tpi

router.get("/get-all-favourite-tpi",getFavouriteTPI);

// delete favourite tpi

router.delete("/delete-favourite-tpi/:id",deleteFavouriteTPI);


module.exports = router;
