import './item.css'

import Accordion from '~/abstract/accordion'
import Button from '~/abstract/button'
import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import Attribute from '~/entities/attribute/ui/item'
import { GhostButton } from '~/ui/button'
import { H2 } from '~/ui/heading'
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
  const { domainData, isExpanded = false, pLeft = 0, handleAddDomainOpen, handleAddAttributeOpen } = props
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
              <Attribute
                wrapperProps={{ style: { marginBottom: '10px' } }}
                removeAttribute={props.removeAttribute}
                key={item.id}
                attribute={item}
              />
            ))
          ) : (
            <H2 className='do-not-attributes'>Нет атрибутов</H2>
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
      <Flex gap='xl'>
        <Button onClick={onExpanded}>
          <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
            <ChevronRight />
          </div>
        </Button>
        <H2 style={{ marginBottom: 0 }}>{props.title || 'нет имени домена'}</H2>
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
        <GhostButton onClick={(): void => props.removeDomain(props.id)}>
          <Close />
        </GhostButton>
      </Flex>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
