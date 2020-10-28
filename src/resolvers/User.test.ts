import { Connection } from 'typeorm'
import { callGraphQL } from '../test-utils/callGraphQL'
import { testConnection } from '../test-utils/createTestConnection'
import faker from 'faker'

let connection: Connection
beforeAll(async () => {
  connection = await testConnection()
})
afterAll(async () => {
  await connection.close()
})

describe('createUser', () => {
  const globalUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
  const createUserMutation = `
  mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String! ) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
        user {
          email
        }
        error {
          message
        }
        token
    }
  }
  `

  it('returns its email address after creation', async () => {
    const response = await callGraphQL({
      source: createUserMutation,
      variableValues: globalUser,
    })
    expect(response).toMatchObject({
      data: {
        createUser: {
          user: {
            email: globalUser.email,
          },
        },
      },
    })
  })

  it('returns an error message if the user already exists', async () => {
    const response = await callGraphQL({
      source: createUserMutation,
      variableValues: globalUser,
    })
    expect(response?.data?.createUser.error.message).toMatch(/exists/)
  })

  it('returns a jwt token', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }
    const response = await callGraphQL({
      source: createUserMutation,
      variableValues: user,
    })
    expect(response?.data?.createUser.token.length).toBeGreaterThanOrEqual(100)
  })
})
