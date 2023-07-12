import './collapse-rules.css'

import { useState } from 'react'

import Collapse from '~/abstract/collapse/ui/collapse'
import Button from '~/ui/button'

interface Props {
  children: React.ReactNode
  title: string
  isExpanded: boolean
  ml?: number
}

export default function CollapseRules({ children, title, isExpanded, ml = 0 }: Props): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(isExpanded)

  const handleClick = (): void => {
    setExpanded((expanded) => !expanded)
  }

  return (
    <div className='CollapseRules' style={{ marginLeft: `${ml}px` }}>
      <Button onClick={handleClick} className='CollapseRules-Btn' height='s'>
        {title}
      </Button>
      <Collapse isExpanded={expanded}>{children}</Collapse>
    </div>
  )
}
