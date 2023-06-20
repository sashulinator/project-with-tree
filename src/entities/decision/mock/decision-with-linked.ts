import { Decision } from '../types/decision'

export const decisionWithLinked: Decision = {
  version: '2.0',
  status: 'DRAFT',
  id: '777',
  data: [
    {
      type: 'CONDITION',
      id: '111',
      name: 'Lena',
      x: 0,
      y: 0,
    },
    {
      type: 'CONDITION',
      id: '222',
      name: 'Oleg',
      x: 300,
      y: 0,
    },
  ],
}
