const express = require("express");
const router = express.Router();
const { asyncMiddleware } = require("../global/function");
const loginController = require("../controllers/login");

router.post("/register", asyncMiddleware(loginController.register));

router.post("/", asyncMiddleware(loginController.login));

module.exports = router;
