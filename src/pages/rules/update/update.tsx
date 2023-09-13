import { useParams } from 'react-router-dom'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useFetchRule } from '~/api/rules/fetch-rule'
import { useUpdateRule } from '~/api/rules/update'
import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import { Editor } from '~/entities/rule/ui/editor'
import { notify } from '~/shared/notify'

export default function RulesUpdatePage(): JSX.Element {
  const { id } = useParams()

  const updateRuleMutation = useUpdateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
    },
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
    updateRuleMutation.mutate({
      id: id as string,
      name: name,
      keyName: keyName,
      frontValue: editorValue,
      userId: 'user@mail.ru',
    })
  }
}
