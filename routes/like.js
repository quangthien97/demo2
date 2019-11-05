var express = require("express");
var router = express.Router();
const { asyncMiddleware } = require("../global/function");
const likeController = require("../controllers/like");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/checkAdmin");
const authCus = require("../middleware/checkCus");

router.get("/", auth, asyncMiddleware(likeController.get));
router.post("/:_idNews", authCus, asyncMiddleware(likeController.like));
router.post("/unlike/:_idNews", auth, asyncMiddleware(likeController.unlike));

module.exports = router;
