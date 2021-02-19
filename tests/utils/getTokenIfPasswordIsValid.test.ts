import argon2 from 'argon2'
import { User } from '../../src/entities'
import { getTokenIfPasswordIsValid } from '../../src/utils'

describe('getTokenIfPasswordIsValid', () => {
  it('returns a boolean', async () => {
    const password = 'abc123'
    const user = <User>{
      password: await argon2.hash(password),
      id: 1,
    }
    const result = await getTokenIfPasswordIsValid(user, password)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('string')
  })
})
