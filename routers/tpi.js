const router = require("express").Router();
const {createTPI,getTPI,deleteTPI,getAllTPIList,getTpiListUsingAggregation} = require("../controllers/tpi");

// to create tpi
router.post("/create-tpi", createTPI);


// to get tpi based on wm

router.get("/wm/:slug",getTPI);

// to delete tpi 

router.delete("/delete-tpi/:id",deleteTPI);

//test

router.get("/tpilist",getAllTPIList);

// to do aggreation match and group test

router.get("/get-tpi-with-aggregation/:slug",getTpiListUsingAggregation);



module.exports = router;
