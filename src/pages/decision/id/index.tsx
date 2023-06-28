import './index.css'

import { useParams } from 'react-router-dom'

import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import { Editor } from '~/entities/decision'

export default function DecisionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const decision = useFetchDecisionMock({}, { id })

  return <main className='DecisionIdPage'>{decision.data && <Editor decision={decision.data} />}</main>

  // Private
}
