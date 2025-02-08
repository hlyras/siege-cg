const router = require("express").Router();
const lib = require('jarmlib');

const Empire = require("../controller/empire/main");

router.post("/filter", lib.route.toHttps, Empire.filter);

module.exports = router;