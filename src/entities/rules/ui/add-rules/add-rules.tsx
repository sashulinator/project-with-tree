import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { makeRequest, url } from '~/api/rules/mock/fetch'
import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { useSetRecoilState } from 'recoil'
import { mentionsDataAtom } from '~/entities/rules/state/state'
import { addDataMentions } from '../../lib'
import { DomainList } from '../domain-list/domain-list'
import { EditorRules } from '../editor-rules/editor-rules'
import mockRules from '~/mocks/rules/mock-rules'
import './add-rules.css'
import Input from '~/ui/input'
import { User } from '~/ui/icon'
import { InputSearch } from '../input-search/input-search'

export function AddRules(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  const dataList: DomainItemProps[] = useMemo(() => {
    if (isSuccess) {
      const domainsData = data.data.data
      /**Warning: Cannot update a component (`EditorInput`) while rendering
       * a different component (`AddRules`). To locate the bad
       * setState() call inside `AddRules`, follow the stack trace as described inz */
      // из-за этого state
      // setMentionsData(addDataMentions(domainsData))
      return domainsData
    } else {
      return []
    }
  }, [isSuccess])

  // пока так, чтобы убрать ошибку, потом подумать надо
  useEffect(() => {
    setMentionsData(addDataMentions(dataList))
  }, [isSuccess])

  if (isSuccess) {
    return (
      <main className='e-ui-AddRules'>
        <nav className='list'>
          <InputSearch rootProps={{ style: { marginBottom: '25px' } }} />
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
