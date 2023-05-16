import { Decision } from '../types/decision'

export const decision: Decision = {
  id: 'id',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      type: 'MAIN',
      id: 'main',
      name: 'MAIN',
      x: 0,
      y: 0,
      props: {
        condition: 'age > 10',
      },
      children: ['id2', 'id3'],
      links: [
        {
          id: 'id2',
          value: 'test',
          name: 'rule1',
          type: 'true',
        },
        {
          id: 'id3',
          value: 'test',
          name: 'rule2',
          type: 'false',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id2',
      name: 'void',
      x: 0,
      y: 300,
    },
    {
      type: 'MAIN',
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
