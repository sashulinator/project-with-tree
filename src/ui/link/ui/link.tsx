import './link.css'

import { LinkProps, Link as RRDLink } from 'react-router-dom'

import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addThemes', { dark, light })

Link.displayName = 'ui-Link'

export type { LinkProps }

export default function Link(props: LinkProps): JSX.Element {
  return <RRDLink {...props} className={c(Link.displayName)} />
}
