const { getDB } = require("../config/db");

const getFreelancers = async (
req,
res
) => {
try {
const db = getDB();


const freelancers =
  await db
    .collection("user")
    .find({
      role: "freelancer",
    })
    .toArray();

res.json(freelancers);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

module.exports = {
getFreelancers,
};
