const router = require("express").Router();
const {createECategory,getAllECommerceCategory} = require("../controllers/EcommerceCategory");


// to create ecommercecategory

router.post("/create-ecategory",createECategory);


// to create ecommercecategory


router.get("/getall-ecommerce-category",getAllECommerceCategory);

module.exports = router;
