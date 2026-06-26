const { getDB } = require("../config/db");

const getClientDashboardStats =
async (req, res) => {
try {
const db = getDB();


  const totalTasks =
    await db
      .collection("tasks")
      .countDocuments();

  const openTasks =
    await db
      .collection("tasks")
      .countDocuments({
        status: "pending",
      });

  const inProgress =
    await db
      .collection("tasks")
      .countDocuments({
        status:
          "in-progress",
      });

  const payments =
    await db
      .collection(
        "payments"
      )
      .find()
      .toArray();

  const totalSpent =
    payments.reduce(
      (
        sum,
        payment
      ) =>
        sum +
        Number(
          payment.amount ||
            0
        ),
      0
    );

  res.status(200).json({
    totalTasks,
    openTasks,
    inProgress,
    totalSpent,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

const getAdminDashboardStats =
async (req, res) => {
try {
const db = getDB();


  const totalUsers =
    await db
      .collection(
        "users"
      )
      .countDocuments();

  const totalTasks =
    await db
      .collection(
        "tasks"
      )
      .countDocuments();

  const activeTasks =
    await db
      .collection(
        "tasks"
      )
      .countDocuments({
        status:
          "in-progress",
      });

  const payments =
    await db
      .collection(
        "payments"
      )
      .find()
      .toArray();

  const totalRevenue =
    payments.reduce(
      (
        sum,
        payment
      ) =>
        sum +
        Number(
          payment.amount ||
            0
        ),
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
    message:
      error.message,
  });
}

};

module.exports = {
getClientDashboardStats,
getAdminDashboardStats,
};
