import Icon, { IconProps } from '../ui/icon'

export function Merge(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <path
        d='M3 12H21M12 2V8.5M12 8.5L16 4.5M12 8.5L8 4.5M12 22V15.5M12 15.5L16 19.5M12 15.5L8 19.5'
        stroke='#000000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}
