import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { ExperimentProperties } from './experiment-properties'
import { FormProvider, useForm } from 'react-hook-form'
import { ExperimentContext } from '../../types/ExperimentContext'

describe('ExperimentProperties', () => {
  test('Should contain proper page header', async () => {
    const TestInput = () => {
      const methods = useForm()
      return (
        <FormProvider {...methods}>
          <ExperimentProperties context={ExperimentContext.NEW} />
        </FormProvider>
      )
    }

    render(<TestInput />)
    expect(screen.getByText('Experiment Properties').innerHTML).toContain('Experiment Properties')
  })
})
