const router = require("express").Router();
const {getSingleTPI,createTpiSummary,getAllTpiSummary,deleteTpiSummary} = require("../controllers/tpi_summary");

// to create tpi summary

router.post("/create-tpi-summary",createTpiSummary)

// to get single tpi info
router.get("/tpi/:slug",getSingleTPI);

// to get tpi summary based on single tpi

router.get("/tpi-summary/:slug",getAllTpiSummary);


// to delete tpi summary

router.delete("/delete-tpi-summary/:id",deleteTpiSummary);


module.exports = router;
