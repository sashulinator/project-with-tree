import './decision.css'

import { useEffect, useMemo } from 'react'

import { EditorState } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { ActionHistory } from '~/utils/action-history'
import { useEventListener } from '~/utils/hooks'
import { ThemeDropdown } from '~/widgets/theme'

import { Editor } from '../../entities/decision/ui/editor'
import { listenHistory } from '../../entities/decision/ui/editor/lib/listen-history'

// import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  return (
    <main className='DecisionPage'>
      <ThemeDropdown />
      <Editor decision={decision} />
    </main>
  )

  // Private
}
