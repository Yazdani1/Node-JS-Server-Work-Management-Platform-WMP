const router = require("express").Router();
const { createHomeRentalAdvertise,getAllHomeRentalAdvertise,deleteHomeRentalAdvertise } = require("../controllers/HomeRental");

/**
 * Post - create home rental
 */

router.post("/create-homerental-advertise", createHomeRentalAdvertise);

/**
 * Get- all home rental advertise
 */

router.get("/get-all-home-rental-advertise", getAllHomeRentalAdvertise);


/**
 * Delete - To delete single home rental advertise
 * @param - id
 */

router.delete("/delete-homerental/:id",deleteHomeRentalAdvertise);

module.exports = router;
