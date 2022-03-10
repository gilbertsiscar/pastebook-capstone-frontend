// export class Post {
//   constructor(
//     public title: string,
//     public body: string,
//     public userId: string,
//     public createdAt: string = new Date().toString(),
//     public id?: string
//   ) {}
// }

export class Post {
  id?: string;
  userId?: string;
  title?: string;
  body?: string;
  img?: string;
  url?: string;
  createdAt?: string = new Date().toString();
  updatedAt?: string = new Date().toString();

  deserialize(input: Post): this {
    Object.assign(this, input);
    return this;
  }
}
