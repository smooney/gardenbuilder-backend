import jwt from 'jsonwebtoken'
import { RequestWithAuthenticationHeader } from '../types/RequestWithAuthenticationHeader'

const JWT_HASH_KEY = process.env.JWT_HASH_KEY as string

export function getUserIdFromRequest(
  req: RequestWithAuthenticationHeader
): number | null {
  const token = req?.headers?.authorization
  const userIdString = getUserIdStringFromToken(token)
  const userIdInt = getUserIdIntFromUserIdString(userIdString)
  console.log('userIdInt', userIdInt)
  return userIdInt

  function getUserIdStringFromToken(token: string | undefined) {
    return token ? (jwt.verify(<string>token, JWT_HASH_KEY) as string) : null
  }

  function getUserIdIntFromUserIdString(
    userIdString: string | null
  ): number | null {
    return userIdString ? parseInt(userIdString) : null
  }
}
