import React, { forwardRef, useLayoutEffect, useRef } from 'react'

import { isNull } from '~/utils/core'
import { setStyles } from '~/utils/dom'
import { fns } from '~/utils/function/fns'
import { setRefs } from '~/utils/react'

import { getMapItem } from '../lib/get-map-item'
import { getPrimaryMapItem } from '../lib/get-primary-map-item'
import { getNext, getPrevious } from '../lib/get-sibling'
import { ListProps } from '../types/list-props'
import { ListState } from '../types/list-state'
import List from './list'

export interface ControllableItemProps {
  controlProps?: {
    tabIndex: number
    onKeyDown: (e: React.KeyboardEvent) => void
    onMouseOver: (e: React.MouseEvent) => void
    onMouseLeave: (e: React.MouseEvent) => void
    onClick: (e: React.MouseEvent) => void
    onBlur: (e: React.FocusEvent) => void
    onFocus: (e: React.FocusEvent) => void
  }
}

export type ControllableListProps<T, TItemProps> = ListProps<T, TItemProps & ControllableItemProps>

function ControllableList<T, TItemProps>(props: ControllableListProps<T, TItemProps>): JSX.Element {
  const stateRef = useRef<ListState<T>>(null)
  const controlProps: ControllableItemProps['controlProps'] = {
    tabIndex: -1,
    onKeyDown: onItemKeyDown,
    onMouseOver: onItemMouseOver,
    onMouseLeave: onItemMouseLeave,
    onClick: onItemMouseClick,
    onBlur: onItemBlur,
    onFocus: onItemFocus,
  }

  useLayoutEffect(() => {
    if (props.data.length === 0) return
    setStyles(stateRef.current?.elementRef.current, { visibility: 'hidden' })
    const mapItem = getPrimaryMapItem(stateRef.current)
    mapItem.elementRef.current?.scrollIntoView({ block: 'center' })
    setStyles(stateRef.current?.elementRef.current, { visibility: 'visible' })
  }, [])

  const itemProps = {
    controlProps,
    ...props.itemProps,
  } as TItemProps & ControllableItemProps

  return (
    <List
      {...props}
      listStateRef={setRefs(stateRef, props.listStateRef)}
      itemProps={itemProps}
      rootProps={{
        tabIndex: props.rootProps?.tabIndex ?? 0,
        onKeyDown: fns(onListKeyDown, props.rootProps?.onKeyDown),
        ...props.rootProps,
      }}
    />
  )

  // Private

  function onItemFocus(e: React.FocusEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)
    stateRef.current?.selectOne(mapItem.itemKey)
  }

  function onItemBlur(e: React.FocusEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)
    stateRef.current?.unselectOne(mapItem.itemKey)
  }

  function onItemMouseLeave(e: React.MouseEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)
    stateRef.current?.unselectOne(mapItem.itemKey)
  }

  function onItemMouseOver(e: React.MouseEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)
    stateRef.current?.selectOne(mapItem.itemKey)
  }

  function onItemMouseClick(e: React.MouseEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)

    if (mapItem === undefined) return
    if (stateRef.current?.checkedRef.current?.includes(mapItem.itemKey)) {
      stateRef.current.uncheckOne(mapItem.itemKey)
    } else {
      stateRef.current?.checkOne(mapItem.itemKey)
    }
  }

  function onItemKeyDown(e: React.KeyboardEvent): void {
    const mapItem = getMapItem(stateRef.current, e.currentTarget as HTMLLIElement)
    if (mapItem === undefined) return

    if (e.key === 'Enter') {
      if (stateRef.current?.checkedRef.current?.includes(mapItem.itemKey)) {
        stateRef.current.uncheckOne(mapItem.itemKey)
      } else {
        stateRef.current?.checkOne(mapItem.itemKey)
      }
    }
    if (e.key === 'ArrowDown') {
      // Отменить скрол
      e.preventDefault()
      const next = getNext(mapItem.itemKey, mapItem.map)
      if (isNull(next)) return
      stateRef?.current?.focus(next.itemKey)
      next.elementRef.current?.scrollIntoView({ block: 'center' })
    }
    if (e.key === 'ArrowUp') {
      // Отменить скрол
      e.preventDefault()
      const previous = getPrevious(mapItem.itemKey, mapItem.map)
      if (isNull(previous)) return
      stateRef.current?.focus(previous.itemKey)
      previous.elementRef.current?.scrollIntoView({ block: 'center' })
    }
  }

  function onListKeyDown(e: React.KeyboardEvent): void {
    if (e.target === e.currentTarget && e.key === 'Enter') {
      stateRef.current?.focus()
    }
  }
}

const ControlledListForwardRef = forwardRef<HTMLUListElement, ControllableListProps<unknown, unknown>>(
  function ControlledListForwardRef(props, ref) {
    // eslint-disable-next-line react/prop-types
    return <ControllableList {...props} rootProps={{ ...props.rootProps, ref: setRefs(ref, props.rootProps?.ref) }} />
  }
) as typeof ControllableList

export default ControlledListForwardRef
