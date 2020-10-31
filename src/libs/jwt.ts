import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_HASH_KEY || 'test_key'

export function assign(email: string): string {
  const expiresInSeconds = 86400 // one day
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: expiresInSeconds,
  })
  return token
}
