const router = require("express").Router();
const {createWorkManagement,getAllWorkManagement,deleteWorkManagement,getSingleWMDetails} = require("../controllers/work_management");

// to create work management
router.post("/create-work-management", createWorkManagement);

// to get single wm info 

router.get("/single-wm-details/:slug",getSingleWMDetails);

// to get all work management

router.get("/get-all-work-management",getAllWorkManagement);

// to delete work management

router.delete("/delete-wm/:id",deleteWorkManagement);




module.exports = router;
