import { client } from '../../../lib/microcms'
import { Queries, Stores } from '../../../app/search/types'

const buildFilters = (area?: string, categories?: string[]) => {
  const areaFilter = area ? `prefectures[equals]${area}` : ''
  const categoriesFilter = categories?.length ? `categories[contains]${categories.join(',')}` : ''

  if (areaFilter && categoriesFilter) {
    return `${areaFilter}[and]${categoriesFilter}`
  }
  return areaFilter || categoriesFilter || ''
}

const getStores = async ({ q, area, categories }: Queries) => {
  const filters = buildFilters(area, categories)

  try {
    console.log('Fetching stores with filters:', { q, filters })
    const response = await client.getAllContents<Stores>({
      endpoint: 'stores',
      queries: { q, filters }
    })
    console.log('Fetched stores:', response)
    return response
  } catch (error) {
    console.error('Error fetching stores:', error)
    throw error
  }
}

client
      .getAllContents({
        endpoint: 'stores',
      })
      .then((res) => console.log(res));

export default getStores