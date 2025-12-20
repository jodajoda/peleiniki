import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationRedesign from './components/NavigationRedesign';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';

// Import redesigned home page
import HomeRedesign from './pages/HomeRedesign';

// Lazy load all page components for better performance
const Photoshooting = lazy(() => import('./pages/Photoshooting'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PhotoStories = lazy(() => import('./pages/PhotoStories'));
const About = lazy(() => import('./pages/About'));
const Packages = lazy(() => import('./pages/Packages'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRedesign() {
  return (
    <ErrorBoundary>
      <Router basename="/">
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sunsetOrange focus:ring-offset-2"
        >
          Ugrás a tartalomhoz
        </a>
        <div className="flex flex-col min-h-screen bg-warmPaper">
          <NavigationRedesign />
          <main id="main-content" className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomeRedesign />} />
                <Route path="/photoshooting" element={<Photoshooting />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/photo-stories" element={<PhotoStories />} />
                <Route path="/about" element={<About />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/adatkezelesi-tajekoztato" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default AppRedesign;
