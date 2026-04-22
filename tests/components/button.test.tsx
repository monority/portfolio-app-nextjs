import { render, screen } from '@testing-library/react'

import Button from '@/components/ui/button'

describe('Button', () => {
  it('renders with the expected default behavior', () => {
    render(<Button>Contact</Button>)

    const button = screen.getByRole('button', { name: 'Contact' })

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md')
    expect(button).toBeEnabled()
  })

  it('applies variant, size and width classes', () => {
    render(
      <Button variant="secondary" size="lg" fullWidth className="custom-class">
        Voir le projet
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Voir le projet' })).toHaveClass(
      'btn',
      'btn-secondary',
      'btn-lg',
      'btn-full',
      'custom-class'
    )
  })

  it('shows a spinner and disables the button when loading', () => {
    render(
      <Button loading leftIcon={<span data-testid="left-icon" />} rightIcon={<span data-testid="right-icon" />}>
        Envoyer
      </Button>
    )

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button.querySelector('.btn-spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
  })
})
