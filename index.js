require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());



const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const freelancerDashboardRoutes = require("./routes/freelancerDashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminTaskRoutes = require("./routes/adminTaskRoutes");
const adminPaymentRoutes = require("./routes/adminPaymentRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");




app.use("/api/freelancers", freelancerRoutes);


app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", adminPaymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminTaskRoutes);


app.use("/api/users", userRoutes);
app.use("/api/dashboard", freelancerDashboardRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use("/api/tasks", taskRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/payments", paymentRoutes);


connectDB();

app.get("/", (req, res) => {
  res.send("SkillSwap Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});