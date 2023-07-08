import Icon, { IconProps } from '../ui/icon'

// https://www.svgrepo.com/svg/471638/x-close

export function Close(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M18 6 6 18M6 6l12 12'
      />
    </Icon>
  )
}
