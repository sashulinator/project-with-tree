import './item.scss'

import { Decision } from '~/entities/decision'
import { routes } from '~/shared/routes'
import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import Link from '~/ui/link'
import { Id, c } from '~/utils/core'

Item.displayName = 'decision-Item'

export interface Props {
  className?: string
  item: Decision
  handleOpenModalRemove: (data: { name: string; id: Id }) => void
}

export default function Item(props: Props): JSX.Element {
  return (
    <div className={c(props.className, Item.displayName)}>
      <NameCell {...props} />
      {/* <VersionCell {...props} /> */}
      <StatusCell {...props} />
      <GhostButton
        round={true}
        onClick={(): void => props.handleOpenModalRemove({ id: props.item.id, name: props.item.name })}
      >
        <Close />
      </GhostButton>
    </div>
  )
}

function NameCell(props: Props): JSX.Element {
  return (
    <div className='nameCell'>
      <Link to={routes.decisionId.path.replace(':id', props.item?.id.toString() || '')}>{props.item?.name}</Link>
    </div>
  )
}

// function VersionCell(props: Props): JSX.Element {
//   return <div className='versionCell'>{props.item?.rev}</div>
// }

function StatusCell(props: Props): JSX.Element {
  return <div className={c('statusCell', `--${props.item?.rev.toLowerCase()}`)}>{props.item?.updatedBy}</div>
}
