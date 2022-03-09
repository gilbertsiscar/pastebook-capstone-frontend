export class User {
    
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public birthday?: string,
    public gender?: string,
    public mobileNumber?: string,
    public isOnline?: false,
    public datetimeCreated?: string,
    public profilePic?: string,
    public aboutMe?: string,
    public profileUrl?: string
  ) {}
}