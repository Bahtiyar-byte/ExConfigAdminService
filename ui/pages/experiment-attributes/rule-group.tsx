import { useId, useState } from 'react'
import { Rule } from './rule'

export const RuleGroup = () => {
  const groupId = useId()
  let ruleChildId = 0
  const [ruleChildren, setRuleChildren] = useState<{ id: number; isGroup: boolean; node: React.ReactNode }[]>([])

  const addNewRule = () => {
    ruleChildId++
    setRuleChildren([...ruleChildren, { id: ruleChildId, isGroup: false, node: <Rule /> }])
  }

  const addNewRuleGroup = () => {
    setRuleChildren([...ruleChildren, { id: ruleChildId, isGroup: true, node: <RuleGroup /> }])
  }

  const removeRule = (id: number) => {
    const newRuleChildren = ruleChildren.filter(r => r.id !== id)
    setRuleChildren(newRuleChildren)
  }

  return (
    <div id={groupId}>
      <div className="details">
        <div className="summary">
          <div className="btn-group">
            <div className="select-box">
              <select id="demo-select-1" name="demo-select-1">
                <option>AND</option>
                <option>OR</option>
              </select>
            </div>
            <button type="button" className="btn btn--primary btn--full-mobile btn--pull-right" onClick={addNewRule}>
              <span>Add Rule</span>
            </button>
            {ruleChildren.length > 0 && (
              <button
                type="button"
                className="btn btn--secondary btn--full-mobile btn--pull-right"
                onClick={addNewRuleGroup}
              >
                <span>Add Group</span>
              </button>
            )}
          </div>

          <div className="details">
            {ruleChildren.map((childRule, index) => (
              <div key={index}>
                {childRule.isGroup ? (
                  <div className="hLine">
                    <div className="line">
                      <div className="flexible-container subGroup">
                        <div className="row">
                          <div className="col-sm-10">{childRule.node}</div>
                          <div className="col-sm-2">
                            <span
                              className="pull-right geico-icon icon-trash geico-icon--informational geico-icon--default icon--primary-red"
                              onClick={() => removeRule(childRule.id)}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hLine">
                    <div className="line">
                      <div className="flexible-container">
                        <div className="row">
                          <div className="col-sm-10">{childRule.node}</div>
                          <div className="col-sm-2">
                            <span
                              className="pull-right geico-icon icon-trash geico-icon--informational geico-icon--default icon--primary-red"
                              onClick={() => removeRule(childRule.id)}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
