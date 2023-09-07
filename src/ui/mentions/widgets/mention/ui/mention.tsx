import './mention.css'

import { DataFunc, DisplayTransformFunc, SuggestionDataItem } from 'react-mentions'

import { c } from '~/utils/core'

Mention.displayName = 'ui-Mentions-w-Mention'

export interface Props {
  onAdd?: ((id: string | number, display: string) => void) | undefined
  renderSuggestion?:
    | ((
        suggestion: SuggestionDataItem,
        search: string,
        highlightedDisplay: React.ReactNode,
        index: number,
        focused: boolean
      ) => React.ReactNode)
    | undefined
  className?: string | undefined
  markup?: string | undefined
  displayTransform?: DisplayTransformFunc | undefined
  trigger: string | RegExp
  isLoading?: boolean | undefined
  data: SuggestionDataItem[] | DataFunc
  appendSpaceOnAdd?: boolean | undefined
  regex?: RegExp | undefined
  /**
   * Private property! Do not use it!
   */
  display?: undefined
}

export function Mention(props: Props): JSX.Element {
  const { display } = props
  return (
    <strong className={c(props.className, Mention.displayName)}>
      <span style={{ visibility: 'hidden' }}>{display}</span>
    </strong>
  )
}

Mention.defaultProps = {
  markup: '@[__display__](__id__)',
  displayTransform: function (id: string, display: string): string {
    return display || id
  },
  onAdd: (): null => null,
  onRemove: (): null => null,
  renderSuggestion: null,
  isLoading: false,
  appendSpaceOnAdd: false,
}

export default Mention
