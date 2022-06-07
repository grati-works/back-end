interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  activated?: boolean;
  profile_picture_public_id?: string;
}

export { ICreateUserDTO };
