import Icon, { IconProps } from '../ui/icon'

export function Plus(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 5v14m-7-7h14' />
    </Icon>
  )
}
