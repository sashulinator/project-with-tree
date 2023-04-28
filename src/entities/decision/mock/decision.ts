import { Decision } from '../types/decision'

export const decision: Decision = {
  id: 'id',
  data: [
    {
      type: 'CONDITION',
      id: 'id1',
      name: 'Condition',
      props: {
        condition: 'age > 10',
      },
      children: ['id2', 'id3'],
      links: {
        true: 'id2',
        false: 'id3',
      },
    },
    {
      type: 'VOID',
      id: 'id2',
      name: 'void',
    },
    {
      type: 'MAIL',
      id: 'id3',
      name: 'mail_hello',
      props: {
        title: 'hello',
        body: 'hello world',
      },
    },
  ],
}