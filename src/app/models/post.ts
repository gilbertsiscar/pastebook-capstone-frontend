import { Deserialize } from '../utils/Deserialize';

export class Post implements Deserialize<Post> {
  id?: string;
  userId?: string;
  title?: string;
  body?: string;
  img?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;

  deserialize(input: Partial<Post>): this {
    Object.assign(this, input);
    return this;
  }
}
