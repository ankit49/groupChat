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

/**Signup module to create a user  */
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
          const user = await addUser({ name, email, hashedPw, isAdmin });
          res.status(200).json({ token: user.token });
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    }
  } else {
    res.status(403).json("Only Admin can create a user");
  }
};

/* Login module to check if user is allowed to be logged in  */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let response = await validateUser(email, password);
  if (response.errorCode === 0) {
    res.status(200).json({ token: response.token });
  } else {
    res.status(response.errorCode).json(response.message);
  }
};

/* Module to update user details */
const updateUser = async (req, res) => {
  try {
    let adminStatus = await verifyIfAdmin(req);
    if (adminStatus) {
      let { email, updatedFieldName, updatedValue } = req.body;
      if (updatedFieldName === "email") {
        res.status(403).json("Email cannot be changed");
      } else {
        if (updatedFieldName === "password") {
          updatedValue = await bcrypt.hash(updatedValue, 12);
        }

        const result = await updateUserByEmail(
          email,
          updatedFieldName,
          updatedValue
        );
        res.status(200).json({ result });
      }
    } else {
      res.status(403).json("Only Admin can update a user");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

/* Module to delete user */
const deleteUser = async (req, res) => {
  try {
    let adminStatus = await verifyIfAdmin(req);
    if (adminStatus) {
      let { email } = req.body;

      const result = await deleteUserByEmail(email);
      res.status(200).json({ result });
    } else {
      res.status(403).json("Only Admin can delete a user");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

/* Module to fetch all users */
const listUsers = async (req, res) => {
  try {
    const result = await listAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

/* Module to get current logged in user */
const getCurrentUser = async (req, res) => {
  try {
    let decoded = decodeToken(req?.headers?.authorization?.split(" ")[1]);
    const result = await findUserById(decoded.id);
    res.status(200).json(result);
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
