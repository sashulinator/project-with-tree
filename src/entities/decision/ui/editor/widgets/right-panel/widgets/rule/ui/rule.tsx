import { UnstyledButton } from '~/abstract/button'
import { RulesRes } from '~/entities/rule/types/rules-type'
import { Id, c } from '~/utils/core'

Rule.displayName = 'Rule'

export interface Props {
  className?: string
  rule: RulesRes
  onSelect: (id: Id) => void
}

export default function Rule(props: Props): JSX.Element {
  return (
    <UnstyledButton
      className={c(props.className, Rule.displayName)}
      onClick={(): void => props.onSelect(props.rule.id)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          textAlign: 'start',
        }}
      >
        {props.rule.name}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          opacity: '0.7',
          textAlign: 'start',
        }}
      >
        {props.rule.keyName}
      </div>
    </UnstyledButton>
  )
}
