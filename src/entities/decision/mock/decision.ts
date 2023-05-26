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
      x: 200,
      y: 200,
      props: {
        condition: 'age > 10',
      },
      children: ['id2', 'id3'],
      rules: [
        {
          id: 'ruleId1',
          pointId: 'id2',
          value: 'test',
          name: 'rule1',
          type: 'true',
        },
        {
          id: 'ruleId2',
          pointId: 'id3',
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
      x: 200,
      y: 400,
    },
    {
      type: 'MAIN',
      id: 'id3',
      name: 'mail_hello',
      x: 200,
      y: 600,
      props: {
        title: 'hello',
        body: 'hello world',
      },
    },
    {
      type: 'MAIN',
      id: 'id4',
      name: 'alone',
      x: 200,
      y: 800,
      props: {
        title: 'alone',
        body: 'alone',
      },
    },
  ],
}
