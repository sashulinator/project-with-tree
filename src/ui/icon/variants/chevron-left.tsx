import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471166/chevron-left

export function ChevronLeft(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path d='M15 18L9 12L15 6' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  )
}
