import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'ussr',
  id: 'mockId8',
  version: '1.0',
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
