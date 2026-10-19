import AboutPage from './AboutPage.jsx'
import ContactPage from './ContactPage.jsx'
import CareersPage from './CareersPage.jsx'
import ExpeditionsPage from './ExpeditionsPage.jsx'
import JoinPage from './JoinPage.jsx'
import LegalPage from './LegalPage.jsx'
import TeamPage from './TeamPage.jsx'

// URL path -> page. Anything not listed renders Home.
export const pages = {
  expeditions: ExpeditionsPage,
  about: AboutPage,
  team: TeamPage,
  careers: CareersPage,
  join: JoinPage,
  contact: ContactPage,
  privacy: () => <LegalPage docKey="privacy" />,
  terms: () => <LegalPage docKey="terms" />,
  refund: () => <LegalPage docKey="refund" />,
  cookies: () => <LegalPage docKey="cookies" />,
}
