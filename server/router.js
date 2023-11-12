const router = require("express").Router();

const gameSession = require("../controllers/eventController");

// // 获取所有用户
// router.get("/users", getUser);

// // 创建一个新用户
// router.post("/users", createUser);

///store the user info at session storage

// 获取所有游戏数据
router.get("/sessions", gameSession.getGameSession);

// 添加新的游戏数据
router.post("/sessions", gameSession.addGameSession);

module.exports = router;
