const mongoose = require("mongoose");
const Group = require("../models/group-schema");

const addGroup = async (group) => {
  try {
    const newGroup = new Group(group);

    let result = await newGroup.save();
    if (result._id) {
      return { errorCode: 0, message: "Group Created", id: result._id };
    } else {
      return { errorCode: result.errorCode, message: result.message };
    }
  } catch (error) {
    return {
      errorCode: 500,
      message: `Server Error ${error}`,
    };
  }
};

const updateGroupById = async (obj) => {
  return await Group.updateOne(
    { _id: new mongoose.Types.ObjectId(obj.id) },
    { $set: obj }
  );
};

const addGroupMessageById = async (obj) => {
  return await Group.updateOne(
    { _id: new mongoose.Types.ObjectId(obj.id) },
    { $push: { messages: obj.message } }
  );
};

const findGroupsByEmail = async (email) => {
  return await Group.find({ "users.email": email });
};

const deleteGroupById = async (id) => {
  return await Group.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const addLikeByMessageId = async ({ id, like }) => {
  return await Group.updateOne(
    { "messages._id": new mongoose.Types.ObjectId(id) },
    { $push: { "messages.$.likes": like } }
  );
};

const removeLikeByMessageId = async ({ id, like }) => {
  return await Group.updateOne(
    { "messages._id": new mongoose.Types.ObjectId(id) },
    { $pull: { "messages.$.likes": like } }
  );
};

module.exports = {
  addGroup,
  updateGroupById,
  findGroupsByEmail,
  deleteGroupById,
  addGroupMessageById,
  addLikeByMessageId,
  removeLikeByMessageId,
};
