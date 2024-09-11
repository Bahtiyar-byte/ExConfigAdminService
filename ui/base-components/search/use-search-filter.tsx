import { useMemo } from 'react'
import DataItem from '../../dto/data-item'

export const useSearchFilter = (data: DataItem[], searchTerm: string) => {
  const filteredData = useMemo(
    () =>
      data.filter((dataItem: DataItem) =>
        Object.values(dataItem).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [data, searchTerm]
  )

  return filteredData
}
