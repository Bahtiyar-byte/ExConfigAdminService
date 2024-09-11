import { appRoute } from '../../app-route.enum'
import { Draggable } from '../../base-components'
import { AccordionItem } from './accordion-item'
import './experiment-attributes.scss'
import { RuleGroup } from './rule-group'
import { useNavigate } from 'react-router-dom'

export const ExperimentAttributes = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(appRoute.experimentDetails)
  }

  const navigateBack = () => {
    navigate(appRoute.experimentDetails)
  }

  return (
    <div className="container wider-layout">
      <div className="margin-top">
        <gds-section-header>Experiment Attributes</gds-section-header>
      </div>

      <div className="row margin-top">
        <div className="col-sm-4">
          <div className="flexible-container">
            <ul className="accordion">
              <AccordionItem header="Coverages">
                <Draggable segmentAttributeName="Rated State" segmentAttributeId="RatedState1" />
                <hr />
                <Draggable segmentAttributeName="Number of Vehicles" segmentAttributeId="NumberOfVehicles1" />
              </AccordionItem>
              <AccordionItem header="Claims">
                <Draggable segmentAttributeName="Rated State" segmentAttributeId="RatedState" />
                <hr />
                <Draggable segmentAttributeName="Number of Vehicles" segmentAttributeId="NumberOfVehicles" />
              </AccordionItem>
            </ul>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="flexible-container">
            <form id="attribute-builder" onSubmit={handleSubmit}>
              <gds-button-group>
                <button type="submit" className="btn btn--primary btn--full-mobile btn--pull-right">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--full-mobile btn--pull-right"
                  onClick={navigateBack}
                >
                  Back
                </button>
              </gds-button-group>
              <gds-stroke-separator variation="horizontal"></gds-stroke-separator>
              <div className="tree-padding tree-vertical-lines tree-horizontal-lines tree-summaries tree-markers tree-buttons margin-top">
                <RuleGroup></RuleGroup>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
