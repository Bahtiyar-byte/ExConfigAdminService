import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { GdrSelect, GdrFieldInput, GdrDate, GdrTime } from '../../hue-components'
import './experiment-properties.scss'
import { useLocation } from 'react-router-dom'
import { ExperimentContext } from '../../types/ExperimentContext'

export const ExperimentProperties = ({ context }: { context: ExperimentContext }) => {
  const { register, formState, getValues } = useFormContext()
  const [controlPercentage, setControlPercentage] = useState(50)
  const { state } = useLocation()
  const [team, setTeam] = useState(state ? state.systemName : '')
  const [description, setDescription] = useState(state ? state.description : '')

  const isStartDateLessThanEndDate = () => {
    if (getValues('experimentEndDate') && getValues('experimentStartDate')) {
      return new Date(getValues('experimentEndDate')) > new Date(getValues('experimentStartDate'))
    }
    return true
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-5">
          <GdrFieldInput
            disabled={context == ExperimentContext.LIMITED_EDIT}
            label="Experiment Title"
            description="A description that includes the goal or modification you plan to test"
            errorMessage={formState.errors.experimentTitle?.message?.toString()}
            {...register('experimentName', {
              required: 'Please enter an experiment title',
              value: state?.experimentName
            })}
          ></GdrFieldInput>
        </div>
      </div>

      <div className="row">
        <div
          className="col-lg-8"
          style={{
            margin: '0.1rem',
            border: '0.1rem solid #BCBCBC',
            borderRadius: '10px',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            background: 'white',
            width: '80%'
          }}
        >
          <h4 className="col-lg-12">Unique Identifier</h4>
          <div className="col-lg-3">
            <GdrSelect
              disabled={context === ExperimentContext.LIMITED_EDIT}
              label="What team is this for?"
              description="i.e. Application"
              options={[{ value: 'geico-com', label: 'geico-com' }]}
              {...register('systemName', {
                required: 'Please select a team',
                value: state?.systemName,
                onChange: e => setTeam(e.target.value)
              })}
            ></GdrSelect>
          </div>
          <div className="col-lg-3">
            <GdrFieldInput
              disabled={context === ExperimentContext.LIMITED_EDIT}
              label="Short Description"
              description="No spaces or underscore. Dashes OK."
              errorMessage={formState.errors.experimentDescription?.message?.toString()}
              {...register('description', {
                required: 'Please enter short description',
                pattern: { value: /^[a-zA-Z0-9-]+$/, message: 'Only alphabets, numbers and dashes are allowed' },
                value: state?.description,
                onChange: e => setDescription(e.target.value)
              })}
            ></GdrFieldInput>
          </div>

          <div className="col-lg-12">
            <b>Test name when conversing with developers: </b>
            <i>{team + '-' + description}</i>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <GdrFieldInput
            disabled={context === ExperimentContext.LIMITED_EDIT}
            placeholder="blue button"
            label="Control Name"
            description="This is helpful for reporting purposes"
            errorMessage={formState.errors.controlName?.message?.toString()}
            {...register('controlName', {
              required: 'Please specify the control name',
              value: state?.variances[0].keyName
            })}
          ></GdrFieldInput>
        </div>
        <div className="col-lg-2 top-padding">
          <span id="control-percentage-id" className="">
            Percentage: {controlPercentage}%
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <GdrFieldInput
            disabled={context === ExperimentContext.LIMITED_EDIT}
            placeholder="green button"
            label="Variant Name"
            description="This is helpful for reporting purposes"
            errorMessage={formState.errors.variantName?.message?.toString()}
            {...register('variantName', {
              required: 'Please specify the variant name',
              value: state?.variances[1].keyName
            })}
          ></GdrFieldInput>
        </div>
        <div className="col-lg-2">
          <GdrFieldInput
            disabled={context === ExperimentContext.LIMITED_EDIT}
            type="number"
            label="Percentage"
            description="Variant will adjust automatically"
            errorMessage={formState.errors.controlPercentage?.message?.toString()}
            {...register('variantPercentage', {
              required: 'Please specify the control percentage',
              valueAsNumber: true,
              value: state ? state.variances[1].splitAllocation : 50,
              max: { value: 99, message: 'Value cannot exceed 99' },
              onChange: e => setControlPercentage(100 - e.target.value)
            })}
          ></GdrFieldInput>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <GdrDate
            label="Start Date"
            disabled={context === ExperimentContext.LIMITED_EDIT}
            errorMessage={formState.errors.experimentStartDate?.message?.toString()}
            {...register('experimentStartDate', {
              required: 'Please sepcify a start date',
              value: state?.startDatetime ? new Date(state.startDatetime).toLocaleDateString() : ''
            })}
          />
        </div>
        <div className="col-md-3">
          <GdrTime
            disabled={context === ExperimentContext.LIMITED_EDIT}
            label="Start Time"
            type="start"
            hour={state?.startDatetime ? String(new Date(state.startDatetime).getHours() % 12 || 12) : ''}
            minute={state?.startDatetime ? new Date(state.startDatetime).getMinutes().toString() : ''}
            period={state?.startDatetime ? (new Date(state.startDatetime).getHours() > 12 ? 'PM' : 'AM') : ''}
          ></GdrTime>
          <i>(This will be in your local time)</i>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <GdrDate
            label="End Date"
            errorMessage={formState.errors.experimentEndDate?.message?.toString()}
            {...register('experimentEndDate', {
              required: 'Please specify end date',
              value: state?.endDatetime ? new Date(state.endDatetime).toLocaleDateString() : '',
              validate: () => (isStartDateLessThanEndDate() ? true : 'End date should be after start date')
            })}
          />
        </div>

        <div className="col-md-3">
          <GdrTime
            label="End Time"
            type="end"
            hour={state?.endDatetime ? String(new Date(state.endDatetime).getHours() % 12 || 12) : ''}
            minute={state?.endDatetime ? new Date(state.endDatetime).getMinutes().toString() : ''}
            period={state?.endDatetime ? (new Date(state.endDatetime).getHours() > 12 ? 'PM' : 'AM') : ''}
          ></GdrTime>
          <i>(This will be in your local time)</i>
        </div>
      </div>
    </>
  )
}
