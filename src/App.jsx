import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

// Route-level code splitting
const Home        = lazy(() => import('@/pages/Home'))
const About       = lazy(() => import('@/pages/About'))
const WhatWeDo    = lazy(() => import('@/pages/WhatWeDo'))
const HowItWorks  = lazy(() => import('@/pages/HowItWorks'))
const OurWork     = lazy(() => import('@/pages/OurWork'))
const Technology  = lazy(() => import('@/pages/Technology'))
const Vision      = lazy(() => import('@/pages/Vision'))
const Partner     = lazy(() => import('@/pages/Partner'))
const Privacy     = lazy(() => import('@/pages/Privacy'))
const Terms       = lazy(() => import('@/pages/Terms'))
const NotFound    = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-grey text-sm font-body tracking-widest uppercase animate-pulse">
        Loading…
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <UtilityBar />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
