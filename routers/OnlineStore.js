const router = require("express").Router();
const {createOnlineStore,getAllOnlineStore} = require("../controllers/OnlineStore");


// to create online store

router.post("/create-online-store",createOnlineStore);

// to get online store

router.get("/get-all-onlineStore",getAllOnlineStore);

module.exports = router;
