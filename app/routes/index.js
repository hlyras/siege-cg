const router = require("express").Router();
const lib = require('jarmlib');

const pathController = require("../controller/path");
const cardController = require("../controller/card");

router.get("/", lib.route.toHttps, pathController.index);

router.get("/deck-menu", lib.route.toHttps, pathController.deckMenu);

router.get("/card/list", lib.route.toHttps, cardController.list);

module.exports = router;