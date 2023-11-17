import mongoose from 'mongoose';

const dbName: String = "TicTacDollDB";

mongoose.connect(
  `mongodb://localhost:27017/${dbName}`
);

export default mongoose;
