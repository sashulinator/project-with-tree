import { decision } from './decision'
import { decisionWithLinked } from './decision-with-linked'

const decisions = {
  [decision.id]: decision,
  [decisionWithLinked.id]: decisionWithLinked,
}

export { decision, decisionWithLinked, decisions }
