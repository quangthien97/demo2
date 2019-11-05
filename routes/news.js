var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const authJour = require("../middleware/checkJournalist");
const authEditor = require("../middleware/checkEditor");

const { asyncMiddleware } = require("../global/function");
const newsController = require("../controllers/news");

router.get("/", asyncMiddleware(newsController.get));
router.get("/:_idNews", asyncMiddleware(newsController.findById));
router.post("/", authJour, asyncMiddleware(newsController.create));
router.put("/:_id", authJour, asyncMiddleware(newsController.edit));
router.delete("/:_id", authJour, asyncMiddleware(newsController.delete));
router.get("/favorite", auth, asyncMiddleware(newsController.getFav));
router.get("/bestNews", asyncMiddleware(newsController.getBestNews));

module.exports = router;
