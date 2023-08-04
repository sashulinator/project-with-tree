export interface DomainsResponse {
  id: string
  name: string
  version: string
  status: string
  data: DomainItemProps[]
}

export interface DomainItemProps {
  id: number
  domainName: string
  domainNodeType: string
  parentId: null | number
  childDomain: null | DomainItemProps[]
  attributes: AttributeProps[]
}

export interface AttributeProps {
  id: number
  name: string
  nodeType: string
  value: string | number | boolean
  type: 'boolean' | 'string' | 'number' | 'date'
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}
