/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addChannel, removeChannel } from './channelsSlice';

const initialState = {
  defaultChannelId: null,
  currentChannelId: null,
  myChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setDefaultChannelId(state, action) {
      const defaultChannelId = action.payload;
      state.defaultChannelId = defaultChannelId;
    },
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    setMyChannelId(state, action) {
      const myChannelId = action.payload;
      state.myChannelId = myChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannel, (state, action) => {
        const channel = action.payload;
        if (channel.id === state.myChannelId) {
          state.currentChannelId = channel.id;
        }
      })
      .addCase(removeChannel, (state, action) => {
        const id = action.payload;
        if (state.currentChannelId === id) {
          state.currentChannelId = null;
        }
      });
  },
});

export const {
  setCurrentChannelId,
  setMyChannelId,
  setDefaultChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
