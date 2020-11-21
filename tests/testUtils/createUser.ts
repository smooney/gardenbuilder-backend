import faker from 'faker'
import { User } from '../../src/entities'

export function createUser(): User {
  const user = User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })
  return user
}
