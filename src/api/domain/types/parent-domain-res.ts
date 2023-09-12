import { Attribute } from '~/entities/attribute'
import { Domain } from '~/entities/domain'

export interface ParentDomainRes {
  domain: Domain
  attributes: Attribute[]
  childDomains: ParentDomainRes[]
}
