import './form.css'

import { useForm } from 'react-hook-form'

import Flex from '~/abstract/flex'
import { RulesRes } from '~/entities/rule-test/types/type'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled/ui/labeled'
import { c } from '~/utils/core'

Form.displayName = 'domain-Form'

export interface Props {
  className?: string
  ruleCopy: Partial<RulesRes>
  onSubmit: (ruleCopy: RulesRes) => void
}

export default function Form(props: Props): JSX.Element | null {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RulesRes>({
    defaultValues: {
      ...props.ruleCopy,
      name: `${props.ruleCopy.name}-copy`,
      keyName: `${props.ruleCopy.keyName}-copy`,
    },
  })

  return (
    <Flex width='25rem' dir='column'>
      <Flex
        as='form'
        dir='column'
        crossAxis='stretch'
        gap='xl'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(props.onSubmit)}
        width='100%'
      >
        <Labeled label='Name'>
          <Input
            id='name'
            className={c('add-rule-input', errors.name && '--error')}
            {...register('name', { required: true })}
          />
          {errors.name && <span>Обязательное поле</span>}
        </Labeled>
        <Labeled label='keyName'>
          <Input
            className={c('add-rule-input', errors.keyName && '--error')}
            {...register('keyName', { required: true })}
          />
          {errors.keyName && <span>Обязательное поле</span>}
        </Labeled>
        <PrimaryButton type='submit'>Создать</PrimaryButton>
      </Flex>
    </Flex>
  )
}
