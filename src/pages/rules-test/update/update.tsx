import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useFetchRule } from '~/api/rules/fetch-rule'
import { useUpdateRule } from '~/api/rules/update'
import { EditorValues } from '~/entities/rule-test/types/type'
import Editor from '~/entities/rule-test/ui/editor'
import { notify } from '~/shared/notify'
import Dialog from '~/ui/modal/variants/dialog/ui/dialog'

export default function RulesTestUpdatePage(): JSX.Element {
  const { id } = useParams()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateRuleMutation = useUpdateRule({
    onSuccess: () => {
      notify({ data: 'Создано', type: 'success' })
      void data.refetch()
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const data = useFetchRule({}, id as string)

  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [openModal, setOpenModal] = useState<{ editorValue: EditorValues[]; name: string; keyName: string } | null>(
    null
  )

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Редактирование правила  */}
      <Dialog
        firstFocused={true}
        text={`Вы уверены что хотите изменить правило: ${openModal?.name}?`}
        onSubmit={updateRule}
        opened={openModal}
        onDismiss={(): void => setOpenModal(null)}
      />
      {(data.isLoading || id !== data.data?.data.id) && <div>Загрузка</div>}
      {data.isError || (fetcher.isError && <div>Ошибка</div>)}
      {data.isSuccess && fetcher.isSuccess && id === data.data?.data.id && (
        <Editor rule={data.data?.data} handleOpenModal={setOpenModal} dataList={fetcher.data?.items} />
      )}
    </main>
  )

  // Private
  function updateRule(): void {
    if (openModal) {
      updateRuleMutation.mutate({
        id: id as string,
        name: openModal.name,
        keyName: openModal.keyName,
        frontValue: openModal.editorValue,
        userId: 'user@mail.ru',
      })
      setOpenModal(null)
    }
  }
}
