import './paper.css'

import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { c } from '~/utils/core'

emitter.emit('addTheme', { dark, light })

Paper.displayName = 'ui-Paper'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function Paper(props: PaperProps): JSX.Element {
  return <div {...props} className={c(Paper.displayName, props.className)} />
}
