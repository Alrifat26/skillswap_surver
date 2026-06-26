const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getAllUsers = async (
req,
res
) => {
try {
const db = getDB();


const users = await db
  .collection("user")
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

const toggleUserBlock =
async (req, res) => {
try {
const db = getDB();


  const user =
    await db
      .collection("user")
      .findOne({
        _id: new ObjectId(
          req.params.id
        ),
      });

  const result =
    await db
      .collection("user")
      .updateOne(
        {
          _id: new ObjectId(
            req.params.id
          ),
        },
        {
          $set: {
            isBlocked:
              !user.isBlocked,
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
getAllUsers,
toggleUserBlock,
};
