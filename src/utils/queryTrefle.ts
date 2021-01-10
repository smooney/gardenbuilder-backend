import axios from 'axios'
import env from 'dotenv'
import { Variety } from '../types'
import { getConnection, InsertResult } from 'typeorm'
import { PlantVariety } from '../entities/PlantVariety'
env.config()

const { TREFLE_ACCESS_TOKEN } = process.env

export async function getPlantTypes() {
  try {
    const result = await axios.get(
      `https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=${TREFLE_ACCESS_TOKEN}`
    )
    const plants = result.data.data.map(
      ({ id, common_name }: { id: number; common_name: string }) => ({
        id,
        common_name,
      })
    )
    return plants
  } catch (err) {
    console.log(err)
  }
}

export async function getVarieties(species: string) {
  try {
    const result = await axios.get(
      `https://trefle.io/api/v1/species/search?q=${species}&filter_not[common_name]=null&token=${TREFLE_ACCESS_TOKEN}`
    )
    const varieties = result.data.data.map(
      (item: any): Variety => {
        return {
          id: item.id,
          commonName: item.common_name,
          slug: item.slug,
          scientificName: item.scientific_name,
          imageUrl: item.image_url,
          genus: item.genus,
          family: item.family,
        }
      }
    )
    return varieties
  } catch (err) {
    console.log(err)
  }
}

export async function insertVarietiesIntoDatabase(
  varieties: Variety[]
): Promise<InsertResult | undefined> {
  try {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(PlantVariety)
      .values(varieties)
      .execute()
  } catch (err) {
    console.error(err)
  }
  return undefined
}
