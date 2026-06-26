const express = require("express");

const {
getUsers,
createUser,
getUserByEmail,
updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.get(
"/:email",
getUserByEmail
);

router.put(
"/:email",
updateUserProfile
);

module.exports = router;
