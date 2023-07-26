import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { makeRequest, url } from '~/api/rules/mock/fetch'
import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { useSetRecoilState } from 'recoil'
import { mentionsDataAtom } from '~/entities/rules/state/state'
import { addDataMentions } from '../../lib'
import { DomainList } from '../domain-list/domain-list'
import { EditorRules } from '../editor-rules-test/editor-rules'
import mockRules from '~/mocks/rules/mock-rules'
import './add-rules.css'

export function AddRules(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  const dataList: DomainItemProps[] = useMemo(() => {
    if (isSuccess) {
      const domainsData = data.data.data
      setMentionsData(addDataMentions(domainsData))
      return domainsData
    }
    return []
  }, [isSuccess])

  if (isSuccess) {
    return (
      <main className='RulesPage'>
        <nav>
          <DomainList domains={dataList} defaultExpanded={true} />
        </nav>
        <EditorRules />
      </main>
    )
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
