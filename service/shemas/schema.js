const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    createdAt: {
      type: Number,
      default: Date.now(),
    },
    text: {
      type: String,
      minlength: 1,
      maxlength: 300,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: false }
);
const Todo = model("todo_list", schema);
module.exports = Todo;
