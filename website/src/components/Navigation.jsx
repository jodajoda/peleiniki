import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Kezdőlap' },
    { path: '/photoshooting', label: 'A fotózás velem' },
    { path: '/portfolio', label: 'Portfólió' },
    { path: '/photo-stories', label: 'Fotótörténetek' },
    { path: '/about', label: 'Rólam' },
    { path: '/packages', label: 'Csomagok' },
    { path: '/contact', label: 'Kapcsolat' },
  ];

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        isScrolled
          ? 'bg-white backdrop-blur-md shadow-soft-lg py-1'
          : 'bg-gradient-to-b from-white via-white/95 to-white/90 py-2'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center group -ml-2 p-2 rounded-lg"
            aria-label="Kezdőlap"
          >
            <div className="relative">
              <img
                src={getAssetPath('assets/icons/pnfotos.png')}
                alt="Pelei Niki Fotós"
                className={`transition-all duration-500 ${
                  isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'
                } group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-warm/0 via-accent-warm/10 to-accent-warm/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl" />
            </div>
          </Link>

          {/* Mobile menu button - Enhanced touch target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 -mr-2 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Menü megnyitása"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 group-hover:bg-primary-700 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 group-hover:bg-primary-700 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 group-hover:bg-primary-700 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center space-x-2">
            {navLinks.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg group ${
                      isActive
                        ? 'text-primary-800'
                        : 'text-gray-700 hover:text-primary-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10">{label}</span>

                    {/* Hover background effect */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-warm/20 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                      }`}
                    />

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-600 to-accent-warm rounded-full" />
                    )}

                    {/* Hover underline effect */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-warm rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-0'
                        : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </li>
              );
            })}

            {/* Social media links - Desktop */}
            <li className="flex items-center gap-2 ml-2 pl-2 border-l border-primary-200">
              <a
                href="https://www.instagram.com/peleinikifotoi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profil"
                className="group relative p-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                <img
                  src={getAssetPath('assets/icons/instagram.svg')}
                  alt="Instagram ikon"
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              <a
                href="https://www.facebook.com/peleinikifoto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook oldal"
                className="group relative p-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                <img
                  src={getAssetPath('assets/icons/facebook.svg')}
                  alt="Facebook ikon"
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              <a
                href="mailto:peleinikifotoi@gmail.com"
                aria-label="E-mail küldése"
                className="group relative p-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                <img
                  src={getAssetPath('assets/icons/email.svg')}
                  alt="E-mail ikon"
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

      {/* Mobile menu - Full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-all duration-500 ${
          isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-white/85 backdrop-blur-sm transition-opacity duration-500 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu content */}
          <div
            className={`relative h-full flex flex-col justify-center py-20 transition-transform duration-500 ${
              isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
            }`}
          >
            <ul className="flex flex-col space-y-0 w-full">
              {navLinks.map(({ path, label }, index) => {
                const isActive = location.pathname === path;
                return (
                  <li
                    key={path}
                    className={`transition-all duration-500 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: isOpen ? `${index * 80}ms` : '0ms' }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`relative px-8 py-5 text-lg font-semibold transition-all duration-300 group overflow-hidden min-h-[60px] flex items-center ${
                        isActive
                          ? 'text-primary-700 bg-primary-50/50'
                          : 'text-gray-700'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="relative z-10 flex items-center">
                        {isActive && (
                          <span className="w-2 h-2 bg-primary-600 rounded-full mr-4" />
                        )}
                        {label}
                      </span>

                      {/* Hover effect - fade in from transparent */}
                      {!isActive && (
                        <span className="absolute inset-0 bg-primary-100/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </li>
                );
              })}

              {/* Social media links - Mobile */}
              <li
                className={`transition-all duration-500 pt-6 ${
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${navLinks.length * 80}ms` : '0ms' }}
              >
                <div className="px-6">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Kövess be</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/peleinikifotoi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profil"
                      className="group relative p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <img
                        src={getAssetPath('assets/icons/instagram.svg')}
                        alt="Instagram ikon"
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/peleinikifoto"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook oldal"
                      className="group relative p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <img
                        src={getAssetPath('assets/icons/facebook.svg')}
                        alt="Facebook ikon"
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                    <a
                      href="mailto:peleinikifotoi@gmail.com"
                      aria-label="E-mail küldése"
                      className="group relative p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <img
                        src={getAssetPath('assets/icons/email.svg')}
                        alt="E-mail ikon"
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </>
  );
};

export default Navigation;
