const { getDB } = require("../config/db");

const getTransactions = async (req, res) => {
try {
const db = getDB();


const transactions = await db
  .collection("payments")
  .find()
  .sort({ paid_at: -1 })
  .toArray();

res.json(transactions);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

module.exports = {
getTransactions,
};
