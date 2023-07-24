import { useMemo, useState } from 'react'
import './index.css'
import { useQuery } from 'react-query'
import { makeRequest, url } from '~/api/rules/mock/fetch'
import mockRules from '~/mocks/rules/mock-rules'
import addDataMentions from './lib/add-data-mentions'
import { DomainItemProps } from '~/entities/rules/types/rules-type'

import DomainList from '~/entities/rules/ui/domain-list/domain-list'
import EditorItem from '~/entities/rules/ui/editor-item/editor-item'
import { MentionsItem } from '~/entities/rules/ui/editor-rules/editor-rules'
import Button from '~/ui/button/ui/button'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const [editorValues, setEditorValues] = useState([{ id: 1, value: '' }])

  const dataList: [DomainItemProps[], MentionsItem[]] = useMemo(() => {
    if (isSuccess) {
      const domainsData = data.data.data
      const mentionsData = addDataMentions(domainsData)
      return [domainsData, mentionsData]
    } else {
      return [[], []]
    }
  }, [isSuccess])

  if (isSuccess) {
    const [domainsData, mentionsData] = dataList

    return (
      <main className='RulesPage'>
        <nav>
          <DomainList rules={domainsData} defaultExpanded={true} />
        </nav>
        <ul>
          {editorValues.map((item, i) => (
            <li key={item.id}>
              <EditorItem
                id={item.id}
                mentionsData={mentionsData}
                value={item.value}
                setEditorValues={setEditorValues}
                lastElement={i === editorValues.length - 1}
              />
            </li>
          ))}
          <Button
            height={'l'}
            style={{ marginLeft: 'auto', marginTop: '20px', border: '3px solid aqua', padding: '10px' }}
          >
            Сохранить
          </Button>
        </ul>
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
