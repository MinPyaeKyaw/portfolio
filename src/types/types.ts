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
  email: string;
  better_auth_user_id?: string;
  status: 'active' | 'blocked';
  role_id?: string;
  role?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}
