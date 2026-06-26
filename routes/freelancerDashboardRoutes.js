const express = require("express");

const {
  getFreelancerStats,
} = require(
  "../controllers/freelancerDashboardController"
);

const router = express.Router();

router.get(
  "/freelancer",
  getFreelancerStats
);

module.exports = router;