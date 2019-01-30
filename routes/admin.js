const express = require("express"),
  router = express.Router(),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  credentials = require("../credentials");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser(credentials.cookieSecret));

router.get("/home", (req, res) => {});

module.exports = router;
