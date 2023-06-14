import './joint.css'

import { Id } from '~/utils/core'

interface JointProps {
  linkId: Id
}

export function Joint(props: JointProps): JSX.Element {
  return <div data-link-id={props.linkId} className='point-Joint' />
}
