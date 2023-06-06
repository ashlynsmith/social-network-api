const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");
const dayjs = require("dayjs");

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlenght: 1,
    },
    createdAt: {
      type: String,
      default: dayjs().format("MMM Do, YYYY [at] hh:mm a"),
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
