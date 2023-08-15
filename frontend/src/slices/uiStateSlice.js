/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addChannel, removeChannel } from './channelsSlice';

const initialState = {
  currentChannelId: null,
  myChannelId: null,
  modalInfo: { type: null, channel: null },
};

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    setMyChannelId(state, action) {
      const myChannelId = action.payload;
      state.myChannelId = myChannelId;
    },
    setModalInfo(state, action) {
      const modalInfo = action.payload;
      state.modalInfo = modalInfo;
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
  setModalInfo,
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
