import { param } from 'express-validator';

// src/server.ts:6:10 - error TS2305: Module '"./validation/validator_params"' has no exported member 'validateName'.

export const validateName = [
    param('name')
      .notEmpty()
      .withMessage('Name parameter is required.')
      .escape()
    ];

export const validateID = [
    param('id')
        .notEmpty()
        .withMessage('Please specify an ID')
    ];

export const validateDuration = [
    param('duration')
        .notEmpty()
        .withMessage('Please specify a duration')
        .escape()
    ];

