import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import Domain from '~/entities/domain/ui/domain'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })
  console.log(fetcher)
  return (
    <main style={{ maxWidth: '1450px', margin: '0 auto', width: '100%' }}>
      {fetcher.isSuccess && fetcher.data.items.map((item) => <Domain key={item.domain.id} data={item} />)}
    </main>
  )
}
