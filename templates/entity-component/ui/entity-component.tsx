import './entity-component.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

Component.displayName = 'entityName-Component'

export interface ComponentProps {}

export default function Component(props: ComponentProps): JSX.Element {
  return <div className={clsx(Component.displayName)}>Component</div>
}
