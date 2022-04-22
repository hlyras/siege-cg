const router = require("express").Router();
const lib = require('jarmlib');

const pathController = require("../controller/path");
const playerController = require("../controller/player");
const cardController = require("../controller/card");
const empireController = require("../controller/empire");

router.get("/", lib.route.toHttps, pathController.index);

router.get("/player/empire/set/:empire_id", lib.route.toHttps, playerController.empire.set);
router.get("/player/deck/add/:card_id", lib.route.toHttps, playerController.deck.add);
router.get("/player/deck/remove/:card_id", lib.route.toHttps, playerController.deck.remove);
router.get("/player/deck/list/:empire_id", lib.route.toHttps, playerController.deck.list);

router.get("/empire/list", lib.route.toHttps, empireController.list);

router.get("/deck-menu", lib.route.toHttps, pathController.deckMenu);

router.get("/card/list", lib.route.toHttps, cardController.list);
router.get("/card/filter/:empire_id", lib.route.toHttps, cardController.filter);


module.exports = router;