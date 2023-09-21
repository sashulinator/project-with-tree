import './index.css'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { RuleEditor } from '~/entities/rule-test'
import { EditorValues, SelectValue } from '~/entities/rule-test/types/type'

RuleTestPage.displayName = 'RuleTestPage'

export const data: EditorValues[] = [
  {
    id: '5',
    valueArr: [
      { id: '3', value: '', condition: SelectValue.and },
      { id: '4', value: '', condition: SelectValue.and },
    ],
    condition: SelectValue.or,
  },
  {
    id: '6',
    valueArr: [
      { id: '7', value: '', condition: SelectValue.or },
      { id: '8', value: '', condition: SelectValue.or },
    ],
    condition: SelectValue.and,
  },
]

function RuleTestPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  return (
    <main>
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <RuleEditor initialData={data} dataList={fetcher.data.items} />}
    </main>
  )
}

export default RuleTestPage
