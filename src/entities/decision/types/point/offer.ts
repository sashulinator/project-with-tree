import { Id } from '~/utils/core'

export interface Offer {
  id: Id
  name?: string
  level: 'offer'
  xy: [number, number]
  props?: object
}
