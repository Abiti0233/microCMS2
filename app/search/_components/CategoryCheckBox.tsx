'use client'
import { useCallback } from 'react'
import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Categories } from '../../../app/search/types'
import React from 'react'
import styles from './CategoryCheckBox.module.scss'

const CategoryCheckBox = ({ categories }: { categories: Categories[] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      const value = e.target.value

      const selectedCategories = new Set(params.get('categories')?.split(',') || [])

      if (selectedCategories.has(value)) {
        selectedCategories.delete(value)
      } else {
        selectedCategories.add(value)
      }

      if (selectedCategories.size === 0) {
        params.delete('categories')
      } else {
        params.set('categories', Array.from(selectedCategories).join(','))
      }

      replace(`${pathname}?${params.toString()}` as Route)
    },
    [searchParams, pathname, replace]
  )

  return (
    <fieldset className={`${styles.fieldset}`}>
      <div className={`${styles.container}`}>
        <legend className={`${styles.legend}`}>カテゴリーで絞り込む</legend>
        <div className={`${styles.checkboxContainer}`}>
          {categories.map((category) => (
            <div key={category.id} className={`${styles.checkbox}`}>
              <input
                type="checkbox"
                value={category.id}
                className={`${styles.inputCheckbox} peer`}
                id={category.id}
                onChange={handleCheck}
                defaultChecked={searchParams.get('categories')?.split(',').includes(category.id)}
              />
              <div className={`${styles.label}`}>
                <label htmlFor={category.id}>{category.title}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  )
}

export default CategoryCheckBox
