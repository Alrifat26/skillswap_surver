const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getUsers = async (req, res) => {
try {
const db = getDB();


const users = await db
  .collection("users")
  .find()
  .toArray();

res.json(users);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const createUser = async (req, res) => {
try {
const db = getDB();


const result = await db
  .collection("users")
  .insertOne(req.body);

res.status(201).json({
  success: true,
  insertedId: result.insertedId,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const getUserByEmail = async (
req,
res
) => {
try {
const db = getDB();


const user = await db
  .collection("users")
  .findOne({
    email: req.params.email,
  });

res.json(user);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const updateUserProfile =
async (req, res) => {
try {
const db = getDB();


  const result = await db
    .collection("users")
    .updateOne(
      {
        email:
          req.params.email,
      },
      {
        $set: {
          name:
            req.body.name,
          image:
            req.body.image,
          skills:
            req.body.skills,
          bio:
            req.body.bio,
          hourlyRate:
            req.body.hourlyRate,
        },
      }
    );

  res.json({
    success: true,
    result,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

module.exports = {
getUsers,
createUser,
getUserByEmail,
updateUserProfile,
};
