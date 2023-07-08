import { User } from 'src/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
