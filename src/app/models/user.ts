export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // password: string; //should be omitted
  birthday: string;
  gender: string;
  mobileNumber: string;
  isOnline: boolean;
  datetimeCreated: string;
  profilePic: string;
  aboutMe: string;
  profileUrl: string;
}
