import { Decision } from '~/entities/decision'

const mock: Decision = {
  name: 'ussr',
  id: 'mockId8',
  updateDttm: 'string',
  createDttm: 'string',
  updatedBy: 'string',
  createdBy: 'string',
  description: 'string',
  keyName: 'string',
  rev: 'string',
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
