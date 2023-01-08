const router = require("express").Router();
const {createWMInfo,getWmInfo,deleteWMInfo,updateWmInfo} = require("../controllers/wm_info");

// to create a new wm info
router.post("/create-wminfo",createWMInfo);


//get wm info based on the single work management

router.get("/wm-info/:slug",getWmInfo);

// to update wm info

router.put("/update-wm-info/:id",updateWmInfo);


// to delete wm info


router.delete("/delete-wminfo/:id",deleteWMInfo);

module.exports = router;
