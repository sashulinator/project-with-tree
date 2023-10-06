import './item.css'

import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import Accordion from '~/abstract/accordion'
import { UpdateAttribute } from '~/api/attribute/requests/update'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { AttributeItem } from '~/entities/attribute'
import { Domain } from '~/entities/domain/types/domain'
import { draggableCardAtom } from '~/models/draggableCard'
import { Id, c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

import Header from '../widget/header/ui/header'

export interface Props {
  domainData: ParentDomainRes
  isDraggable?: boolean
  isExpanded?: boolean
  pLeft?: number
  isRightToEdit?: boolean
  openModalDialog?: (domain: { id: Id; name: string }) => void
  removeAttribute?: (id: Id) => void
  handleAddDomainOpen?: (id: Id) => void
  handleUpdateDomainOpen?: (domain: Domain) => void
  handleAddAttributeOpen?: (id: Id) => void
  handleUpdateAttributeOpen?: (attribute: UpdateAttribute) => void
  updateDomain?: (id: Id) => void
  updateAttribute?: (id: Id) => void
}

Item.displayName = 'e-domain-ui-Domain'

export default function Item(props: Props): JSX.Element {
  const {
    domainData,
    isExpanded = false,
    isDraggable = false,
    pLeft = 0,
    isRightToEdit,
    handleAddDomainOpen = (): void => {},
    handleUpdateDomainOpen = (): void => {},
    updateDomain = (): void => {},
    openModalDialog = (): void => {},
    // updateAttribute = (): void => {},
    handleUpdateAttributeOpen = (): void => {},
    handleAddAttributeOpen = (): void => {},
  } = props

  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)

  const pl = pLeft

  useEffect(() => {
    if (isExpanded !== expanded) toggleExpanded()
  }, [isExpanded])

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: domainData.domain.id, name: domainData.domain.name, type: 'domain' })
  }

  return (
    <>
      <Accordion
        rootProps={{
          style: { paddingLeft: pl },
          draggable: isDraggable,
          onDrag: dragStart,
        }}
        className={c(Item.displayName)}
        onExpandedChange={toggleExpanded}
        isExpanded={expanded}
        renderHeader={Header}
        headerProps={{
          domain: domainData.domain,
          isRightToEdit: !!isRightToEdit,
          openModalDialog: openModalDialog,
          handleAddDomainOpen: handleAddDomainOpen,
          handleAddAttributeOpen: handleAddAttributeOpen,
          handleUpdateDomainOpen: handleUpdateDomainOpen,
          updateDomain: updateDomain,
        }}
      >
        <div>
          {domainData.attributes.length !== 0 ? (
            domainData.attributes.map((item) => (
              <AttributeItem
                wrapperProps={{ style: { marginBottom: '10px' } }}
                openModalDialog={openModalDialog}
                key={item.id}
                attribute={item}
                isRightToEdit={!!props.isRightToEdit}
                isDraggable={isDraggable}
                handleUpdateAttributeOpen={handleUpdateAttributeOpen}
              />
            ))
          ) : (
            <div className='do-not-attributes'>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Item
                isRightToEdit={!!isRightToEdit}
                pLeft={pl + 10}
                key={item.domain.id}
                domainData={item}
                isExpanded={isExpanded}
                handleAddAttributeOpen={handleAddAttributeOpen}
                handleAddDomainOpen={handleAddDomainOpen}
                openModalDialog={openModalDialog}
                isDraggable={isDraggable}
                updateDomain={updateDomain}
                handleUpdateDomainOpen={handleUpdateDomainOpen}
                handleUpdateAttributeOpen={handleUpdateAttributeOpen}
              />
            ))}
        </div>
      </Accordion>
    </>
  )
}

// Private
