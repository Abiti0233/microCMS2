import React, { Suspense } from 'react'
import Spinner from '../_components/Spinner'
import Results from './_components/Results'
import Search from './_components/Search'
import styles from "./page.module.scss";

type Props = {
  q?: string
  area?: string
  categories?: string[]
  currentLat?: string
  currentLng?: string
}
const TOKYO_STATION_LOCATION = { lat: 35.68123620000001, lng: 139.7671256 }
const Page = ({ searchParams = {} }: { searchParams?: Props }) => {
  const {
    q = '',
    area = '',
    categories = [],
    currentLat = TOKYO_STATION_LOCATION.lat.toString(),
    currentLng = TOKYO_STATION_LOCATION.lng.toString()
  } = searchParams
  return (
    <div className={styles.flex}>
      <div className={styles.twentyfive}>
        <Suspense fallback={<Spinner />}>
          <Search />
        </Suspense>
      </div>
      <div className={styles.seventyfive}>
        <Suspense key={area + q + categories} fallback={<Spinner />}>
          <Results
            q={q}
            area={area}
            categories={Array.isArray(categories) ? categories : [categories]}
            currentLat={currentLat}
            currentLng={currentLng}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Page
