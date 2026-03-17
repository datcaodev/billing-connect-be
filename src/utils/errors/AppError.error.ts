export class AppError extends Error {
    public readonly code: number;
    public readonly error_code?: string;
    public readonly headerStatusCode: number;   
  
    constructor(params: {message: string, code: number, headerStatusCode?: number, error_code?: string}) {
      const { message, code, error_code, headerStatusCode } = params
      super(message);
      this.name = new.target.name;
      this.code = code;
      this.headerStatusCode = headerStatusCode;
      this.error_code = error_code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }