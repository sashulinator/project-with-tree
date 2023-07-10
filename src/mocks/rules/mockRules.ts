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
      name: 'social',
      id: 0,
      attributes: { id: 0, sex: 'M', age: 25, marital: 'one' },
    },
    {
      name: 'contacts',
      id: 2,
      attributes: {
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
    },
    {
      name: 'response',
      id: 3,
      attributes: {
        table: [
          { respType: 3, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
          { respType: 4, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
          { respType: 1, productCategory: 'VAS', respDateTime: '2023-02-01T05:06:04.000' },
        ],
      },
    },
  ],
}

export default mock