export interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ListQuery {
  page?: number;
  size?: number;
  level?: string;
  keyword?: string;
}
