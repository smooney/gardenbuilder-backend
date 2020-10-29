import { MiddlewareFn } from 'type-graphql'
import jwt from 'jsonwebtoken'
import process from 'process'
import { Context } from '../types/Context'

const JWT_HASH_KEY = process.env['JWT_HASH_KEY'] as string

export const isAuthorized: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const token = context.req?.headers?.authorization
  if (!token) {
    throw new Error('No authorization token in header')
  }
  const tokenIsValid = Boolean(jwt.verify(token, JWT_HASH_KEY))
  if (!tokenIsValid) {
    throw new Error('Invalid token')
  }
  return next()
}
