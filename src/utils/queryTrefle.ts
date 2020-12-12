import axios from 'axios'
import env from 'dotenv'
env.config()

const { TREFLE_ACCESS_TOKEN } = process.env

export async function getPlantTypes() {
  try {
    // const result = await axios.get(
    //   `https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=${TREFLE_ACCESS_TOKEN}`
    // )
    // const plants = result.data.data.map(
    //   ({ id, common_name }: { id: number; common_name: string }) => ({
    //     id,
    //     common_name,
    //   })
    // )
    // return plants
    return {}
  } catch (err) {
    console.log(err)
  }
}

getPlantTypes()
