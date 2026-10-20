import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'
import Faq from '@/components/contact/Faq'
import ExpeditionDetail from '@/components/expeditions/ExpeditionDetail'
import Expeditions from '@/components/expeditions/Expeditions'
import CookieBanner from '@/components/overlays/CookieBanner'

jest.mock('@/lib/deviceId', () => ({ identify: jest.fn() })) // the fingerprint library is not loaded in tests
jest.mock('@/lib/confetti', () => ({ confetti: jest.fn() })) // jsdom has no Element.animate
import { faq, trips } from '@/data/site'

describe('Button', () => {
  it('renders a link when given href', () => {
    render(<Button href="/join">GO</Button>)
    expect(screen.getByRole('link', { name: 'GO' })).toHaveAttribute('href', '/join')
  })
  it('adds rel to _blank links', () => {
    render(
      <Button href="https://x.test" target="_blank">
        OUT
      </Button>,
    )
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
    const cards = within(screen.getByRole('region', { name: /2026 season/ }))
    expect(cards.getAllByRole('link')).toHaveLength(trips.length)
    expect(cards.getByRole('link', { name: /Ladakh Expedition/ })).toHaveAttribute('href', '/expeditions/ladakh')
  })
  it('makes the heading a link to the page on the home preview', () => {
    render(<Expeditions to="/expeditions" />)
    expect(screen.getByRole('heading', { name: 'Expeditions' }).querySelector('a')).toHaveAttribute('href', '/expeditions')
  })
})

describe('ExpeditionDetail', () => {
  it('shows the trip, its itinerary and departures', () => {
    render(<ExpeditionDetail slug="ladakh" />)
    expect(screen.getByRole('heading', { name: 'Ladakh Expedition' })).toBeInTheDocument()
    expect(screen.getByText('Arrive Leh')).toBeInTheDocument()
    expect(screen.getByText(/14 Jun 2026/)).toBeInTheDocument()
  })
  it('shows not found for an unknown slug', () => {
    render(<ExpeditionDetail slug="nope" />)
    expect(screen.getByRole('heading', { name: 'Not found' })).toBeInTheDocument()
  })
})

describe('CookieBanner', () => {
  beforeEach(() => localStorage.clear())
  it('asks first, then remembers the choice', async () => {
    const { unmount } = render(<CookieBanner />)
    await userEvent.click(await screen.findByRole('button', { name: 'Accept' }))
    expect(localStorage.getItem('cookie-consent')).toBe('accepted')
    unmount()
    render(<CookieBanner />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
