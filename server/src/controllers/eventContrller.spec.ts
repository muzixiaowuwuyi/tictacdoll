// Import necessary modules and dependencies
import { Request, Response } from 'express';
import eventController from './eventController';
import Game from '../models/GameSessions';
import mongoose from '../models';
import { mockGames } from '../mocks/mocks';

// Mock the dependencies
jest.mock('../models/GameSessions');

const dbName: string = 'TicTacDollDB';

beforeAll(async () => {
  await mongoose.connect(`mongodb://localhost:27017/${dbName}`)
});

afterAll(async () => {
  await mongoose.connection.close()
});

describe('getGameSession Controller', () => {

  it('should return game sessions and status 200 if successful', async () => {
    
    (Game.find as jest.Mock).mockResolvedValue(mockGames);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await eventController.getGameSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGames);
    return true;
  });

  it('should return status 500 and error message if an error occurs', async () => {
    const errorMessage = 'Internal Server Error';
    (Game.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await eventController.getGameSession(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    return true;
  });
});
