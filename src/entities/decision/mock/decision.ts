import { Decision } from '../types/decision'

export const decision: Decision = {
  name: 'editorMock1',
  id: 'id',
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
      id: 'id2',
      computation: 'parallel',
      name: 'Базовые условия',
      x: 550,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id3',
      computation: 'successively',
      name: 'Продуктовые исключения',
      x: 800,
      y: 200,
    },
    {
      type: 'SIFT',
      computation: 'successively',
      id: 'id4',
      name: 'Политика контактов',
      x: 1100,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id5',
      computation: 'successively',
      name: 'Конфликтующие тарифы',
      x: 1200,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id6',
      computation: 'successively',
      name: 'Срок жизни тарифа',
      x: 1850,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id8',
      computation: 'successively',
      name: 'Какой тариф предложить',
      x: 200,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'id8',
      computation: 'successively',
      name: 'Предложить тариф супер',
      x: 450,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'id9',
      computation: 'successively',
      name: 'Предложить тариф мега',
      x: 450,
      y: 700,
    },
    {
      type: 'SIFT',
      id: 'id10',
      computation: 'successively',
      name: 'Предложить тариф максимальный',
      x: 450,
      y: 900,
    },
  ],
}
