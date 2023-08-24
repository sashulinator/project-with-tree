import './page-section.css'

import { emitter } from '~/shared/emitter'
import Paper from '~/ui/paper'
import { c } from '~/utils/core'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

PageSection.displayName = 'ui-PageSection'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PageSection(props: PageSectionProps): JSX.Element {
  return <Paper {...props} className={c(props.className, PageSection.displayName)} />
}
