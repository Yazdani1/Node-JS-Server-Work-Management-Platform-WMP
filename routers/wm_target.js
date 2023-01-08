const router = require("express").Router();
const {createWMTarget,getAllWMTargets,deleteWMTargets,updateWMTarget} = require("../controllers/wm_target");

// to create wm target
router.post("/create-wm-target",createWMTarget);



// to get wm target based on single wm

router.get("/get-all-wm-targets/:slug",getAllWMTargets);


router.put("/update-wm-target/:id",updateWMTarget);


// to delete wm targets

router.delete("/delete-wm-target/:id",deleteWMTargets);


module.exports = router;
