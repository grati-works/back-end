interface ICreateUserTokenDTO {
    user_id: number;
    expires_at: Date;
    token: string;
  }
  
  export { ICreateUserTokenDTO };