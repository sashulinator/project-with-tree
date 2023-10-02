import Flex from '~/abstract/flex/ui/flex'
import { ControlGroupProps as IControlGroupProps } from '~/entities/decision/types/point'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled/ui/labeled'
import { c } from '~/utils/core'
import { Prop } from '~/utils/emitter'
import { useUpdate } from '~/utils/hooks'

import { NodeController } from '../../../../canvas'

ControlGroupProps.displayName = 'decision-Editor-RightPanel-ControlGroupProps'

export interface Props {
  className?: string
  controller: NodeController | null
}

export default function ControlGroupProps(props: Props): JSX.Element {
  useUpdate(subscribeToChanges)

  const controlGrouProps = props.controller?.props as unknown as Prop<'props', IControlGroupProps>

  return (
    <Flex className={c(props.className, ControlGroupProps.displayName)} width='100%' dir='column' gap='xl'>
      <Labeled label='Тип разбиения'>
        <Input
          value={controlGrouProps.value.partitionType || ''}
          onChange={(ev): void => {
            controlGrouProps.set({ ...controlGrouProps.value, partitionType: ev.target.value })
          }}
        />
      </Labeled>
      <Labeled label='Id разбиения'>
        <Input
          value={controlGrouProps.value.partitionTypeId || ''}
          onChange={(ev): void => {
            controlGrouProps.set({ ...controlGrouProps.value, partitionTypeId: ev.target.value })
          }}
        />
      </Labeled>
      <Labeled label='Размер контрольной группы '>
        <Input
          type='number'
          value={controlGrouProps.value.percentCg || ''}
          onChange={(ev): void => {
            controlGrouProps.set({ ...controlGrouProps.value, percentCg: parseInt(ev.target.value) })
          }}
        />
      </Labeled>
    </Flex>
  )

  // Private

  function subscribeToChanges(update: () => void, uns: ((() => void) | undefined)[]): void {
    uns.push(props.controller?.on('*', update))
  }
}
