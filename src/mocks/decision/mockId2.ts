import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'mockedDecision2222',
  id: 'mockId2',
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
      id: 'mockId3',
      computation: 'successively',
      name: 'Продуктовые исключения',
      x: 800,
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
      id: 'mockId5',
      computation: 'successively',
      name: 'Конфликтующие тарифы',
      x: 1200,
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
      id: 'mockId8',
      computation: 'successively',
      name: 'Какой тариф предложить',
      x: 200,
      y: 500,
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
      id: 'linkMockId1',
      name: 'name000',
      value: '',
      sourceId: 'mockId3',
      targetId: 'mockId4',
    },
    {
      id: 'linkMockId2',
      name: 'name111',
      value: '',
      sourceId: 'mockId4',
      targetId: 'mockId5',
    },
    {
      id: 'linkMockId3',
      name: 'first',
      value: '',
      sourceId: 'main',
      targetId: 'mockId2',
    },
  ],
}

export default mock
