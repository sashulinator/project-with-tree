// import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

// import { url } from '~/api/rules/mock/fetch-domain'
// import { makeRequestRules } from '~/api/rules/mock/fetch-rules'
// import ListRules from '~/entities/rules/ui/list/list-rules'
// import mockRules from '~/mocks/rules/mock-rules'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'

export default function RuleListPage(): JSX.Element {
  // const { data, isLoading, isSuccess, isError } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
  //   makeRequestRules({ id: mockRules.id })
  // )

  // const dataList = data?.data.data

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <Button style={{ marginBottom: '20px' }}>
        <Link className='Link' to={routes.ruleCreate.path.replace(':id', 'new')}>
          Добавить правило
        </Link>
      </Button>

      {/* {isError && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {isSuccess && <ListRules list={dataList || []} />} */}
    </main>
  )
}
