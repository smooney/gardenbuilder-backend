import jwt from 'jsonwebtoken'

export function assign(email: string): string {
  const jwtKey = process.env.JWT_HASH_KEY || 'test_key'
  const expiresInSeconds = 86400 // one day
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: expiresInSeconds,
  })
  return token
}
