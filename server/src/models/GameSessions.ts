import mongoose from './index';
import { Schema } from 'mongoose';

interface IGame {
  player: string;
  winner: number;
  duration: number;
  createdAt: Date;
}

const gameSchema = new Schema<IGame>({
  player: { type: String, required: true },
  winner: { type: Number, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
