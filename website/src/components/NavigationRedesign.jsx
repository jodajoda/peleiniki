import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const NavigationRedesign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
    { path: '/about', label: 'Rólam' },
    { path: '/packages', label: 'Csomagok' },
    { path: '/contact', label: 'Kapcsolat' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-gradient-to-b from-white/98 via-white/95 to-white/90 py-3'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
                    isScrolled ? 'h-10' : 'h-12'
                  } group-hover:scale-105`}
                />
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sunsetOrange/0 via-goldenHour/20 to-sunsetOrange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-lg" />
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 -mr-2 rounded-full hover:bg-peach-50 active:bg-peach-100 transition-all duration-200 group min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Menü megnyitása"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-warmBrown rounded-full transition-all duration-300 group-hover:bg-terracotta ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-warmBrown rounded-full transition-all duration-300 group-hover:bg-terracotta ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-warmBrown rounded-full transition-all duration-300 group-hover:bg-terracotta ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>

            {/* Desktop menu */}
            <ul className="hidden lg:flex items-center space-x-1">
              {navLinks.map(({ path, label }) => {
                const isActive = location.pathname === path;
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`relative px-4 py-2.5 font-body text-base font-medium transition-all duration-300 rounded-full group ${
                        isActive
                          ? 'text-terracotta'
                          : 'text-warmBrown hover:text-sunsetOrange'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="relative z-10">{label}</span>

                      {/* Active background - warm paper tone */}
                      {isActive && (
                        <span className="absolute inset-0 bg-peach-100/70 rounded-full scale-100 transition-transform duration-300" />
                      )}

                      {/* Hover background */}
                      {!isActive && (
                        <span className="absolute inset-0 bg-peach-50/50 rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                      )}

                      {/* Handwritten-style underline on active */}
                      {isActive && (
                        <svg
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 text-terracotta/40"
                          viewBox="0 0 50 8"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M 5 4 Q 15 2, 25 4 T 45 4" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}

              {/* Social media links - Desktop */}
              <li className="flex items-center gap-2 ml-3 pl-3 border-l-2 border-peach-200">
                <a
                  href="https://www.instagram.com/peleinikifotoi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profil"
                  className="group relative p-2 rounded-full hover:bg-peach-50 transition-all duration-300"
                >
                  <img
                    src={getAssetPath('assets/icons/instagram.svg')}
                    alt="Instagram ikon"
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </a>
                <a
                  href="https://www.facebook.com/peleinikifoto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook oldal"
                  className="group relative p-2 rounded-full hover:bg-peach-50 transition-all duration-300"
                >
                  <img
                    src={getAssetPath('assets/icons/facebook.svg')}
                    alt="Facebook ikon"
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </a>
                <a
                  href="mailto:peleinikifotoi@gmail.com"
                  aria-label="E-mail küldése"
                  className="group relative p-2 rounded-full hover:bg-peach-50 transition-all duration-300"
                >
                  <img
                    src={getAssetPath('assets/icons/email.svg')}
                    alt="E-mail ikon"
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile menu - Warm scrapbook style overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-all duration-500 ${
          isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop with warm tone */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-warmPaper via-cream-100 to-peach-50 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-98' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Decorative elements */}
        <div
          className={`absolute top-20 right-10 w-24 h-24 border-2 border-goldenHour/20 rounded-full transition-all duration-700 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ borderStyle: 'dashed' }}
        />
        <div
          className={`absolute bottom-32 left-10 w-32 h-32 border-2 border-sunsetOrange/15 rounded-full transition-all duration-700 delay-100 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ borderStyle: 'dashed' }}
        />

        {/* Menu content */}
        <div
          className={`relative h-full flex flex-col justify-center py-20 transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className="flex flex-col space-y-2 w-full px-6">
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
                    className={`relative px-6 py-4 font-body text-xl font-semibold transition-all duration-300 group overflow-hidden min-h-[60px] flex items-center rounded-2xl ${
                      isActive
                        ? 'text-terracotta bg-white/80 shadow-md'
                        : 'text-warmBrown'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isActive && (
                        <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
                      )}
                      {label}
                    </span>

                    {/* Hover effect */}
                    {!isActive && (
                      <span className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    )}

                    {/* Decorative arrow for active state */}
                    {isActive && (
                      <svg
                        className="absolute right-6 w-5 h-5 text-terracotta/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
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
                <p className="font-handwritten text-2xl text-terracotta mb-4">Kövess be!</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/peleinikifotoi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profil"
                    className="group relative p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/instagram.svg')}
                      alt="Instagram ikon"
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/peleinikifoto"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oldal"
                    className="group relative p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/facebook.svg')}
                      alt="Facebook ikon"
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    />
                  </a>
                  <a
                    href="mailto:peleinikifotoi@gmail.com"
                    aria-label="E-mail küldése"
                    className="group relative p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/email.svg')}
                      alt="E-mail ikon"
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
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

export default NavigationRedesign;
