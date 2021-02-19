import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_HASH_KEY || 'test_key'

export function assign(userId: string): string {
  const expiresInSeconds = 86400 // one day
  const token = jwt.sign({ userId }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: expiresInSeconds,
  })
  return token
}

export function verify(token: string): boolean {
  return !!jwt.verify(token, jwtKey)
}

export function getUserId(token: string): number {
    const { userId } = jwt.verify(token, jwtKey) as any
    return parseInt(userId)
}

export default { assign, verify, getUserId }
