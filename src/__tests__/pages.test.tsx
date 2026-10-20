import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { legal } from '@/data/legal'
import { POSTS } from '@/data/blog'
import { join, trips, tripSlug } from '@/data/site'
import About from '@/components/about/About'
import Careers from '@/components/about/Careers'
import Gallery from '@/components/about/Gallery'
import Team from '@/components/about/Team'
import BlogArticle from '@/components/blog/BlogArticle'
import BlogCard from '@/components/blog/BlogCard'
import BlogIndex from '@/components/blog/BlogIndex'
import BlogPreview from '@/components/blog/BlogPreview'
import Contact from '@/components/contact/Contact'
import Enquiry from '@/components/contact/Enquiry'
import NightCamp from '@/components/contact/NightCamp'
import Countdown from '@/components/convoys/Countdown'
import DepartureBoard from '@/components/convoys/DepartureBoard'
import Join from '@/components/convoys/Join'
import Atlas from '@/components/expeditions/Atlas'
import Poster from '@/components/expeditions/Poster'
import LegalPage from '@/components/legal/LegalPage'
import ConvoyCockpit from '@/components/safety/ConvoyCockpit'
import Crew from '@/components/safety/Crew'
import How from '@/components/safety/How'

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }), usePathname: () => '/' }))

// Every section and page must render without throwing and put real content on screen.
const sections: [string, ReactElement][] = [
  ['About', <About key="a" />],
  ['Careers', <Careers key="b" />],
  ['Gallery', <Gallery key="c" />],
  ['Team', <Team key="d" />],
  ['BlogIndex', <BlogIndex key="e" />],
  ['BlogPreview', <BlogPreview key="f" to="/blog" />],
  ['Contact', <Contact key="g" />],
  ['Enquiry', <Enquiry key="h" />],
  ['NightCamp', <NightCamp key="i" />],
  ['Countdown', <Countdown key="j" />],
  ['DepartureBoard', <DepartureBoard key="k" list={join.dates} />],
  ['Join', <Join key="l" />],
  ['Atlas', <Atlas key="m" />],
  ['ConvoyCockpit', <ConvoyCockpit key="n" />],
  ['Crew', <Crew key="o" />],
  ['How', <How key="p" />],
]

describe('sections render', () => {
  it.each(sections)('%s', (_name, el) => {
    const { container } = render(el)
    expect(container).not.toBeEmptyDOMElement()
  })
})

describe('legal pages', () => {
  it.each(Object.keys(legal) as (keyof typeof legal)[])('%s shows a heading', (key) => {
    const { container } = render(<LegalPage docKey={key} />)
    expect(container.querySelector('h1')).toBeInTheDocument()
  })
})

describe('blog', () => {
  it.each(POSTS)('article $slug renders a heading', (p) => {
    const { container } = render(<BlogArticle p={p} />)
    expect(container.querySelector('h1')).toBeInTheDocument()
  })
  it.each(POSTS)('card $slug links to its article', (p) => {
    const { container } = render(<BlogCard p={p} />)
    expect(container.querySelector(`a[href="/blog/${p.slug}"]`)).toBeInTheDocument()
  })
  it('has unique slugs and a cover for every post', () => {
    expect(new Set(POSTS.map((p) => p.slug)).size).toBe(POSTS.length)
    POSTS.forEach((p) => expect(p.cover).toBeTruthy())
  })
})

describe('expedition posters', () => {
  it.each(trips.map((t) => [t.name, t] as const))('%s links to its page', (_n, t) => {
    const { container } = render(<Poster t={t} />)
    expect(container.querySelector(`a[href="/expeditions/${tripSlug(t)}"]`)).toBeInTheDocument()
  })
})
