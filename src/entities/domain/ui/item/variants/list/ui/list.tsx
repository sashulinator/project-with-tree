import { QueryResult } from '~/api/domain/fetch-parent-domains'
import { ResponseData } from '~/api/domain/request/fetch-parent-domains'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { c } from '~/utils/core'

import Item from '../../../ui/item'

List.displayName = 'domain-Item-v-List'

export interface Props {
  className?: string
  isExpanded?: boolean
  handleAddDomainOpen: (string) => void
  handleAddAttributeOpen: (string) => void
  fetcher: QueryResult<ResponseData>
  list: ParentDomainRes[]
}

export default function List(props: Props): JSX.Element {
  return (
    <div className={c(props.className, List.displayName)}>
      {props.list.map((item) => {
        return (
          <Item
            handleAddAttributeOpen={props.handleAddAttributeOpen}
            handleAddDomainOpen={props.handleAddDomainOpen}
            key={item.domain.id}
            domainData={item}
            fetcher={props.fetcher}
          />
        )
      })}
    </div>
  )
}
