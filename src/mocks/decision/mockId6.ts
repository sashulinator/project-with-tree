import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'lermontov-pushkin',
  id: 'mockId6',
  version: '0.0',
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
  ],
  rules: [],
}

export default mock
