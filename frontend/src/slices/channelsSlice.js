/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = {
  ...channelsAdapter.getInitialState(),
  currentChannelId: null,
  myChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannel(state, action) {
      channelsAdapter.addOne(state, action);
      const channel = action.payload;
      if (channel.id === state.myChannelId) {
        state.currentChannelId = channel.id;
      }
    },
    removeChannel(state, action) {
      channelsAdapter.removeOne(state, action);
      const id = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = null;
      }
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    setMyChannelId(state, action) {
      const myChannelId = action.payload;
      state.myChannelId = myChannelId;
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
  setMyChannelId,
} = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
