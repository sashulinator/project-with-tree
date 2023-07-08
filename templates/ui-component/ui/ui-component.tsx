import './ui-component.css'

import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { c } from '~/utils/core'

emitter.emit('addTheme', { dark, light })

UIComponent.displayName = 'ui-Component'

export interface UIComponentProps {
  className: string
}

export default function UIComponent(props: UIComponentProps): JSX.Element {
  return <div className={c(UIComponent.displayName)}>UIComponent</div>
}
