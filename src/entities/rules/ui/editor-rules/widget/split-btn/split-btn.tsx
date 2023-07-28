import { useSetRecoilState } from 'recoil'
import Button from '~/abstract/button'
import { getSplitArr } from '~/entities/rules/lib'
import { editorRulesValuesAtom } from '~/entities/rules/state/state'
import './split-btn.css'

interface SplitBtnProps {
  index: number
}

export function SplitBtn(props: SplitBtnProps): JSX.Element {
  const { index } = props
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <Button className='EdRules-w-split-btn' height={'m'} onClick={splitCondition}>
      Разъединить
    </Button>
  )

  function splitCondition(): void {
    setEditorRulesVales((arr) => getSplitArr(arr, index))
  }
}
