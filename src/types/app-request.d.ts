import { Request } from 'express';
import { ApiKey } from '#localapp-models';

declare interface PublicRequest extends Request {
    apiKey?: ApiKey;
  }

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}