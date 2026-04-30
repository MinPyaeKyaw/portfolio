export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: number;
  message: string;
  data: {
    data: T[];
    meta: {
      page: number;
      size: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

export interface AppUser {
  id: string;
  betterAuthId: string;
  username: string;
  email: string;
  phone?: string;
}
