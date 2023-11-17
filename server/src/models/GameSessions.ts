import mongoose from './index';

const gameSchema = new mongoose.Schema({
  player: { type: String, required: true },
  winner: { type: Number, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
