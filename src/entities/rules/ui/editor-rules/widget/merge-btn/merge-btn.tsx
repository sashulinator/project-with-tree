import { useSetRecoilState } from 'recoil'
import { getMergeArr } from '~/entities/rules/lib'
import { editorRulesValuesAtom } from '~/entities/rules/state/state'
import './merge-btn.css'
import { GhostButton } from '~/ui/button'

export function MergeBtn(): JSX.Element {
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <GhostButton height={'m'} onClick={mergeCondition} className='EdRules-w-merge-btn'>
      Объединить
    </GhostButton>
  )

  function mergeCondition(): void {
    setEditorRulesVales((arr) => getMergeArr(arr))
  }
}
