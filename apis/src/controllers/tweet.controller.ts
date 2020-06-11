
import { Request, Response } from 'express';

// DB
import { connect } from '../database';
// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import { Tweet } from '../interfaces/Tweet';
import { Status } from '../interfaces/Status';
import {Profile} from "../interfaces/Profile";
const { validationResult } = require('express-validator');

export async function getAllTweets (request: Request, response: Response): Promise<Response | void> {


  try {

    const profile : Profile|string = request.session?.profile ?? "No user signed in";

    // Open DB connection
    const mysqlConnection = await connect();
    // Query the connection

    const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate FROM tweet');

    // return the response
    const status : Status = { status: 200, message: null, data: rows};
    return response.json(status);
  } catch (error) {
    console.log(error);
  }
}

export async function insertTweet (request: Request, response: Response) {
  try {
    validationResult(request).throw();

    const { tweetContent, tweetDate } = request.body;
    const tweetProfileId = '3e903a1f-fd32-42d0-b97b-e4d4a923b6d5';
    const tweet: Tweet = { tweetId: null, tweetProfileId: tweetProfileId, tweetContent: tweetContent, tweetDate: tweetDate };
    const mysqlConnection = await connect();
    await mysqlConnection.execute('INSERT INTO tweet(tweetId, tweetProfileId, tweetContent, tweetDate) VALUES( UUID_TO_BIN(UUID()), :tweetProfileId, :tweetContent, :tweetDate)', tweet);
    const status : Status = {
      status: 200,
      message: 'Tweet successfully created',
      data: null
    };
    return response.json(status);
  } catch (error) {
    console.log(error);
  }
}
