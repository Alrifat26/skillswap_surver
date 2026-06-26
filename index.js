require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://skillswap-client-eosin.vercel.app",
  "https://skillswap-client-ten.vercel.app",
  "https://skillswap-client.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
   
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📂 ROUTES
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

// 🗄️ DATABASE CONNECTION
connectDB();

app.get("/", (req, res) => {
  res.send("SkillSwap Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});