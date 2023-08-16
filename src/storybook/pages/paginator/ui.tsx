import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import Paginator from '~/ui/paginator'

export default {
  description: (): JSX.Element | string => 'Описание',

  getName: (): string => Paginator.displayName,

  getPath: (): string => `/paginator`,

  controls: [],

  element: function Element(props): JSX.Element {
    const [page, setPage] = useState()
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Paginator page={page} size={10} total={3000} {...props} onChange={setPage} />
      </Flex>
    )
  },
}
