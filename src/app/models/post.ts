export class Post {
  constructor(
    public title: string,
    public body: string,
    public createdAt: Date = new Date(),
    public userId: string,
    public id?: string
  ) {}
}
