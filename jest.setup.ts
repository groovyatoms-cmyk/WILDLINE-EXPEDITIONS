import '@testing-library/jest-dom'

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
Object.defineProperty(window, 'IntersectionObserver', { value: IntersectionObserverStub })
