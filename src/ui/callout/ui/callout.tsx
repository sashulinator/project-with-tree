import { Point, Points } from 'dom-align-ts'
import { createElement, useState } from 'react'

import Popover, { PopoverProps } from '~/ui/popover'

import { adjustPlacement } from '../lib/adjust-placement'

export interface ContentProp {
  placement: Point
}

export interface CalloutProps<IContentProp> {
  /** Дети  */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  /** Пропсы для контента  */
  contentProps: IContentProp
  /**  */
  isOpen: boolean
  /**  */
  placement?: Point
  /**  */
  point?: Points

  /* Конфиг в случае overflow  */
  overflow?: PopoverProps['overflow']

  /**  */
  renderContent: (props: ContentProp & IContentProp) => JSX.Element | null
}

/**
 * Компонент
 * @param props
 * @returns
 */
export default function Callout<IContentProp>(props: CalloutProps<IContentProp>): JSX.Element {
  const { placement = 'bc', ...popoverProps } = props
  const [isXAdjusted, setXAdjusted] = useState(false)
  const [isYAdjusted, setYAdjusted] = useState(false)
  const adjustedPlacement = adjustPlacement(placement, { x: isXAdjusted, y: isYAdjusted })

  const content = createElement(props.renderContent, { ...props.contentProps, placement: adjustedPlacement })

  return (
    <Popover
      {...popoverProps}
      placement={placement}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      content={content as any}
      onAligned={(ret): void => {
        setXAdjusted(ret.isXAdjusted)
        setYAdjusted(ret.isYAdjusted)
      }}
    >
      {props.children}
    </Popover>
  )
}
