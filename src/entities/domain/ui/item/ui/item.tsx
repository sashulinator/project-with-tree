import './item.css'

import { useMutation } from 'react-query'

import Accordion from '~/abstract/accordion'
import Button from '~/abstract/button'
import Flex from '~/abstract/flex'
import { QueryResult } from '~/api/domain/fetch-parent-domains'
import { requestDomainDelete } from '~/api/domain/request/delete-domain'
import { ResponseData } from '~/api/domain/request/fetch-parent-domains'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import Attribute from '~/entities/attribute/ui/attribute'
import { notify } from '~/shared/notify'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

interface Props {
  domainData: ParentDomainRes
  isExpanded?: boolean
  handleAddDomainOpen: (string) => void
  handleAddAttributeOpen: (string) => void
  fetcher: QueryResult<ResponseData>
}

Domain.displayName = 'e-domain-ui-Domain'

export function Domain(props: Props): JSX.Element {
  const { domainData, isExpanded = false, handleAddDomainOpen, handleAddAttributeOpen, fetcher } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  return (
    <>
      <Accordion
        className={c(Domain.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{ title: domainData.domain.name, id: domainData.domain.id, fetcher: fetcher }}
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
                fetcher={props.fetcher}
                key={item.id}
                attribute={item}
              />
            ))
          ) : (
            <div>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Domain
                handleAddAttributeOpen={handleAddAttributeOpen}
                handleAddDomainOpen={handleAddDomainOpen}
                key={item.domain.id}
                domainData={item}
                fetcher={props.fetcher}
              />
            ))}
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
  id: string
  fetcher: QueryResult<ResponseData>
}

function Header(props: HeaderProps): JSX.Element {
  const mutation = useMutation(() => requestDomainDelete(props.id), {
    onSuccess: () => {
      void props.fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

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
      <GhostButton onClick={(): void => mutation.mutate()}>
        <Close />
      </GhostButton>
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
