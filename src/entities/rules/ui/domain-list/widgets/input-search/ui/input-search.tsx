import './input-search.css'
import { SearchIcon } from '~/ui/icon'
import Input from '~/ui/input'
import { c } from '~/utils/core'
import { GhostButton } from '~/ui/button'

InputSearch.displayName = 'e-Rules-ui-DomainList-InputSearch'

interface InputSearchProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function InputSearch(props: InputSearchProps): JSX.Element {
  const { rootProps } = props
  return (
    <div className={c(InputSearch.displayName, rootProps?.className)} {...rootProps}>
      <Input
        right={
          <GhostButton
            style={{ marginRight: '5px' }}
            round={true}
            height='s'
            //   onClick={fns(
            //     preventDefault,
            //     (): void => setVisible(!visible),
            //     (): void => inputRef.current?.focus()
            //   )}
          >
            <SearchIcon />
          </GhostButton>
        }
      />
    </div>
  )
}
