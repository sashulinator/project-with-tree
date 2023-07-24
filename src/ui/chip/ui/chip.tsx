import './chip.css'

import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { c } from '~/utils/core'
import Button, { ButtonProps } from '~/ui/button'
import Link, { LinkProps } from '~/ui/link'
import { createElement } from 'react'
import clr from 'color'

emitter.emit('addTheme', { dark, light })

Chip.displayName = 'ui-Chip'

export type ChipProps<T extends 'button' | 'link' | 'div'> = {
  className?: string
  type: T
  height?: 's' | 'm' | 'l' | null | undefined
  children?: React.ReactNode
  color: string
} & { button: ButtonProps; link: LinkProps; div: React.HTMLAttributes<HTMLDivElement> }[T]

export default function Chip<T extends 'button' | 'link' | 'div' = 'link'>(props: ChipProps<T>): JSX.Element {
  const { type, height = 'm', color, ...restProps } = props

  const className = c(props.className, Chip.displayName, height && `--${height}`)
  const style = buildStyle()

  if (type === 'button') {
    return createElement(Button, { ...restProps, style, className, height: null } as ButtonProps)
  } else if (type === 'link') {
    return createElement(Link, { ...restProps, style, className } as unknown as LinkProps)
  } else {
    return createElement('div', { ...restProps, style, className })
  }

  // Private

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function buildStyle() {
    const bgColor = clr(color)
    const borderColor = bgColor.isDark() ? bgColor.lighten(0.5) : bgColor.darken(0.5)
    const textColor = bgColor.isDark() ? 'white' : 'black'
    const style = {
      background: bgColor.toString(),
      border: `1px solid ${borderColor.toString()}`,
      color: textColor.toString(),
    }
    return style
  }
}
