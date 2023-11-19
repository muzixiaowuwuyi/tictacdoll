import { useAppSelector } from "../store/hooks";

const CheckWinner = () => {
  const pieces = useAppSelector(state => state.game.pieces);
  const cells = useAppSelector(state => state.game.cells);

  ////TODO: the rule of win

  console.log(cells);
  console.log(pieces)
  ////TODO: lose win or draw;
};

export default CheckWinner;
