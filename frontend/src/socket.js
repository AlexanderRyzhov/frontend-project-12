import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
console.log('create socket');

export default socket;
