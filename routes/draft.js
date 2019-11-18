var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const authJour = require("../middleware/checkJournalist");
const authEditor = require("../middleware/checkEditor");

const { asyncMiddleware } = require("../global/function");
const draftController = require("../controllers/draft");

router.get("/", authJour, asyncMiddleware(draftController.get));
router.get("/:_id", authJour, asyncMiddleware(draftController.findById));
router.post("/", authJour, asyncMiddleware(draftController.create));
router.put("/:_id", authJour, asyncMiddleware(draftController.edit));
router.delete("/:_id", authJour, asyncMiddleware(draftController.delete));

module.exports = router;
