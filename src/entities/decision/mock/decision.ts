import { Decision } from '../types/decision'

export const layout1: Decision = {
  id: 'id',
  data: [
    {
      id: 'id1',
      name: 'Vasya',
      children: ['id2', 'id3'],
    },
    {
      id: 'id2',
      name: 'Petya',
    },
    {
      id: 'id3',
      name: 'Olya',
    },
  ],
}
