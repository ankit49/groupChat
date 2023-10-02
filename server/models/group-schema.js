const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  messages: [
    {
      sender: {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
      content: String,
      likes: [
        {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = Group = mongoose.model("groupSchema", groupSchema);
