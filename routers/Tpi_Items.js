const router = require("express").Router();
const {createTpiItem,getAllItemList} = require("../controllers/Tpi_Items");


/**
 * To create tpi item list
 */

router.post("/create-tpi-item",createTpiItem);


/**
 * To get all the list
 */

router.get("/all-tpi-item-list",getAllItemList);


module.exports = router;
