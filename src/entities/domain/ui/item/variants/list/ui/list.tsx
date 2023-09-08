import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Id, c } from '~/utils/core'

import Item from '../../../ui/item'

List.displayName = 'domain-Item-v-List'

export interface Props {
  className?: string
  isExpanded?: boolean
  isDraggable?: boolean
  list: ParentDomainRes[]
  isRightToEdit?: boolean
  removeDomain?: (id: Id) => void
  removeAttribute?: (id: Id) => void
  setAddDomainParentId?: (id: Id) => void
  setAddAttributeDomainId?: (id: Id) => void
}

export default function List(props: Props): JSX.Element {
  const {
    isDraggable = false,
    removeDomain = (): void => {},
    removeAttribute = (): void => {},
    setAddAttributeDomainId = (): void => {},
    setAddDomainParentId = (): void => {},
  } = props

  return (
    <div className={c(props.className, List.displayName)}>
      {props.list.map((item) => {
        return (
          <Item
            key={item.domain.id}
            isRightToEdit={!!props.isRightToEdit}
            domainData={item}
            isDraggable={isDraggable}
            handleAddAttributeOpen={setAddAttributeDomainId}
            handleAddDomainOpen={setAddDomainParentId}
            removeAttribute={removeAttribute}
            removeDomain={removeDomain}
          />
        )
      })}
    </div>
  )
}
