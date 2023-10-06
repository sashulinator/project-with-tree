import { Domain } from '~/entities/domain/types/domain'
import { Id } from '~/utils/core'

export type RuleContainer = {
  id: Id
  condition: SelectValue
}

export type RuleItem = {
  id: Id
  containerId: Id
  value: string
  condition: SelectValue
}

export type DomainItem = {
  id: Id
  domain: Domain
}

export enum SelectValue {
  and = 'and',
  or = 'or',
  not = 'not',
  xor = 'xor',
}

export type EditorItem = {
  id: Id
  value: string
  condition: SelectValue
}

export type EditorValues = {
  id: Id
  valueArr: EditorItem[]
  condition: SelectValue
}

export interface MentionsItem {
  display: string
  id: string
}

export interface DomainListResponse {
  id: Id
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
  frontValue: EditorValues[]
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
