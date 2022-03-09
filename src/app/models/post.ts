export class Post {
  constructor(
    public title: string,
    public body: string,
    public userId: string,
    public createdAt: string = new Date().toString(),
    public id?: string
  ) {}
}
