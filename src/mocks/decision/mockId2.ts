import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'mts-alpha',
  id: 'mockId2',
  version: '4.0',
  status: 'DRAFT',
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
      type: 'SIFT',
      id: 'mockId2',
      computation: 'parallel',
      name: 'Базовые условия',
      x: 1500,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId3',
      computation: 'successively',
      name: 'Продуктовые исключения',
      x: 1500,
      y: 200,
    },
    {
      type: 'SIFT',
      computation: 'successively',
      id: 'mockId4',
      name: 'Политика контактов',
      x: 2000,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId5',
      computation: 'successively',
      name: 'Конфликтующие тарифы',
      x: 2000,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId6',
      computation: 'successively',
      name: 'Срок жизни тарифа',
      x: 2500,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'mockId8',
      computation: 'successively',
      name: 'Какой тариф предложить',
      x: 500,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'mockId9',
      computation: 'successively',
      name: 'Предложить тариф супер',
      x: 1000,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'mockId10',
      computation: 'successively',
      name: 'Предложить тариф мега',
      x: 1000,
      y: 700,
    },
    {
      type: 'SIFT',
      id: 'mockId11',
      computation: 'successively',
      name: 'Предложить тариф максимальный',
      x: 1000,
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
      i: 0,
    },
    {
      id: 'linkMockId2',
      name: 'name111',
      value: '',
      sourceId: 'mockId3',
      targetId: 'mockId4',
      i: 1,
    },
    {
      id: 'linkMockId3',
      name: 'name111',
      value: '',
      sourceId: 'mockId4',
      targetId: 'mockId5',
      i: 0,
    },
    {
      id: 'linkMockId4',
      name: 'first',
      value: '',
      sourceId: 'main',
      targetId: 'mockId2',
      i: 0,
    },
  ],
}

export default mock
