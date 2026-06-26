const express = require("express");

const {
getAllUsers,
toggleUserBlock,
} = require("../controllers/adminController");

const router = express.Router();

router.get(
"/users",
getAllUsers
);

router.patch(
"/users/:id",
toggleUserBlock
);

module.exports = router;
