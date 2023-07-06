import './link.css'

import { clsx } from 'clsx'
import { LinkProps, Link as RRDLink } from 'react-router-dom'

import { emitter } from '~/shared/emitter'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

Link.displayName = 'ui-Link'

export type { LinkProps }

export default function Link(props: LinkProps): JSX.Element {
  return <RRDLink className={clsx(Link.displayName)} {...props} />
}
