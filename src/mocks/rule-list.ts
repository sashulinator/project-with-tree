import { Rule } from '~/entities/rule'

export const ruleList: Rule[] = [
  {
    id: 'id1',
    name: 'name000',
    type: 'string',
    value: '',
    sourceId: 'id2',
    targetId: 'id4',
  },
  {
    id: 'id2',
    name: 'name111',
    type: 'string',
    value: '',
    sourceId: 'id3',
    targetId: 'id4',
  },
  {
    id: 'main',
    name: 'first',
    type: 'string',
    value: '',
    sourceId: 'main',
    targetId: 'id2',
  },
]
