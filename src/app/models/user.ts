export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobileNumber: string,
    public password: string,
    public birthday: string,
    public gender: string,
    public createdAt: string
  ) {}
}
