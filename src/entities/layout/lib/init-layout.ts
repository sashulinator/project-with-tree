import uuid from 'uuid-random'

import { Layout, ROOT_ID } from '~/entities/layout'

export function initLayout(): Layout {
  return {
    id: uuid(),
    data: [
      {
        id: ROOT_ID,
        name: 'RootBox',
        componentName: 'RootBox',
        props: {
          style: {
            width: '100%',
            padding: '24px',
          },
        },
      },
    ],
  }
}
