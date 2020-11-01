import jwt from 'jsonwebtoken'
import { RequestWithAuthenticationHeader } from '../types/RequestWithAuthenticationHeader'

const JWT_HASH_KEY = process.env.JWT_HASH_KEY as string

export function getUserIdFromRequest(
  req: RequestWithAuthenticationHeader
): string | null {
  const token = req?.headers?.authorization
  return token ? (jwt.verify(<string>token, JWT_HASH_KEY) as string) : null
}
