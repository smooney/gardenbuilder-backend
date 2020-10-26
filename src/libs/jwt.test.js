// eslint-disable-next-line @typescript-eslint/no-var-requires
const { assign } = require('./jwt')

describe('the assign function', () => {
  const token = assign('test@test.com')
  it('returns a string', () => {
    expect(typeof token === 'string')
  })
  it('is 160 characters long', () => {
    expect(token.length === 160)
  })
})
