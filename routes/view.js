var express = require("express");
var router = express.Router();
const { asyncMiddleware } = require("../global/function");
const viewController = require("../controllers/view");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/checkAdmin");

router.get("/", asyncMiddleware(viewController.get));
router.get("/:idNews", asyncMiddleware(viewController.findById));
router.get("/ahihi/viewhomni", asyncMiddleware(viewController.viewhomni));
router.get("/ahihi/viewthangni", asyncMiddleware(viewController.viewthangni));

module.exports = router;
