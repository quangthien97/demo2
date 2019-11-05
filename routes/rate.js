var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const authCus = require("../middleware/checkCus");
const { asyncMiddleware } = require("../global/function");
const rateController = require("../controllers/rate");

router.get("/", auth, asyncMiddleware(rateController.get));
router.post("/news/:_idNews",authCus,asyncMiddleware(rateController.createRate));
router.put("/:_idRate", auth, asyncMiddleware(rateController.edit));
router.delete("/:_idRate", auth, asyncMiddleware(rateController.delete));
router.get("/:_idRate", auth, asyncMiddleware(rateController.getRate));

module.exports = router;
