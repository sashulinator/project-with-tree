import { useEffect, useState } from 'react'

import { UpdateAttribute } from '~/api/attribute/requests/update'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Attribute } from '~/entities/attribute'
import { Domain } from '~/entities/domain/types/domain'
import Input from '~/ui/input'
import { Id, c } from '~/utils/core'

import Item from '../../../ui/item'

List.displayName = 'domain-Item-v-List'

export interface Props {
  className?: string
  isExpanded?: boolean
  isDraggable?: boolean
  list: ParentDomainRes[]
  isRightToEdit?: boolean
  openModalDialog?: (obj: { id: Id; name: string }) => void
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
    openModalDialog = (): void => {},
    setAddAttributeDomainId = (): void => {},
    setUpdateDomain = (): void => {},
    setUpdateAttribute = (): void => {},
    setAddDomainParentId = (): void => {},
    updateDomain = (): void => {},
    updateAttribute = (): void => {},
  } = props

  const [data, setData] = useState(props.list)
  const [value, setValue] = useState('')

  useEffect(onData, [value, props.list])

  return (
    <div className={c(props.className, List.displayName)}>
      <div style={{ padding: '10px' }}>
        <Input placeholder='Поиск...' onChange={(e): void => setValue(e.target.value)} />
      </div>

      {data.map((item) => {
        return (
          <Item
            isExpanded={!!value}
            key={item.domain.id}
            isRightToEdit={!!props.isRightToEdit}
            domainData={item}
            isDraggable={isDraggable}
            handleAddAttributeOpen={setAddAttributeDomainId}
            handleAddDomainOpen={setAddDomainParentId}
            openModalDialog={openModalDialog}
            updateAttribute={updateAttribute}
            updateDomain={updateDomain}
            handleUpdateDomainOpen={setUpdateDomain}
            handleUpdateAttributeOpen={setUpdateAttribute}
          />
        )
      })}
    </div>
  )

  function onData(): void {
    setData(getData(props.list, value))
  }

  function getData(arr: ParentDomainRes[], itemName: string): ParentDomainRes[] {
    const result: ParentDomainRes[] = []
    let attributes: Attribute[] = []

    arr.forEach((parentDomain) => {
      attributes = parentDomain.attributes.filter((item) => item.name.toLowerCase().includes(itemName.toLowerCase()))
      if (
        parentDomain.domain.name.toLowerCase().includes(itemName.toLowerCase()) ||
        attributes.length !== 0 ||
        getData(parentDomain.childDomains, itemName).length !== 0
      ) {
        result.push({
          ...parentDomain,
          attributes: attributes,
          childDomains: getData(parentDomain.childDomains, itemName),
        })
      }
    })
    return result
  }
}
