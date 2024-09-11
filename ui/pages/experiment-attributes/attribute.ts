export interface mapAttributeBase {
  id: number
  name: string
  description: string
}

export interface mapTextAttribute extends mapAttributeBase {
  type: 'text'
  attributeValue: string
}

export interface mapSelectAttribute extends mapAttributeBase {
  type: 'select'
  attributeValues: { key: string; value: string }[]
}

export interface mapRadioAttribute extends mapAttributeBase {
  type: 'radio'
  attributeValues: { key: string; value: string }[]
}

export interface mapIntAttribute extends mapAttributeBase {
  type: 'int'
  attributeValues: number[]
}

export interface mapDateAttribute extends mapAttributeBase {
  type: 'date'
  attributeValues: { key: string; value: string }[]
}
