import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import { getAssetPath } from '../utils/assets';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Contact = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field - should remain empty
  });

  useEffect(() => {
    setIsVisible(true);

    if (location.state?.message) {
      setFormData((prev) => ({ ...prev, message: location.state.message }));
      // Scroll to form section with enhanced smooth scrolling
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          const headerOffset = 100; // Account for sticky header
          const elementPosition = formElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Add subtle highlight animation to the form
          formElement.classList.add('form-highlight');
          setTimeout(() => {
            formElement.classList.remove('form-highlight');
          }, 2000);
        }
      }, 300);
    }
  }, [location.state]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      setFormData({ name: '', email: '', message: '', website: '' });
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
      setFormData({ name: '', email: '', message: '', website: '' });
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
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 relative overflow-hidden">
      <SEO
        title="Kapcsolat"
        description="Foglalj családi fotózást Budapesten! Vedd fel velem a kapcsolatot időpont egyeztetéshez. Elérhető vagyok emailen, Instagramon és Facebookon."
        keywords="kapcsolat, családi fotózás foglalás Budapest, időpont egyeztetés, fotózás árajánlat, peleinikifotoi, fotós elérhetőség"
        ogImage="/assets/homepage/hero.jpg"
        ogImageAlt="Kapcsolatfelvétel - Pelei Niki családi és gyermekfotós Budapest"
        canonicalUrl="/contact"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-terracotta/30 to-sunsetOrange/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-sunsetOrange/30 to-goldenHour/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-peach-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
            <div className={`inline-block mb-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="font-handwritten text-terracotta text-xl sm:text-2xl md:text-3xl">Kapcsolat</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 sm:mb-3 text-charcoal transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Vegyük fel a kapcsolatot!
            </h1>
            <div className={`w-16 sm:w-20 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange mx-auto rounded-full mb-2 sm:mb-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
            <p className={`text-base sm:text-lg md:text-xl font-body text-warmBrown leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Várom megkeresésed! Írj bátran, és beszéljük meg együtt, hogyan örökíthetem meg a családod legszebb pillanatait
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {/* Contact Information */}
            <div className={`space-y-3 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              {/* Social Media Section */}
              <div className="bg-gradient-to-br from-warmPaper via-peach-100 to-cream-100 rounded-xl sm:rounded-2xl p-4 shadow-soft border border-warmBrown/20">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-charcoal mb-2 sm:mb-3 flex items-center">
                  <span className="w-8 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange rounded-full mr-2"></span>
                  Közösségi média
                </h3>
                <p className="text-sm font-body text-warmBrown mb-3 leading-relaxed">
                  Kövess be Instagramon és Facebookon, vagy írj e-mailt!
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/peleinikifotoi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profil"
                    className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/instagram.svg')}
                      alt="Instagram ikon"
                      className="w-6 h-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/peleinikifoto"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oldal"
                    className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/facebook.svg')}
                      alt="Facebook ikon"
                      className="w-6 h-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                  <a
                    href="mailto:peleinikifotoi@gmail.com"
                    aria-label="E-mail küldése"
                    className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center"
                  >
                    <img
                      src={getAssetPath('assets/icons/email.svg')}
                      alt="E-mail ikon"
                      className="w-6 h-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-warmPaper via-peach-100 to-cream-100 rounded-xl sm:rounded-2xl p-4 shadow-soft border border-warmBrown/20">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-charcoal mb-3 flex items-center">
                  <span className="w-8 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange rounded-full mr-2"></span>
                  Elérhetőségek
                </h2>

                <div className="space-y-3">
                  <div className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-peach-100 to-transparent hover:from-cream-100 transition-all duration-500 hover:shadow-soft hover:translate-x-2">
                    <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange shadow-soft flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 group-hover:shadow-soft-lg transition-all duration-500">
                      <img
                        src={getAssetPath('assets/icons/email.svg')}
                        alt="Email ikon"
                        className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-charcoal mb-1 text-sm sm:text-base">Email</div>
                      <a
                        href="mailto:peleinikifotoi@gmail.com"
                        className="font-body text-terracotta hover:text-sunsetOrange font-medium transition-colors duration-300 break-all text-sm sm:text-base"
                      >
                        peleinikifotoi@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 p-4 rounded-2xl bg-gradient-to-br from-warmPaper via-peach-100 to-cream-100 shadow-soft-lg border border-warmBrown/20" aria-label="Kapcsolatfelvételi űrlap">
                <div className="mb-1">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-charcoal mb-1 flex items-center">
                    <span className="w-8 h-1 bg-gradient-to-r from-terracotta to-sunsetOrange rounded-full mr-2"></span>
                    Írj nekem!
                  </h2>
                  <p className="font-body text-warmBrown leading-relaxed text-sm">
                    Töltsd ki az űrlapot, és hamarosan jelentkezem
                  </p>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-serif font-semibold text-charcoal mb-2">
                    Név *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-warmBrown/20 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-all duration-300 hover:border-warmBrown/40 hover:shadow-soft bg-warmPaper"
                    placeholder="Teljes neved"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-serif font-semibold text-charcoal mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-warmBrown/20 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-all duration-300 hover:border-warmBrown/40 hover:shadow-soft bg-warmPaper"
                    placeholder="email@pelda.hu"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-serif font-semibold text-charcoal mb-2">
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-warmBrown/20 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-terracotta resize-none transition-all duration-300 hover:border-warmBrown/40 hover:shadow-soft bg-warmPaper"
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
                  className="group relative w-full bg-gradient-to-r from-terracotta to-sunsetOrange text-white px-6 py-4 rounded-xl font-serif font-semibold text-lg hover:from-sunsetOrange hover:to-goldenHour hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-sunsetOrange to-goldenHour opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;
