const router = require("express").Router();
const lib = require('jarmlib');

const Range = require("../controller/range/main");

router.post("/filter", lib.route.toHttps, Range.filter);

module.exports = router;