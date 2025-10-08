const Packages = () => {
  const packages = [
    {
      id: 1,
      title: 'Játszótéri móka',
      description: 'Kedvenc játszótereteken, vagy parkban.',
      duration: '40 perc fotózás',
      photos: '15 db digitális kép (online tárhelyről letölthető)',
      price: '25.000 Ft',
    },
    {
      id: 2,
      title: 'Röpke pillanatok',
      description: 'Egy helyszínen (otthon, kedvenc játszótereteken, vagy parkban).',
      duration: '60 perc fotózás',
      photos: '30 db digitális kép (online tárhelyről letölthető)',
      price: '35.000 Ft',
    },
    {
      id: 3,
      title: 'Mindennapi csodák',
      description: 'Akár két helyszínen (otthon, kertben, parkban, vagy más számotokra kedves környezetben).',
      duration: '1.5 – 2 óra fotózás',
      photos: '50 db digitális kép (online tárhelyről letölthető)',
      price: '50.000 Ft',
    },
    {
      id: 4,
      title: 'Események',
      description: 'Szülinap, keresztelő, eljegyzési fotózás, esküvő',
      duration: null,
      photos: null,
      price: 'Egyedi árazás',
      note: 'Üzenetben tudsz érdeklődni az egyedi ajánlatért.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          Fotózási Csomagok
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <article
              key={pkg.id}
              className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h2 className="text-2xl font-bold text-primary-800 mb-3">
                {pkg.title}
              </h2>
              <p className="text-gray-600 mb-6">{pkg.description}</p>

              {pkg.duration || pkg.photos ? (
                <ul className="space-y-3 mb-6">
                  {pkg.duration && (
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <strong className="text-gray-900">Időtartam:</strong>{' '}
                        <span className="text-gray-700">{pkg.duration}</span>
                      </div>
                    </li>
                  )}
                  {pkg.photos && (
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <strong className="text-gray-900">Képek száma:</strong>{' '}
                        <span className="text-gray-700">{pkg.photos}</span>
                      </div>
                    </li>
                  )}
                </ul>
              ) : null}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-3xl font-bold text-primary-700" aria-label={`Ár: ${pkg.price}`}>
                  {pkg.price}
                </p>
                {pkg.note && (
                  <p className="text-sm text-gray-600 mt-2">{pkg.note}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 mt-12 italic animate-fade-in">
          * Az árak a választott helyszíntől függően változhatnak.
        </p>
      </div>
    </div>
  );
};

export default Packages;
