import { useState } from 'react'
import './index.css'

import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import DomainItem from '~/entities/rules/ui/domain-item/domain-item'
// import Editor from '~/entities/rules/ui/editor/editor'
import mockRules from '~/mocks/rules/mock-rules'
import addDataMentions from './lib/add-data-mentions'
import { IAttribute } from '~/entities/rules/types/rules-type'
import { fns } from '~/utils/function'
import { preventDefault, stopPropagation } from '~/utils/dom'
import { MentionInput } from '~/ui/mentions'
import { Mention } from 'react-mentions'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const [value, setValue] = useState<string>('')

  const [activeAttribute, setActiveAttribute] = useState<IAttribute | null>(null)

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
              setValue(v)
            }}
          >
            <Mention
              trigger='@'
              data={mentionsData}
              style={{
                backgroundColor: '#cee4e5',
              }}
            />
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
