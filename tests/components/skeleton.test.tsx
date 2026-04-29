import React from 'react'
import { render, screen } from '@testing-library/react'
import Skeleton from '@/components/ui/skeleton/Skeleton'

describe('Skeleton', () => {
    it('renders a block skeleton with default classes', () => {
        render(<Skeleton data-testid="sk" />)
        const el = screen.getByTestId('sk')
        expect(el).toHaveClass('skeleton', 'skeleton--block')
        expect(el).toHaveAttribute('aria-hidden', 'true')
    })

    it('applies the circle variant', () => {
        render(<Skeleton variant="circle" data-testid="sk" />)
        expect(screen.getByTestId('sk')).toHaveClass('skeleton--circle')
    })

    it('applies width and height as inline styles', () => {
        render(<Skeleton width={80} height={80} data-testid="sk" />)
        const el = screen.getByTestId('sk')
        expect(el).toHaveStyle({ width: '80px', height: '80px' })
    })

    it('applies aspectRatio for image variant', () => {
        render(<Skeleton variant="image" aspectRatio="16/9" data-testid="sk" />)
        const el = screen.getByTestId('sk')
        expect(el).toHaveClass('skeleton--image')
        expect(el).toHaveStyle({ aspectRatio: '16/9' })
    })

    it('applies roundness modifier class', () => {
        render(<Skeleton roundness="rounded" data-testid="sk" />)
        expect(screen.getByTestId('sk')).toHaveClass('skeleton--rounded')
    })

    it('renders N spans when variant="text" and lines > 1', () => {
        const { container } = render(<Skeleton variant="text" lines={3} />)
        const spans = container.querySelectorAll('.skeleton--text')
        expect(spans).toHaveLength(3)
    })

    it('all spans in multi-line text have aria-hidden', () => {
        const { container } = render(<Skeleton variant="text" lines={4} />)
        const spans = container.querySelectorAll('.skeleton')
        spans.forEach(span => {
            expect(span).toHaveAttribute('aria-hidden', 'true')
        })
    })

    it('forwards a custom className', () => {
        render(<Skeleton className="my-custom" data-testid="sk" />)
        expect(screen.getByTestId('sk')).toHaveClass('skeleton', 'my-custom')
    })
})
