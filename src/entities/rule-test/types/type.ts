import { Id } from '~/utils/core'

export type RuleContainer = {
  id: Id
}

export type RuleItem = {
  id: Id
  containerId: Id
  value: string
  condition: SelectValue
}

export enum SelectValue {
  and = 'and',
  or = 'or',
  not = 'not',
  xor = 'xor',
}

export type EditorItem = {
  id: string
  value: string
  condition: SelectValue
}

export type EditorValues = {
  id: string
  valueArr: EditorItem[]
  condition: SelectValue
}

export interface MentionsItem {
  display: string
  id: string
}
