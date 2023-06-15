import { Rule } from '~/entities/rule/types/rule'
import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'

import { LinkEvents } from './events'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

export class LinkState extends Emitter<LinkEvents> {
  id: Id

  rule: Rule
  constructor(props: LinkStateProps) {
    super()

    this.rule = props.rule

    this.id = props.id
  }
}
