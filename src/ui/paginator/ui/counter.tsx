import './counter.scss'

import Button from '~/ui/button'
import { ChevronRight } from '~/ui/icon'
import { ChevronDoubleLeft } from '~/ui/icon/variants/chevron-double-left'
import { ChevronDoubleRight } from '~/ui/icon/variants/chevron-double-right'
import { ChevronLeft } from '~/ui/icon/variants/chevron-left'
import Input from '~/ui/input'
import { c } from '~/utils/core'
import { parseNum } from '~/utils/number'

import { useInputValue } from '../lib/use-input-value'

PageCounter.displayName = 'ui-PageCounter'

export type PageCounterProps = {
  className?: string
  total?: number | string
  size?: number | string
  page?: number | string
  onChange?: (num: number) => void
}

export default function PageCounter(props: PageCounterProps): JSX.Element {
  const [inputValue, onInputChange, onInputKeyUp] = useInputValue(props.page?.toString(), handleChange)

  const total = parseNum(props.total)
  const size = parseNum(props.size)
  const page = parseNum(props.page) - 1
  const totalPages = Math.ceil(total / size) - 1

  function handleChange(newPage: number) {
    return () => {
      if (newPage !== page - 1 && props.onChange && newPage >= 0 && newPage <= totalPages) {
        props.onChange?.(newPage)
      }
    }
  }

  if (page < -1) {
    throw Error('Page cannot be less than 1')
  }

  return (
    <div className={c(props.className, PageCounter.displayName)}>
      {!!props.total && (
        <>
          <Button round={true} disabled={props.page === 0} onClick={handleChange(0)}>
            <ChevronDoubleLeft />
          </Button>
          <Button round={true} disabled={props.page === 0} onClick={handleChange(page)}>
            <ChevronLeft />
          </Button>
          <Input
            onKeyUp={onInputKeyUp}
            onChange={onInputChange}
            style={{ width: '40px', textAlign: 'center' }}
            value={(parseNum(inputValue, 0) + 1).toString()}
            onFocus={(): void => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              ;(document.activeElement as any)?.select()
            }}
            autoComplete='off'
          />
          <Button round={true} disabled={page >= totalPages - 1} onClick={handleChange(page + 2)}>
            <ChevronRight />
          </Button>
          <Button round={true} disabled={page >= totalPages - 1} onClick={handleChange(totalPages)}>
            <ChevronDoubleRight />
          </Button>
        </>
      )}
    </div>
  )
}
