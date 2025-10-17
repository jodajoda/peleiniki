import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-50 via-primary-50/30 to-primary-100/20 border-t border-primary-200/50 mt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-warm/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 relative z-10">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <Link to="/" className="group p-2" aria-label="Kezdőlap">
              <div className="relative">
                <img
                  src={getAssetPath('assets/icons/pnfotos.png')}
                  alt="Pelei Niki Fotós"
                  className="h-14 sm:h-16 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-warm/0 via-accent-warm/20 to-accent-warm/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl" />
              </div>
            </Link>
            <p className="text-sm text-gray-600 text-center max-w-md px-4">
              Örökítsük meg együtt életetek legszebb pillanatait
            </p>
          </div>

          {/* Social Links - Enhanced touch targets for mobile */}
          <div className="flex items-center gap-3 sm:gap-4" aria-label="Közösségi média linkek">
            <a
              href="https://www.instagram.com/peleinikifotoi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profil"
              className="group relative p-3.5 sm:p-3 rounded-full bg-white shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            >
              <img
                src={getAssetPath('assets/icons/instagram.svg')}
                alt="Instagram ikon"
                width="24"
                height="24"
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
            </a>
            <a
              href="https://www.facebook.com/peleinikifoto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook oldal"
              className="group relative p-3.5 sm:p-3 rounded-full bg-white shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            >
              <img
                src={getAssetPath('assets/icons/facebook.svg')}
                alt="Facebook ikon"
                width="24"
                height="24"
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
            </a>
            <a
              href="mailto:peleinikifotoi@gmail.com"
              aria-label="E-mail küldése"
              className="group relative p-3.5 sm:p-3 rounded-full bg-white shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            >
              <img
                src={getAssetPath('assets/icons/email.svg')}
                alt="E-mail ikon"
                width="24"
                height="24"
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent-warm opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
            </a>
          </div>

          {/* Quick Links - Better mobile spacing */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-6 text-sm px-4" aria-label="Lábléc navigáció">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-700 transition-all duration-200 hover:underline decoration-primary-400 underline-offset-4 py-1 min-h-[44px] flex items-center"
            >
              Kezdőlap
            </Link>
            <Link
              to="/portfolio"
              className="text-gray-600 hover:text-primary-700 transition-all duration-200 hover:underline decoration-primary-400 underline-offset-4 py-1 min-h-[44px] flex items-center"
            >
              Portfólió
            </Link>
            <Link
              to="/packages"
              className="text-gray-600 hover:text-primary-700 transition-all duration-200 hover:underline decoration-primary-400 underline-offset-4 py-1 min-h-[44px] flex items-center"
            >
              Csomagok
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary-700 transition-all duration-200 hover:underline decoration-primary-400 underline-offset-4 py-1 min-h-[44px] flex items-center"
            >
              Kapcsolat
            </Link>
            <Link
              to="/adatkezelesi-tajekoztato"
              className="text-gray-600 hover:text-primary-700 transition-all duration-200 hover:underline decoration-primary-400 underline-offset-4 py-1 min-h-[44px] flex items-center"
            >
              Adatkezelési tájékoztató
            </Link>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-gray-600 text-center font-medium">
              © {new Date().getFullYear()} Pelei Niki Fotográfus
            </p>
            <p className="text-xs text-gray-500 text-center">
              Minden jog fenntartva.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
