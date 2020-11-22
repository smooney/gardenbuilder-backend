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

const createSectionMutation = `
mutation CreateSection($bedId: Int!, $xPosition: Int!, $yPosition: Int!, $plantType: String) {
    createSection(bedId: $bedId, xPosition: $xPosition, yPosition: $yPosition, plantType: $plantType) {
      section {
        id
        xPosition
        yPosition
        plantType
        bedId
      }
      errors {
        message
      }
    }
  }
`

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

describe('the createSection mutation', () => {
  let response: any
  let sectionValues: any

  beforeAll(async () => {
    sectionValues = {
      bedId: section.bedId,
      xPosition: section.xPosition + 1,
      yPosition: section.yPosition,
      plantType: 'Parsnip',
    }
    response = await callGraphQL({
      source: createSectionMutation,
      variableValues: sectionValues,
      authorizationHeader: token,
    })
  })

  it('inserts a section into the database', async () => {
    const id = response?.data?.createSection.section.id
    const section = await Section.findOne({ id })
    expect(section).toBeTruthy()
  })

  it('returns expected values for the newly-created section', async () => {
    expect(response).toMatchObject({
      data: {
        createSection: {
          section: sectionValues,
        },
      },
    })
  })
})
