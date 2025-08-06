import { User } from "domain/src/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};