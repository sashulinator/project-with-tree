import './list.scss'

import { Decision } from '~/entities/decision'
import { AppearFrom } from '~/ui/animation'
import { Id, c } from '~/utils/core'

import Item from '../../..'

List.displayName = 'decision-Item-v-List'

export interface Props {
  className?: string
  list: Decision[]
  handleOpenModalRemove: (data: { name: string; id: Id }) => void
}

export default function List(props: Props): JSX.Element {
  return (
    <ul className={c(props.className, List.displayName)}>
      {props.list.map((item: Decision, i) => {
        return (
          <AppearFrom key={item.id} from={{ y: 10 }} delay={i * 30}>
            <Item item={item} handleOpenModalRemove={props.handleOpenModalRemove} />
          </AppearFrom>
        )
      })}
    </ul>
  )
}
