const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const t = value.trim();
  return t.length > 0 && EMAIL_RE.test(t);
}

export function passwordsMatch(a: string, b: string): boolean {
  return a === b;
}

export const PASSWORD_MIN_LENGTH = 8;

export function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH;
}
