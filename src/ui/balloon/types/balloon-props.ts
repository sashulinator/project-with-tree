import { Point } from 'dom-align-ts'
import { RefAttributes } from 'react'

import { ReactElementWithRef } from '~/utils/react'

/**
 *  Props for the `Balloon` component, which displays a message or other content with a tooltip-like style.
 */
export interface BalloonProps {
  /**
   * Props to be passed to the root element of the Balloon component.
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * Props to be passed to the content element of the Balloon component.
   */
  contentProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * Props to be passed to the arrow element of the Balloon component.
   */
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * The position of the balloon relative to its target element. The arrow of the balloon is calculated based on this prop.
   */
  placement?: Point

  /**
   * The child element to be displayed within the balloon component.
   */
  children: ReactElementWithRef<HTMLElement>
}
