import AboutPage from './AboutPage.jsx'
import CareersPage from './CareersPage.jsx'
import ExpeditionsPage from './ExpeditionsPage.jsx'
import JoinPage from './JoinPage.jsx'
import TeamPage from './TeamPage.jsx'

// URL path -> page. Anything not listed renders Home.
export const pages = {
  expeditions: ExpeditionsPage,
  about: AboutPage,
  team: TeamPage,
  careers: CareersPage,
  join: JoinPage,
}
