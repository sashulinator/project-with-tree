import { useMemo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { url, makeRequest } from '~/api/rules/mock/fetch'
import { addDataMentions } from '~/entities/rules/lib/add-data-mentions'
import { mentionsDataAtom } from '~/entities/rules/models/mentionsData'
import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { Create } from '~/entities/rules/ui/editor'
import mockRules from '~/mocks/rules/mock-rules'

export default function RulesPage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery([url, mockRules.name, { id: mockRules.id }], () =>
    makeRequest({ id: mockRules.id })
  )

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  const dataList: DomainItemProps[] = useMemo(() => {
    return isSuccess ? data.data.data : []
  }, [isSuccess])

  useEffect(() => {
    setMentionsData(addDataMentions(dataList))
  }, [isSuccess])

  if (isSuccess) {
    return <Create dataList={dataList} />
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ошибка...</div>
}
