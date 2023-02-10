const router = require("express").Router();
const {
  createTPI,
  getTPI,
  deleteTPI,
  getAllTPIList,
  getTpiListUsingAggregation,
} = require("../controllers/tpi");

// to create tpi
router.post("/create-tpi", createTPI);

// to get tpi based on wm

/**
 * @param {slug} - We need to put here work management slug to get tpi based on each wm
 * @param - only one slug needs to pass and the api end point
 */

router.get("/wm/:slug", getTPI);

// to delete tpi

/**
 * @param {id}- here we need to pass tpi id in order to delete a single tpi
 * when user hit the delete button one tpi should be deleted.
 */

router.delete("/delete-tpi/:id", deleteTPI);

//test

/**
 * @object - to get all the tpi lists
 */

router.get("/tpilist", getAllTPIList);

// to do aggreation match and group test

/**
 * @param {slug} - to get tpi with aggregation and then match it and then group the data.
 */

router.get("/get-tpi-with-aggregation/:slug", getTpiListUsingAggregation);

module.exports = router;
