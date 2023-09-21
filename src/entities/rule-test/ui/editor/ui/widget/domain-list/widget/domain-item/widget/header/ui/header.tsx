import './header.css'

import Flex from '~/abstract/flex'
import { Domain, DomainItem } from '~/entities/domain'
import { GhostButton } from '~/ui/button'
import { ChevronRight } from '~/ui/icon'
import { c } from '~/utils/core'

interface HeaderProps {
  isExpanded: boolean
  domain: Domain
  setExpanded: (isExpanded: boolean) => void
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex gap='xxxl' crossAxis='center' mainAxis='space-between' className={c(DomainItem.displayName, '--header')}>
      <Flex gap='xl' crossAxis='center'>
        <GhostButton square onClick={onExpanded}>
          <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
            <ChevronRight />
          </div>
        </GhostButton>
        {props.domain.name || 'нет имени домена'}
      </Flex>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
