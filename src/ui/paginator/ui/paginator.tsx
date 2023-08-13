import './paginator.scss'

import { c } from '~/utils/core'
import { parseNum } from '~/utils/number'

import PageCounter, { PageCounterProps } from './counter'

Paginator.displayName = 'ui-Paginator'

export type PaginationProps = PageCounterProps

export default function Paginator(props: PaginationProps): JSX.Element {
  const total = parseNum(props.total)
  const size = parseNum(props.size)

  console.log(total, size)

  const totalPages = Math.ceil(total / size)

  return (
    <div className={c(Paginator.displayName)}>
      <PageCounter {...props} />
      <div className='info'>
        {!!props.total && (
          <>
            <div>всего страниц: {totalPages}</div>
            <div>всего элементов: {total}</div>
          </>
        )}
      </div>
    </div>
  )
}
