import { Control } from './control'
import { Props } from './props'

export interface Config<State> {
  getName: () => string

  getPath?: () => string

  getDescription: () => JSX.Element | string

  element: (props: Props<State>) => JSX.Element

  controls: Control[]
}
