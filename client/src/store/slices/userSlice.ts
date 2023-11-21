import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginPayload } from '../../utils/payloadTypes';

const initialState: { username?: string } = {
  username: undefined,
};

//kinda overkill but could be useful when expanding
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.username = payload.username;
    },

    logout: (state) => {
      state.username = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
