// TODO: Add the missing fields to the DataItem interface also update the fields to match with backend api.
interface DataItem {
  id?: string
  experimentName: string
  systemId: string
  description: string
  status: string
  variances: variance[]
  owner: string
  createdAt: string
  lastModifiedBy: string
  lastModifiedAt: string
  tagName: string
  systemName: string
  startDatetime: string
  endDatetime: string
}

interface variance {
  keyName: string
  description: string
  splitAllocation: number
  status: string
}

export default DataItem
