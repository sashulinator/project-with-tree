import { Id } from '~/utils/core'

export type Column = {
  id: Id
  title: string
}

export type Task = {
  id: Id
  columnId: Id
  content: string
}
