const router = require("express").Router();

// get controller
const { getLoginPage } = require("../controller/get/login");

router.get("/", getLoginPage);

module.exports = router;
