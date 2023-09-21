import './domain-item.css'

import { useEffect } from 'react'

import Accordion from '~/abstract/accordion'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

import AttributeItem from '../widget/attribute-item'
import Header from '../widget/header/ui/header'

export interface Props {
  domainData: ParentDomainRes
  pLeft?: number
  isExpanded: boolean
}

DomainItem.displayName = 'e-rule-ui-DomainList-Item'

export default function DomainItem(props: Props): JSX.Element {
  const { domainData, isExpanded = false, pLeft = 0 } = props

  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  const pl = pLeft

  useEffect(() => {
    if (isExpanded !== expanded) toggleExpanded()
  }, [isExpanded])

  return (
    <>
      <Accordion
        rootProps={{
          style: { paddingLeft: pl },
        }}
        className={c(DomainItem.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{
          domain: domainData.domain,
        }}
      >
        <div>
          {domainData.attributes.length !== 0 ? (
            domainData.attributes.map((item) => (
              <AttributeItem wrapperProps={{ style: { marginBottom: '10px' } }} key={item.id} attribute={item} />
            ))
          ) : (
            <div className='do-not-attributes'>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <DomainItem pLeft={pl + 10} key={item.domain.id} domainData={item} isExpanded={isExpanded} />
            ))}
        </div>
      </Accordion>
    </>
  )
}

// Private
