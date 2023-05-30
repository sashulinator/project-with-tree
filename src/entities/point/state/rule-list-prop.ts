import { Rule } from '~/entities/rule'
import { Id, assertDefined } from '~/utils/core'
import { remove } from '~/utils/dictionary'
import { EmitterableProp } from '~/utils/emitter'

export class RuleListProp<N extends string> extends EmitterableProp<N, Rule[]> {
  get = (id: Id): Rule => {
    const rule = this.value.find((rule) => rule.id === id)
    assertDefined(rule)
    return rule
  }

  add = (rule: Rule): void => {
    this.value = [...this.value, rule]
  }

  update = (rule: Rule): void => {
    const newRules = this.value.map((irule) => (irule.id === rule.id ? rule : irule))
    this.value = newRules
  }

  removeLink = (id: Id): void => {
    const rule = this.get(id)
    const newRule = remove(rule, 'pointId')
    this.update(newRule)
  }
}
