const { getDB } = require("../config/db");

const getAdminDashboardStats = async (
req,
res
) => {
try {
const db = getDB();


const totalUsers =
  await db
    .collection("users")
    .countDocuments();

const totalTasks =
  await db
    .collection("tasks")
    .countDocuments();

const activeTasks =
  await db
    .collection("tasks")
    .countDocuments({
      status: {
        $in: [
          "open",
          "pending",
          "in-progress",
        ],
      },
    });

const payments = await db
  .collection("payments")
  .find({
    payment_status: "paid",
  })
  .toArray();

const totalRevenue =
  payments.reduce(
    (sum, item) =>
      sum +
      Number(item.amount || 0),
    0
  );

res.json({
  totalUsers,
  totalTasks,
  activeTasks,
  totalRevenue,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

module.exports = {
getAdminDashboardStats,
};
