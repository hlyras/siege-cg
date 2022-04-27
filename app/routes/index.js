const router = require("express").Router();
const lib = require('jarmlib');

const pathController = require("../controller/path");
const playerController = require("../controller/player");
const cardController = require("../controller/card");
const empireController = require("../controller/empire");
const leaderController = require("../controller/leader");

router.get("/", lib.route.toHttps, pathController.index);

router.get("/player/deck/get", lib.route.toHttps, playerController.deck.get);
router.get("/player/leader/get", lib.route.toHttps, playerController.leader.get);
router.get("/player/leader/set/:leader_id", lib.route.toHttps, playerController.leader.set);
router.get("/player/empire/set/:empire_id", lib.route.toHttps, playerController.empire.set);
router.get("/player/deck/add/:card_id", lib.route.toHttps, playerController.deck.add);
router.get("/player/deck/remove/:card_id", lib.route.toHttps, playerController.deck.remove);
router.get("/player/deck/list/:empire_id", lib.route.toHttps, playerController.deck.list);

router.get("/empire/list", lib.route.toHttps, empireController.list);

router.get("/deck-menu", lib.route.toHttps, pathController.deckMenu);

router.get("/card-menu", lib.route.toHttps, cardController.index);
router.post("/card/save", lib.route.toHttps, cardController.save);
router.post("/card/filter", lib.route.toHttps, cardController.filter);
router.get("/card/findById/:id", lib.route.toHttps, cardController.findById);
router.get("/card/list", lib.route.toHttps, cardController.list);
router.get("/card/findByEmpire/:empire_id", lib.route.toHttps, cardController.findByEmpireId);

router.get("/leader/findByEmpire/:empire_id", lib.route.toHttps, leaderController.findByEmpireId);

module.exports = router;