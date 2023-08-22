import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import { Editor } from '~/entities/rules/ui/editor'
import mockRules from '~/mocks/rules/mock-rules'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess, isError } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const dataList = data?.data.data ?? []

  return (
    <main>
      {isError && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {isSuccess && <Editor dataList={dataList} />}
    </main>
  )
}
