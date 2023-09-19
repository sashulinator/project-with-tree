/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './item.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useRef } from 'react'
import { Mention } from 'react-mentions'

import { RuleItem } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Input as MentionsInput } from '~/ui/mentions'
import { Id, c } from '~/utils/core'

interface Props {
  rule: RuleItem
  deleteRule?: (id: Id) => void
  setRules?: (rules: RuleItem[]) => void
  rules?: RuleItem[]
}

Item.displayName = 'e-Rule-Editor-w-Item'

function Item(props: Props): JSX.Element {
  const { rule, deleteRule = (): void => {}, setRules = (): void => {}, rules } = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: rule.id,
    data: {
      type: 'RuleItem',
      rule: rule,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, opacity: isDragging ? 0.3 : 1 }}
      {...attributes}
      {...listeners}
      className={c(Item.displayName)}
    >
      <MentionsInput value={rule.content} onChange={handleChangeMention} inputRef={inputRef}>
        <Mention data={[{ display: 'test', id: 'test-id' }]} trigger={'@'} />
      </MentionsInput>

      <GhostButton square onClick={(): void => deleteRule(rule.id)}>
        <Close />
      </GhostButton>
    </div>
  )

  function handleChangeMention(_: unknown, v: string): void {
    if (rules) {
      const newRules = rules.map((item) => {
        if (item.id === rule.id) return { ...item, content: v }
        return item
      })
      setRules(newRules)
      console.log(rules)
    }
  }
}

export default Item
