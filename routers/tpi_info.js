const router = require("express").Router();
const {createTPIInfo,getAllTPIInfo,deleteTPIInfo,updateTPIinfo} = require("../controllers/tpi_info");


// to create tpi info

router.post("/create-tpi-info",createTPIInfo);

// to get all tpi info


router.get("/getall-tpi-info/:slug",getAllTPIInfo);


// to edit tpi info

router.put("/updatetpi-info/:id",updateTPIinfo);


// to delete tpi info

router.delete("/delete-tpi-info/:id",deleteTPIInfo);

module.exports = router;
