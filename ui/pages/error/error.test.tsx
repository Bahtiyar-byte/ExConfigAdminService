import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Error } from './error'

describe('Error', () => {
  test('Should contain proper page header', async () => {
    render(<Error />)
    expect(screen.getByText("We're Sorry").innerHTML).toContain("We're Sorry")
  })
})
