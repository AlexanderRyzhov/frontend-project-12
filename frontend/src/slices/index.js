import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    // message – это свойство будет внутри объекта общего состояния: state.message
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
