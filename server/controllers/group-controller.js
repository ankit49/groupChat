const {
  addGroup,
  deleteGroupById,
  updateGroupById,
  addGroupMessageById,
  addLikeByMessageId,
  removeLikeByMessageId,
} = require("../handlers/group-db-handler");

const createGroup = async (req, res) => {
  try {
    let result = await addGroup(req.body);
    if (result.errorCode === 0) {
      res.status(200).json({ id: result.id, message: result.message });
    } else {
      res.status(500).json("Server Error");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateGroupData = async (req, res) => {
  try {
    let result = await updateGroupById(req.body);
    if (result.modifiedCount) {
      res.status(200).json("Group Modified");
    } else {
      res
        .status(500)
        .json(
          "Cannot Modify the Group. Please try again with correct details."
        );
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteGroup = async (req, res) => {
  try {
    let result = await deleteGroupById(req.body.id);
    if (result.deletedCount) {
      res.status(200).json("Group Deleted");
    } else {
      res
        .status(500)
        .json(
          "Cannot Delete the Group. Please try again with correct details."
        );
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateGroupMessage = async (req, res) => {
  try {
    let { messageData } = req.body;
    let result = await addGroupMessageById(messageData);
    if (result.modifiedCount) {
      res.status(200).json("Message Added");
    } else {
      res.status(500).json("Cannot Add the Group. Please try again later.");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addLike = async (req, res) => {
  try {
    let result = await addLikeByMessageId(req.body);
    if (result.modifiedCount) {
      res.status(200).json("Like Added");
    } else {
      res.status(500).json("Like not Added");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeLike = async (req, res) => {
  try {
    let result = await removeLikeByMessageId(req.body);
    if (result.modifiedCount) {
      res.status(200).json("Like Removed");
    } else {
      res.status(500).json("Like not Removed");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createGroup,
  updateGroupData,
  deleteGroup,
  updateGroupMessage,
  addLike,
  removeLike,
};
