import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Experiments } from './experiments'
import { MemoryRouter } from 'react-router-dom'

describe('Experiments', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Experiments />
      </MemoryRouter>
    )
  })

  test('Should contain proper page header', async () =>
    expect(screen.getByText('Experiments').innerHTML).toContain('Experiments'))
})
