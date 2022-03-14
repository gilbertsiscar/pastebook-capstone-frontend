import { User } from './user';

export class Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  likes: any[];
  img: string;
  url: string;
  datetimeCreated: string;
  updatedAt: string;
  user: User;
}
