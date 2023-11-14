// const User = require("../models/User");
const GameSessions = require("../models/GameSessions");

async function getGameSession(req, res) {
  try {
    const games = await GameSessions.find();
    res.status(200).json(games);
  } catch (e) {
    res.status(500).send({ message: "Internal Server Erro" });
    console.log(e);
  }
}

async function addGameSession(req, res) {
  try {
    const newGamedata = await GameSessions.create(req.body);
    res.status(201).json(newGamedata);
  } catch (e) {
    res.status(500).send({ message: "Internal Server Erro" });
    console.log(e);
  }
}

module.exports = {
  getGameSession,
  addGameSession,
};
