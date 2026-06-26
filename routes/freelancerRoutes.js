const express = require("express");

const {
getFreelancers,
} = require(
"../controllers/freelancerController"
);

const router = express.Router();

router.get(
"/",
getFreelancers
);

module.exports = router;
