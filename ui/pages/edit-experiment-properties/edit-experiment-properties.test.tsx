import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EditExperimentProperties } from './edit-experiment-properties'

describe('EditExperimentProperties', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <EditExperimentProperties />
      </MemoryRouter>
    )
  })

  test('Should contain proper page header', async () =>
    expect(screen.getByText('Edit Experiment Properties').innerHTML).toContain('Edit Experiment Properties'))
})
