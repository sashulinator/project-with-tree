import { Point, Points } from 'dom-align-ts'

import { PopoverProps } from '~/ui/popover'

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
