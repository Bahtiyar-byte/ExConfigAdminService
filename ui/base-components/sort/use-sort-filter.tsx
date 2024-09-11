import { useState, useEffect } from 'react'
import DataItem from '../../dto/data-item'

export const useSortedFilter = (data: DataItem[], sortConfig: { orderBy: string; orderDirection: 'asc' | 'desc' }) => {
  const [sortedData, setSortedData] = useState<DataItem[]>([])

  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const [month, day, year] = parts.map(part => parseInt(part, 10))
      return new Date(year, month - 1, day).getTime()
    }
    return -1 // Return -1 if the date format is incorrect
  }

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      let keyA = a[sortConfig.orderBy as keyof DataItem]
      let keyB = b[sortConfig.orderBy as keyof DataItem]

      const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/

      // Check if the key is a date and parse it if true
      if (typeof keyA === 'string' && dateRegex.test(keyA)) {
        keyA = parseDate(keyA).toString()
      }
      if (typeof keyB === 'string' && dateRegex.test(keyB)) {
        keyB = parseDate(keyB).toString()
      }

      const sortDirectionMultiplier = sortConfig.orderDirection === 'asc' ? 1 : -1
      if (!keyA || !keyB) {
        return sortDirectionMultiplier
      }

      return (keyA < keyB ? -1 : keyA > keyB || keyB ? 1 : 0) * sortDirectionMultiplier
    })
    setSortedData(sorted)
  }, [data, sortConfig])

  return sortedData
}
