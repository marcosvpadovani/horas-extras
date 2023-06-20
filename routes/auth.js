const router = require("express").Router();

// auth controller

const { authUser } = require("../controller/post/auth");

router.post("/auth", authUser);

module.exports = router;
