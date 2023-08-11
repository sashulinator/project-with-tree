import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471919/spacing-width-01

export function SpacingWidth(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 12h12M6 12l2-3m-2 3 2 3m10-3-2-3m2 3-2 3m5 6V3M3 21V3'
      />
    </Icon>
  )
}
