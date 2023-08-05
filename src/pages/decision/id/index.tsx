import './index.css'

import { useParams } from 'react-router-dom'

import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import { Editor } from '~/entities/decision'

export default function DecisionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const fetcher = useFetchDecisionMock({}, { id })

  return <main className='DecisionIdPage'>{fetcher.data && <Editor decision={fetcher.data} />}</main>

  // Private
}
