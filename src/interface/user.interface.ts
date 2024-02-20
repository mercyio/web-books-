import { Request } from 'express';
import { User } from 'src/schema/user.schema';

export interface AuthenticatedRequest extends Request {
  user?: User; // User interface defines the structure of your user object
}


