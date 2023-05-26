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
      children: ['id2'],
      rules: [
        {
          id: 'ruleId1',
          pointId: 'id2',
          value: 'test',
          name: 'вход',
          type: 'true',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id2',
      name: 'Базовые условия',
      x: 450,
      y: 200,
      children: ['id3'],
      rules: [
        {
          id: 'ruleId2',
          pointId: 'id3',
          value: 'test',
          name: 'B2C_сегмент, физ_лицо, не_ЕКГ',
          type: 'false',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id3',
      name: 'Продуктовые исключения',
      x: 700,
      y: 200,
      rules: [
        {
          id: 'id1',
          pointId: 'id4',
          value: 'test',
          name: 'не_безлимитный_интернет, не_безлимитные_минуты',
          type: 'false',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id4',
      name: 'Политика контактов',
      x: 950,
      y: 200,
      rules: [
        {
          id: 'id1',
          value: 'test',
          name: 'отказ_от_предложенией, недавно_звонили',
          type: 'false',
          pointId: 'id5',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id5',
      name: 'Конфликтующие тарифы',
      x: 1200,
      y: 200,
      rules: [
        {
          id: 'id1',
          value: 'test',
          name: 'установлен_супер_тариф, установлен_мега_тариф',
          type: 'false',
          pointId: 'id6',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id6',
      name: 'Срок жизни тарифа',
      x: 1450,
      y: 200,
      rules: [
        {
          id: 'id1',
          value: 'test',
          name: 'на_тарифе_больше_30_дней',
          type: 'false',
          pointId: 'id7',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id7',
      name: 'Какой тариф предложить',
      x: 200,
      y: 500,
      rules: [
        {
          id: 'id1',
          value: 'test',
          name: 'ARPU 0-200',
          type: 'false',
          pointId: 'id8',
        },
        {
          id: 'id2',
          value: 'test',
          name: 'ARPU 200-400',
          type: 'false',
          pointId: 'id9',
        },
        {
          id: 'id3',
          value: 'test',
          name: 'ARPU от 400',
          type: 'false',
          pointId: 'id10',
        },
      ],
    },
    {
      type: 'MAIN',
      id: 'id8',
      name: 'Предложить тариф супер',
      x: 450,
      y: 500,
    },
    {
      type: 'OFFER',
      id: 'id9',
      name: 'Предложить тариф мега',
      x: 450,
      y: 700,
    },
    {
      type: 'OFFER',
      id: 'id10',
      name: 'Предложить тариф максимальный',
      x: 450,
      y: 900,
    },
  ],
}
