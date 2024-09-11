import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { ExperimentProperties } from './experiment-properties'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import DataItem from '../../dto/data-item'
import { ExperimentContext } from '../../types/ExperimentContext'
import { appRoute } from '../../app-route.enum'

export const NewExperiment = () => {
  const methods = useForm({ mode: 'onChange' })
  const navigate = useNavigate()
  const [formData, setFormData] = useState<DataItem>()

  const handleSubmit = async () => {
    const cleanedData = cleanFormData(methods.getValues())
    setFormData(cleanedData)
    //TODO: searialize the data and send it as a reponse body to the api.
    //ExperimentService.createExperiment(cleanedData)
    //Right now just doing this AXIOS call to the mock data json to simulate AXIOS call in place of API
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
    const startDatetime = new Date(input.experimentStartDate)
    startDatetime.setHours(parseInt(input.startHour) + (input.startPeriod === 'PM' ? 12 : 0))
    startDatetime.setMinutes(parseInt(input.startMinute))

    const endDatetime = new Date(input.experimentEndDate)
    endDatetime.setHours(parseInt(input.endHour) + (input.endPeriod === 'PM' ? 12 : 0))
    endDatetime.setMinutes(parseInt(input.endMinute))

    //TODO: determine how to evaluate all the fields that are empty
    return {
      experimentName: input.experimentTitle,
      systemName: input.systemName,
      systemId: '',
      description: input.experimentDescription,
      status: '',
      owner: '',
      createdAt: new Date().toISOString(),
      lastModifiedBy: '',
      lastModifiedAt: new Date().toISOString(),
      tagName: '',
      variances: [
        {
          keyName: input.controlName,
          description: '',
          splitAllocation: 100 - input.variantPercentage,
          status: ''
        },
        {
          keyName: input.variantName,
          description: '',
          splitAllocation: input.variantPercentage,
          status: ''
        }
      ],
      startDatetime: startDatetime.toISOString(),
      endDatetime: endDatetime.toISOString()
    }
  }

  return (
    <>
      <div className="container wider-layout">
        <div className="margin-top">
          <gds-section-header>Add Experiment</gds-section-header>
        </div>
        <FormProvider {...methods}>
          <form id="new-experiment" className="margin-top" onSubmit={methods.handleSubmit(handleSubmit)}>
            <ExperimentProperties context={ExperimentContext.NEW} />
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
    </>
  )
}
