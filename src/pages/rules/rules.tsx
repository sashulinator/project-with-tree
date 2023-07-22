import { useMemo, useState } from 'react'
import './index.css'
import { useQuery } from 'react-query'
import { makeRequest, url } from '~/api/rules/mock/fetch'
import mockRules from '~/mocks/rules/mock-rules'
import addDataMentions from './lib/add-data-mentions'
import EditorRules, { MentionsItem } from '~/entities/rules/ui/editor-rules/editor-rules'
import { DomainItemProps } from '~/entities/rules/types/rules-type'

import DomainList from '~/entities/rules/ui/domain-list/domain-list'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const dataList: [DomainItemProps[], MentionsItem[]] = useMemo(() => {
    if (isSuccess) {
      const domainsData = data.data.data
      const mentionsData = addDataMentions(domainsData)
      return [domainsData, mentionsData]
    } else {
      return [[], []]
    }
  }, [isSuccess])

  const [value, setValue] = useState<string>('')

  if (isSuccess) {
    const [domainsData, mentionsData] = dataList

    return (
      <main className='RulesPage'>
        <nav>
          <DomainList rules={domainsData} defaultExpanded={true} />
        </nav>
        <EditorRules mentionsData={mentionsData} value={value} setValue={setValue} />
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
