import { Rule } from '~/entities/rule'
import { EmitterableProp } from '~/utils/emitterable'

export class RuleListProp<N extends string> extends EmitterableProp<N, Rule[]> {
  add = (rule: Rule): void => {
    this.value = [...this.value, rule]
  }
}
