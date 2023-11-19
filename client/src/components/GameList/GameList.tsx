import { useEffect, useState } from "react";
import { fetchGamedata } from "../../services/apiService";
import "./GameList.css";
import { GameSession } from "../../utils/types";

export default function GameList() {
  const [gameData, setGameData] = useState<GameSession[]>([]);

  useEffect(() => {
    const getGameData = async () => {
      try {
        const data = await fetchGamedata();
        // 确保data是一个数组并且包含所需的数据字段
        if (Array.isArray(data) && data.length) {
          // 使用slice(0, 10)确保只获取前10条数据
          const sortedData = [...data]
            .sort((a, b) => a.duration - b.duration)
            .slice(0, 10);
          setGameData(sortedData);
        }
      } catch (error) {
        console.error("Failed to fetch game data:", error);
      }
    };

    getGameData();
  }, []);

  return (
    <table className="game-list">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>State</th>
          <th>Duration</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {gameData.map((game, index) => (
          <tr key={game._id}>
            <td>{index + 1}</td>
            <td>{game.player}</td>
            <td>{game.winner === 1 ? "Win" : "Lose"}</td>
            <td>{game.duration} s</td>
            <td>{new Date(game.createdAt).toLocaleDateString("en-US")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
