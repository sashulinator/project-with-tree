import Flex from '~/abstract/flex/ui/flex'
import { Route } from '~/pages/storybook/shared/routes'
import Chip from '~/ui/chip'

interface ChipsProps {
  route: Route
}

const COLORS = {
  abstract: 'red',
  variant: 'blue',
  private: 'violet',
  widget: 'aqua',
  ui: 'green',
}

export default function Chips(props: ChipsProps): JSX.Element | null {
  if (props.route.type?.length === 0) {
    return null
  }
  return (
    <Flex className='storybook-Chips' gap='xs'>
      {props.route.type?.map((t) => {
        return (
          <Chip type='div' key={t} height={null} color={COLORS[t]}>
            <span style={{ padding: '0 .1rem', fontSize: '0.7em' }}>{t}</span>
          </Chip>
        )
      })}
    </Flex>
  )
}
