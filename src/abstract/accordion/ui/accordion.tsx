import Collapse, { CollapseProps } from '~/abstract/collapse'

import './accordion.css'
import { c } from '~/utils/core'
import { useControlledState } from '~/utils/hooks'
import { createElement } from 'react'

Accordion.displayName = 'a-Accordion'

interface HeaderProps {
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

interface Props<THeaderProps extends HeaderProps> {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  collapseProps?: CollapseProps
  headerProps: THeaderProps
  isExpanded?: boolean | undefined
  onExpandedChange?: ((value: boolean) => void) | undefined
  defaultExpanded?: boolean | undefined
  children: React.ReactNode
  renderHeader: (props: THeaderProps) => JSX.Element | null
}

export default function Accordion<THeaderProps extends HeaderProps>(props: Props<THeaderProps>): JSX.Element {
  const [isExpanded, setExpanded] = useControlledState(
    props.defaultExpanded || false,
    props.isExpanded,
    props.onExpandedChange
  )

  const header = createElement(props.renderHeader, { ...props.headerProps, setExpanded, isExpanded })

  return (
    <div {...props.rootProps} className={c(Accordion.displayName, props.rootProps?.className)}>
      {header}
      <Collapse
        {...props.collapseProps}
        rootProps={{ className: c(props.collapseProps?.rootProps?.className, 'collapse') }}
        isExpanded={isExpanded}
      >
        {props.children}
      </Collapse>
    </div>
  )
}
