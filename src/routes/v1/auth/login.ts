import express, { Response } from 'express';
import schema from './schema.js';
import { AuthFailureError, BadRequestError, SuccessResponse } from '#localapp-core';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { PublicRequest } from '#localapp/types';
import { KeyStoreRepo, UserRepo } from '#localapp-models/repository';
import { asyncHandler, validator } from '#localapp-utils';


const router = express.Router();

router.post(
  '/basic',
  validator(schema.credential),
  asyncHandler(async (req: PublicRequest, res: Response) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    

    await KeyStoreRepo.create(user, accessTokenKey, refreshTokenKey);
    //const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    //const userData = await getUserData(user);

    new SuccessResponse('Login Success', {
      user: "userData",
      tokens: "tokens",
    }).send(res);
  }),
);

export default router;