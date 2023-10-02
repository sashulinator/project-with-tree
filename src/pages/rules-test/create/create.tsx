import { useState } from 'react'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useCreateRule } from '~/api/rules/create'
import { RuleEditor } from '~/entities/rule-test'
import { EditorValues } from '~/entities/rule-test/types/type'
import { notify } from '~/shared/notify'
import Dialog from '~/ui/modal/variants/dialog/ui/dialog'

RuleTestCreatePage.displayName = 'RuleTestCreatePage'

function RuleTestCreatePage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const createRuleMutation = useCreateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const [openModal, setOpenModal] = useState<{ editorValue: EditorValues[]; name: string; keyName: string } | null>(
    null
  )

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Создание правила  */}
      <Dialog
        firstFocused={true}
        text={`Вы уверены что хотите создать правило: ${openModal?.name}?`}
        onSubmit={createRule}
        opened={openModal}
        onDismiss={(): void => setOpenModal(null)}
      />
      {fetcher.isLoading && <div>загрузка</div>}
      {fetcher.isError && <div>Ошибка</div>}
      {fetcher.isSuccess && <RuleEditor handleOpenModal={setOpenModal} rule={null} dataList={fetcher.data.items} />}
    </main>
  )

  // Private
  function createRule(): void {
    if (openModal) {
      createRuleMutation.mutate({
        name: openModal.name,
        keyName: openModal.keyName,
        frontValue: openModal.editorValue,
        userId: 'user@mail.ru',
      })
      setOpenModal(null)
    }
  }
}

export default RuleTestCreatePage
