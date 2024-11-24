const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("auth/login", { layout: false });
});
module.exports = router;