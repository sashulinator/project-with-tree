import { useMutation } from 'react-query'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { requestRule } from '~/api/rules/requests/create-rule'
import { getReqForCreateRule } from '~/entities/rule/lib/get-request-for-create-rule'
import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import { Editor } from '~/entities/rule/ui/editor'
import { notify } from '~/shared/notify'

// import { domains } from '../../../entities/rules/ui/editor/widgets/domain-list/ui/data'

export default function RulesCreatePage(): JSX.Element {
  const mutation = useMutation(requestRule, {
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  return (
    <main>
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <Editor rule={null} onSubmit={onSubmit} dataList={fetcher.data.items} />}
    </main>
  )

  // Private
  function onSubmit(editorValue: EditorValues[], title: string): void {
    mutation.mutate(getReqForCreateRule(editorValue, title))
  }
}
