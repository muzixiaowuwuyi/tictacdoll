import { useSelector } from "react-redux";

const CheckWinner = () => {
  const pieces = useSelector(state => state.chess.pieces);
  const cells = useSelector(state => state.chess.cells);

  ////TODO: the rule of win

  console.log(cells);
  ////TODO: lose win or draw
  return <></>;
};

export default CheckWinner;
