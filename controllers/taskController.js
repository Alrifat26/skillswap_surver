const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getTasks = async (req, res) => {
try {
const db = getDB();


const page = parseInt(
  req.query.page
) || 1;

const limit = parseInt(
  req.query.limit
) || 9;

const search =
  req.query.search || "";

const category =
  req.query.category || "";

const skip =
  (page - 1) * limit;

const query = {};

if (search) {
  query.title = {
    $regex: search,
    $options: "i",
  };
}

if (
  category &&
  category !== "all"
) {
  query.category = category;
}

const total =
  await db
    .collection("tasks")
    .countDocuments(query);

const tasks = await db
  .collection("tasks")
  .find(query)
  .sort({
    createdAt: -1,
  })
  .skip(skip)
  .limit(limit)
  .toArray();

res.json({
  tasks,
  total,
  currentPage: page,
  totalPages: Math.ceil(
    total / limit
  ),
});


} catch (error) {
res.status(500).json({
success: false,
message:
error.message,
});
}
};

const createTask = async (
req,
res
) => {
try {
const db = getDB();


const task = {
  ...req.body,
  createdAt:
    new Date(),
};

const result =
  await db
    .collection("tasks")
    .insertOne(task);

res.status(201).json({
  success: true,
  insertedId:
    result.insertedId,
});


} catch (error) {
res.status(500).json({
success: false,
message:
error.message,
});
}
};

const deleteTask =
async (req, res) => {
try {
const db = getDB();


  const result =
    await db
      .collection(
        "tasks"
      )
      .deleteOne({
        _id: new ObjectId(
          req.params.id
        ),
      });

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
getTasks,
createTask,
deleteTask,
};
