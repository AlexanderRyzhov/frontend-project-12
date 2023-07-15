/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    // При удалении канала нужно удалить все его сообщения
    builder.addCase(removeChannel, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.channelId !== id);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
