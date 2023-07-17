import { useState } from 'react'
import './index.css'

import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import DomainItem from '~/entities/rules/ui/domain-item/domain-item'
// import Editor from '~/entities/rules/ui/editor/editor'
import Mentions from '~/entities/rules/ui/mentions/mentions'
import mockRules from '~/mocks/rules/mock-rules'
import addDataMentions from './lib/add-data-mentions'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  if (isSuccess) {
    const rulesArray = data.data.data
    const mentionsData = addDataMentions(rulesArray)
    console.log(mentionsData)
    console.log(rulesArray)
    return (
      <main className='RulesPage'>
        <nav>
          {rulesArray.map((item) => {
            return <DomainItem key={item.id} domain={item} defaultExpanded={true} />
          })}
        </nav>
        <div>
          <div>
            <Mentions data={mentionsData} />
          </div>
          {/* <Editor /> не удалять!!!*/}
        </div>
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
