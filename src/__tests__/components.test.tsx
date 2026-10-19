import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'
import Faq from '@/components/sections/Faq'
import ExpeditionDetail from '@/components/sections/ExpeditionDetail'
import Expeditions from '@/components/sections/Expeditions'
import CookieBanner from '@/components/overlays/CookieBanner'
import { faq, trips } from '@/data/site'

describe('Button', () => {
  it('renders a link when given href', () => {
    render(<Button href="/join">GO</Button>)
    expect(screen.getByRole('link', { name: 'GO' })).toHaveAttribute('href', '/join')
  })
  it('adds rel to _blank links', () => {
    render(<Button href="https://x.test" target="_blank">OUT</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  })
  it('renders a button otherwise and fires onClick', async () => {
    const fn = jest.fn()
    render(<Button onClick={fn}>PRESS</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'PRESS' }))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('Faq', () => {
  it('shows every question', () => {
    render(<Faq />)
    faq.groups.flatMap((g) => g.items).forEach(([q]) => expect(screen.getByText(q)).toBeInTheDocument())
  })
})

describe('Expeditions', () => {
  it('links each card to its detail page', () => {
    render(<Expeditions />)
    expect(screen.getAllByRole('link')).toHaveLength(trips.length)
    expect(screen.getByRole('link', { name: /LADAKH EXPEDITION/ })).toHaveAttribute('href', '/expeditions/ladakh')
  })
  it('makes the heading a link to the page on the home preview', () => {
    render(<Expeditions to="/expeditions" />)
    expect(screen.getByRole('heading', { name: 'EXPEDITIONS' }).querySelector('a')).toHaveAttribute('href', '/expeditions')
  })
})

describe('ExpeditionDetail', () => {
  it('shows the trip, its itinerary and departures', () => {
    render(<ExpeditionDetail slug="ladakh" />)
    expect(screen.getByRole('heading', { name: 'LADAKH EXPEDITION' })).toBeInTheDocument()
    expect(screen.getByText('ARRIVE LEH')).toBeInTheDocument()
    expect(screen.getByText(/14 JUN 2026/)).toBeInTheDocument()
  })
  it('shows not found for an unknown slug', () => {
    render(<ExpeditionDetail slug="nope" />)
    expect(screen.getByRole('heading', { name: 'NOT FOUND' })).toBeInTheDocument()
  })
})

describe('CookieBanner', () => {
  beforeEach(() => localStorage.clear())
  it('asks first, then remembers the choice', async () => {
    const { unmount } = render(<CookieBanner />)
    await userEvent.click(await screen.findByRole('button', { name: 'ACCEPT' }))
    expect(localStorage.getItem('cookie-consent')).toBe('accepted')
    unmount()
    render(<CookieBanner />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
