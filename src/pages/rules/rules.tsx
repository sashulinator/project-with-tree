import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/decision/mock/fetch'
import mockRules from '~/mocks/decision/mockRules'

export default function RulesPage(): JSX.Element {
  const data = useQuery([url, mockRules.name, { id: mockRules.id }], () => makeRequest({ id: mockRules.id }))
  console.log(data)
  return <main>test</main>
}
