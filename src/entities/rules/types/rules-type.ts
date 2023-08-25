export interface DomainListResponse {
  id: string
  name: string
  version: string
  status: string
  data: DomainRes[]
}

export interface DomainRes {
  id: string
  name: string
  keyName: string
  description: string
  type: string
  parentId: string
  sourceSystemId: string
  createdBy: string
  updatedBy: string
  attributes: AttributeRes[]
}

export interface AttributeRes {
  id: string
  rev: string
  description: string
  domainId: string
  valueType: string
  createDttm: string
  updateDttm: string
  createdBy: string
  updatedBy: string
  keyName: string
  name: string
}
