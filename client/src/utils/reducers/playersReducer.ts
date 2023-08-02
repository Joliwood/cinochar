// playersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayersState {
  playerPseudo: string | null;
}

const initialState: PlayersState = {
  playerPseudo: null,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayerPseudo: (state, action: PayloadAction<string | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.playerPseudo = action.payload;
    },
  },
});

export const { setPlayerPseudo } = playersSlice.actions;

export default playersSlice.reducer;
