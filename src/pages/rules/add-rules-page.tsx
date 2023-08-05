import { useMemo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { url, makeRequest } from '~/api/rules/mock/fetch'
import { addDataMentions } from '~/entities/rules/lib'
import { mentionsDataAtom } from '~/entities/rules/models'
import { ChildDomain } from '~/entities/rules/types/rules-type'
import { AddRules } from '~/entities/rules/ui/add-rules'
import mockRules from '~/mocks/rules/mock-rules'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  const dataList: ChildDomain[] = useMemo(() => {
    return isSuccess ? data.data.data : []
  }, [isSuccess])

  useEffect(() => {
    setMentionsData(addDataMentions(dataList))
  }, [isSuccess])

  if (isSuccess) {
    return <AddRules dataList={dataList} />
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
