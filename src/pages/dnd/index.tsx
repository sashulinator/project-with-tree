import './index.css'

import DndCanvas from '~/ui/dnd-canvas/ui/dnd-canvas'

DndPage.displayName = 'DndPage'

function DndPage(): JSX.Element {
  return (
    <main className={DndPage.displayName}>
      <DndCanvas />
    </main>
  )
}

export default DndPage
