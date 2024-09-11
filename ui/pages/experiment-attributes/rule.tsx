import { useId, useState } from 'react'
import { DropTarget } from '../../base-components'

export const Rule = () => {
  const [fieldType, setFieldType] = useState('')
  const ruleId = useId()
  const nameInputId = useId()

  const onDrop = (t: string) => {
    console.log(`dropped in rule ${t}`)
    setFieldType(t)
  }

  return (
    <DropTarget targetId={ruleId} onRuleAttributeDrop={onDrop}>
      {fieldType ? (
        <>
          <strong className="am-ui-margin-right">{fieldType}</strong>
          <div className="select-box am-ui-margin-right">
            <select id="demo-select-1" name="demo-select-1">
              <option>Greater Than</option>
              <option>Less Than</option>
            </select>
          </div>

          <input id={nameInputId} type="text" size={15} placeholder="10" />
        </>
      ) : (
        <p>Please drag and drop an attribute to continue...</p>
      )}
    </DropTarget>
  )
}
