interface IDataRules {
  name: string
  id: string
  version: string
  status: string
  data: object[]
}

const mock: IDataRules = {
  name: 'mockedRules',
  id: 'mockRules',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      nameDomen: 'social',
      id: 0,
      titleDomen: 'Пользователь',
      sex: 'M',
      age: 25,
      marital: 'one',
    },
    {
      nameDomen: 'balance',
      id: 1,
      titleDomen: 'Баланс',
      total: 25243524,
      previous: 323245,
    },
    {
      nameDomen: 'contacts',
      id: 2,
      titleDomen: 'Контакты',
      table: [
        {
          respType: 3,
          productCategory: 'VAS',
          respDateTime: '2023-02-01T05:06:04.000',
        },
        {
          respType: 4,
          productCategory: 'VAS',
          respDateTime: '2023-02-01T05:06:04.000',
        },
        {
          respType: 1,
          productCategory: 'VAS',
          respDateTime: '2023-02-01T05:06:04.000',
        },
      ],
    },
    {
      nameDomen: 'response',
      id: 3,
      titleDomen: 'Ответ',
      table: [
        { respType: 3, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
        { respType: 4, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
        { respType: 1, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
      ],
    },
  ],
}

export default mock
