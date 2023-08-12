import React, { DetailedHTMLProps, useLayoutEffect, useRef, useState } from 'react'

import { c } from '~/utils/core'
import { removeCSSVar, setCSSVar } from '~/utils/dom/css-variable'

Resizable.displayName = 'ui-Resizable'

export interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string
  direction: 'left' | 'right'
  defaultSize: number
  callapsible?: boolean
}

export default function Resizable(props: Props): JSX.Element {
  const { name, direction, callapsible, defaultSize, ...resProps } = props

  const [initParentWidth, setInitParentWidth] = useState<number>(0)
  const ref = useRef<null | HTMLDivElement>(null)

  const names = {
    size: `${name}_width`,
    resizing: `${name}_resizing`,
    userResize: `${name}_userChanging`,
    autoResize: `${name}_autoChanging`,
    collapsed: `${name}_collapsed`,
    expanded: `${name}_expanded`,
    idle: `${name}_idle`,
  }

  useLayoutEffect(init, [])
  useLayoutEffect(addEventListener, [])

  function init(): void {
    const value = localStorage.getItem(names.size) || defaultSize

    if (value) {
      setCSSVar(names.size, value)
    }

    if (isCollapsed()) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }

  function addEventListener(): () => void {
    ref.current?.addEventListener('mousedown', onMouseDown)

    if (callapsible) {
      ref.current?.addEventListener('dblclick', onDoubleClick)
    }

    return () => {
      ref.current?.removeEventListener('dblclick', onDoubleClick)
      ref.current?.removeEventListener('mousedown', onMouseDown)
    }
  }

  function onMouseDown(): void {
    if (isCollapsed()) {
      return
    }

    const parent = ref.current?.parentElement

    if (!parent) {
      return
    }

    const parentRect = parent.getBoundingClientRect()
    setInitParentWidth(Math.round(parentRect.width))

    ref.current?.classList.add('--resizing')
    document.body.style.cursor = 'col-resize'
    document.onselectstart = (): boolean => false
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  function handleMouseUp(): void {
    document.body.style.cursor = 'auto'
    setInitParentWidth(0)
    ref.current?.classList.remove('--resizing')
    removeCSSVar(names.resizing)
    removeCSSVar(names.userResize)
    document.onselectstart = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event: MouseEvent): void {
    window.requestAnimationFrame(() => {
      const parent = ref.current?.parentElement

      if (!parent) {
        return
      }

      const parentRect = parent.getBoundingClientRect()
      const diff =
        direction === 'left'
          ? event.clientX - (initParentWidth + parentRect.left)
          : Math.abs(event.clientX - parentRect.right)

      const newWidth = Math.round(initParentWidth + diff)
      const { minWidth, maxWidth } = getComputedStyle(parent)

      if (newWidth > parseInt(maxWidth) || newWidth < parseInt(minWidth)) {
        return
      }

      localStorage.setItem(names.size, newWidth.toString())
      setCSSVar(names.resizing, 'true')
      setCSSVar(names.userResize, 'true')
      setCSSVar(names.size, newWidth)
    })
  }

  function isCollapsed(): boolean {
    return localStorage.getItem(names.collapsed) === 'true'
  }

  function setCollapsed(value: boolean): void {
    if (value) {
      document.body.classList.add(names.collapsed)
      setCSSVar(names.collapsed, 'true')
      removeCSSVar(names.expanded)
      localStorage.setItem(names.collapsed, 'true')
    } else {
      document.body.classList.remove(names.collapsed)
      setCSSVar(names.expanded, 'true')
      removeCSSVar(names.collapsed)
      localStorage.removeItem(names.collapsed)
    }

    setCSSVar(names.resizing, 'true')
    setTimeout(() => removeCSSVar(names.resizing), 300)

    removeCSSVar(names.idle)
    setTimeout(() => setCSSVar(names.idle, 'true'), 300)

    setCSSVar(names.autoResize, 'true')
    setTimeout(() => removeCSSVar(names.autoResize), 300)
  }

  function onDoubleClick(): void {
    const parent = ref.current?.parentElement

    if (!parent) {
      return
    }

    if (isCollapsed()) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  return (
    <div
      className={c(Resizable.displayName)}
      ref={ref}
      {...resProps}
      style={{ cursor: 'col-resize', ...props.style }}
    />
  )
}
