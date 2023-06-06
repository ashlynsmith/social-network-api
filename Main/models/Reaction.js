const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

// Reaction Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: dayjs().format("MMM Do, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

module.exports = ("Reaction", reactionSchema);
