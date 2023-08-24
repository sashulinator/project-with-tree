import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import { Editor } from '~/entities/rules/ui/editor'
import mockDomainList from '~/mocks/rules/mock-domains'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess, isError } = useQuery([url, mockDomainList.name, { id: mockDomainList.id }], () =>
    makeRequest({ id: mockDomainList.id })
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
