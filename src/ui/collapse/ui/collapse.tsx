import { useEffect, useState } from 'react'
import Button from '~/abstract/button/ui/button'
import Collapse, { CollapseProps } from '~/abstract/collapse/ui/collapse'
import { Arrow } from '~/ui/icon/variants/arrow'
import './collapse.css'
import { c } from '~/utils/core'

CollapseUI.displayName = 'ui-Collapse'

interface Props extends CollapseProps {
  title: string
  pl?: number
}

export default function CollapseUI({ isExpanded, pl = 0, ...props }: Props): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false)

  useEffect(() => setExpanded(isExpanded), [isExpanded])

  const handleClick = (): void => {
    setExpanded((item) => !item)
  }

  return (
    <div style={{ paddingLeft: `${pl}px` }} className={c(CollapseUI.displayName, props.rootProps?.className)}>
      <Button className='header-collapse' onClick={handleClick}>
        <h2>{props.title}</h2>
        <div>
          <Arrow className={expanded ? 'arrow-icon rotate' : 'arrow-icon'} />
        </div>
      </Button>

      <Collapse rootProps={{ className: 'body-Collapse' }} isExpanded={expanded} {...props}>
        {props.children}
      </Collapse>
    </div>
  )
}
