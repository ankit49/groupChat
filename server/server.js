const express = require("express");
const connectDB = require("./helper/connect-db");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log(`Server running on port ${5000}`));
