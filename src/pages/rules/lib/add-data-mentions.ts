import { RulesItem } from '~/entities/rules/types/rules-type'
import { IMentionsItem } from '~/entities/rules/ui/mentions/types/types'

const addDataMentions = (arr: RulesItem[]): IMentionsItem[] => {
  let result: IMentionsItem[] = []
  arr.forEach(({ domainNodeType, domainName, attributes, childDomain }) => {
    result.push({ id: domainNodeType, display: domainName })
    attributes.forEach(({ nodeType, name }) => {
      result.push({ id: nodeType, display: name })
    })
    if (childDomain) {
      result = [...result, ...addDataMentions(childDomain)]
    }
  })
  return result
}

export default addDataMentions
