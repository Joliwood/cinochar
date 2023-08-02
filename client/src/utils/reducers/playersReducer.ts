import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  pseudo: string;
  points: number;
}

interface PlayersState {
  players: Player[];
}

const initialState: PlayersState = {
  players: [],
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.players = action.payload;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    updatePoints: (state, action: PayloadAction<{ pseudo: string; points: number }>) => {
      const { pseudo, points } = action.payload;
      const playerIndex = state.players.findIndex((player) => player.pseudo === pseudo);
      if (playerIndex !== -1) {
        // eslint-disable-next-line no-param-reassign
        state.players[playerIndex].points = points;
      }
    },
  },
});

export const { addPlayer, updatePoints, setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
