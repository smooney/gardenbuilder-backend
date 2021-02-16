import { User } from 'src/entities'
import argon2 from 'argon2'
import jwt from './jwt'

export async function getTokenIfPasswordIsValid(
  user: User,
  password: string
): Promise<string | null> {
  const passwordIsValid = await argon2.verify(user?.password, password)
  const token = jwt.assign(user.id.toString())
  return passwordIsValid ? token : null
}
