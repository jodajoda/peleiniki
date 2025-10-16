import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Adatkezelési Tájékoztató"
        description="Pelei Niki Fotográfus adatvédelmi és adatkezelési tájékoztatója. GDPR megfelelés, személyes adatok kezelése, fotózással kapcsolatos jogok."
        keywords="adatvédelem, GDPR, adatkezelési tájékoztató, személyes adatok, fotózási jogok"
        ogType="article"
        canonicalUrl="/adatkezelesi-tajekoztato"
      />
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-slide-right text-gradient-primary">
            Adatkezelési tájékoztató
          </h1>

          <div className="space-y-8 text-gray-700">
            <section className="animate-slide-left stagger-1">
              <p className="leading-relaxed text-lg">
                Köszönöm, hogy felkereste az oldalamat.
              </p>
              <p className="leading-relaxed">
                Elkötelezett vagyok amellett, hogy biztosítsam az Ön személyes adatainak védelmét, különös
                tekintettel a fotózásra és a képek kezelésére. Az alábbiakban részletesen ismertetem adatkezelési
                eljárásaimat.
              </p>
              <p className="leading-relaxed mt-4">
                Jelen adatkezelési tájékoztató célja, hogy összefoglalja, hogyan kezelem a weboldalon keresztül
                megadott személyes adatokat. Az adatkezelés során maradéktalanul betartom a hatályos jogszabályokat,
                különös tekintettel az Európai Unió általános adatvédelmi rendeletére (GDPR).
              </p>
            </section>

            <section className="animate-slide-left stagger-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Az adatkezelő adatai</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Neve:</strong> Pelei Nikolett egyéni vállalkozó</p>
                <p className="mb-2"><strong>Székhely:</strong> 1138 Budapest, Bodor utca 1 3/8</p>
                <p className="mb-2"><strong>Adószám:</strong> 90024939-1-41</p>
                <p><strong>Elérhetőség:</strong> peleinikifotos@gmail.com</p>
              </div>
            </section>

            <section className="animate-slide-left stagger-3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adatkezelés célja</h2>
              <p className="leading-relaxed mb-4">
                Célom, hogy kiváló minőségű fotós szolgáltatást nyújtsak Önnek. Ez magában foglalja a fotózás
                folyamatát, a képek szerkesztését, tárolását és esetleges nyomtatását. Személyes adatokat
                (pl. név, e-mail cím) a kapcsolattartás, míg a fotókat a szerződés teljesítése céljából kezelem.
                Egyéb felhasználási cél (pl. honlapon, közösségi médiában megosztott képmás) esetén a szerződésben
                vagy hozzájáruló nyilatkozatban foglaltak szerint járok el.
              </p>
            </section>

            <section className="animate-slide-left stagger-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adatkezelés jogalapja</h2>
              <p className="leading-relaxed mb-4">
                Az adatkezelés jogalapja az Ön hozzájárulása, amelyet a szolgáltatás igénybevételekor ad meg,
                illetve a szolgáltatásnyújtáshoz kötött szerződéses megállapodás.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Kapcsolatfelvétel és kommunikáció</h3>
                  <p className="leading-relaxed">
                    <strong>Cél:</strong> Érdeklődés kezelése, ajánlatkérés teljesítése, kapcsolattartás<br />
                    <strong>Jogalap:</strong> Az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)
                  </p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Fotózási szolgáltatás és szerződés teljesítése</h3>
                  <p className="leading-relaxed">
                    <strong>Cél:</strong> Szerződés előkészítése és teljesítése, időpontegyeztetés<br />
                    <strong>Jogalap:</strong> GDPR 6. cikk (1) bekezdés b) pont – szerződés előkészítése és teljesítése
                  </p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Képmás rögzítése</h3>
                  <p className="leading-relaxed">
                    <strong>Jogalap:</strong> A képmás rögzítéséhez az érintett, vagy törvényes képviselőjének
                    hozzájárulása szükséges (Ptk. 2:48. §)
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-left stagger-5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kezelt adatok köre</h2>
              <p className="leading-relaxed mb-4">
                Az általam kezelt adatok:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Személyes adatok:</strong> beleértve, de nem kizárólagosan a nevet, e-mail címet, telefonszámot</li>
                <li><strong>Fotók (képmás):</strong> az általam készített és kezelt képek, amelyek a fotózás eredményeként jönnek létre</li>
                <li><strong>Üzenet tartalma:</strong> kapcsolatfelvétel esetén megadott információk</li>
              </ul>
              <p className="leading-relaxed mt-4">
                A weboldal statisztikák céljából (pl. látogatók darabszáma az oldalon) adatokat gyűjt és továbbít
                részemre, ezzel elősegítve a szolgáltatásaim jobbá tételét. Az adatok, melyeket a honlapon keresztül
                Ön megoszt velem, kizárólag engedéllyel kerülnek felhasználásra, kapcsolattartás céljából tárolom.
              </p>
            </section>

            <section className="animate-slide-left stagger-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adatkezelés időtartama</h2>
              <p className="leading-relaxed mb-4">
                Az adatkezelés időtartama: hozzájárulás visszavonásáig.
              </p>
              <p className="leading-relaxed">
                A hozzájárulását bármikor visszavonhatja egy üzenettel a <strong>peleinikifotos@gmail.com</strong> e-mail
                címre. Ebben az esetben haladéktalanul törölni fogom az Ön által kért adatokat. A hozzájárulás
                visszavonását megelőző adatkezelés jogszerűnek tekinthető.
              </p>
              <p className="leading-relaxed mt-4">
                Kapcsolatfelvétel esetén az adatokat legfeljebb 2 évig őrzöm meg, kivéve, ha jogszabály más
                időtartamot határoz meg (pl. számviteli bizonylatok megőrzési kötelezettsége).
              </p>
            </section>

            <section className="animate-slide-left stagger-7">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Az érintett jogai</h2>
              <p className="leading-relaxed mb-4">
                Ön jogosult arra, hogy tájékoztatást kérjen kezelt adatairól, kérheti adatainak helyesbítését,
                törlését vagy az adatkezelés korlátozását, valamint tiltakozhat az adatkezelés ellen.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Tájékoztatáshoz való jog:</strong> Információt kérhet az adatkezelésről</li>
                <li><strong>Hozzáférési jog:</strong> Másolatot kérhet a kezelt adatairól</li>
                <li><strong>Helyesbítéshez való jog:</strong> Kérheti a pontatlan adatok javítását</li>
                <li><strong>Törléshez való jog:</strong> Kérheti adatai törlését ("elfeledtetéshez való jog")</li>
                <li><strong>Adatkezelés korlátozásához való jog:</strong> Kérheti az adatkezelés korlátozását</li>
                <li><strong>Adathordozhatósághoz való jog:</strong> Kérheti adatai strukturált, géppel olvasható formátumban való másolását</li>
                <li><strong>Tiltakozáshoz való jog:</strong> Tiltakozhat az adatkezelés ellen</li>
                <li><strong>Hozzájárulás visszavonásához való jog:</strong> Bármikor visszavonhatja hozzájárulását</li>
              </ul>
            </section>

            <section className="animate-slide-left stagger-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adattovábbítás</h2>
              <p className="leading-relaxed">
                Adatokat csak abban az esetben továbbítok harmadik feleknek, ha ez a szolgáltatás nyújtása
                szempontjából szükséges (pl. nyomdai munkálatokhoz vagy speciális képszerkesztéshez). Minden
                harmadik féllel szorosan együttműködök annak érdekében, hogy az Ön adatait biztonságban tartsam.
              </p>
              <p className="leading-relaxed mt-4">
                Személyes adatokat harmadik félnek nem adok át, kivéve, ha arra jogszabály kötelezi, vagy az
                érintett kifejezett hozzájárulását adta. Az adatok tárolása biztonságos szerveren történik.
              </p>
            </section>

            <section className="animate-slide-left stagger-9">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adatbiztonság</h2>
              <p className="leading-relaxed">
                Komolyan veszem az adatbiztonságot, különösen a digitális képek esetében. Megfelelő technikai és
                szervezési intézkedéseket alkalmazok a személyes adatok védelme érdekében, beleértve a titkosítást
                és a biztonságos hozzáféréseket.
              </p>
              <p className="leading-relaxed mt-4">
                Mindent megteszek azért, hogy megvédjem az adatokat jogosulatlan hozzáféréstől, veszteségtől,
                megváltoztatástól, továbbítástól, nyilvánosságra hozataltól, törléstől vagy megsemmisítéstől, illetve
                más formájú visszaélésétől.
              </p>
            </section>

            <section className="animate-slide-left stagger-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie-k (sütik) használata</h2>
              <p className="leading-relaxed">
                Jelenlegi weboldal nem használ sütiket (cookie-kat). Amennyiben a jövőben változás következik be,
                erről külön tájékoztatást adok.
              </p>
            </section>

            <section className="animate-slide-left stagger-11">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jogérvényesítési lehetőségek</h2>
              <p className="leading-relaxed mb-4">
                Amennyiben úgy érzi, hogy adatkezelési jogai sérültek, panasszal élhet a következő hatóságnál:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p>
                  <strong>Nemzeti Adatvédelmi és Információszabadság Hatóság</strong><br />
                  Székhely: 1055 Budapest, Falk Miksa utca 9-11.<br />
                  Postacím: 1363 Budapest, Pf. 9.<br />
                  Telefon: +36 (1) 391-1400<br />
                  E-mail: ugyfelszolgalat@naih.hu<br />
                  Weboldal: <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">naih.hu</a>
                </p>
              </div>
              <p className="leading-relaxed mt-4">
                Emellett bírósághoz is fordulhat az adatkezeléssel kapcsolatos jogviták rendezése érdekében.
              </p>
            </section>

            <section className="animate-slide-left stagger-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frissítések</h2>
              <p className="leading-relaxed">
                Ezen tájékoztatót időről időre frissíthetem vagy módosíthatom, ezért kérem, rendszeresen
                ellenőrizze az esetleges változásokat.
              </p>
            </section>

            <section className="animate-slide-left stagger-13">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kapcsolatfelvétel</h2>
              <p className="leading-relaxed mb-4">
                Kérem, hogy ezen adatkezelési gyakorlattal kapcsolatos bármilyen kérdése vagy aggodalma esetén
                ne habozzon kapcsolatba lépni velem.
              </p>
              <p className="leading-relaxed mb-4">
                Amennyiben kérdése van az adatkezeléssel kapcsolatban, vagy szeretné gyakorolni jogait,
                kérjük, vegye fel velem a kapcsolatot:
              </p>
              <div className="bg-primary-50 p-6 rounded-lg">
                <p className="mb-2"><strong>E-mail:</strong> peleinikifotos@gmail.com</p>
                <p><strong>Instagram:</strong> @peleinikifotoi</p>
              </div>
            </section>

            <section className="animate-slide-left stagger-14">
              <p className="text-sm text-gray-600 mt-12 pt-8 border-t border-gray-200">
                <strong>Utolsó frissítés:</strong> {new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
