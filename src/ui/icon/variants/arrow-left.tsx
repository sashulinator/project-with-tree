import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471002/arrow-left

export function ArrowLeft(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        d='M19 12H5M5 12L12 19M5 12L12 5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}
