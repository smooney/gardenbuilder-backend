export function createAuthorizationHeaderString(token: string): string {
  return `Bearer ${token}`
}
