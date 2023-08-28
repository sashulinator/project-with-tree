import { useMutation } from 'react-query'

import { requestRule } from '~/api/rules/requests/create-rule'
import { getReqForCreateRule } from '~/entities/rules/lib/get-request-for-create-rule'
import { EditorValues } from '~/entities/rules/models/editorRulesValues'
import { Editor } from '~/entities/rules/ui/editor'
import { notify } from '~/shared/notify'

import { domains } from '../../../entities/rules/ui/editor/widgets/domain-list/ui/data'

export default function RulesCreatePage(): JSX.Element {
  const mutation = useMutation(requestRule, {
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main>
      <Editor rule={null} onSubmit={onSubmit} dataList={domains} />
    </main>
  )

  // Private
  function onSubmit(editorValue: EditorValues[], title: string): void {
    mutation.mutate(getReqForCreateRule(editorValue, title))
  }
}
