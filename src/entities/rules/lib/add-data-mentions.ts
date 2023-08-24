import { DomainRes } from '~/entities/rules/types/rules-type'
import { MentionsItem } from '~/entities/rules/ui/editor/widgets/rules/widgets/item/widgets/input/ui/input'

export const addDataMentions = (arr: DomainRes[]): MentionsItem[] => {
  const result: MentionsItem[] = []
  arr.forEach(({ id, name, attributes }) => {
    result.push({ id: id, display: name })
    attributes.forEach(({ id, name }) => {
      result.push({ id: id, display: name })
    })
    // if (childDomain) {
    //   result = [...result, ...addDataMentions(childDomain)]
    // }
  })
  return result
}
