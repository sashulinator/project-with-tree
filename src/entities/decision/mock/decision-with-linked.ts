import { Decision } from '../types/decision'
import { decision } from './decision'

export const decisionWithLinked: Decision = {
  id: '777',
  data: [
    {
      type: 'CONDITION',
      id: '111',
      name: 'Lena',
      children: ['222', '333'],
    },
    {
      type: 'CONDITION',
      id: '222',
      name: 'Oleg',
    },
    {
      id: '333',
      linkedId: decision.id,
      overwritten: [
        {
          id: 'id2',
          name: 'Petya Osipov',
        },
      ],
    },
  ],
}
