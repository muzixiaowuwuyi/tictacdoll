// const User = require("../models/User");
const GameSessions = require("../models/GameSessions");

// async function getUser(req, res) {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (e) {
//     res.status(500).send("Internal Server Error");
//     console.log(e);
//   }
// }

// async function createUser(req, res) {
//   try {
//     const newUser = await User.create(req.body);
//     res.status(201).json(newUser);
//   } catch (e) {
//     res.status(500).send("Internal Server Error");
//     console.log(e);
//   }
// }

async function getGameSession(req, res) {
  try {
    const games = await GameSessions.find();
    res.status(200).json(games);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log(e);
  }
}

async function addGameSession(req, res) {
  try {
    const newGamedata = await GameSessions.create(req.body);
    res.status(201).json(newGamedata);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log(e);
  }
}

module.exports = {
  getGameSession,
  addGameSession
};
