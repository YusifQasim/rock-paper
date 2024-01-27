// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import scissors  from "../assets/images/icon-scissors.svg";


import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";

import {
  setScore,
  setResultPage,
  determineWinner,
  handleChoice
} from "../redux/GameSlice";


function UserPage() {
  const dispatch = useDispatch();
  const { score} = useSelector(
    (state: RootState) => state.game
  );
  const winner = useSelector(determineWinner);

  const handleChoiceClick = (choice: string) => {
    dispatch(handleChoice(choice));
    dispatch(setResultPage(true));
    if (winner === 'player') {
      dispatch(setScore(score + 1));
    } else if (winner === 'computer') {
      dispatch(setScore(score - 1));
    }
  };
  return (
    <div
              onClick={() => handleChoiceClick("scissors")}
            >
              <div className="flex items-center">
                <img src={scissors} alt=""  className="h-16 w-16" />
              </div>
            </div>
  );
}

export default UserPage;
