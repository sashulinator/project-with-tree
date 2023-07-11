export interface RulesResponse {
  id: string
  name: string
  version: string
  status: string
  data: RulesItem[]
}

export interface RulesItem {
  id: number
  domainName: string
  domainNodeType: string
  parentDomain: null | RulesItem
  childDomain: null | RulesItem
  attributes: Attribute[]
}

export interface Attribute {
  id: number
  name: string
  nodeType: string
  value: string | number | boolean
  type: 'boolean' | 'string' | 'number' | 'date'
}
