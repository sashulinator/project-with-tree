import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'mockedDecision111111',
  id: 'mockId1',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      type: 'MAIN',
      id: 'main',
      name: 'ВХОД',
      x: 200,
      y: 200,
      props: {
        condition: 'age > 10',
      },
    },
    {
      type: 'SIFT',
      id: 'mockId2',
      computation: 'parallel',
      name: 'Базовые условия',
      x: 550,
      y: 200,
    },
    {
      type: 'SIFT',
      computation: 'successively',
      id: 'mockId4',
      name: 'Политика контактов',
      x: 1100,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId6',
      computation: 'successively',
      name: 'Срок жизни тарифа',
      x: 1850,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId9',
      computation: 'successively',
      name: 'Предложить тариф супер',
      x: 450,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'mockId10',
      computation: 'successively',
      name: 'Предложить тариф мега',
      x: 450,
      y: 700,
    },
    {
      type: 'SIFT',
      id: 'mockId11',
      computation: 'successively',
      name: 'Предложить тариф максимальный',
      x: 450,
      y: 900,
    },
  ],
  rules: [
    {
      id: 'linkMockId3',
      name: 'first',
      value: '',
      sourceId: 'main',
      targetId: 'mockId2',
      i: 0,
    },
  ],
}

export default mock
