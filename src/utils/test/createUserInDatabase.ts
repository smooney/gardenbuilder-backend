import faker from 'faker'
import { User } from '../../entities/User'

export async function createUserInDatabase(): Promise<User> {
  const user = User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })
  await user.save()
  return user
}
