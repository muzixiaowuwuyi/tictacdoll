const mongoose = require("./index");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  player: String,
  winner: Number,
  duration: Number, // in seconds
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
