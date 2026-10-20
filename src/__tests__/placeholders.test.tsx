import { fireEvent, render, screen } from '@testing-library/react'
import ShimmerImg from '@/components/ui/ShimmerImg'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

describe('ShimmerImg', () => {
  it('shimmers until the image loads, then stops', () => {
    render(<ShimmerImg src="/a.webp" alt="a" className="pic" />)
    const img = screen.getByAltText('a')
    expect(img).toHaveClass('shimmer')
    fireEvent.load(img)
    expect(img).not.toHaveClass('shimmer')
    expect(img).toHaveClass('pic')
  })

  it('stops shimmering when the image fails', () => {
    render(<ShimmerImg src="/missing.webp" alt="b" />)
    const img = screen.getByAltText('b')
    fireEvent.error(img)
    expect(img).not.toHaveClass('shimmer')
  })

  it('is lazy by default and reserves the ratio', () => {
    render(<ShimmerImg src="/a.webp" alt="c" ratio="16 / 10" />)
    const img = screen.getByAltText('c')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveStyle({ aspectRatio: '16 / 10' })
  })

  it('can be made eager', () => {
    render(<ShimmerImg src="/a.webp" alt="d" loading="eager" />)
    expect(screen.getByAltText('d')).toHaveAttribute('loading', 'eager')
  })

  it('omits src and keeps shimmering when src is empty or missing', () => {
    render(
      <>
        <ShimmerImg src="" alt="e" />
        <ShimmerImg alt="f" />
      </>,
    )
    for (const name of ['e', 'f']) {
      const img = screen.getByAltText(name)
      expect(img).not.toHaveAttribute('src')
      expect(img).toHaveClass('shimmer')
    }
  })
})

describe('SectionSkeleton', () => {
  it('holds the section height and renders shimmering blocks', () => {
    const { container } = render(<SectionSkeleton id="faq" height={800} blocks={3} />)
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'faq')
    expect(section).toHaveAttribute('aria-busy', 'true')
    expect(section).toHaveStyle({ minHeight: '800px' })
    expect(container.querySelectorAll('.skeleton-block.shimmer')).toHaveLength(3)
  })
})
