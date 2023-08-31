import './domain.css'

import Accordion from '~/abstract/accordion'
import Button from '~/abstract/button/ui/button'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { ChevronRight } from '~/ui/icon'
import { c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

import AttributeForDomain from './widget/attribute/attribute-for-domain'

interface Props {
  data: ParentDomainRes
  isExpanded?: boolean
}

Domain.displayName = 'e-domain-ui-Domain'

export default function Domain(props: Props): JSX.Element {
  const { data, isExpanded = true } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  return (
    <Accordion
      onExpandedChange={toggleExpanded}
      isExpanded={expanded}
      renderHeader={Header}
      headerProps={{ title: data.domain.name }}
    >
      <div className={c(Domain.displayName)}>
        {/* {data.childDomains.map((item) => (
          <Domain key={item.domain.id} data={item} />
        ))} */}

        {data.attributes.length !== 0 ? (
          data.attributes.map((item) => <AttributeForDomain key={item.id} data={item} />)
        ) : (
          <div>Нет атрибутов</div>
        )}
      </div>
    </Accordion>
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
    <div className={c(Domain.displayName, '--header')}>
      {props.title || 'нет имени домена'}
      <Button onClick={onExpanded}>
        <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
          <ChevronRight />
        </div>
      </Button>
    </div>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
