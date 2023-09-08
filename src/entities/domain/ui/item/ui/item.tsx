import './item.css'

import { useSetRecoilState } from 'recoil'

import Accordion from '~/abstract/accordion'
import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { AttributeItem } from '~/entities/attribute'
import { draggableCardAtom } from '~/models/draggableCard'
import { GhostButton } from '~/ui/button'
import { ChevronRight, Close, Plus } from '~/ui/icon'
import { Id, c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

export interface Props {
  domainData: ParentDomainRes
  isDraggable?: boolean
  isExpanded?: boolean
  pLeft?: number
  isRightToEdit?: boolean
  removeDomain?: (id: Id) => void
  removeAttribute?: (id: Id) => void
  handleAddDomainOpen?: (id: Id) => void
  handleAddAttributeOpen?: (id: Id) => void
}

Item.displayName = 'e-domain-ui-Domain'

export default function Item(props: Props): JSX.Element {
  const {
    domainData,
    isExpanded = true,
    isDraggable = false,
    pLeft = 0,
    isRightToEdit,
    handleAddDomainOpen = (): void => {},
    handleAddAttributeOpen = (): void => {},
    removeDomain = (): void => {},
    removeAttribute = (): void => {},
  } = props
  const [expanded, , , toggleExpanded] = useBoolean(isExpanded)
  const pl = pLeft

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
          title: domainData.domain.name,
          id: domainData.domain.id,
          isRightToEdit: !!isRightToEdit,
          removeDomain: removeDomain,
          handleAddDomainOpen: handleAddDomainOpen,
          handleAddAttributeOpen: handleAddAttributeOpen,
        }}
      >
        <div>
          {domainData.attributes.length !== 0 ? (
            domainData.attributes.map((item) => (
              <AttributeItem
                wrapperProps={{ style: { marginBottom: '10px' } }}
                removeAttribute={removeAttribute}
                key={item.id}
                attribute={item}
                isRightToEdit={!!props.isRightToEdit}
                isDraggable={isDraggable}
              />
            ))
          ) : (
            <div className='do-not-attributes'>Нет атрибутов</div>
          )}
          {!!domainData.childDomains.length &&
            domainData.childDomains.map((item) => (
              <Item
                pLeft={pl + 10}
                key={item.domain.id}
                domainData={item}
                isExpanded={false}
                handleAddAttributeOpen={handleAddAttributeOpen}
                handleAddDomainOpen={handleAddDomainOpen}
                removeAttribute={removeAttribute}
                removeDomain={removeDomain}
                isDraggable={isDraggable}
              />
            ))}
        </div>
      </Accordion>
    </>
  )
}

// Private

interface HeaderProps {
  id: Id
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
  removeDomain: (id: Id) => void
  handleAddDomainOpen: (id: Id) => void
  handleAddAttributeOpen: (id: Id) => void
  isRightToEdit: boolean
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <Flex gap='xxxl' crossAxis='center' mainAxis='space-between' className={c(Item.displayName, '--header')}>
      <Flex gap='xl' crossAxis='center'>
        <GhostButton square onClick={onExpanded}>
          <div style={{ transform: props.isExpanded ? 'rotate(90deg)' : '' }}>
            <ChevronRight />
          </div>
        </GhostButton>
        {props.title || 'нет имени домена'}
      </Flex>
      {props.isRightToEdit && (
        <Flex gap='xl'>
          <GhostButton onClick={(): void => props.handleAddDomainOpen(props.id)}>
            <Plus />
            <span>домен</span>
          </GhostButton>
          <GhostButton onClick={(): void => props.handleAddAttributeOpen(props.id)} style={{ marginRight: '50px' }}>
            <Plus />
            <span>атрибут</span>
          </GhostButton>
          <GhostButton square onClick={(): void => props.removeDomain(props.id)}>
            <Close />
          </GhostButton>
        </Flex>
      )}
    </Flex>
  )

  function onExpanded(): void {
    props.setExpanded(!props.isExpanded)
  }
}
