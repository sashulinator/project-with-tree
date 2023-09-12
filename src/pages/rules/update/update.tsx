import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useFetchRule } from '~/api/rules/fetch-rule'
import { requestRuleUpdate } from '~/api/rules/requests/update-rule'
import { RequestData } from '~/api/rules/types/RequestRule'
import { getReqForCreateRule } from '~/entities/rule/lib/get-request-for-create-rule'
import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import { Editor } from '~/entities/rule/ui/editor'
import { notify } from '~/shared/notify'

// import { domains } from '../../../entities/rules/ui/editor/widgets/domain-list/ui/data'

export default function RulesUpdatePage(): JSX.Element {
  const { id } = useParams()

  const mutation = useMutation((requestData: RequestData) => requestRuleUpdate(requestData, id), {
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const data = useFetchRule({}, id as string)

  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  return (
    <main>
      {(data.isLoading || id !== data.data?.data.id) && <div>Загрузка</div>}
      {data.isError || (fetcher.isError && <div>Ошибка</div>)}
      {data.isSuccess && fetcher.isSuccess && id === data.data?.data.id && (
        <Editor rule={data.data?.data} onSubmit={onSubmit} dataList={fetcher.data?.items} />
      )}
    </main>
  )

  // Private
  function onSubmit(editorValue: EditorValues[], name: string, keyName: string): void {
    mutation.mutate(getReqForCreateRule(editorValue, name, keyName))
  }
}
