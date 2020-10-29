import jwt from 'jsonwebtoken'
import { RequestWithAuthenticationHeader } from '../types/RequestWithAuthenticationHeader'

const JWT_HASH_KEY = process.env.JWT_HASH_KEY as string

export function getUserIdFromRequest(
  req: RequestWithAuthenticationHeader
  // eslint-disable-next-line @typescript-eslint/ban-types
): string | object {
  const token = req?.headers?.authorization
  return jwt.verify(token, JWT_HASH_KEY)
}
