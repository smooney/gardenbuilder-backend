import faker from 'faker'
import { Connection } from 'typeorm'
import jwt from '../../src/utils/jwt'
import {
  callGraphQL,
  createBed,
  createGarden,
  createSectionInDatabase,
  createUser,
  testConnection,
} from '../testUtils'
import { Bed, Garden, Section, User } from '../../src/entities'

let connection: Connection
let owner: User
let garden: Garden
let bed: Bed
let section: Section
let token: string

beforeAll(async () => {
  connection = await testConnection()
  owner = createUser()
  garden = createGarden(owner)
  bed = createBed(garden)
  section = await createSectionInDatabase(bed, 1, 1, 'Tangelo')
  token = jwt.assign(section.bedId.toString())
})

afterAll(async () => {
  connection.close()
})

const sectionQuery = `
query Section($id: Int!) {
    section(id: $id) {
      section {
        id
        xPosition
        yPosition
        plantType
      }
      errors {
        message
      }
    }
  }
  `

const sectionsQuery = `
query Sections($bedId: Int!) {
  sections(bedId: $bedId) {
    sections {
      id
      xPosition
      yPosition
      plantType
    }
    errors {
      message
    }
  }
}
`

// const createBedMutation = `
// mutation CreateBed($gardenId: Int!, $name: String) {
//     createBed(gardenId: $gardenId, name: $name) {
//       bed {
//         name
//       }
//       errors {
//         message
//       }
//     }
//   }
//   `

describe('the section query', () => {
  it('returns a section associated with a given id', async () => {
    const response = await callGraphQL({
      source: sectionQuery,
      variableValues: { id: section.id },
      authorizationHeader: token,
    })

    const selectedSection = response?.data?.section.section

    expect(parseInt(selectedSection.id)).toBe(section.id)
    expect(parseInt(selectedSection.xPosition)).toBe(section.xPosition)
    expect(parseInt(selectedSection.yPosition)).toBe(section.yPosition)
    expect(selectedSection.plantType).toBe(section.plantType)
  })

  it('returns no sections if called with a nonexistent id', async () => {
    const FAKE_ID = 666
    const response = await callGraphQL({
      source: sectionQuery,
      variableValues: { id: FAKE_ID },
      authorizationHeader: token,
    })
    expect(response?.data?.section.section).toBeNull()
  })
})

describe('the sections query', () => {
  it('returns a list of sections', async () => {
    const response = await callGraphQL({
      source: sectionsQuery,
      variableValues: { bedId: section.bed.id },
      authorizationHeader: token,
    })
    const returnedSection = response?.data?.sections.sections[0]
    expect(parseInt(returnedSection.id)).toEqual(section.id)
    expect(parseInt(returnedSection.xPosition)).toEqual(section.xPosition)
    expect(parseInt(returnedSection.yPosition)).toEqual(section.yPosition)
    expect(returnedSection.plantType).toBe(section.plantType)
  })
})

// describe('the createBed mutation', () => {
//   let name: string
//   let gardenId: number
//   let response: any

//   beforeAll(async () => {
//     name = faker.commerce.productName()
//     gardenId = bed.gardenId

//     response = await callGraphQL({
//       source: createBedMutation,
//       variableValues: { gardenId, name },
//       authorizationHeader: token,
//     })
//   })

//   it('inserts a bed into the database', async () => {
//     const bed = await Bed.findOne({ where: { name } })
//     expect(bed).toBeTruthy()
//   })

//   it('returns its name after creation if one is passed', async () => {
//     expect(response).toMatchObject({
//       data: {
//         createBed: {
//           bed: {
//             name,
//           },
//         },
//       },
//     })
//   })
// })
