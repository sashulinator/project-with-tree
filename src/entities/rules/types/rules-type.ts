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

export interface RulesRes {
  id: string
  rev: string
  name: string
  keyName: string
  value: string
  frontValue: string
  editor: string
  level: string
  createDttm: string
  updateDttm: string
  createdBy: string | null
  updatedBy: string | null
}

export interface RulesListResponse {
  id: string
  name: string
  version: string
  status: string
  data: RulesRes[]
}
