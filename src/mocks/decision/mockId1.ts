import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'megafon',
  id: 'mockId1',
  version: '2.0',
  status: 'PUBLISHED',
  data: [
    {
      type: 'MAIN',
      id: 'main',
      name: 'ВХОД',
      x: 500,
      y: 200,
      props: {
        condition: 'age > 10',
      },
    },
    {
      type: 'FILTER',
      id: 'mockId2',
      computation: 'parallel',
      name: 'Базовые условия',
      x: 1000,
      y: 200,
    },
    {
      type: 'FILTER',
      computation: 'successively',
      id: 'mockId4',
      name: 'Политика контактов',
      x: 1500,
      y: 200,
    },
    {
      type: 'FILTER',
      id: 'mockId6',
      computation: 'successively',
      name: 'Срок жизни тарифа',
      x: 2000,
      y: 200,
    },
    {
      type: 'FILTER',
      id: 'mockId9',
      computation: 'successively',
      name: 'Предложить тариф супер',
      x: 500,
      y: 500,
    },
    {
      type: 'FILTER',
      id: 'mockId10',
      computation: 'successively',
      name: 'Предложить тариф мега',
      x: 500,
      y: 700,
    },
    {
      type: 'FILTER',
      id: 'mockId11',
      computation: 'successively',
      name: 'Предложить тариф максимальный',
      x: 500,
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
