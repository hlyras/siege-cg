const router = require("express").Router();
const lib = require('jarmlib');

const pathController = require("../controller/path");
const empireController = require("../controller/empire/main");
const leaderController = require("../controller/leader/main");

router.get("/login", lib.route.toHttps, pathController.login);

router.get("/", lib.route.toHttps, pathController.index);
router.get("/queue", lib.route.toHttps, pathController.queue);
router.get("/match", lib.route.toHttps, pathController.match);
router.get("/deck/menu", lib.route.toHttps, pathController.deckMenu);

router.get("/leader/findByEmpire/:empire_id", lib.route.toHttps, leaderController.findByEmpireId);

router.use("/user", require("./user"));
router.use("/card", require("./card"));
router.use("/empire", require("./empire"));

module.exports = router;