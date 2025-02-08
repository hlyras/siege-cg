const router = require("express").Router();
const lib = require('jarmlib');

const Home = require("../controller/home");

router.get("/login", lib.route.toHttps, Home.login);

router.get("/", lib.route.toHttps, Home.index);
router.get("/queue", lib.route.toHttps, Home.queue);
router.get("/match", lib.route.toHttps, Home.match);

router.use("/user", require("./user"));
router.use("/card", require("./card"));
router.use("/deck", require("./deck"));
router.use("/range", require("./range"));
// router.use("/leader", require("./leader"));
router.use("/empire", require("./empire"));

module.exports = router;