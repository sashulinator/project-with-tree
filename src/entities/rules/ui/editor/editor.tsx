import Attribute from '../attribute/attribute'
import './editor.css'

export default function Editor(): JSX.Element {
  return (
    <div className='editorRules'>
      <textarea className='editorRules-textarea'></textarea>

      <span className='editorRules-caret'></span>
      <Attribute
        rootProps={{ style: { position: 'absolute', left: '2px', top: '3px' } }}
        attribute={{ id: 1, name: 'test-atribute', nodeType: 'test-atribute', value: 'test-value', type: 'string' }}
      />

      <Attribute
        rootProps={{ style: { position: 'absolute', left: '120px', top: '3px', background: 'var(--bg)' } }}
        attribute={{ id: 1, name: 'test-atribute', nodeType: 'test-atribute', value: 'test-value', type: 'string' }}
      />
    </div>
  )
}
