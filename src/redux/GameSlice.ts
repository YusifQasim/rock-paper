// slices/gameSlice.ts
import { createSlice, PayloadAction,createSelector } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface GameState {
  score: number;
  playerChoice: string;
  computerChoice: string;
  resultPage: boolean;
}

const initialState: GameState = {
  score: 0,
  playerChoice: "",
  computerChoice: "",
  resultPage: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setPlayerChoice: (state, action: PayloadAction<string>) => {
      state.playerChoice = action.payload;
    },
    setComputerChoice: (state, action: PayloadAction<string>) => {
      state.computerChoice = action.payload;
    },
    setResultPage: (state, action: PayloadAction<boolean>) => {
      state.resultPage = action.payload;
    },
    resetGame: (state) => {
      state.playerChoice = "";
      state.computerChoice = "";
      state.resultPage = false;
    },
    handleChoice: (state, action: PayloadAction<string>) => {
      const options = ['rock', 'paper', 'scissors'];
      const computerChoice = options[Math.floor(Math.random() * 3)];

      state.computerChoice = computerChoice;
      state.playerChoice = action.payload;

    },
  },
});

export const {
  setScore,
  setPlayerChoice,
  setComputerChoice,
  setResultPage,
  resetGame,
  handleChoice,
} = gameSlice.actions;
export default gameSlice.reducer;
export const selectPlayerChoice = (state: RootState) => state.game.playerChoice;
export const selectComputerChoice = (state: RootState) => state.game.computerChoice;

export const determineWinner = createSelector(
  [selectPlayerChoice, selectComputerChoice],
  (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return 'draw';
    if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'player';
    } else {
      return 'computer';
    }
  }
);