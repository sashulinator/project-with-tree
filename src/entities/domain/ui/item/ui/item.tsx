import './item.css'

import Accordion from '~/abstract/accordion'
import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import AttributeItem from '~/entities/attribute/ui/item'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close, Plus } from '~/ui/icon'
import { Id, c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

export interface Props {
  domainData: ParentDomainRes
  isExpanded?: boolean
  removeDomain: (id: Id) => void
  removeAttribute: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleAddAttributeOpen: (id: Id) => void
  pLeft?: number
}

Item.displayName = 'e-domain-ui-Domain'

export default function Item(props: Props): JSX.Element {
  const { domainData, isExpanded = true, pLeft = 0, handleAddDomainOpen, handleAddAttributeOpen } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)
  const pl = pLeft
  return (
    <>
      <Accordion
        rootProps={{ style: { paddingLeft: pl } }}
        className={c(Item.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{
          title: domainData.domain.name,
          id: domainData.domain.id,
          removeDomain: props.removeDomain,
          handleAddDomainOpen: handleAddDomainOpen,
          handleAddAttributeOpen: handleAddAttributeOpen,
        }}
      >
        <div>
          {domainData.attributes.length !== 0 ? (
            domainData.attributes.map((item) => (
              <AttributeItem
                wrapperProps={{ style: { marginBottom: '10px' } }}
                removeAttribute={props.removeAttribute}
                key={item.id}
                attribute={item}
              />
            ))
          ) : (
            <div className='do-not-attributes'>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Item
                pLeft={pl + 10}
                handleAddAttributeOpen={handleAddAttributeOpen}
                handleAddDomainOpen={handleAddDomainOpen}
                key={item.domain.id}
                domainData={item}
                removeDomain={props.removeDomain}
                removeAttribute={props.removeAttribute}
                isExpanded={false}
              />
            ))}
        </div>
      </Accordion>
    </>
  )
}

// Private

interface HeaderProps {
  id: string
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
  removeDomain: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleAddAttributeOpen: (id: Id) => void
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex gap='xxxl' crossAxis='center' mainAxis='space-between' className={c(Item.displayName, '--header')}>
      <Flex gap='xl' crossAxis='center'>
        <GhostButton square onClick={onExpanded}>
          <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
            <ChevronRight />
          </div>
        </GhostButton>
        {props.title || 'нет имени домена'}
      </Flex>
      <Flex gap='xl'>
        <GhostButton onClick={(): void => props.handleAddDomainOpen(props.id)}>
          <Plus />
          <span>домен</span>
        </GhostButton>
        <GhostButton onClick={(): void => props.handleAddAttributeOpen(props.id)} style={{ marginRight: '50px' }}>
          <Plus />
          <span>атрибут</span>
        </GhostButton>
        <GhostButton square onClick={(): void => props.removeDomain(props.id)}>
          <Close />
        </GhostButton>
      </Flex>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
