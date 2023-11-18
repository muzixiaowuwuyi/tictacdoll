import { useAppSelector } from "../store/hooks";

const CheckWinner = () => {
  const pieces = useAppSelector(state => state.chess.chessPieces);
  const cells = useAppSelector(state => state.chess.cells);

  ////TODO: the rule of win

  console.log(cells);
  console.log(pieces)
  ////TODO: lose win or draw;
};

export default CheckWinner;
