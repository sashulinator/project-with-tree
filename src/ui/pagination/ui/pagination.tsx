import './pagination.css'

import { c } from '~/utils/core'
import Button, { ButtonProps } from '~/ui/button'
import Flex, { FlexProps } from '~/abstract/flex'
import { ChevronLeft } from '~/ui/icon/variants/chevron-left'
import { ChevronRight } from '~/ui/icon'
import { ChevronDoubleRight } from '~/ui/icon/variants/chevron-double-right'
import { ChevronDoubleLeft } from '~/ui/icon/variants/chevron-double-left'
import { useEffect, useState } from 'react'
import { getPaginationRange } from '../lib/getPaginationRange'

interface IProps {
  onPageChange: (number) => void
  totalCount: number
  currentPage: number
  rootProps?: FlexProps
  buttonProps?: ButtonProps
}

export type PaginationRange = (number | '<' | '>')[]

Pagination.displayName = 'ui-Pagination'

export default function Pagination(props: IProps): JSX.Element {
  const { onPageChange, totalCount, currentPage } = props

  const [paginationRange, setPaginationRange] = useState<PaginationRange>([])

  const pageSize = Math.ceil(totalCount / 10)

  useEffect(() => setPaginationRange(getPaginationRange(pageSize, currentPage)), [totalCount, currentPage])

  return (
    <Flex
      className={c(Pagination.displayName, props.rootProps?.className)}
      crossAxis={props.rootProps?.crossAxis || 'center'}
      mainAxis={props.rootProps?.mainAxis || 'center'}
      gap={props.rootProps?.gap || 's'}
      {...props.rootProps}
    >
      <Button
        disabled={currentPage === 1}
        padding={props.buttonProps?.padding || null}
        className={c(props.buttonProps?.className, 'item')}
        onClick={onToTheBegining}
      >
        <ChevronDoubleLeft />
      </Button>
      <Button
        disabled={currentPage === 1}
        padding={props.buttonProps?.padding || null}
        className={c(props.buttonProps?.className, 'item')}
        onClick={onPrevious}
      >
        <ChevronLeft />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '<') {
          return (
            <Button
              onClick={onPrevious}
              padding={props.buttonProps?.padding || null}
              className={c(props.buttonProps?.className, 'item')}
              key={index}
            >
              {'...'}
            </Button>
          )
        }

        if (pageNumber === '>') {
          return (
            <Button
              onClick={onNext}
              padding={props.buttonProps?.padding || null}
              className={c(props.buttonProps?.className, 'item')}
              key={index}
            >
              {'...'}
            </Button>
          )
        }

        return (
          <Button
            padding={props.buttonProps?.padding || null}
            className={c(props.buttonProps?.className, props.currentPage === pageNumber ? 'item activePage' : 'item')}
            key={index}
            onClick={(): void => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}
      <Button
        disabled={currentPage === pageSize}
        padding={props.buttonProps?.padding || null}
        className={c(props.buttonProps?.className, 'item')}
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
      <Button
        disabled={currentPage === pageSize}
        padding={props.buttonProps?.padding || null}
        className={c(props.buttonProps?.className, 'item')}
        onClick={onInTheEnd}
      >
        <ChevronDoubleRight />
      </Button>
    </Flex>
  )

  function onNext(): void {
    onPageChange(currentPage + 1)
  }

  function onPrevious(): void {
    onPageChange(currentPage - 1)
  }

  function onToTheBegining(): void {
    onPageChange(1)
  }

  function onInTheEnd(): void {
    onPageChange(pageSize)
  }
}
