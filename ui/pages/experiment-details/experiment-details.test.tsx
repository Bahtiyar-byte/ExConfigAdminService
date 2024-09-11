import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExperimentDetails } from './experiment-details'
import { MemoryRouter } from 'react-router-dom'

describe('ExperimentDetails', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ExperimentDetails />
      </MemoryRouter>
    )
  })

  test('Should contain proper page header', async () =>
    expect(screen.getByText('Homeowners Eligible Experiment').innerHTML).toContain('Homeowners Eligible Experiment'))
})
