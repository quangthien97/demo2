var express = require("express");
var router = express.Router();
const authEditor = require("../middleware/checkEditor");
const { asyncMiddleware } = require("../global/function");
const newsEditController = require("../controllers/newsEdit");

router.get("/", authEditor, asyncMiddleware(newsEditController.get));

router.get("/:_idNews", authEditor, asyncMiddleware(newsEditController.findById));

router.put("/:_id", authEditor,  asyncMiddleware(newsEditController.edit));

router.delete("/:_id", authEditor, asyncMiddleware(newsEditController.delete));

module.exports = router;
