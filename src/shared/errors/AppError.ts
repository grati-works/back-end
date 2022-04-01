export class AppError {
  public readonly message: string;

  public readonly status: number;

  public readonly code: string;

  constructor(message: string, status = 400, code = undefined) {
    this.message = message;
    this.status = status;
    this.code = code;
  }
}
