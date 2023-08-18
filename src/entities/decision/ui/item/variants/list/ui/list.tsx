import './list.scss'

import { Decision } from '~/entities/decision'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'

import Item from '../../..'

List.displayName = 'decision-Item-v-List'

export interface Props {
  className?: string
  list: Decision[]
}

export default function List(props: Props): JSX.Element {
  return (
    <ul className={c(props.className, List.displayName)}>
      {props.list.map((item: Decision, i) => {
        return (
          <AppearFrom key={item.id} from={{ y: 10 }} delay={i * 30}>
            <Item item={item} />
          </AppearFrom>
        )
      })}
    </ul>
  )
}
