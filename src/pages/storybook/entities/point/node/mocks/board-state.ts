import { Decision, EditorState } from '~/entities/decision'

import { point } from './node-state'

export const decision: Decision = {
  id: 'id',
  version: '2.0',
  status: 'DRAFT',
  data: [point],
}

export const boardState = new EditorState({ translate: { x: 0, y: 0 }, scale: 1 })
