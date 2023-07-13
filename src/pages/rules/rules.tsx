import './index.css'

import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import DomainItem from '~/entities/rules/ui/domain-item/domain-item'
import mockRules from '~/mocks/rules/mock-rules'
import MenInput from '~/ui/mentions-input/ui/mentions-input'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  if (isSuccess) {
    const rulesArray = data.data.data

    return (
      <main className='RulesPage'>
        <nav>
          {rulesArray.map((item) => {
            return <DomainItem key={item.id} domain={item} isExpanded={true} />
          })}
        </nav>
        <div style={{ width: '55%' }}>
          <MenInput />
        </div>
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
