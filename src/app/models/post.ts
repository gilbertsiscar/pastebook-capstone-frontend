import { Image } from './image';
import { User } from './user';

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  likes: any[];
  image: Image;
  url: string;
  datetimeCreated: string;
  updatedAt: string;
  user: User;
}
