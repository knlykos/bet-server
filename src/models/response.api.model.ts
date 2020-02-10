export interface ResponseApi<T> {
  data: T;
  statusCode: number;
  message: string;
  error?: string;
}
