import { Request } from 'express';
import { User } from './src/models/User';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
