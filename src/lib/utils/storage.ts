// Client-side localStorage utilities for auth

const AUTH_KEYS = {
  TOKEN: 'token',
  USERNAME: 'username',
  NAME: 'name',
  PICTURE: 'picture',
  USER_BBS: 'user_bbs',
} as const;

export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export function getToken(): string | null {
  return getStorageItem(AUTH_KEYS.TOKEN);
}

export function getUsername(): string | null {
  return getStorageItem(AUTH_KEYS.USERNAME);
}

export function isBabysitter(): boolean {
  return getStorageItem(AUTH_KEYS.USER_BBS) === 'true';
}

export function clearAuth(): void {
  Object.values(AUTH_KEYS).forEach(key => {
    removeStorageItem(key);
  });
}

export function setAuth(data: {
  token: string;
  username: string;
  name: string;
  picture?: string;
  user_bbs: boolean;
}): void {
  setStorageItem(AUTH_KEYS.TOKEN, data.token);
  setStorageItem(AUTH_KEYS.USERNAME, data.username);
  setStorageItem(AUTH_KEYS.NAME, data.name);
  if (data.picture) setStorageItem(AUTH_KEYS.PICTURE, data.picture);
  setStorageItem(AUTH_KEYS.USER_BBS, String(data.user_bbs));
}

export function getAuthData(): {
  token: string | null;
  username: string | null;
  name: string | null;
  picture: string | null;
  user_bbs: boolean;
} {
  return {
    token: getStorageItem(AUTH_KEYS.TOKEN),
    username: getStorageItem(AUTH_KEYS.USERNAME),
    name: getStorageItem(AUTH_KEYS.NAME),
    picture: getStorageItem(AUTH_KEYS.PICTURE),
    user_bbs: getStorageItem(AUTH_KEYS.USER_BBS) === 'true',
  };
}
