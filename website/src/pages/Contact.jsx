import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';

const Contact = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // Honeypot field - should remain empty
  });

  useEffect(() => {
    setIsVisible(true);

    if (location.state?.message) {
      setFormData((prev) => ({ ...prev, message: location.state.message }));
      // Scroll to form section on mobile
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location.state]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const validatePhone = (phone) => {
    // Allow empty phone or valid phone format (numbers, spaces, +, -, parentheses)
    const phoneRegex = /^[\d\s+()-]*$/;
    return !phone || phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number format
    if (name === 'phone' && !validatePhone(value)) {
      return; // Reject invalid characters
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check - if filled, likely a bot
    if (formData.website) {
      // Silently reject (don't inform the bot)
      setStatus({
        type: 'success',
        message: 'Köszönöm az üzeneted! Hamarosan jelentkezem.',
      });
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      return;
    }

    // Rate limiting: prevent submissions within 30 seconds
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const RATE_LIMIT_MS = 30000; // 30 seconds

    if (timeSinceLastSubmit < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / 1000);
      setStatus({
        type: 'error',
        message: `Kérlek várj ${remainingSeconds} másodpercet újabb üzenet küldése előtt.`,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // EmailJS credentials from environment variables
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS credentials are not configured');
      }

      // Sanitize all inputs before sending
      const sanitizedData = {
        from_name: DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] }),
        from_email: DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] }),
        phone: DOMPurify.sanitize(formData.phone, { ALLOWED_TAGS: [] }),
        message: DOMPurify.sanitize(formData.message, { ALLOWED_TAGS: [] }),
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        sanitizedData,
        PUBLIC_KEY
      );

      setLastSubmitTime(now);
      setStatus({
        type: 'success',
        message: 'Köszönöm az üzeneted! Hamarosan jelentkezem.',
      });
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Hiba történt az üzenet küldése során. Kérlek próbáld újra később.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <SEO
        title="Kapcsolat"
        description="Vedd fel velem a kapcsolatot fotózási időpont egyeztetéséhez. Elérhető vagyok emailen és közösségi médiában. Várom megkeresésed!"
        keywords="kapcsolat, fotózás foglalás, időpont egyeztetés, fotográfus elérhetőség, fotózás árajánlat"
        ogImage="/assets/homepage/hero.jpg"
        ogImageAlt="Kapcsolatfelvétel - Pelei Niki Fotográfus"
        canonicalUrl="/contact"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-amber-200 to-orange-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <div className={`inline-block mb-2 sm:mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-primary-600 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">Kapcsolat</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-gray-900 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Vegyük fel a kapcsolatot!
            </h1>
            <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full mb-3 sm:mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
            <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Várom megkeresésed! Írj bátran, és beszéljük meg együtt, hogyan örökíthetem meg a családod legszebb pillanatait
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="bg-gradient-to-br from-white via-primary-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <span className="w-8 sm:w-10 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-2 sm:mr-3"></span>
                  Elérhetőségek
                </h2>

                <div className="space-y-3 sm:space-y-5">
                  <div className="group flex items-start p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100 transition-all duration-500 hover:shadow-soft hover:translate-x-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-500">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">Email</div>
                      <a
                        href="mailto:peleinikifotoi@gmail.com"
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-300 break-all"
                      >
                        peleinikifotoi@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-start p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100 transition-all duration-500 hover:shadow-soft hover:translate-x-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-500">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">Telefon</div>
                      <a
                        href="tel:+36203655393"
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                      >
                        +36 20 365 5393
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="bg-gradient-to-br from-white via-primary-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <span className="w-8 sm:w-10 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-2 sm:mr-3"></span>
                  Közösségi média
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
                  Kövess be Instagramon és Facebookon, hogy ne maradj le a legfrissebb munkáimról!
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://www.instagram.com/peleinikifotoi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-3 border border-orange-100"
                    aria-label="Instagram"
                  >
                    <img
                      src={getAssetPath('assets/icons/instagram.svg')}
                      alt="Instagram"
                      className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </a>
                  <a
                    href="https://www.facebook.com/peleinikifoto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-3 border border-orange-100"
                    aria-label="Facebook"
                  >
                    <img
                      src={getAssetPath('assets/icons/facebook.svg')}
                      alt="Facebook"
                      className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl bg-gradient-to-br from-white via-primary-50 to-white shadow-soft-lg border border-gray-200" aria-label="Kapcsolatfelvételi űrlap">
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <span className="w-10 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-3"></span>
                    Írj nekem!
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Töltsd ki az űrlapot, és hamarosan jelentkezem
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Név *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 hover:shadow-soft bg-white"
                    placeholder="Teljes neved"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 hover:shadow-soft bg-white"
                    placeholder="email@pelda.hu"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefonszám
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 hover:shadow-soft bg-white"
                    placeholder="+36 20 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all duration-300 hover:border-gray-300 hover:shadow-soft bg-white"
                    placeholder="Milyen fotózásra gondoltál? Mikor és hol szeretnéd?"
                  />
                </div>

                {/* Honeypot field - hidden from users, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-amber-700 hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Küldés...
                      </>
                    ) : (
                      <>
                        Üzenet küldése
                        <svg className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                {status.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className={`p-5 rounded-xl font-medium ${
                      status.type === 'success'
                        ? 'bg-green-50 text-green-800 border-2 border-green-200'
                        : 'bg-red-50 text-red-800 border-2 border-red-200'
                    } animate-fade-in`}
                  >
                    <div className="flex items-start">
                      {status.type === 'success' ? (
                        <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span>{status.message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
