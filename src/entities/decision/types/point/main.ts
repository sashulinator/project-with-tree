import { Id } from '~/utils/core'

export interface Main {
  id: Id
  level: 'main'
  xy: [number, number]
  children?: { id: string }[]
}
