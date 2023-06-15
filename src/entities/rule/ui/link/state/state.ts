import { Rule } from '~/entities/rule/types/rule'
import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { LinkEvents } from './events'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

export class LinkState extends Emitter<LinkEvents> {
  id: Id

  rule: Prop<'rule', Rule>
  constructor(props: LinkStateProps) {
    super()

    this.id = props.id

    this.rule = new Prop('rule', props.rule, this)
  }
}
