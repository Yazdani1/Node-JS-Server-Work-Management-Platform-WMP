const router = require("express").Router();
const {createNewsForPortal,getAllNewsPortalNews,getSingleNews} = require("../controllers/NewsPortal");

// to create expense

/**
 * To create news for the news portal
 */

router.post("/create-news",createNewsForPortal);


/**
 * To get all the news portal news
 */

router.get("/get-all-newsportal",getAllNewsPortalNews);


/**
 * To get a single news details
 */

router.get("/get-single-news/:slug",getSingleNews);


module.exports = router;
