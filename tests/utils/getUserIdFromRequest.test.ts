import { getUserIdFromRequest } from '../../src/utils'
import { RequestWithAuthenticationHeader } from '../../src/types'
import { assign } from '../../src/utils'

const userId = '1'
const token = assign(userId)

const request: RequestWithAuthenticationHeader = {
  headers: {
    authorization: `Bearer: ${token}`,
  },
  document: {
    kind: 'Document',
    definitions: [],
  },
  variables: {},
}

it('returns user id from auth header if header in correct format', () => {
  expect(getUserIdFromRequest(request)).toBe(parseInt(userId))
})

it('returns null if authorization header is missing', () => {
  request.headers.authorization = undefined
  expect(getUserIdFromRequest(request)).toBe(null)
})
