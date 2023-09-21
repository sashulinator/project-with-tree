/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './item.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useRef } from 'react'
import { Mention } from 'react-mentions'

import { MentionsItem, RuleItem, SelectValue } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'
import { Input as MentionsInput } from '~/ui/mentions'
import { Id, c } from '~/utils/core'

import Select from '../widget/select'

interface Props {
  rule: RuleItem
  deleteRule?: (id: Id) => void
  setRules?: (rules: RuleItem[]) => void
  rules?: RuleItem[]
  mentionsData?: MentionsItem[]
  showSelect?: boolean
}

Item.displayName = 'e-Rule-Editor-w-Item'

function Item(props: Props): JSX.Element {
  const {
    rule,
    deleteRule = (): void => {},
    setRules = (): void => {},
    rules,
    mentionsData = [],
    showSelect = true,
  } = props

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
    <>
      <div
        ref={setNodeRef}
        style={{ ...style, opacity: isDragging ? 0.3 : 1 }}
        {...attributes}
        {...listeners}
        className={c(Item.displayName)}
      >
        <MentionsInput value={rule.value} onChange={handleChangeMention} inputRef={inputRef}>
          <Mention style={{ backgroundColor: 'var(--mentionItem_bg)' }} data={mentionsData} trigger={'@'} />
        </MentionsInput>

        <GhostButton square onClick={(): void => deleteRule(rule.id)}>
          <Trash />
        </GhostButton>
      </div>
      {showSelect && <Select handleChangeSelect={handleChangeSelect} rule={rule} />}
    </>
  )

  function handleChangeMention(_: unknown, v: string): void {
    if (rules) {
      const newRules = rules.map((item) => {
        if (item.id === rule.id) return { ...item, value: v }
        return item
      })
      setRules(newRules)
    }
  }

  function handleChangeSelect(options: SelectValue): void {
    if (rules) {
      const newRules = rules.map((item) => {
        if (item.id === rule.id) return { ...item, condition: options }
        return item
      })
      setRules(newRules)
    }
  }
}

export default Item
