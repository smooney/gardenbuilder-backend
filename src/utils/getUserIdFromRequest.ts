import { RequestWithAuthenticationHeader } from '../types/RequestWithAuthenticationHeader'
import jwt from './jwt'

export function getUserIdFromRequest(
  req: RequestWithAuthenticationHeader
): number | null {
  const token = req?.headers?.authorization?.split(' ')[1]
  if (token) {
    return jwt.getUserId(token)
  }
  return null
}
