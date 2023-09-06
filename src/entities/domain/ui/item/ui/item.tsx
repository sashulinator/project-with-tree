import './item.css'

import Accordion from '~/abstract/accordion'
import Button from '~/abstract/button'
import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import Attribute from '~/entities/attribute/ui/attribute'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

export interface Props {
  domainData: ParentDomainRes
  isExpanded?: boolean
  removeDomain: (id: Id) => void
  removeAttribute: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleAddAttributeOpen: (id: Id) => void
}

Item.displayName = 'e-domain-ui-Domain'

export default function Item(props: Props): JSX.Element {
  const { domainData, isExpanded = false, handleAddDomainOpen, handleAddAttributeOpen } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  return (
    <>
      <Accordion
        className={c(Item.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{ title: domainData.domain.name, id: domainData.domain.id, removeDomain: props.removeDomain }}
      >
        <div>
          <Flex padding='10px' mainAxis='space-between'>
            <GhostButton
              onClick={(): void => handleAddDomainOpen(domainData.domain.id)}
              style={{ border: '1px solid slategrey' }}
            >
              Добавить дочерний домен
            </GhostButton>
            <GhostButton
              onClick={(): void => handleAddAttributeOpen(domainData.domain.id)}
              style={{ border: '1px solid slategrey' }}
            >
              Добавить атрибут
            </GhostButton>
          </Flex>
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
            <div>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Item
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
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex>
      <Flex className={c(Item.displayName, '--header')}>
        {props.title || 'нет имени домена'}
        <Flex>
          <Button onClick={onExpanded}>
            <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
              <ChevronRight />
            </div>
          </Button>
        </Flex>
      </Flex>
      <GhostButton onClick={(): void => props.removeDomain(props.id)}>
        <Close />
      </GhostButton>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
