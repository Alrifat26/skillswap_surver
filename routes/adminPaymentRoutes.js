const express = require("express");

const {
getTransactions,
} = require("../controllers/adminPaymentController");

const router = express.Router();

router.get(
"/transactions",
getTransactions
);

module.exports = router;
