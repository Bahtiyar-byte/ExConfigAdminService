import { useMemo } from 'react'
import DataItem from '../../dto/data-item'

export const useStatusFilter = (data: DataItem[], selectedStatus: string) => {
  const filteredData = useMemo(
    () =>
      data.filter((dataItem: DataItem) => {
        return selectedStatus === 'All' || dataItem.status === selectedStatus
      }),
    [data, selectedStatus]
  )

  return filteredData
}
