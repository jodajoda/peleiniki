import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-6" aria-label="Közösségi média linkek">
            <a
              href="https://www.instagram.com/peleinikifotoi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profil"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src={getAssetPath('assets/icons/instagram.svg')}
                alt="Instagram ikon"
                width="24"
                height="24"
              />
            </a>
            <a
              href="https://www.facebook.com/peleinikifoto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook oldal"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src={getAssetPath('assets/icons/facebook.svg')}
                alt="Facebook ikon"
                width="24"
                height="24"
              />
            </a>
            <a
              href="mailto:peleinikifotoi@gmail.com"
              aria-label="E-mail küldése"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src={getAssetPath('assets/icons/email.svg')}
                alt="E-mail ikon"
                width="24"
                height="24"
              />
            </a>
          </div>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Lábléc navigáció">
            <Link to="/adatkezelesi-tajekoztato" className="text-gray-600 hover:text-primary-700 transition-colors">
              Adatkezelési tájékoztató
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Pelei Niki Fotográfus. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
