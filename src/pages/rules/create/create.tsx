import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useCreateRule } from '~/api/rules/create'
import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import { Editor } from '~/entities/rule/ui/editor'
import { notify } from '~/shared/notify'

// import { domains } from '../../../entities/rules/ui/editor/widgets/domain-list/ui/data'

export default function RulesCreatePage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const createRuleMutation = useCreateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main>
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <Editor rule={null} onSubmit={onSubmit} dataList={fetcher.data.items} />}
    </main>
  )

  // Private
  function onSubmit(editorValue: EditorValues[], name: string, keyName: string): void {
    createRuleMutation.mutate({
      name: name,
      keyName: keyName,
      frontValue: editorValue,
      userId: 'user@mail.ru',
    })
  }
}
