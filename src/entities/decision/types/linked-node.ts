import { Id } from '~/utils/core'

import { Node } from './node'

export interface LinkedNode {
  id: Id
  linkedId: Id
  overwritten?: (Node | Partial<LinkedNode>)[]
}
