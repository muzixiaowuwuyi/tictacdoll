import { io } from '../index';
import ioClient from 'socket.io-client';
import { Socket } from 'socket.io-client';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3002;
const HOST = process.env.HOST;

console.log(PORT, HOST);

afterAll(() => {
  io.close();
});

describe.only('playerSocket', () => {
  let socket: Socket;

  beforeEach((done) => {
    socket = ioClient(`http://localhost:3002/players`);
    console.log('Client Created');
    done();
  });

  afterEach(() => {
    socket.disconnect();
  });

  it('Should do something', (done) => {
    const testData = { data: 'test' };
    socket.emit('createGame', testData);
    socket.on('connect', () => {
      socket.on('test', (data) => {
        expect(data).toStrictEqual(testData);
        done();
      });
    });
  });
});
