import './index.css'

// eslint-disable-next-line import/no-named-as-default
import Scrollbars from 'react-custom-scrollbars'

import Flex from '~/abstract/flex'
import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { DomainList } from '~/entities/domain'
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
      {fetcher.isSuccess && (
        <Flex gap='xxxl' mainAxis='space-between' width='100%' padding='20px'>
          <nav
            className='list'
            style={{
              borderRight: '1px solid var(--bgSecondary)',
              height: 'calc(100vh - var(--header-height) * 1px)',
              width: '400px',
            }}
          >
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={500}>
              <DomainList list={fetcher.data.items} isDraggable={true} />
            </Scrollbars>
          </nav>

          <RuleEditor initialData={data} dataList={fetcher.data.items} />
        </Flex>
      )}
    </main>
  )
}

export default RuleTestPage
