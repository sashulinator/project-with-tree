import './ol.css'

import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

OlComponent.displayName = 'ui-List-v-Ol'

function OlComponent(props: React.HTMLAttributes<HTMLOListElement>, ref: ForwardedRef<HTMLOListElement>): JSX.Element {
  return <ol ref={ref} className={c(OlComponent.displayName)} {...props} />
}

const Ol = forwardRef(OlComponent)
export { Ol }
