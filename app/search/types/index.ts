import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

export type Prefectures = {
  name: string
  code: number
  lat: number
  lng: number
} & MicroCMSContentId

export type Categories = {
  title: string
} & MicroCMSContentId

export type Stores = {
  name: string
  tel: string
  prefecture: Prefectures
  address: string
  lat: number
  lng: number
  categories: Categories[]
}

export type Queries = {
  q?: string
  area?: string
  categories?: string[]
  currentLat?: string
  currentLng?: string
}

export type FetchResponse<T> = {
  contents: T[]
}

export type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
