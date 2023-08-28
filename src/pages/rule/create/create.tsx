import { Editor } from '~/entities/rules/ui/editor'

import { domains } from './data'

export default function RulesPage(): JSX.Element {
  // const domain = useQuery([url, mockDomainList.name, { id: mockDomainList.id }], () =>
  //   makeRequest({ id: mockDomainList.id })
  // )

  // const domainList = domain.data?.data.data ?? []

  return (
    <main>
      {/* {domain.isError && <div>error...</div>}
      {domain.isLoading && <div>loading...</div>} */}
      <Editor dataList={domains} />
    </main>
  )
}
