import { createAuthorizationHeaderString } from '../../src/utils'

it('adds "Bearer" to the beginning of a string', () => {
    expect(createAuthorizationHeaderString('Dogger')).toBe('Bearer Dogger')
})