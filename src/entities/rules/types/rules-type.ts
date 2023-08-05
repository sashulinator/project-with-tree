export interface Domain {
  id: string
  name: string
  version: string
  status: string
  data: ChildDomain[]
}

export interface ChildDomain {
  id: number
  domainName: string
  domainNodeType: string
  parentId: null | number
  childDomain: null | ChildDomain[]
  attributes: Attribute[]
}

export interface Attribute {
  id: number
  name: string
  nodeType: string
  value: string | number | boolean
  type: 'boolean' | 'string' | 'number' | 'date'
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}
