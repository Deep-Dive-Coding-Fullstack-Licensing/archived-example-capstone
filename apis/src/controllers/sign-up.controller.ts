import { Request, Response } from 'express';

// DB
import { connect } from '../database';
// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import { Profile } from '../interfaces/Profile';
import { Status } from '../interfaces/Status';
import { setActivationToken, setHash } from '../lib/auth.utils';

const { validationResult } = require('express-validator');

export async function signupProfile (request: Request, response: Response) {
  try {
    validationResult(request).throw();

    const { profileAtHandle, profileAvatarUrl, profileEmail, profilePhone, profilePassword } = request.body;

    const mysqlConnection = await connect();

    const profileHash = await setHash(profilePassword);

    const profileActivationToken = setActivationToken();

    const profile : Profile = {
      profileId: null,
      profileActivationToken,
      profileAtHandle,
      profileAvatarUrl,
      profileEmail,
      profileHash,
      profilePhone
    };

    const query : string = 'INSERT INTO profile(profileId, profileActivationToken, profileAtHandle, profileAvatarUrl,  profileEmail, profileHash, profilePhone ) VALUES (UUID_TO_BIN(UUID()) , :profileActivationToken, :profileAtHandle, :profileAvatarUrl, :profileEmail, :profileHash, :profilePhone)';

    await mysqlConnection.execute(query, profile);
    const status: Status = {
      status: 200,
      message: 'Profile Successfully Created',
      data: null
    };

    return response.json(status);
  } catch (error) {
    const status : Status = {
      status: 400,
      message: error.message,
      data: null
    };

    return response.json(status);
  }
}
