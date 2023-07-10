import { useQuery } from 'react-query'

import { makeRequest, url } from '~/api/rules/mock/fetch'
import Attribute from '~/entities/rules/ui/attribute/attribute'
import TableAttribute from '~/entities/rules/ui/tableAttribute/table-attribute'
import mockRules from '~/mocks/rules/mockRules'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  if (isSuccess) {
    const rulesArray = data.data.data
    console.log(rulesArray)
    return (
      <main style={{ padding: '20px' }}>
        {rulesArray.map(({ id, name, attributes }) => (
          <div key={id}>
            <div style={{ fontSize: '22px', color: 'black' }}>{name}</div>
            {Object.keys(attributes).map((key) => {
              const attribute = attributes[key]
              if (Array.isArray(attribute)) {
                return (
                  <div key={key}>
                    {attribute.map((item, id) => (
                      <TableAttribute key={id} obj={item} />
                    ))}
                  </div>
                )
              }
              return <Attribute key={key} name={key} value={attribute} />
            })}
          </div>
        ))}
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
