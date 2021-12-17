export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string
  password: string;
}
