const router = require("express").Router();
const {createNewsForPortal} = require("../controllers/NewsPortal");

// to create expense

router.post("/create-news",createNewsForPortal);

module.exports = router;
