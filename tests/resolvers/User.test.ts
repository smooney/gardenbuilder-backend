import faker from 'faker'
import { Connection } from 'typeorm'
import { callGraphQL, testConnection } from '../testUtils'

let connection: Connection
beforeAll(async () => {
  connection = await testConnection()
})
afterAll(async () => {
  await connection.close()
})

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
        errors {
          message
        }
        token
    }
  }
  `

describe('createUser', () => {
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
    const errorMessage = response?.data?.createUser.errors[0].message
    expect(errorMessage).toMatch(/exists/)
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

describe('authenticateUser', () => {
  const authenticateUserMutation = `
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
        user {
          email
        }
        errors {
          message
        }
        token
    }
  }
  `

  it('returns a jwt token for an authenticated user', async () => {
    // TODO: Create a user with db, not graphql
    await callGraphQL({
      source: createUserMutation,
      variableValues: globalUser,
    })

    // authenticate user in db
    const authenticateUserResponse = await callGraphQL({
      source: authenticateUserMutation,
      variableValues: {
        email: globalUser.email,
        password: globalUser.password,
      },
    })
    expect(
      authenticateUserResponse?.data?.authenticateUser.token.length
    ).toBeGreaterThanOrEqual(100)
  })

  it('returns an error message, no token and no user if user not in database', async () => {
    const authenticateUserResponse = await callGraphQL({
      source: authenticateUserMutation,
      variableValues: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    })
    expect(
      authenticateUserResponse?.data?.authenticateUser.errors
    ).toHaveLength(1)
    expect(authenticateUserResponse?.data?.authenticateUser.user).toBeNull()
    expect(authenticateUserResponse?.data?.authenticateUser.token).toBeNull()
  })
})
