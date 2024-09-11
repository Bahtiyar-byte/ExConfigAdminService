import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataItem from '../../dto/data-item'

interface ColumnConfig {
  header: string
  dataField: string
  render?: (dataItem: DataItem) => React.ReactNode
}

interface DataTableProps {
  data: DataItem[]
  columns: ColumnConfig[]
  tableName: string
  canUserEdit?: boolean
  canUserArchive?: boolean
  canUserDelete?: boolean
  editLink?: string
  archiveLink?: string
  onSortChange?: (orderBy: string, orderDirection: 'asc' | 'desc') => void
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  tableName,
  canUserEdit,
  canUserArchive,
  canUserDelete,
  editLink,
  archiveLink,
  onSortChange
}) => {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSortChange = (dataField: string) => {
    const newSortDirection = sortField === dataField && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(dataField)
    setSortDirection(newSortDirection)
    if (onSortChange) {
      onSortChange(dataField, newSortDirection)
    }
  }

  const isDeletable = (dataItem: DataItem) => {
    return dataItem.status.toLowerCase() === 'not started yet' || dataItem.status.toLowerCase() === 'draft'
  }

  const isArchivable = (dataItem: DataItem) => {
    return dataItem.status.toLowerCase() === 'inactive' || dataItem.status.toLowerCase() === 'draft'
  }

  const isEditable = (dataItem: DataItem) => {
    return dataItem.status.toLowerCase() === 'active' || dataItem.status.toLowerCase() === 'not started yet' || dataItem.status.toLowerCase() === 'draft'
  }

  return (
    <div className="data-table sticky-two-column">
      <table id={tableName} className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.dataField}
                className="sort-header"
                aria-sort={
                  sortField === column.dataField ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'
                }
                onClick={() => handleSortChange(column.dataField)}
              >
                <a>{column.header}</a>
              </th>
            ))}
            {(canUserEdit || canUserArchive || canUserDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((dataItem: DataItem) => (
              <tr key={dataItem.id}>
                {columns.map(column => {
                  const value = dataItem[column.dataField as keyof DataItem]
                  if (value instanceof Array) {
                    return null
                  }

                  if (column.dataField == 'experimentName') {
                    return (
                      <th key={column.dataField} data-title={column.header}>
                        {value}
                      </th>
                    )
                  }
                  return (
                    <td key={column.dataField} data-title={column.header}>
                      {column.render
                        ? column.render(dataItem)
                        : column.dataField === 'startDatetime' || column.dataField === 'endDatetime'
                          ? value && new Date(value).toLocaleDateString()
                          : value}
                    </td>
                  )
                })}
                {(canUserEdit || canUserArchive || canUserDelete) && (
                  <th className="col--edit-control">
                    {canUserDelete && (
                      <div>
                        {isDeletable(dataItem) ? (
                          <Link to={archiveLink || ''}>
                            <span className="geico-icon geico-icon--small geico-icon--actionable icon-trash"></span>
                          </Link>
                        ) : (
                          <span className="geico-icon geico-icon--small icon-trash-disabled"></span>
                        )}
                      </div>
                    )}
                    <div>
                      {canUserEdit && isEditable(dataItem) && (
                        <Link to={editLink || '#'} state={dataItem}>
                          <span className="geico-icon geico-icon--small geico-icon--actionable icon-edit"></span>
                        </Link>
                      )}
                      {canUserArchive && isArchivable(dataItem) && (
                        <Link to={archiveLink || ''}>
                          <span className="geico-icon geico-icon--small geico-icon--actionable icon-resource-center"></span>
                        </Link>
                      )}
                    </div>
                  </th>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (canUserEdit || canUserArchive || canUserDelete ? 1 : 0)}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
