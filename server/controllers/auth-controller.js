const { decodeToken } = require("../helper/jwt");
const bcrypt = require("bcryptjs");
const {
  addUser,
  validateUser,
  findUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  listAllUsers,
  findUserById,
  fetchIsAdminStatus,
} = require("../handlers/auth-db-handler");
const { findGroupsByEmail } = require("../handlers/group-db-handler");

const registerUser = async (req, res) => {
  let adminStatus = await verifyIfAdmin(req);

  if (adminStatus) {
    let { name, email, password, isAdmin } = req.body;

    let response = await findUserByEmail(email);
    if (response) {
      res.status(403).json(`${email} is already associated with an account`);
    } else {
      bcrypt
        .hash(password, 12)
        .then(async (hashedPw) => {
          const result = await addUser({ name, email, hashedPw, isAdmin });
          if (result.errorCode === 0) {
            res.status(200).json(result.message);
          } else {
            res.status(result.errorCode).json(result.message);
          }
        })
        .catch((err) => {
          res.status(err.errorCode).json(err.message);
        });
    }
  } else {
    res.status(403).json("Only Admin can create a user");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let response = await validateUser(email, password);
  if (response.errorCode === 0) {
    res.status(200).json({ token: response.token });
  } else {
    res.status(response.errorCode).json(response.message);
  }
};

const updateUser = async (req, res) => {
  try {
    let adminStatus = await verifyIfAdmin(req);
    if (adminStatus) {
      let { name, email, password, isAdmin } = req.body;
      let obj = {};
      if (password) {
        password = await bcrypt.hash(password, 12);
        obj = {
          name: name,
          password: password,
          isAdmin: isAdmin,
        };
      } else {
        obj = {
          name: name,
          isAdmin: isAdmin,
        };
      }

      const result = await updateUserByEmail(email, obj);
      if (result.modifiedCount) {
        res.status(200).json("Modified");
      } else {
        res
          .status(500)
          .json(
            "Cannot Modify the User. Please try again with correct details."
          );
      }
    } else {
      res.status(403).json("Only Admin can update a user");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    let adminStatus = await verifyIfAdmin(req);
    if (adminStatus) {
      let { email } = req.body;

      const result = await deleteUserByEmail(email);
      if (result.deletedCount) {
        res.status(200).json("User Deleted");
      } else {
        res
          .status(500)
          .json(
            "Cannot Delete the User. Please try again with correct details."
          );
      }
    } else {
      res.status(403).json("Only Admin can delete a user");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const listUsers = async (req, res) => {
  try {
    const result = await listAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    let decoded = decodeToken(req?.headers?.authorization?.split(" ")[1]);
    const result = await findUserById(decoded.id);
    let groups = await findGroupsByEmail(result.email);
    res.status(200).json({
      name: result.name,
      email: result.email,
      isAdmin: result.isAdmin,
      groups: groups,
    });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const verifyIfAdmin = async (req) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  if (token) {
    let decoded = decodeToken(token);
    return await fetchIsAdminStatus(decoded.id);
  } else {
    return false;
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  listUsers,
  getCurrentUser,
};
