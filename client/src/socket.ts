import { io } from 'socket.io-client';
import Cookie from 'js-cookie';

const URL = 'http://localhost:3002/players';

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: Cookie.get('accessToken'),
  },
});
