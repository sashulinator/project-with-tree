import './attribute.css'

import { useMutation } from 'react-query'

import { QueryResult } from '~/api/domain/fetch-parent-domains'
import { requestAttributeDelete } from '~/api/domain/request/delete-attribute'
import { ResponseData } from '~/api/domain/request/fetch-parent-domains'
import { AttributeRes } from '~/api/domain/types/attribute'
import { notify } from '~/shared/notify'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'

export interface AttributeProps {
  attribute: AttributeRes
  wrapperProps?: React.HTMLAttributes<HTMLElement>
  titleProps?: React.HTMLAttributes<HTMLElement>
  closeButtonProps?: GhostButtonProps
  fetcher: QueryResult<ResponseData>
}

Attribute.displayName = 'e-ui-attribute'
/**
 * attribute: AttributeRes
 *
 * wrapperProps?: React.HTMLAttributes<HTMLElement>
 *
 * titleProps?: React.HTMLAttributes<HTMLElement>
 *
 * closeButtonProps?: GhostButtonProps
 */
export default function Attribute(props: AttributeProps): JSX.Element {
  const { attribute } = props

  const mutation = useMutation(() => requestAttributeDelete(props.attribute.id), {
    onSuccess: () => {
      void props.fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <div {...props.wrapperProps} className={c(props.wrapperProps?.className, Attribute.displayName)}>
      <h2 {...props.titleProps}>{attribute?.name ? attribute.name : 'нет имени'}</h2>
      <GhostButton onClick={(): void => mutation.mutate()} {...props.closeButtonProps}>
        <Close />
      </GhostButton>
    </div>
  )
}
