import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCreateRule } from '~/api/rules/create'
import { useFetchRulesList } from '~/api/rules/fetch-rules'
import { RuleCopyForm } from '~/entities/rule-test'
import { RulesRes } from '~/entities/rule-test/types/type'
import ListRules from '~/entities/rule-test/ui/list/list-rules'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Modal from '~/ui/modal'

export default function RuleTestListPage(): JSX.Element {
  const fetcher = useFetchRulesList({ page: 1, limit: 1000 })

  const dataList = fetcher.data?.items

  const [ruleCopy, setRuleCopy] = useState<{ name: string; keyName: string } | null>(null)

  const createRuleMutation = useCreateRule({
    onSuccess: () => {
      void fetcher.refetch()
      setRuleCopy(null)
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <Button style={{ marginBottom: '20px' }}>
        <Link className='Link' to={routes.ruleTestCreate.path.replace(':id', 'new')}>
          Добавить правило
        </Link>
      </Button>
      <Modal firstFocused={true} opened={ruleCopy !== null} onDismiss={(): void => setRuleCopy(null)}>
        <RuleCopyForm ruleCopy={ruleCopy !== null ? ruleCopy : {}} onSubmit={copyRule} />
      </Modal>
      {fetcher.isError && <div>error...</div>}
      {fetcher.isLoading && <div>loading...</div>}
      {fetcher.isSuccess && <ListRules handleCopyRuleOpen={setRuleCopy} fetcher={fetcher} list={dataList || []} />}
    </main>
  )

  function copyRule(rule: RulesRes): void {
    createRuleMutation.mutate({
      name: rule.name,
      keyName: rule.keyName,
      frontValue: rule.frontValue,
      userId: 'user@mail.ru',
    })
  }
}
