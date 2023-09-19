import { Id } from '~/utils/core'

export type RuleContainer = {
  id: Id
}

export type RuleItem = {
  id: Id
  containerId: Id
  content: string
}
