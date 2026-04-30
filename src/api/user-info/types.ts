export type JapaneseLevel = 'newbie' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface UserInfoData {
  id: string;
  /** ISO 8601 string (e.g. "2000-05-15T00:00:00.000Z"). */
  dateOfBirth?: string;
  japaneseLevel: JapaneseLevel;
  interests: string[];
  profileImage?: string;
}

export interface ProfileResult {
  id: string;
  betterAuthId: string;
  username: string;
  email: string;
  phone?: string;
  userInfo: UserInfoData | null;
}

export interface UpsertProfilePayload {
  /** ISO 8601 date or `YYYY-MM-DD`; backend coerces to a Date. */
  dateOfBirth?: string;
  japaneseLevel: JapaneseLevel;
  interests: string[];
  profileImage?: string;
  username?: string;
  phone?: string;
  /** When set, the request is sent as multipart/form-data and the server
   *  saves it as the profile image. */
  imageFile?: File;
}

export interface PatchProfilePayload {
  dateOfBirth?: string;
  japaneseLevel?: JapaneseLevel;
  interests?: string[];
  profileImage?: string;
  username?: string;
  phone?: string;
  imageFile?: File;
}
