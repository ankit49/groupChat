const mongoose = require("mongoose");
const { addAdminUser } = require("../controllers/auth-controller");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/groupChat");
    console.log("Db connected");
    addAdminUser();
  } catch (error) {
    console.log(`DB Error occured:  ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
