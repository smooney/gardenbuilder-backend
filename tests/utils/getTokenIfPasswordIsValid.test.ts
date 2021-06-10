import argon2 from 'argon2'
import jwt from '../../src/utils/jwt'
import { User } from '../../src/entities'
import { getTokenIfPasswordIsValid } from '../../src/utils'

describe('getTokenIfPasswordIsValid', () => {
  let password: string
  let user: User

  beforeAll(async () => {
    password = 'abc123'
    user = <User>{
      password: await argon2.hash(password),
      id: 1,
    }
  })

  it('returns a string if password in token matches user password', async () => {
    const result = await getTokenIfPasswordIsValid(user, password)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('string')
  })

  it('returns null if password in token does not match user password', async () => {
    const result = await getTokenIfPasswordIsValid(user, 'wrongPassword')
    expect(result).toBe(null)
  })

  it('calls expected methods', async () => {
    const argon2Spy = jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => Promise.resolve(true))
    const jwtSpy = jest.spyOn(jwt, 'assign').mockImplementation(() => 'aString')

    await getTokenIfPasswordIsValid(user, password)
    expect(argon2Spy).toHaveBeenCalled()
    expect(jwtSpy).toHaveBeenCalled()

    argon2Spy.mockReset()
    jwtSpy.mockReset()
  })
})
