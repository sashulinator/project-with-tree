import { Decision } from '../types/decision'

export const decision: Decision = {
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
      name: 'Базовые условия',
      x: 550,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id3',
      name: 'Продуктовые исключения',
      x: 800,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id4',
      name: 'Политика контактов',
      x: 1100,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id5',
      name: 'Конфликтующие тарифы',
      x: 1200,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id6',
      name: 'Срок жизни тарифа',
      x: 1850,
      y: 200,
    },
    {
      type: 'SIFT',
      id: 'id8',
      name: 'Какой тариф предложить',
      x: 200,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'id8',
      name: 'Предложить тариф супер',
      x: 450,
      y: 500,
    },
    {
      type: 'SIFT',
      id: 'id9',
      name: 'Предложить тариф мега',
      x: 450,
      y: 700,
    },
    {
      type: 'SIFT',
      id: 'id10',
      name: 'Предложить тариф максимальный',
      x: 450,
      y: 900,
    },
  ],
}
