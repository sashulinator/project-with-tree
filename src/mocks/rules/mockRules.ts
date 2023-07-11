import { RulesResponse } from '~/entities/rules/types/rules-type'

const mock: RulesResponse = {
  name: 'mockedRules',
  id: 'mockRules',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      id: 0,
      domainName: 'Информация о ФЛ',
      domainNodeType: 'person',
      parentDomain: null,
      childDomain: null,
      attributes: [
        { id: 1, name: 'атрибут 1', nodeType: 'attribute-1', value: true, type: 'boolean' },
        { id: 2, name: 'атрибут 2', nodeType: 'attribute-2', value: 'строка', type: 'string' },
        { id: 3, name: 'атрибут 3', nodeType: 'attribute-3', value: 4, type: 'number' },
        {
          id: 4,
          name: 'атрибут 4',
          nodeType: 'attribute-4',
          value: '2023-02-01T05:06:04.000',
          type: 'date',
        },
      ],
    },
    {
      id: 5,
      domainName: 'Профиль клиента',
      domainNodeType: 'client',
      parentDomain: null,
      childDomain: null,
      attributes: [
        { id: 6, name: 'атрибут 1', nodeType: 'attribute-1', value: true, type: 'boolean' },
        { id: 7, name: 'атрибут 2', nodeType: 'attribute-2', value: 'строка', type: 'string' },
        { id: 8, name: 'атрибут 3', nodeType: 'attribute-3', value: 4, type: 'number' },
        {
          id: 9,
          name: 'атрибут 4',
          nodeType: 'attribute-4',
          value: '2023-02-01T05:06:04.000',
          type: 'date',
        },
      ],
    },
  ],
}

export default mock
