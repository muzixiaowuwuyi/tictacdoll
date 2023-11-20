import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const private_key = 'TEMP_PRIVATE_KEY';

async function registerUser(req: Request, res: Response) {
  try {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.status(409).send(new Error('Username already exists'));
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      passwordHash
    })

    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, private_key);

    res.cookie('accessToken', token);
    res.status(201).send();

  } catch (error) {
    console.log(error)
    res.status(500).send(new Error('Internal Server Error'))
  }
}

async function login(req: Request, res: Response) {
  try {
    const {username, password} = req.body;

  } catch (error) {
    console.log(error)
    res.status(500).send(new Error('Internal Server Error'))
  }
}
 
export default {registerUser}