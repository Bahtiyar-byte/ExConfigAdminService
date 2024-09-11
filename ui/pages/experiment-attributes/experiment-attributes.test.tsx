import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExperimentAttributes } from './experiment-attributes'
import { MemoryRouter } from 'react-router-dom'

describe('ExperimentAttributes', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ExperimentAttributes />
      </MemoryRouter>
    )
  })

  test('Should contain proper page header', async () =>
    expect(screen.getByText('Experiment Attributes').innerHTML).toContain('Experiment Attributes'))
})
