import { Routes, Route } from 'react-router-dom'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

// Eagerly imported standard page components for instantaneous 0ms page transitions & 0 white-screen flicker
import Home from '@/pages/Home'
import About from '@/pages/About'
import WhatWeDo from '@/pages/WhatWeDo'
import HowItWorks from '@/pages/HowItWorks'
import OurWork from '@/pages/OurWork'
import Technology from '@/pages/Technology'
import Vision from '@/pages/Vision'
import Partner from '@/pages/Partner'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll />
      <ScrollToTop />
      <UtilityBar />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/"           element={<Home />}       />
          <Route path="/about"      element={<About />}      />
          <Route path="/what-we-do" element={<WhatWeDo />}   />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/our-work"   element={<OurWork />}    />
          <Route path="/technology" element={<Technology />} />
          <Route path="/vision"     element={<Vision />}     />
          <Route path="/partner"    element={<Partner />}    />
          <Route path="/privacy"    element={<Privacy />}    />
          <Route path="/terms"      element={<Terms />}      />
          <Route path="*"           element={<NotFound />}   />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
