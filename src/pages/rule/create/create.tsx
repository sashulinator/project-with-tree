import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { makeRequest, url } from '~/api/rules/mock/fetch-domain'
import { Editor } from '~/entities/rules/ui/editor'
import mockDomainList from '~/mocks/rules/mock-domains'

export default function RulesPage(): JSX.Element {
  const { id } = useParams()

  const domain = useQuery([url, mockDomainList.name, { id: mockDomainList.id }], () =>
    makeRequest({ id: mockDomainList.id })
  )

  const domainList = domain.data?.data.data ?? []

  return (
    <main>
      {domain.isError && <div>error...</div>}
      {domain.isLoading && <div>loading...</div>}
      {domain.isSuccess && <Editor id={id || null} dataList={domainList} />}
    </main>
  )
}
