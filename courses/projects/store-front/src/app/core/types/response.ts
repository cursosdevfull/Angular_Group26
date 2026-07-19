export type RESPONSE = {
  status: 'SUCCESS' | 'ERROR';
  code: number;
  message?: string;
  data?: any;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
};
