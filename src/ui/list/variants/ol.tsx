import { ForwardedRef, forwardRef } from 'react'
import './ol.css'

import { clsx } from 'clsx'

OlComponent.displayName = 'ui-List-v-Ol'

function OlComponent(props: React.HTMLAttributes<HTMLOListElement>, ref: ForwardedRef<HTMLOListElement>): JSX.Element {
  return <ol ref={ref} className={clsx(OlComponent.displayName)} {...props} />
}

const Ol = forwardRef(OlComponent)
export { Ol }
