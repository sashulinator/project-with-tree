import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { MentionsItem } from '~/entities/rule/ui/editor/widgets/rules/widgets/item/widgets/input/ui/input'

export const addDataMentions = (arr: ParentDomainRes[]): MentionsItem[] => {
  const result: MentionsItem[] = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  arr.forEach(({ domain, attributes, childDomains }) => {
    result.push({ id: `domain, ${domain.id}`, display: domain.name })
    attributes.forEach(({ id, name }) => {
      result.push({ id: `attribute, ${id}`, display: name })
    })
    // if (childDomains.length > 0) {
    //   result = [...result, ...addDataMentions(childDomain)]
    // }
  })
  return result
}
