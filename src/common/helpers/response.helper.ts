export class ResponseHelper<T> {
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return {
      message: this.message,
      data: this.data,
    };
  }
}
