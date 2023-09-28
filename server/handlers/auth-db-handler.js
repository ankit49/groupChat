const User = require("../models/user-schema");
const { generateToken } = require("../helper/jwt");
const bcrypt = require("bcryptjs");

const addUser = async ({ name, email, hashedPw, isAdmin }) => {
  try {
    const user = new User({
      name: name,
      email: email,
      password: hashedPw,
      isAdmin: isAdmin,
    });

    user.save();

    return {
      errorCode: 0,
      token: generateToken({ id: user.id, email: user.email }),
      message: "User Registered",
    };
  } catch (error) {
    return {
      errorCode: 500,
      message: `Server Error ${error}`,
    };
  }
};

const validateUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (user) {
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        return {
          errorCode: 403,
          message: "Invalid Password",
        };
      } else {
        return {
          errorCode: 0,
          token: generateToken({ id: user.id, email: user.email }),
        };
      }
    } else {
      return {
        errorCode: 404,
        message: "User does not exist!",
      };
    }
  } catch (error) {
    return {
      errorCode: 500,
      message: `Server Error ${error}`,
    };
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const updateUserByEmail = async (email, name, value) => {
  return await User.updateOne({ email: email }, { $set: { [name]: value } });
};

const deleteUserByEmail = async (email, name, value) => {
  return await User.deleteOne({ email: email });
};

const listAllUsers = async (email, name, value) => {
  return await User.find().select("-password");
};

const fetchIsAdminStatus = async (id) => {
  const result = await findUserById(id);
  return result.isAdmin;
};

module.exports = {
  addUser,
  validateUser,
  findUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  listAllUsers,
  findUserById,
  fetchIsAdminStatus,
};
