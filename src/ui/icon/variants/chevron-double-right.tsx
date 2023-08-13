import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471169/chevron-right-double

export function ChevronDoubleRight(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        d='M6 17L11 12L6 7M13 17L18 12L13 7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}
