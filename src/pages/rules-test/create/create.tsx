import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useCreateRule } from '~/api/rules/create'
import { RuleEditor } from '~/entities/rule-test'
import { EditorValues } from '~/entities/rule-test/types/type'
import { notify } from '~/shared/notify'

RuleTestCreatePage.displayName = 'RuleTestCreatePage'

function RuleTestCreatePage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const createRuleMutation = useCreateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <RuleEditor rule={null} dataList={fetcher.data.items} onSubmit={onSubmit} />}
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

export default RuleTestCreatePage
