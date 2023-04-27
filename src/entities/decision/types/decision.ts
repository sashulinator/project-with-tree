import { Id } from '~/utils/core'

import { LinkedNode } from './linked-node'
import { Node } from './node'

export interface Decision {
  id: Id
  data: (Node | LinkedNode)[]
}
