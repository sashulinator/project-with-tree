import './index.css'

import { useParams } from 'react-router-dom'

import { useFetchDecision } from '~/api/decision/fetch'
import { Editor } from '~/entities/decision'
import { assertDefined } from '~/utils/core'

export default function DecisionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  assertDefined(id)
  const fetcher = useFetchDecision({ id })

  return <main className='DecisionIdPage'>{fetcher.data && <Editor decision={fetcher.data} />}</main>

  // Private
}
