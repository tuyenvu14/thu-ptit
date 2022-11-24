import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { identity, pickBy } from 'lodash'
import queryString from 'query-string'
import datetime from '../extensions/datetime'

export const useSearchParams = (search: string) => {
  const [searchParams, setSearchParams] = useState(
    queryString.parse(search, { arrayFormat: 'bracket' })
  )

  useEffect(() => {
    setSearchParams(queryString.parse(search, { arrayFormat: 'bracket' }))
  }, [search])

  return searchParams
}

export const useUpdateSearch = (pathname: string, search: any) => {
  const history = useHistory()
  const handleSearchClick = (value: any) => {
    let params = datetime.formatDate(value)
    // console.log("params.......................",params)
    history.push(
      `${pathname}?${queryString.stringify(pickBy(params, identity), {
        arrayFormat: 'bracket',
        skipEmptyString: true
      })}`
    )
  }

  const handleChangePageSize = (index: number, size: number | undefined) => {
    const searchParams = queryString.parse(search)
    searchParams.pageSize = size?.toString() ?? ''

    searchParams.pageIndex = index?.toString()
    history.push(`${pathname}?${queryString.stringify(searchParams)}`)
  }

  return { handleSearchClick, handleChangePageSize }
}
