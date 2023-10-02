import Flex from '~/abstract/flex/ui/flex'
import { ArbitrationProps as IArbitrationProps } from '~/entities/decision/types/point'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled/ui/labeled'
import { c } from '~/utils/core'
import { Prop } from '~/utils/emitter'
import { useUpdate } from '~/utils/hooks'

import { NodeController } from '../../../../canvas'

ArbitrationProps.displayName = 'decision-Editor-RightPanel-ArbitrationProps'

export interface Props {
  className?: string
  controller: NodeController | null
}

export default function ArbitrationProps(props: Props): JSX.Element {
  useUpdate(subscribeToChanges)

  const arbitrationProps = props.controller?.props as unknown as Prop<'props', IArbitrationProps>

  return (
    <Flex className={c(props.className, ArbitrationProps.displayName)} width='100%' dir='column' gap='xl'>
      <Labeled label='Тип разбиения'>
        <Input
          value={arbitrationProps.value.partitionType || ''}
          onChange={(ev): void => {
            arbitrationProps.set({ ...arbitrationProps.value, partitionType: ev.target.value })
          }}
        />
      </Labeled>
      <Labeled label='Id разбиения'>
        <Input
          value={arbitrationProps.value.partitionTypeId || ''}
          onChange={(ev): void => {
            arbitrationProps.set({ ...arbitrationProps.value, partitionTypeId: ev.target.value })
          }}
        />
      </Labeled>
      <Labeled label='Размер контрольной группы '>
        <Input
          type='number'
          value={arbitrationProps.value.percentCg || ''}
          onChange={(ev): void => {
            arbitrationProps.set({ ...arbitrationProps.value, percentCg: parseInt(ev.target.value) })
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
