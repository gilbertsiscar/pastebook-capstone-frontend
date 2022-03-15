import { Deserialize } from '../utils/Deserialize';

export class Login implements Deserialize<Login> {
  email?: string;
  password?: string;
  mobileNumber?: string;

  constructor(private method: string) {}

  deserialize(input: Partial<Login>): this {
    Object.assign(this, input);
    return this;
  }
}
