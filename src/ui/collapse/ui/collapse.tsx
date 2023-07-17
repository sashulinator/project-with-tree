import Button from '~/abstract/button/ui/button'
import Collapse, { CollapseProps } from '~/abstract/collapse/ui/collapse'

import './collapse.css'
import { c } from '~/utils/core'
import { ChevronRight } from '~/ui/icon'
import { useControlledState } from '~/utils/hooks/controlled-state'

CollapseUI.displayName = 'ui-Collapse'

interface Props extends Omit<CollapseProps, 'isExpanded'> {
  title: string
  isExpanded?: boolean | undefined
  onExpandedChange?: ((value: boolean) => void) | undefined
  defaultExpanded?: boolean | undefined
}

export default function CollapseUI(props: Props): JSX.Element {
  const { title, ...collapseProps } = props

  const [isExpanded, setExpanded] = useControlledState<boolean>(
    props.defaultExpanded || false,
    props.isExpanded,
    props.onExpandedChange
  )

  return (
    <div style={props.rootProps?.style} className={c(CollapseUI.displayName, props.rootProps?.className)}>
      <Button className='header-collapse' onClick={toggleExpanded}>
        <div>{title}</div>
        <ChevronRight className={isExpanded ? 'arrow-icon rotate' : 'arrow-icon'} />
      </Button>

      <Collapse {...collapseProps} rootProps={{ className: 'body-Collapse' }} isExpanded={isExpanded}>
        {props.children}
      </Collapse>
    </div>
  )

  // Private

  function toggleExpanded(): void {
    setExpanded((item) => !item)
  }
}
