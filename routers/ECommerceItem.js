const router = require("express").Router();
const {createECommerceItem,getAllECommerceItem,searchECommerceItem} = require("../controllers/ECommerceItem");


// to create ecommerce item

router.post("/create-ecommerce-item",createECommerceItem);

// to get all ecommerce item

router.get("/get-all-ecommerce-item",getAllECommerceItem);

// to get ecommerce item based on search query


router.get("/search-ecommerce-item",searchECommerceItem);


module.exports = router;
