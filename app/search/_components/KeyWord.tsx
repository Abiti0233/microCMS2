'use client'
import { FormEvent } from 'react'
import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import styles from "./KeyWord.module.scss";

const KeyWord = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)

    const formData = new FormData(e.currentTarget)
    const q = formData.get('q')?.toString()

    if (q) {
      params.set('q', q)
    } else {
      params.delete('q')
    }
    replace(`${pathname}?${params.toString()}` as Route)
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form}`}>
      <label htmlFor="q" className={`${styles.label}`}>
        キーワードから探す
      </label>
      <div className={`${styles.inputContainer}`}>
        <input
          type="text"
          id="q"
          name="q"
          placeholder="店舗名・住所を入力"
          className={`${styles.input} focus:outline-none focus-visible:outline-1`}
          defaultValue={searchParams.get('q')?.toString()}
        />
        <button aria-label="検索する" className={`${styles.button}`}>
          <SearchIcon className={`${styles.searchIcon}`} />
        </button>
      </div>
    </form>
  )
}

export default KeyWord
