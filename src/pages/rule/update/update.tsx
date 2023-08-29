import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

import { useFetchRule } from '~/api/rules/fetch-rule'
import { requestRuleUpdate } from '~/api/rules/requests/update-rule'
import { RequestData } from '~/api/rules/types/RequestRule'
import { getReqForCreateRule } from '~/entities/rules/lib/get-request-for-create-rule'
import { EditorValues } from '~/entities/rules/models/editorRulesValues'
import { Editor } from '~/entities/rules/ui/editor'
import { notify } from '~/shared/notify'

import { domains } from '../../../entities/rules/ui/editor/widgets/domain-list/ui/data'

export default function RulesUpdatePage(): JSX.Element {
  const { id } = useParams()

  const mutation = useMutation((requestData: RequestData) => requestRuleUpdate(requestData, id), {
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const data = useFetchRule({}, id as string)

  return (
    <main>
      {(data.isLoading || id !== data.data?.data.id) && <div>Загрузка</div>}
      {data.isError && <div>Ошибка</div>}
      {data.isSuccess && id === data.data?.data.id && (
        <Editor rule={data.data?.data} onSubmit={onSubmit} dataList={domains} />
      )}
    </main>
  )

  // Private
  function onSubmit(editorValue: EditorValues[], title: string): void {
    mutation.mutate(getReqForCreateRule(editorValue, title))
  }
}
