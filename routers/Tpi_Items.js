const router = require("express").Router();
const {createTpiItem,getAllItemList,deleteAllTPIItems,deleteSingleItem} = require("../controllers/Tpi_Items");


/**
 * To create tpi item list
 */

router.post("/create-tpi-item",createTpiItem);


/**
 * To get all the list
 */

router.get("/all-tpi-item-list",getAllItemList);


/**
 * To delete all the tpi item post
 */

router.delete("/delete-all-apiitems",deleteAllTPIItems);

/**
 * To delete single tpi array item
 */

router.delete("/delete-single-item/:id",deleteSingleItem);

module.exports = router;
