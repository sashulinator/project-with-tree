import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { MentionsItem } from '~/entities/rules/ui/editor-rules/editor-input'

export const addDataMentions = (arr: DomainItemProps[]): MentionsItem[] => {
  let result: MentionsItem[] = []
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
