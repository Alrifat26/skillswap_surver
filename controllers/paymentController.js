const { getDB } = require("../config/db");

const getEarnings = async (
req,
res
) => {
try {
const db = getDB();


console.log("DB Connected:", !!db);

const paymentsCollection =
  db.collection("payments");

console.log(
  "Collection Ready"
);

const payments =
  await paymentsCollection
    .find({})
    .toArray();

res.json(payments);


} catch (error) {
console.error(error);


res.status(500).json({
  success: false,
  message: error.message,
});


}
};

module.exports = {
getEarnings,
};
