import { useState } from 'react'
import './index.css'

import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import DomainItem from '~/entities/rules/ui/domain-item/domain-item'
// import Editor from '~/entities/rules/ui/editor/editor'
import mockRules from '~/mocks/rules/mock-rules'
import addDataMentions from './lib/add-data-mentions'
import { IAttribute } from '~/entities/rules/types/rules-type'
import { useBoolean } from '~/utils/hooks'
import Mentions from '~/ui/mentions/ui/mentions'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const [value, setValue] = useState<string>('')

  const [isFocused, , , toggleFocused] = useBoolean(false)
  const [activeAttribute, setActiveAttribute] = useState<IAttribute | null>(null)
  const [attributeValue, setAttributeValue] = useState<string>('')
  // @[атрибут 4](attribute-4)
  if (isSuccess) {
    const rulesArray = data.data.data
    const mentionsData = addDataMentions(rulesArray)

    return (
      <main className='RulesPage'>
        <nav>
          {rulesArray.map((item) => {
            return (
              <DomainItem
                activeAttribute={activeAttribute}
                setActiveAttribute={setActiveAttribute}
                key={item.id}
                domain={item}
                defaultExpanded={true}
              />
            )
          })}
        </nav>
        <div
          onDragOver={(e: React.DragEvent<HTMLDivElement>): void => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onDrop={(e: React.DragEvent<HTMLDivElement>): void => {
            e.preventDefault()
            console.log(activeAttribute)
            if (activeAttribute) {
              setValue((v) => `${v}@[${activeAttribute.name}](${activeAttribute.nodeType})`)
            }
          }}
        >
          <Mentions
            data={mentionsData}
            focusedChange={toggleFocused}
            isFocused={isFocused}
            value={value}
            onChangeValue={(_, v): void => {
              console.log(v)
              setValue(v)
            }}
          />
        </div>
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
