import { User } from './user';

export class Comment {
  id: string;
  content: string;
  datetimeCreated: string;
  user: User;
}
