import { ForwardedRef, forwardRef } from 'react'
import './paragraph.css'

import { clsx } from 'clsx'

ParagraphComponent.displayName = 'ui-Paragraph'

function ParagraphComponent(
  props: React.HTMLAttributes<HTMLParagraphElement>,
  ref: ForwardedRef<HTMLParagraphElement>
): JSX.Element {
  return <p ref={ref} className={clsx(ParagraphComponent.displayName)} {...props} />
}

const Paragraph = forwardRef(ParagraphComponent)
export default Paragraph
