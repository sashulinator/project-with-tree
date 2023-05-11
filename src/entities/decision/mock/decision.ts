import { Decision } from '../types/decision'

export const decision: Decision = {
  id: 'id',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      type: 'CONDITION',
      id: 'id1',
      name: 'Condition',
      x: 0,
      y: 0,
      props: {
        condition: 'age > 10',
      },
      children: ['id2', 'id3'],
      links: [
        {
          id: 'id2',
          type: 'true',
        },
        {
          id: 'id3',
          type: 'false',
        },
      ],
    },
    {
      type: 'VOID',
      id: 'id2',
      name: 'void',
      x: 0,
      y: 300,
    },
    {
      type: 'MAIL',
      id: 'id3',
      name: 'mail_hello',
      x: 0,
      y: 600,
      props: {
        title: 'hello',
        body: 'hello world',
      },
    },
  ],
}
