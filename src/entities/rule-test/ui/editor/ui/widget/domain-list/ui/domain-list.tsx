import './domain-list.css'

import { useEffect, useState } from 'react'

import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Attribute } from '~/entities/attribute/types/attribute'
import Input from '~/ui/input'
import { c } from '~/utils/core'

import DomainItem from '../widget/domain-item/ui/domain-item'

List.displayName = 'e-Rule-w-DomainList'

export interface Props {
  className?: string
  list: ParentDomainRes[]
}

export default function List(props: Props): JSX.Element {
  const [data, setData] = useState(props.list)
  const [value, setValue] = useState('')

  useEffect(onData, [value, props.list])

  return (
    <div className={c(props.className, List.displayName)}>
      <div style={{ padding: '10px' }}>
        <Input placeholder='Поиск...' onChange={(e): void => setValue(e.target.value)} />
      </div>

      {data.map((item) => {
        return <DomainItem isExpanded={!!value} key={item.domain.id} domainData={item} />
      })}
    </div>
  )

  // Private
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
