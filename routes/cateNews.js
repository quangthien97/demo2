var express = require("express");
var router = express.Router();
const { asyncMiddleware } = require("../global/function");
const cateNewsController = require("../controllers/catenews");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/checkAdmin");

router.get("/", asyncMiddleware(cateNewsController.get));
router.get("/:_idCate", asyncMiddleware(cateNewsController.findById));
router.post("/", auth, asyncMiddleware(cateNewsController.create));
router.put("/:_idCate", authAdmin, asyncMiddleware(cateNewsController.edit));
router.delete("/:_idCate",authAdmin,asyncMiddleware(cateNewsController.delete));

module.exports = router;
