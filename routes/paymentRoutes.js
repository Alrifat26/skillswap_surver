const express = require("express");

const {
getEarnings,
} = require(
"../controllers/paymentController"
);

const router = express.Router();

router.get(
"/earnings",
getEarnings
);

module.exports = router;
