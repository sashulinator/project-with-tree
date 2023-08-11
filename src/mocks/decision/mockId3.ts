import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'tinkoff',
  id: 'mockId3',
  version: '5.0',
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
  ],
  rules: [],
}

export default mock