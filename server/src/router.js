const router = require("express").Router();

const gameSession = require("./controllers/eventController");

router.get("/sessions", gameSession.getGameSession);

// 添加新的游戏数据
router.post("/sessions", gameSession.addGameSession);

module.exports = router;
