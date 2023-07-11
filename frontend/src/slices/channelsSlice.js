/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  ids: [],
  entities: {},
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    setChannels(state, action) {
      const { entities, ids } = action.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addChannel(state, action) {
      const { channel } = action.payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
    removeChannel(state, action) {
      const { channelId } = action.payload;
      delete state.entities[channelId];
      state.ids = state.ids.filter((id) => id !== channelId);
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const {
  setChannels, addChannel, removeChannel, setCurrentChannelId,
} = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;
