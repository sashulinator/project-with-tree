import './header.css'

import Flex from '~/abstract/flex'
import { Domain } from '~/entities/domain'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close, Plus } from '~/ui/icon'
import { Id, c } from '~/utils/core'

import Item from '../../../ui/item'

interface HeaderProps {
  isExpanded: boolean
  domain: Domain
  isRightToEdit: boolean
  setExpanded: (isExpanded: boolean) => void
  removeDomain: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleUpdateDomainOpen: (domain: Domain) => void
  handleAddAttributeOpen: (id: Id) => void
  updateDomain: (id: Id) => void
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex gap='xxxl' crossAxis='center' mainAxis='space-between' className={c(Item.displayName, '--header')}>
      <Flex gap='xl' crossAxis='center'>
        <GhostButton square onClick={onExpanded}>
          <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
            <ChevronRight />
          </div>
        </GhostButton>
        {props.domain.name || 'нет имени домена'}
      </Flex>
      {props.isRightToEdit && (
        <Flex gap='xl'>
          <GhostButton onClick={(): void => props.handleUpdateDomainOpen(props.domain)}>
            <span>редактировать домен</span>
          </GhostButton>
          <GhostButton onClick={(): void => props.handleAddDomainOpen(props.domain.id)}>
            <Plus />
            <span>домен</span>
          </GhostButton>
          <GhostButton
            onClick={(): void => props.handleAddAttributeOpen(props.domain.id)}
            style={{ marginRight: '50px' }}
          >
            <Plus />
            <span>атрибут</span>
          </GhostButton>
          <GhostButton square onClick={(): void => props.removeDomain(props.domain.id)}>
            <Close />
          </GhostButton>
        </Flex>
      )}
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
