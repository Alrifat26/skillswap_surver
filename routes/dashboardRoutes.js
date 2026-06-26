const express = require("express");

const {
getClientDashboardStats,
getAdminDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
"/client",
getClientDashboardStats
);

router.get(
"/admin",
getAdminDashboardStats
);

module.exports = router;
