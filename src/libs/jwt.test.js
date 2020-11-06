// eslint-disable-next-line @typescript-eslint/no-var-requires
const { assign, getUserId, verify } = require('./jwt')

describe('the assign function', () => {
  const token = assign('666')
  it('returns a string', () => {
    expect(typeof token === 'string')
  })
  it('is 160 characters long', () => {
    expect(token.length === 160)
  })
})

describe('the verify function', () => {
  const token = assign('1')
  it('returns true', () => {
    expect(verify(token)).toBe(true)
  })
})

describe('the getUserId function', () => {
  const token = assign('1')
  it('returns the userId', () => {
    expect(getUserId(token)).toBe(1)
  })
})
