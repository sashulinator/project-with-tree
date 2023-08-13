import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471167/chevron-left-double

export function ChevronDoubleLeft(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        d='M18 17L13 12L18 7M11 17L6 12L11 7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}
