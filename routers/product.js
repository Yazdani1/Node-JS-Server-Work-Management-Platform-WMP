const router = require("express").Router();
const {createProduct,getAllProducts,getAllFeaturedProducts,deleteProduct,getFilteredProducts,getProductPriceCount} = require("../controllers/product");

// to create a new product
router.post("/create-product",createProduct);

// to get all the products

router.get("/get-all-products",getAllProducts);

// to get featured products

router.get("/get-all-featured-products",getAllFeaturedProducts);


// to delete products


router.delete("/delete-prouct/:id",deleteProduct);


// to filter products

router.get("/filter",getFilteredProducts);


// to perform agregation, match group and get product info

router.get("/product-filter",getProductPriceCount);


module.exports = router;
