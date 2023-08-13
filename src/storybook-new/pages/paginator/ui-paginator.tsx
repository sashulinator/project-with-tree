import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import Input from '~/ui/input'
import Paginator from '~/ui/paginator'

export const uiPaginator = {
  name: Paginator.displayName,
  element: Page,
  description: 'Любой элемент с лейблом',
  features: ['Подстраивается под размер контента', 'Координатность'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

export function Page(): JSX.Element {
  const [page, setPage] = useState(0)

  return (
    <>
      <Flex dir='row' gap='xl' width='100%'>
        <Paginator total={200} size={10} onChange={setPage} page={page} />
      </Flex>
    </>
  )
}
