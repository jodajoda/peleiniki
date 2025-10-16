import { Link } from 'react-router';
import SEO from '../components/SEO';

/**
 * 404 Not Found page
 * Displayed when user navigates to a non-existent route
 * @returns {JSX.Element}
 */
function NotFound() {
  return (
    <>
      <SEO
        title="404 - Az oldal nem található"
        description="A keresett oldal nem található. Térjen vissza a kezdőlapra vagy böngésszen portfoliónkban."
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-warm/10 to-accent-sunset/10 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-9xl font-bold text-primary-700 mb-4">404</h1>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Az oldal nem található
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sajnáljuk, de a keresett oldal nem létezik vagy át lett helyezve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeIn delay-200">
            <Link
              to="/"
              className="btn-primary px-8 py-3 rounded-lg text-white font-semibold hover:bg-primary-800 transition-colors shadow-soft-lg"
            >
              Vissza a kezdőlapra
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-3 rounded-lg border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              Portfolio megtekintése
            </Link>
          </div>

          <div className="animate-fadeIn delay-300">
            <p className="text-gray-500 mb-4">Vagy válasszon az alábbi menüpontok közül:</p>
            <nav className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/photoshooting" className="text-primary-700 hover:underline">
                Fotózás élménye
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/about" className="text-primary-700 hover:underline">
                Rólam
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/packages" className="text-primary-700 hover:underline">
                Csomagok
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/contact" className="text-primary-700 hover:underline">
                Kapcsolat
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
