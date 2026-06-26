const express = require("express");

const {
getProposals,
createProposal,
updateProposalStatus,
getTaskProposals,
getFreelancerProposals,
} = require(
"../controllers/proposalController"
);

const router = express.Router();

/* All proposals */
router.get("/", getProposals);

/* Create proposal */
router.post("/", createProposal);

/* My proposals */
router.get(
"/freelancer/all",
getFreelancerProposals
);

/* Proposals by task id */
router.get(
"/:taskId",
getTaskProposals
);

/* Accept / Reject proposal */
router.patch(
"/status/:id",
updateProposalStatus
);

module.exports = router;
