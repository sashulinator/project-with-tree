import './input-search.css'

import { GhostButton } from '~/ui/button'
import { SearchIcon } from '~/ui/icon'
import Input, { InputProps } from '~/ui/input'
import { c } from '~/utils/core'

InputSearch.displayName = 'e-Rules-ui-DomainList-InputSearch'

interface InputSearchProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  inputProps?: InputProps
}

export default function InputSearch(props: InputSearchProps): JSX.Element {
  const { rootProps } = props
  return (
    <div className={c(InputSearch.displayName, rootProps?.className)} {...rootProps}>
      <Input
        style={{ paddingTop: '22px' }}
        right={
          <GhostButton style={{ marginRight: '5px' }} round={true} height='s'>
            <SearchIcon />
          </GhostButton>
        }
        {...props.inputProps}
      />
    </div>
  )
}
