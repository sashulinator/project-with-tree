import { Id } from '~/utils/core'

export type Events = {
  selected: { value: Id[] }
  name: { value: string }
}
