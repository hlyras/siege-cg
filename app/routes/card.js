const router = require("express").Router();
const lib = require('jarmlib');

const cardController = require("../controller/card/main");

router.get("/menu", lib.route.toHttps, cardController.menu);

router.post("/save", lib.route.toHttps, cardController.save);
router.post("/filter", lib.route.toHttps, cardController.filter);
router.get("/findById/:id", lib.route.toHttps, cardController.findById);
router.get("/list", lib.route.toHttps, cardController.list);
router.get("/findByEmpire/:empire_id", lib.route.toHttps, cardController.findByEmpireId);

module.exports = router;