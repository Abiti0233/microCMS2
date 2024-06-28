// import Spinner from '@/app/_components/Spinner'
import getStores from '../_api/getStores'
import Map from './Map'
import styles from './Result.module.scss'
type Props = {
  q?: string
  area?: string
  categories?: string[]
  currentLat?: string
  currentLng?: string
}
const Results = async ({ q, area, categories, currentLat, currentLng }: Props) => {
  const stores = await getStores({ q, area, categories })

  const markerPositions = stores?.map((store) => {
    return { lat: store.lat, lng: store.lng }
  })

  const center = { lat: Number(currentLat), lng: Number(currentLng) }
  return (
    <div className={`${styles.container}`}>
      <section className={`${styles.resultsSection}`}>
        <div className={`${styles.gridContainer}`}>
          <h2 className={`${styles.resultTitle}`}>検索結果</h2>
          {stores.length === 0 ? (
            <p className="">検索結果がありません</p>
          ) : (
            <ul className="grid gap-3">
              {stores.map((store) => (
                <li key={store.id} className={`${styles.storeListItem}`}>
                  <p className={`${styles.storeName}`}>{store.name}</p>
                  <p className={`${styles.storeAddress}`}>{store.address}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <div className={`${styles.mapContainer}`}>
        <Map positions={markerPositions} center={center} />
      </div>
    </div>
  )
}

export default Results
