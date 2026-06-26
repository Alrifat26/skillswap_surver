const { getDB } = require("../config/db");

const getFreelancerStats = async (
  req,
  res
) => {
  try {
    const db = getDB();

    const totalProposals =
      await db
        .collection("proposals")
        .countDocuments();

    const acceptedProjects =
      await db
        .collection("proposals")
        .countDocuments({
          status: "accepted",
        });

    const completedProjects =
      await db
        .collection("tasks")
        .countDocuments({
          status: "completed",
        });

    const accepted = await db
      .collection("proposals")
      .find({
        status: "accepted",
      })
      .toArray();

    const earnings =
      accepted.reduce(
        (sum, item) =>
          sum +
          Number(
            item.bidAmount || 0
          ),
        0
      );

    res.json({
      totalProposals,
      acceptedProjects,
      completedProjects,
      earnings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFreelancerStats,
};