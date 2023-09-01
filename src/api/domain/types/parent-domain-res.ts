import { AttributeRes } from './attribute'
import { DomainRes } from './domain'

export interface ParentDomainRes {
  domain: DomainRes
  attributes: AttributeRes[]
  childDomains: ParentDomainRes[]
}
