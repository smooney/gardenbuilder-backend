import { RequestWithAuthenticationHeader } from '../types/RequestWithAuthenticationHeader'
import jwt from '../libs/jwt'

export function getUserIdFromRequest(
  req: RequestWithAuthenticationHeader
): number | null {
  const token = req?.headers?.authorization
  if (token) {
    const userId = jwt.getUserId(token)
    return userId
  }
  return null
}
