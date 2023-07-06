import './page-section.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'

import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

PageSection.displayName = 'ui-PageSection'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PageSection(props: PageSectionProps): JSX.Element {
  return <div {...props} className={clsx(props.className, PageSection.displayName)} />
}
