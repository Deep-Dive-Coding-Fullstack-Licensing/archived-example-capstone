import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator');

export const asyncValidator = (validations : any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation : any) => validation.run(request)));

    const errors = validationResult(request);

    if (errors.isEmpty()) {
      return next();
    }
    response.json({ status: 418, data: null, message: errors.array()[0].msg });
  };
};
