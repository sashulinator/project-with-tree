// https://www.svgrepo.com/svg/471863/search-md

import Icon, { IconProps } from '../ui/icon'

export function SearchIcon(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        d='M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
        stroke='#000000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}
