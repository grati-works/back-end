interface ICreateUserTokenDTO {
    user_id: number;
    expires_at: Date;
    token: string;
    type: string;
  }
  
  export { ICreateUserTokenDTO };