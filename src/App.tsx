import { About } from './components/About'
import { Academy } from './components/Academy'
import { Events } from './components/Events'
import { Experiences } from './components/Experiences'
import { Facilities } from './components/Facilities'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Visit } from './components/Visit'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Facilities />
        <Experiences />
        <Academy />
        <Events />
        <Gallery />
        <Visit />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
