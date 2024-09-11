import { useLocation, useNavigate } from 'react-router-dom'
import { ExperimentProperties } from '../new-experiment/experiment-properties'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import DataItem from '../../dto/data-item'
import axios, { AxiosResponse } from 'axios'
import ExperimentService from '../../services/ExperimentService'
import { ExperimentContext } from '../../types/ExperimentContext'
import { appRoute } from '../../app-route.enum'
export const EditExperimentProperties = () => {
  const navigate = useNavigate()
  const methods = useForm({ mode: 'onChange' })
  const [formData, setFormData] = useState<DataItem>()
  const { state } = useLocation()

  const handleSubmit = () => {
    const cleanedData = cleanFormData(methods.getValues())
    setFormData(cleanedData)
    //TODO: Right now just doing this AXIOS call to the mock data json to simulate AXIOS call in place of API
    ExperimentService.updateExperiment(cleanedData)
    axios
      .get('./mock-data.json')
      .then((response: AxiosResponse) => {
        console.log(response.data)
        navigate('/')
      })
      .catch(error => console.log(error))
  }
  const navigateToExperiments = () => {
    navigate(appRoute.experiments)
  }
  const cleanFormData = (input: FieldValues): DataItem => {
    const endDatetime = new Date(input.experimentEndDate)
    endDatetime.setHours(parseInt(input.endHour) + (input.endPeriod === 'PM' ? 12 : 0))
    endDatetime.setMinutes(parseInt(input.endMinute))
    return {
      ...state,
      endDatetime: endDatetime.toISOString()
    }
  }

  return (
    <div className="container wider-layout">
      <div className="margin-top">
        <gds-section-header>Edit Experiment Properties</gds-section-header>
      </div>

      <FormProvider {...methods}>
        <form id="new-experiment" className="margin-top" onSubmit={methods.handleSubmit(handleSubmit)}>
          <ExperimentProperties
            context={state.status == 'Active' ? ExperimentContext.LIMITED_EDIT : ExperimentContext.FULL_EDIT}
          />
          <gds-button-group>
            <button type="submit" className="btn btn--primary btn--full-mobile btn--pull-right">
              Save
            </button>
            <button
              type="button"
              className="btn btn--destructive btn--full-mobile btn--pull-right"
              onClick={navigateToExperiments}
            >
              Cancel
            </button>
          </gds-button-group>
        </form>
      </FormProvider>

      {
        // TODO: remove below code once api integration is done
        formData?.experimentName && (
          <>
            <hr />
            <h4>Debug Details - Form submit data</h4>
            <p>{JSON.stringify(formData)}</p>
          </>
        )
      }
    </div>
  )
}
