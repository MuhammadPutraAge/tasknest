export interface Meta {
  message: string;
  code: number;
  success: boolean;
}

export interface Response<T, R> {
  meta: Meta;
  data?: T;
  error?: R;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
