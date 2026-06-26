const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getAllTasks = async (req, res) => {
try {
const db = getDB();

const tasks = await db
  .collection("tasks")
  .find()
  .sort({ createdAt: -1 })
  .toArray();

res.json(tasks);


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

const deleteTask = async (req, res) => {
try {
const db = getDB();


const result = await db
  .collection("tasks")
  .deleteOne({
    _id: new ObjectId(req.params.id),
  });

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

module.exports = {
getAllTasks,
deleteTask,
};
