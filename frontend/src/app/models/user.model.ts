export interface User {
  Id: number;
  Email: string;
  Username: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Token: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string
  password: string;
}
