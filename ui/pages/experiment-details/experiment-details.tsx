import { useNavigate } from 'react-router-dom'
import { appRoute } from '../../app-route.enum'

export const ExperimentDetails = () => {
  const navigate = useNavigate()

  const navigateToExperimentProperties = () => {
    navigate(appRoute.editExperimentProperties)
  }

  const navigateToExperimentAttributes = () => {
    navigate(appRoute.experimentAttributes)
  }

  return (
    <div className="container wider-layout">
      <div className="margin-top">
        <gds-section-header>Homeowners Eligible Experiment</gds-section-header>
      </div>
      <gds-button-group>
        <button
          type="button"
          className="btn btn--primary btn--full-mobile btn--pull-right"
          onClick={navigateToExperimentAttributes}
        >
          Update Experiment Attributes
        </button>
        <button
          type="button"
          className="btn btn--secondary btn--full-mobile btn--pull-right"
          onClick={navigateToExperimentProperties}
        >
          Update Experiment Properties
        </button>
      </gds-button-group>
    </div>
  )
}
