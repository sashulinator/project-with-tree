import './accordion.css'

import { ForwardedRef, createElement, forwardRef } from 'react'

import Collapse, { CollapseProps } from '~/abstract/collapse'
import { c } from '~/utils/core'
import { useControlledState } from '~/utils/hooks'

AccordionComponent.displayName = 'a-Accordion'

export interface HeaderProps {
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

export interface AccordionProps<THeaderProps> {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  collapseProps?: Omit<CollapseProps, 'children' | 'isExpanded'>
  headerProps: THeaderProps
  isExpanded?: boolean | undefined
  onExpandedChange?: ((value: boolean) => void) | undefined
  defaultExpanded?: boolean | undefined
  children: React.ReactNode
  className?: string
  renderHeader: (props: THeaderProps & HeaderProps) => JSX.Element | null
}

function AccordionComponent<THeaderProps>(
  props: AccordionProps<THeaderProps>,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const [isExpanded, setExpanded] = useControlledState(
    props.defaultExpanded || false,
    props.isExpanded,
    props.onExpandedChange
  )

  const header = createElement(props.renderHeader, { ...props.headerProps, setExpanded, isExpanded })

  return (
    <div
      {...props.rootProps}
      className={c(props.className, AccordionComponent.displayName, props.rootProps?.className)}
      ref={ref}
    >
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

const Accordion = forwardRef(AccordionComponent) as (<THeaderProps>(
  props: AccordionProps<THeaderProps> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element) & { displayName: string }
Accordion.displayName = AccordionComponent.displayName
export default Accordion
