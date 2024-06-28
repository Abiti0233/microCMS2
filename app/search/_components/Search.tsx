import CategoryCheckBox from './CategoryCheckBox'
import KeyWord from './KeyWord'
import PrefectureSelect from './PrefectureSelect'
import React from 'react'
import { Categories, FetchResponse, Prefectures, methodType } from '../types'
import styles from "./Search.module.scss";

const getPrefectures = (endpoint: string, methodType: methodType): Promise<FetchResponse<Prefectures>> =>
  fetch(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`, {
    method: methodType,
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' }
  }).then((result) => result.json());

const getCategories = (endpoint: string, methodType: methodType): Promise<FetchResponse<Categories>> =>
  fetch(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`, {
    method: methodType,
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' }
  }).then((result) => result.json());

const Search = async () => {
  const [{ contents: prefectures }, { contents: categories }] = await Promise.all([getPrefectures('prefectures', 'GET'), getCategories('categories', 'GET')])
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        <h2 className="text-lg font-bold">店舗検索</h2>
        <PrefectureSelect prefectures={prefectures} />
        <KeyWord />
        <CategoryCheckBox categories={categories} />
      </div>
    </section>
  );
}

export default Search
