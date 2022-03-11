declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    rawBody: Buffer;
  }
  export interface IncomingMessage {
    rawBody: Buffer;
  }
}
