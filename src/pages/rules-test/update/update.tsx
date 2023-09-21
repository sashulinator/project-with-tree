import { useParams } from 'react-router-dom'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useFetchRule } from '~/api/rules/fetch-rule'
import { useUpdateRule } from '~/api/rules/update'
import { EditorValues } from '~/entities/rule-test/types/type'
import Editor from '~/entities/rule-test/ui/editor'
import { notify } from '~/shared/notify'

export default function RulesTestUpdatePage(): JSX.Element {
  const { id } = useParams()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateRuleMutation = useUpdateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const data = useFetchRule({}, id as string)

  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {(data.isLoading || id !== data.data?.data.id) && <div>Загрузка</div>}
      {data.isError || (fetcher.isError && <div>Ошибка</div>)}
      {data.isSuccess && fetcher.isSuccess && id === data.data?.data.id && (
        <Editor rule={data.data?.data} onSubmit={onSubmit} dataList={fetcher.data?.items} />
      )}
    </main>
  )

  // Private
  // function onSubmit(editorValue: EditorValues[], name: string, keyName: string): void {
  //   updateRuleMutation.mutate({
  //     id: id as string,
  //     name: name,
  //     keyName: keyName,
  //     frontValue: editorValue,
  //     userId: 'user@mail.ru',
  //   })
  // }

  function onSubmit(editorValue: EditorValues[], name: string, keyName: string): void {
    console.log({
      id: id,
      name: name,
      keyName: keyName,
      frontValue: editorValue,
      userId: 'user@mail.ru',
    })
  }
}
