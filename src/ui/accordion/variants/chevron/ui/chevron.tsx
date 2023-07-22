import { CollapseProps } from '~/abstract/collapse'
import Accordion from '../../../'
import { c } from '~/utils/core'
import { GhostButton } from '~/ui/button'
import { ChevronRight } from '~/ui/icon'
import './chevron.css'
ChevronAccordion.displayName = 'ui-Accordion-v-Chevron'

export interface ChevronAccordionProps {
  header: React.ReactNode
  variants?: ('bg' | 'bgSecondary' | 'transparent' | 'borderless')[]
  height?: 's' | 'm' | 'l' | null
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  collapseProps?: Omit<CollapseProps, 'children' | 'isExpanded'>
  isExpanded?: boolean | undefined
  onExpandedChange?: ((value: boolean) => void) | undefined
  defaultExpanded?: boolean | undefined
  children: React.ReactNode
  className?: string
}

export function ChevronAccordion(props: ChevronAccordionProps): JSX.Element {
  return (
    <Accordion
      {...props}
      className={c(props.className, ChevronAccordion.displayName)}
      renderHeader={Header}
      headerProps={{ children: props.header }}
    />
  )
}

// Private

interface HeaderProps {
  children: React.ReactNode
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className={c('header')}>
      {props.children}
      <GhostButton onClick={(): void => props.setExpanded(!props.isExpanded)} square={true} height='s'>
        <ChevronRight className={c('arrow', props.isExpanded && '--rotated')} />
      </GhostButton>
    </div>
  )
}
