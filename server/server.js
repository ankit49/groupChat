const express = require("express");
const cors = require("cors");
const connectDB = require("./helper/connect-db");
const authRoutes = require("./routes/auth-routes");
const groupRoutes = require("./routes/group-routes");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);

app.listen(5000, () => console.log(`Server running on port ${5000}`));

module.exports = app;
