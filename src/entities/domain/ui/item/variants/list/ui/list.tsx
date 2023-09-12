import { UpdateAttribute } from '~/api/attribute/requests/update'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Domain } from '~/entities/domain/types/domain'
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
  updateDomain?: (id: Id) => void
  updateAttribute?: (id: Id) => void
  setAddDomainParentId?: (id: Id) => void
  setAddAttributeDomainId?: (id: Id) => void
  setUpdateDomain?: (domain: Domain) => void
  setUpdateAttribute?: (attribute: UpdateAttribute) => void
}

export default function List(props: Props): JSX.Element {
  const {
    isDraggable = false,
    removeDomain = (): void => {},
    removeAttribute = (): void => {},
    setAddAttributeDomainId = (): void => {},
    setUpdateDomain = (): void => {},
    setUpdateAttribute = (): void => {},
    setAddDomainParentId = (): void => {},
    updateDomain = (): void => {},
    updateAttribute = (): void => {},
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
            updateAttribute={updateAttribute}
            updateDomain={updateDomain}
            handleUpdateDomainOpen={setUpdateDomain}
            handleUpdateAttributeOpen={setUpdateAttribute}
          />
        )
      })}
    </div>
  )
}
