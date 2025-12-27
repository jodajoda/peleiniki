import { useState, useEffect, useCallback } from 'react';
import { getAssetPath } from '../utils/assets';

const TestimonialsCarousel = ({ autoRotate = true, interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('next');

  const testimonials = [
    {
      id: 1,
      name: 'Fanni',
      sessionType: 'Keresztelő',
      rating: 5,
      text: 'Nagyon komoly munka, mert a képek mindent visszahoznak mindenkiről, én ilyet még nem láttam. Szuper vagy Niki tényleg, minden elfogultság nélkül, tényleg ez az utad. Érzelmeket hoz elő, ami szerintem képnél nagyon ritka és nehéz feladat. Ja és nem olyan felszínes dolgokat hogy pl de jó a hajam vagy jé milyen ráncos vagyok stb..hanem belső dolgokat…',
      image: 'assets/testimonials/fanni-fotozas.jpg',
      location: 'Kert',
    },
    {
      id: 2,
      name: 'Ildi',
      sessionType: 'Családfotzás otthon',
      rating: 5,
      text: 'A férjem csak annyit mondott, hogy eszméletlen jók és nem érdekli mennyi, fizessem ki, kell az összes. 😀 Olyan jó képek készültek a fiúkról, hogy hihetetlen. Szóval remélem, hogy jössz még hozzánk fotózni, mert irtó jó képeket készítesz. Nagyon látod a gyerekeket és ők is szeretnek téged. 🙂',
      image: 'assets/testimonials/ildi.JPG',
      location: 'Otthoni fotózás',
    },
    {
      id: 3,
      name: 'Dóri',
      sessionType: 'Családfotózás',
      rating: 5,
      text: 'Jaaaaaaj, elképesztően tetszenek a képek!!! <3 Nem is rémlett, hogy ennyi mosolyt sikerült J-ből előhívni.. :) Imádom az összes képet, nagyon-nagyon köszönjük a munkád! Csodás érzéked van a pillanatok elkapásához, élmény nézegetni a képeket egymás után. <3',
      image: 'assets/testimonials/martindori.jpg',
      location: 'Budapest',
    },
    {
      id: 4,
      name: 'Bea',
      sessionType: 'Anyák napi fotózás',
      rating: 5,
      text: 'Elnézést, hogy ennyi idő után válaszolok, de nagyon nehéz volt leszűkíteni a listát, annyira sok remek kép született! Nagyon köszönöm Neked, nemcsak jól érzetük magunkat, hanem csodálatosan kaptad el a pillanatokat….',
      image: 'assets/testimonials/berencsibea.JPG',
      location: 'Városliget',
    },
    {
      id: 5,
      name: 'Alexandra',
      sessionType: 'Kismama fotózás',
      rating: 5,
      text: 'Még egyszer nagyon szépen köszönjük a képeket, és a jó kívánságokat is! Nagyon szeretjük,hogy ilyen spontàn képek készültek,emellett teljesen visszaadja milyenek is vagyunk! Amint S megérkezik, mindenképp jelezni fogunk. Mi is nagyon örülünk,hogy Ràd találtunk, és ígèrem "nem szabadulsz tőlünk" ❤️☺️',
      image: 'assets/testimonials/alexandra.JPG',
      location: 'Hármashatár-hegy',
    },
    {
      id: 6,
      name: 'Nicfulness',
      sessionType: 'Brand fotózás',
      rating: 5,
      text: 'Hát feladtad a leckét... 😄Annyira jól kaptad el a pillanatokat, hogy teli vigyorral néztem végig a válogatást. 🥰',
      image: 'assets/testimonials/nicfulness.jpg',
      location: 'Margitsziget',
    },
    {
      id: 7,
      name: 'Nóri',
      sessionType: 'Család fotózás',
      rating: 5,
      text: 'Ooo Niki, sikerult megint csodásat alkotnod, egyszerűen nem talalok szavakat, csodás, hogy meg tudsz örökíteni olyan pillanatokat melyeket észre sem veszünk mert tényleg csak egy pillanat, de most nézegethetem örökké😍 Könnyeztem most is!',
      image: 'assets/testimonials/nori.JPG',
      location: 'Otthoni fotózás',
    },
  ];

  const nextTestimonial = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  // Auto-rotation
  useEffect(() => {
    if (autoRotate && !isHovered) {
      const timer = setInterval(nextTestimonial, interval);
      return () => clearInterval(timer);
    }
  }, [autoRotate, isHovered, interval, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main testimonial card */}
      <div className="relative bg-warmPaper rounded-3xl shadow-soft-lg overflow-hidden border border-warmBrown/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-terracotta/30 to-goldenHour/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tl from-goldenHour/20 to-sunsetOrange/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <img
                key={currentTestimonial.id}
                src={getAssetPath(currentTestimonial.image)}
                alt={`${currentTestimonial.name} - ${currentTestimonial.sessionType}`}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  direction === 'next' ? 'animate-slideInRight' : 'animate-slideInLeft'
                }`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Session type badge */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-warmPaper/90 backdrop-blur-sm rounded-full shadow-md border border-warmBrown/20">
                <span className="text-sm font-semibold font-body text-charcoal">{currentTestimonial.sessionType}</span>
              </div>
            </div>

            {/* Quote decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-terracotta to-sunsetOrange rounded-full flex items-center justify-center shadow-lg hidden md:flex">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>

          {/* Right side - Testimonial content */}
          <div className="flex flex-col justify-center">
            {/* Star rating */}
            <div
              key={`rating-${currentTestimonial.id}`}
              className={`flex gap-1 mb-4 md:mb-6 ${
                direction === 'next' ? 'animate-fadeInUp' : 'animate-fadeInDown'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-7 md:h-7 text-goldenHour drop-shadow-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote
              key={`text-${currentTestimonial.id}`}
              className={`text-base sm:text-lg md:text-xl font-body text-warmBrown leading-relaxed mb-6 md:mb-8 italic ${
                direction === 'next' ? 'animate-fadeInUp' : 'animate-fadeInDown'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author info */}
            <div
              key={`author-${currentTestimonial.id}`}
              className={direction === 'next' ? 'animate-fadeInUp' : 'animate-fadeInDown'}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-sunsetOrange flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-serif font-bold text-charcoal text-lg">{currentTestimonial.name}</p>
                  <p className="text-sm font-body text-warmBrown/70 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-warmPaper shadow-lg hover:shadow-xl flex items-center justify-center text-warmBrown hover:text-terracotta transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-terracotta/50 z-10"
        aria-label="Előző vélemény"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-warmPaper shadow-lg hover:shadow-xl flex items-center justify-center text-warmBrown hover:text-terracotta transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-terracotta/50 z-10"
        aria-label="Következő vélemény"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
              index === currentIndex
                ? 'w-10 sm:w-12 h-3 bg-gradient-to-r from-terracotta to-sunsetOrange'
                : 'w-3 h-3 bg-warmBrown/30 hover:bg-warmBrown/50'
            }`}
            aria-label={`Ugrás a ${index + 1}. véleményhez`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
