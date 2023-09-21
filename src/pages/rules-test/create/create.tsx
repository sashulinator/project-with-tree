import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { RuleEditor } from '~/entities/rule-test'

RuleTestCreatePage.displayName = 'RuleTestCreatePage'

function RuleTestCreatePage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <RuleEditor rule={null} dataList={fetcher.data.items} onSubmit={(): void => {}} />}
    </main>
  )
}

export default RuleTestCreatePage
