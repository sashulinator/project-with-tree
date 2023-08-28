import './domain-list.css'

import { DomainRes } from '~/entities/rules/types/rules-type'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { themes } from '../../rules/themes'
import { Domain } from '../widgets/domain'

interface DomainListProps {
  domains: DomainRes[]
  defaultExpanded?: boolean | undefined
  rootProps?: React.HTMLAttributes<HTMLDListElement>
}

DomainList.displayName = 'e-Rules-ui-DomainList'

emitter.emit('addTheme', themes)

export function DomainList(props: DomainListProps): JSX.Element {
  const { domains, defaultExpanded, rootProps } = props
  // const [domainList, setDomainList] = useState(domains)
  // const [value, setValue] = useState('')

  return (
    <>
      {/* <InputSearch inputProps={{ onChange: (e) => setValue(e.target.value), value: value }} /> */}
      <ul className={c(DomainList.displayName, rootProps?.className)} {...rootProps}>
        {domains.map((item) => {
          return <Domain key={item.id} domain={item} defaultExpanded={!!defaultExpanded} />
        })}
      </ul>
    </>
  )
}
