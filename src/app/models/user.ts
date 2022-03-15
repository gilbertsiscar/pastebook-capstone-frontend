export class User {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    //public password?: string, //should be omitted
    public birthday?: string,
    public gender?: string,
    public mobileNumber?: string,
    public isOnline?: boolean,
    public datetimeCreated?: string,
    public profilePic?: string,
    public aboutMe?: string,
    public profileUrl?: string
  ) {}
}
