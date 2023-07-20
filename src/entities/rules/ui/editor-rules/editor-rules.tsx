import { MentionInput } from '~/ui/mentions'
import { fns } from '~/utils/function'
import { preventDefault, stopPropagation } from '~/utils/dom'
import { useState } from 'react'
import { AttributeProps } from '../../types/rules-type'
import { MentionsItem } from '~/ui/mentions/types/types'
import { Mention } from 'react-mentions'
import { useRecoilValue } from 'recoil'
import { activeAttributeAtom } from '~/entities/rules/state/state'

interface EditorRulesProps {
  mentionsData: MentionsItem[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function EditorRules(props: EditorRulesProps): JSX.Element {
  const { mentionsData, value, setValue } = props
  const activeAttribute = useRecoilValue(activeAttributeAtom)
  const drop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (activeAttribute) {
      setValue((v) => `${v}@[${activeAttribute.name}](${activeAttribute.nodeType})`)
    }
  }
  return (
    <div onDragOver={fns<[e: React.DragEvent<HTMLDivElement>]>(preventDefault, stopPropagation)} onDrop={drop}>
      <MentionInput
        value={value}
        onChange={(_, v): void => {
          setValue(v)
        }}
      >
        <Mention
          trigger='@'
          data={mentionsData}
          style={{
            backgroundColor: '#cee4e5',
          }}
        />
      </MentionInput>
    </div>
  )
}
