import './domain.css'

import Accordion from '~/abstract/accordion'
import Button from '~/abstract/button'
import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

import AttributeForDomain from '../widget/attribute/attribute-for-domain'

interface Props {
  domainData: ParentDomainRes
  isExpanded?: boolean
  handleModalOpen: (string) => void
}

Domain.displayName = 'e-domain-ui-Domain'

export function Domain(props: Props): JSX.Element {
  const { domainData, isExpanded = true, handleModalOpen } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  return (
    <>
      <Accordion
        className={c(Domain.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{ title: domainData.domain.name }}
      >
        <div>
          <Flex padding='10px' mainAxis='space-between'>
            <GhostButton
              onClick={(): void => handleModalOpen(domainData.domain.id)}
              style={{ border: '1px solid slategrey' }}
            >
              Добавить дочерний домен
            </GhostButton>
            <GhostButton style={{ border: '1px solid slategrey' }}>Добавить атрибут</GhostButton>
          </Flex>
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Domain handleModalOpen={handleModalOpen} key={item.domain.id} domainData={item} />
            ))}
          {domainData.attributes.length !== 0 ? (
            domainData.attributes.map((item) => <AttributeForDomain key={item.id} attribute={item} />)
          ) : (
            <div>Нет атрибутов</div>
          )}
        </div>
      </Accordion>
    </>
  )
}

// Private

interface HeaderProps {
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex>
      <Flex className={c(Domain.displayName, '--header')}>
        {props.title || 'нет имени домена'}
        <Flex>
          <Button onClick={onExpanded}>
            <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
              <ChevronRight />
            </div>
          </Button>
        </Flex>
      </Flex>
      <GhostButton>
        <Close />
      </GhostButton>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
