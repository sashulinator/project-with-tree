import { Id } from '~/utils/core'

import { Decision as EntityDecision } from '../../..'

export type Decision = Omit<
  EntityDecision,
  'id' | 'createDttm' | 'updateDttm' | 'updatedBy' | 'createdBy' | 'keyName' | 'rev'
> & {
  id?: Id
  createDttm?: string
  updateDttm?: string
  updatedBy?: string
  createdBy?: string
  keyName?: string
  rev?: string
}
