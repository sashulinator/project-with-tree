import { Decision } from '../types/decision'
import { layout1 } from './decision'

export const layoutWithLinked: Decision = {
  id: '777',
  data: [
    {
      id: '111',
      name: 'Lena',
      children: ['222', '333'],
    },
    {
      id: '222',
      name: 'Oleg',
    },
    {
      id: '333',
      linkedId: layout1.id,
      overwritten: [
        {
          id: 'id2',
          name: 'Petya Osipov',
        },
      ],
    },
  ],
}
