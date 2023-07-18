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
import MentionInput from '~/ui/mentions/ui/mentions'
import { fns } from '~/utils/function'
import { preventDefault, stopPropagation } from '~/utils/dom'
import { Mention } from 'react-mentions'
import defaultMentionStyle from '~/ui/mentions/ui/defaultMentionStyle'

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
          onDragOver={fns<[e: React.DragEvent<HTMLDivElement>]>(preventDefault, stopPropagation)}
          onDrop={(e: React.DragEvent<HTMLDivElement>): void => {
            e.preventDefault()
            console.log(activeAttribute)
            if (activeAttribute) {
              setValue((v) => `${v}@[${activeAttribute.name}](${activeAttribute.nodeType})`)
            }
          }}
        >
          <MentionInput
            value={value}
            onChange={(_, v): void => {
              console.log(v)
              setValue(v)
            }}
          >
            <Mention trigger='@' data={mentionsData} style={defaultMentionStyle} />
          </MentionInput>
        </div>
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
