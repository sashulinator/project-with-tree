import './paragraph.css'

import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

ParagraphComponent.displayName = 'ui-Paragraph'

function ParagraphComponent(
  props: React.HTMLAttributes<HTMLParagraphElement>,
  ref: ForwardedRef<HTMLParagraphElement>
): JSX.Element {
  return <p ref={ref} className={c(ParagraphComponent.displayName)} {...props} />
}

const Paragraph = forwardRef(ParagraphComponent)
export default Paragraph
