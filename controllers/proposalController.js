const { getDB } = require("../config/db");

const getProposals = async (req, res) => {
try {
const db = getDB();


const proposals = await db
  .collection("proposals")
  .find()
  .toArray();

res.status(200).json(proposals);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const createProposal = async (req, res) => {
try {
const db = getDB();


const proposal = {
  ...req.body,
  status: "pending",
  createdAt: new Date(),
};

const result = await db
  .collection("proposals")
  .insertOne(proposal);

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

const updateProposalStatus = async (
req,
res
) => {
try {
const db = getDB();


const { ObjectId } = require("mongodb");

const result = await db
  .collection("proposals")
  .updateOne(
    {
      _id: new ObjectId(
        req.params.id
      ),
    },
    {
      $set: {
        status:
          req.body.status,
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
message: error.message,
});
}
};

const getTaskProposals = async (
req,
res
) => {
try {
const db = getDB();

const proposals = await db
  .collection("proposals")
  .find({
    taskId: req.params.taskId,
  })
  .toArray();

res.json(proposals);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const getFreelancerProposals =
async (req, res) => {
try {
const db = getDB();


  const {
    freelancerEmail,
  } = req.query;

  const proposals =
    await db
      .collection(
        "proposals"
      )
      .find({
        freelancerEmail,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

  res.json(proposals);
} catch (error) {
  res.status(500).json({
    success: false,
    message:
      error.message,
  });
}


};

module.exports = {
getProposals,
createProposal,
updateProposalStatus,
getTaskProposals,
getFreelancerProposals,
};
