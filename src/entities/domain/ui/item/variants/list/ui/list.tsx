import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Id, c } from '~/utils/core'

import Item from '../../../ui/item'

List.displayName = 'domain-Item-v-List'

export interface Props {
  className?: string
  isExpanded?: boolean
  list: ParentDomainRes[]
  removeDomain: (id: Id) => void
  removeAttribute: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleAddAttributeOpen: (id: Id) => void
}

export default function List(props: Props): JSX.Element {
  return (
    <div className={c(props.className, List.displayName)}>
      {props.list.map((item) => {
        return (
          <Item
            handleAddAttributeOpen={props.handleAddAttributeOpen}
            handleAddDomainOpen={props.handleAddDomainOpen}
            key={item.domain.id}
            domainData={item}
            removeAttribute={props.removeAttribute}
            removeDomain={props.removeDomain}
          />
        )
      })}
    </div>
  )
}
