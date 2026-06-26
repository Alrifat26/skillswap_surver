const express = require("express");

const {
getAdminDashboardStats,
} = require(
"../controllers/adminDashboardController"
);

const router = express.Router();

router.get(
"/stats",
getAdminDashboardStats
);

module.exports = router;
