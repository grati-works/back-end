interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  activated?: boolean;
}

export { ICreateUserDTO };
