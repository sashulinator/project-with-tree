import './ui-component.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

UIComponent.displayName = 'ui-Component'

export interface UIComponentProps {}

export default function UIComponent(props: UIComponentProps): JSX.Element {
  return <div className={clsx(UIComponent.displayName)}>UIComponent</div>
}
