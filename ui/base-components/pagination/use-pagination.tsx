import { useMemo } from 'react'

interface PaginationResult {
  totalPages: number
  indexOfLastItem: number
  indexOfFirstItem: number
}

export const usePagination = (totalItems: number, itemsPerPage: number, currentPage: number): PaginationResult => {
  return useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    return { totalPages, indexOfLastItem, indexOfFirstItem }
  }, [totalItems, itemsPerPage, currentPage])
}
