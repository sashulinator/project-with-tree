// import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { useFetchRulesList } from '~/api/rules/fetch-rules'
// import { url } from '~/api/rules/mock/fetch-domain'
// import { makeRequestRules } from '~/api/rules/mock/fetch-rules'
import ListRules from '~/entities/rules/ui/list/list-rules'
// import mockRules from '~/mocks/rules/mock-rules'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'

export default function RuleListPage(): JSX.Element {
  // const { data, isLoading, isSuccess, isError } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
  //   makeRequestRules({ id: mockRules.id })
  // )

  // const dataList = data?.data.data
  const fetcher = useFetchRulesList({ page: 1, limit: 1000 })
  const dataList = fetcher.data?.items.filter((item) => item.editor)
  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <Button style={{ marginBottom: '20px' }}>
        <Link className='Link' to={routes.ruleCreate.path.replace(':id', 'new')}>
          Добавить правило
        </Link>
      </Button>

      {fetcher.isError && <div>error...</div>}
      {fetcher.isLoading && <div>loading...</div>}
      {fetcher.isSuccess && <ListRules list={dataList || []} />}
    </main>
  )
}
