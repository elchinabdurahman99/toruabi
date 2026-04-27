/**
 * scripts/seed-elec-b2.mjs
 * Patches 3 home-services Sanity documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-elec-b2.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── helpers ───────────────────────────────────────────────────────────────────
function toPortableText(text) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((para, i) => ({
      _key: `b${i}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: `c${i}`, _type: "span", text: para.trim(), marks: [] }],
    }));
}

function ls(et, en, ru) { return { _type: "localeString", et, en, ru }; }
function lt(et, en, ru) { return { _type: "localeText",   et, en, ru }; }
function lb(et, en, ru) {
  return {
    _type: "localeBlock",
    et: toPortableText(et),
    en: toPortableText(en),
    ru: toPortableText(ru),
  };
}

async function uploadImg(keyword, filename) {
  const url = `https://loremflickr.com/1200/800/${encodeURIComponent(keyword.split(' ').slice(0,3).join(','))}/all`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patch(slug, data) {
  const doc = await client.fetch(
    `*[_type=="service" && slug.current==$s][0]{_id}`,
    { s: slug }
  );
  if (!doc) { console.error("NOT FOUND:", slug); return; }
  await client.patch(doc._id).set(data).commit();
  console.log("✓", slug);
}

// ── service definitions ───────────────────────────────────────────────────────

const services = [

  // ── 1. appliance-installation ─────────────────────────────────────────────
  {
    slug: "appliance-installation",
    kw1: "home appliance installation washing machine",
    kw2: "technician connecting appliance home",
    alt1: ls(
      "Kodumaja paigaldus — pesumasin, nõudepesumasin, ahi Tallinnas",
      "Home appliance installation — washing machine, dishwasher, oven in Tallinn",
      "Установка бытовой техники — стиральная машина, посудомойка, плита в Таллине"
    ),
    alt2: ls(
      "Tehnik ühendab kodumasinat Tallinna kodus",
      "Technician connecting home appliance in a Tallinn home",
      "Техник подключает бытовую технику в доме в Таллине"
    ),
    short: lt(
      "Paigaldame kõiki kodumasinaid — pesumašiine, nõudepesumasinaid, ahjusid, pliitasid, sügavkülmikuid. Korrektne vee-, kanalisatsiooni- ja elektriühendus, tasandamine, testimine, garantii. Kõik brändid, Tallinn ja Harjumaa.",
      "We install all home appliances — washing machines, dryers, dishwashers, electric ovens, cookers and freezers. Correct water, drainage and electrical connection, levelling, testing, warranty. All brands, Tallinn and Harjumaa.",
      "Устанавливаем все виды бытовой техники — стиральные машины, сушилки, посудомойки, электрические духовые шкафы, плиты, морозильники. Правильное подключение к воде, канализации и электросети, выравнивание, тестирование, гарантия. Все бренды, Таллин и Харьюмаа."
    ),
    metaTitle: ls(
      "Kodumasinate paigaldus Tallinnas | Kõik brändid, garantii",
      "Home Appliance Installation Tallinn | All Brands, Warranty",
      "Установка бытовой техники в Таллине | Все бренды, гарантия"
    ),
    metaDesc: lt(
      "Professionaalne kodumasinate paigaldus Tallinnas ja Harjumaal. Pesumašiinid, nõudepesumasinad, ahjud, pliidid. Kõik brändid. Garantii tööle. Tasuta hinnapakkumine — helista kohe!",
      "Professional home appliance installation in Tallinn, Estonia. Washing machines, dishwashers, ovens, cookers, freezers. All brands. Warranty on work. Free quote — call now!",
      "Профессиональная установка бытовой техники в Таллине. Стиральные машины, посудомойки, духовые шкафы, плиты, морозильники. Все бренды. Гарантия на работу. Бесплатная смета — звоните!"
    ),
    body: lb(
      // ET — 500+ words
      `Kodumasinate paigaldus Tallinnas — professionaalne, kiire ja garantiiga

Kodumasinate paigaldus tundub esmapilgul lihtne, kuid tegelikkuses nõuab see täpseid teadmisi veeühenduste, kanalisatsioonisüsteemide ja elektripaigaldise kohta. Vale paigaldus võib põhjustada lekkeid, elektrilühiseid või seadme enneaegset riknemist. TorudeAbi24 meeskond on aastaid tegelenud kodumasinate professionaalse paigaldusega kogu Tallinnas ja Harjumaal, tagades kõikidele töödele kirjaliku garantii.

Milliseid seadmeid paigaldame?

Paigaldame kõikvõimalikke kodumasinaid: pesumašiinid (eestlaadivad ja pealtlaadivad), kuivatid ja pesumašiin-kuivati kombinatsioonid, nõudepesumasinad (eraldiseisvad ja integreeritavad), elektrilised ahjud ja pliidid (sh kombiplaadid), elektripliitasad (keraamilised ja induktsioon), külmikud ja sügavkülmikud, mikrolaineahjud sisseehituseks. Töötame kõikide tuntud tootjate seadmetega: Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko jt.

Miks on professionaalne paigaldus oluline?

Paljud inimesed üritavad kodumasinaid ise paigaldada, kuid see võib lõppeda kuludega, mis ületavad professionaalse paigalduse hinna mitu korda. Ebaõigesti ühendatud pesumasin võib lekkida ja kahjustada põrandat, aluskorrust ja isegi naabrite kodu. Valed elektriühendused võivad põhjustada lühise või tulekahju. Tasandamata pesumasin tekitab liigset müra, vibratsiooni ja kulub kiiremini. Meie paigaldajad tagavad, et kõik ühendused on korrektse ja turvalised vastavalt tootja spetsifikatsioonile.

Paigaldusprotsess samm-sammult

Esmalt kontrollime olemasolevat veevärki, kanalisatsiooniliitumist ja elektripistikut — vajadusel teavitame teid lisatöödest, mis on vajalikud enne seadme paigaldust. Seejärel asetame seadme korrektsesse kohta, ühendame vee sissetuleku- ja väljalaske voolikud, pistame elektriühenduse vastavasse tugevdatud pistikusse, tasandame seadme hoolikalt vesiloodiga, teeme proovilaadimise (pesemis- või pesitsustesti) ja selgitame teile seadme põhifunktsioonid ning hooldamise.

Veeühendused ja kanalisatsioon

Pesumašiini ja nõudepesumasina paigaldamisel pöörame erilist tähelepanu veeühenduste kvaliteedile. Kasutame ainult sertifitseeritud voolikuid ja liitmikke. Täpsustame, kas olemasolev veetoru rõhk vastab tootja nõuetele — liiga madal rõhk võib põhjustada pesemisprobleeme, liiga kõrge aga voolikute purunemist. Kanalisatsioonitoru ühenduse kõrgus peab samuti olema korrektne, et vältida veesifoonist tagasi voolava vee probleeme.

Elektriühendus ja ülekoormuse kaitse

Elektrilised ahjud ja pliidid vajavad eraldi turvakaitset ja sageli spetsiaalset kaablit. Kontrollime, kas olemasolev elektripaigaldis vastab nõuetele ja soovitame vajadusel elektrikut kaasamist. Pesumašiinid ja nõudepesumasinad peavad olema ühendatud maandusega pistikusse. Integreeritavad seadmed vajavad tihti spetsiaalset pistikupaigutust mööbli taga — aitame leida parima lahenduse.

Tasandamine ja müravähendus

Korralik tasandamine pikendab seadme eluiga märkimisväärselt ja vähendab tsentrifugeerimise müra. Kasutame täpset vesiloodimist ja reguleerime kõiki nelja jalga, kuni seade seisab täiesti tasaselt. Soovi korral paigaldame ka vibratsioonivastased kummist aluseid, mis vähendavad müra veelgi ja kaitsevad põrandapinda.

Garantii ja järelhooldus

Kõikidele paigaldatud seadmetele anname 2-aastase töögarantii — see tähendab, et kui paigaldusega seotud probleem tekib kahe aasta jooksul, tuleme tagasi ja lahendame selle tasuta. Lisaks anname nõu seadme optimaalseks kasutamiseks, mis aitab hoolduskulusid vähendada ja seadme eluiga pikendada.

Paindlik ajakava — ka nädalavahetusel

Töötame paindliku ajakava alusel, sh laupäeviti ja pühapäeviti. Tallinn, Viimsi, Maardu, Saue, Keila — meie paigaldajad jõuavad kõigisse nendesse piirkondadesse. Tasuta hinnapakkumine on saadaval igale kliendile. Helistage meile ja broneerige paigaldusaeg juba täna.`,

      // EN — 500+ words
      `Home Appliance Installation in Tallinn — Professional, Fast and Guaranteed

Home appliance installation may seem straightforward, but it requires precise knowledge of water connections, drainage systems and electrical installations. Incorrect installation can cause leaks, short circuits or premature appliance failure. The TorudeAbi24 team has years of experience carrying out professional home appliance installations across Tallinn and Harjumaa, with a written guarantee on every job.

Which appliances do we install?

We install all types of home appliances: washing machines (front-loading and top-loading), tumble dryers and washer-dryer combinations, dishwashers (freestanding and integrated), electric ovens and cookers including range cookers, electric hobs (ceramic and induction), fridge-freezers and chest freezers, built-in microwaves. We work with all major brands including Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko and many more.

Why professional installation matters

Many people attempt DIY appliance installation, but mistakes can cost far more than professional installation. An incorrectly connected washing machine can leak and damage flooring, substructures and even neighbouring homes. Wrong electrical connections can cause short circuits or fire. An unlevel washing machine creates excessive noise, vibration and wears out faster. Our installers ensure all connections are correct and safe according to the manufacturer's specification.

Installation process step by step

We begin by checking the existing water supply, drainage connection and electrical socket — and we will advise you of any additional work needed before the appliance can be installed. We then position the appliance correctly, connect the water inlet and outlet hoses, plug into the appropriate dedicated socket, carefully level the appliance using a spirit level, run a test wash or cycle, and explain the main functions and care requirements to you.

Water connections and drainage

When installing washing machines and dishwashers we pay particular attention to water connection quality. We use only certified hoses and fittings. We verify that existing water pressure meets the manufacturer's requirements — too low and washing performance suffers, too high and hoses can burst. Drainage pipe connection height must also be correct to prevent back-flow from the trap.

Electrical connection and overload protection

Electric ovens and hobs require a dedicated circuit and often a special cable. We check whether the existing electrical installation meets the requirements and recommend an electrician if needed. Washing machines and dishwashers must be connected to an earthed socket. Integrated appliances often require a specific socket position behind furniture — we help find the best solution.

Levelling and noise reduction

Correct levelling significantly extends appliance life and reduces spin-cycle noise. We use precise spirit levelling and adjust all four feet until the appliance sits perfectly flat. On request we also install anti-vibration rubber mats, which further reduce noise and protect the floor surface.

Warranty and aftercare

We provide a 2-year workmanship guarantee on all installations — meaning that if an installation-related issue arises within two years, we return and resolve it at no charge. We also advise you on optimal use to reduce running costs and extend appliance life.

Flexible schedule — including weekends

We work flexible hours, including Saturdays and Sundays. Tallinn, Viimsi, Maardu, Saue, Keila — our installers cover all these areas. A free quote is available to every customer. Call us and book your installation appointment today.`,

      // RU — 500+ words
      `Установка бытовой техники в Таллине — профессионально, быстро и с гарантией

Установка бытовой техники кажется простой задачей, однако на деле требует точных знаний о водопроводных соединениях, канализационных системах и электропроводке. Неправильная установка может вызвать протечки, короткое замыкание или преждевременный выход прибора из строя. Команда TorudeAbi24 имеет многолетний опыт профессиональной установки бытовой техники по всему Таллину и уезду Харьюмаа с письменной гарантией на каждую выполненную работу.

Какую технику мы устанавливаем?

Устанавливаем все виды бытовой техники: стиральные машины (фронтальной и вертикальной загрузки), сушильные машины и стирально-сушильные комбайны, посудомоечные машины (отдельностоящие и встраиваемые), электрические духовые шкафы и кухонные плиты, электрические варочные панели (стеклокерамические и индукционные), холодильники и морозильные камеры, встраиваемые микроволновые печи. Работаем со всеми ведущими брендами: Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko и многими другими.

Почему важна профессиональная установка?

Многие пытаются установить технику самостоятельно, но ошибки обходятся значительно дороже, чем профессиональный монтаж. Неправильно подключённая стиральная машина может протечь и повредить пол, перекрытия и даже квартиру соседей. Неверные электрические соединения могут вызвать короткое замыкание или пожар. Невыровненная стиральная машина создаёт излишний шум, вибрацию и изнашивается быстрее. Наши монтажники обеспечивают, чтобы все соединения соответствовали спецификациям производителя и были выполнены безопасно.

Процесс установки шаг за шагом

Начинаем с проверки существующего водоснабжения, канализационного подключения и электрической розетки — при необходимости информируем вас о дополнительных работах, которые нужно выполнить до монтажа прибора. Затем устанавливаем технику на место, подключаем шланги подачи и отвода воды, вставляем вилку в соответствующую специализированную розетку, тщательно выравниваем прибор по уровню, проводим тестовый запуск (пробную стирку или цикл) и объясняем вам основные функции и правила ухода.

Водопроводные подключения и канализация

При установке стиральных машин и посудомоечных машин мы уделяем особое внимание качеству водопроводных соединений. Используем только сертифицированные шланги и фитинги. Проверяем, соответствует ли давление воды в существующем трубопроводе требованиям производителя — слишком низкое давление ухудшает качество стирки, слишком высокое может привести к разрыву шлангов. Высота подключения сливного шланга также должна быть правильной, чтобы предотвратить обратный слив из сифона.

Электрическое подключение и защита от перегрузки

Электрические духовые шкафы и варочные панели требуют отдельного автомата защиты и нередко специального кабеля. Проверяем, соответствует ли существующая электропроводка требованиям, и при необходимости рекомендуем привлечь электрика. Стиральные машины и посудомоечные машины должны быть подключены к розетке с заземлением. Встраиваемые приборы часто требуют специального расположения розетки за мебелью — помогаем найти лучшее решение.

Выравнивание и шумоизоляция

Правильное выравнивание значительно продлевает срок службы техники и снижает шум при отжиме. Используем точный уровень и регулируем все четыре ножки до тех пор, пока прибор не встанет идеально ровно. По желанию устанавливаем также антивибрационные резиновые коврики, которые дополнительно снижают шум и защищают напольное покрытие.

Гарантия и последующее обслуживание

На все выполненные установки предоставляем 2-летнюю гарантию — это означает, что если в течение двух лет возникнет проблема, связанная с монтажом, мы вернёмся и устраним её бесплатно. Также даём рекомендации по оптимальному использованию техники для снижения затрат на обслуживание и продления её срока службы.

Гибкий график — включая выходные

Работаем в гибком режиме, в том числе в субботу и воскресенье. Таллин, Виймси, Маарду, Сауэ, Кейла — наши монтажники обслуживают все эти районы. Бесплатная смета доступна каждому клиенту. Звоните и записывайтесь на установку уже сегодня.`
    ),
  },

  // ── 2. builtin-appliance-installation ────────────────────────────────────
  {
    slug: "builtin-appliance-installation",
    kw1: "built-in kitchen appliance installation oven",
    kw2: "integrated appliance kitchen fitting",
    alt1: ls(
      "Integreeritava ahi ja induktsioonpliidi paigaldus köögimööblisse Tallinnas",
      "Built-in oven and induction hob installation into kitchen furniture in Tallinn",
      "Установка встроенной духовки и индукционной варочной панели в кухонную мебель в Таллине"
    ),
    alt2: ls(
      "Integreeritava nõudepesumasina paigaldus köögikapi alla",
      "Integrated dishwasher fitting under kitchen cabinet",
      "Монтаж встраиваемой посудомоечной машины под кухонную столешницу"
    ),
    short: lt(
      "Paigaldame kõiki integreeritavaid kodumasinaid — sisseehitatud ahjud, induktsioon- ja gaaspliitasad, mikrolained, nõudepesumasinad, külmikud köögimööblisse. Täpne sobitamine, kapi kohandamine vajadusel, brändisertifitseeritud tehnikud, Tallinn.",
      "We install all built-in and integrated appliances — ovens, induction, gas and ceramic hobs, microwaves, dishwashers, fridge-freezers into kitchen furniture. Precise fitting, cabinet modification if needed, brand-certified technicians, Tallinn.",
      "Устанавливаем все встраиваемые приборы — духовые шкафы, индукционные, газовые и стеклокерамические варочные панели, микроволновки, посудомойки, холодильники в кухонную мебель. Точная подгонка, модификация шкафов при необходимости, сертифицированные техники, Таллин."
    ),
    metaTitle: ls(
      "Integreeritavate kodumasinate paigaldus Tallinnas",
      "Built-In Appliance Installation Tallinn | Brand Certified",
      "Установка встроенной техники Таллин | Сертификат бренда"
    ),
    metaDesc: lt(
      "Integreeritavate kodumasinate paigaldus Tallinnas. Sisseehitatud ahjud, pliitasad, nõudepesumasinad köögimööblisse. Brändisertifitseeritud tehnikud. Tasuta hinnapakkumine — helista!",
      "Built-in integrated appliance installation in Tallinn, Estonia. Ovens, hobs, microwaves, dishwashers fitted into kitchen cabinets. Brand-certified technicians. Free quote — call now!",
      "Установка встроенной техники в Таллине. Духовые шкафы, варочные панели, посудомойки в кухонную мебель. Сертифицированные техники. Бесплатная смета — звоните сейчас!"
    ),
    body: lb(
      // ET — 500+ words
      `Integreeritavate kodumasinate paigaldus Tallinnas — täpne, professionaalne, brändisertifitseeritud

Integreeritavate ehk sisseehitatud kodumasinate paigaldus köögimööblisse on oluliselt keerulisem kui eraldiseisvate seadmete paigaldus. See nõuab täpset mõõtmist, nii seadme kui ka kapi kohandamist, oskust töötada erinevate materjalidega ja põhjalikku teadmist iga tootja erilistest paigaldusnõuetest. TorudeAbi24 brändisertifitseeritud tehnikud on spetsialiseerunud just integreeritavate seadmete paigaldusele Tallinnas ja Harjumaal.

Milliseid integreeritavaid seadmeid paigaldame?

Meie meeskond paigaldab järgmisi integreeritavaid seadmeid: sisseehitatud elektrilised ahjud (sh auruahjud ja kombi-mikroahjud), induktsioonpliitasad (1-, 2-, 4- ja 5-tsooniline), keraamilised pliitasad, gaasipliitasad (gaasiga köögis), integreeritavad nõudepesumasinad (küljelt avatatavad ja täiesti peidetud variantid), integreeritavad külmikud ja sügavkülmikud (sh kõrvuti paigaldatavad ameerika tüüpi külmikud), integreeritavad mikrolaineahjud ja kombineeritavad mikroahju-ahju lahendused. Töötame kõikide tuntud tootjatega: Bosch, Siemens, Miele, AEG, Electrolux, Gaggenau, Neff, Samsung, LG, Whirlpool jt.

Mis muudab integreeritava seadme paigalduse keeruliseks?

Erinevalt eraldiseisvatest seadmetest peavad integreeritavad seadmed täpselt sobituma mööblikapi mõõtmetesse. Standardmõõdud on küll olemas (nt 60 cm laius ja 56–57 cm sügavus), kuid vanemas köögimööblis võivad need kõikuda. Lisaks peavad vastama ventilatsiooniavad (eriti ahjudel), elektriühenduse asukoht kapi taga, pliitasandate lõikeavad sahtlites ja tööplaatides, ühendusjuhtmed ja pistikupesade asukohad. Meie tehnikud tunnevad kõiki neid nüansse ja lahendavad probleemid samas külastuses.

Kapi kohandamine ja puurimine

Sageli vajab integreeritava seadme paigaldus kapi kerget kohandamist — ventilatsiooniavade tegemist, eemaldatavate vaheseintega arvestamist, kinnitusdetailide paigaldamist. Meie tehnikud on varustatud vajaliku tööriistaga ja suudavad teha selliseid kohandusi kohapeal, ilma et peaksite eraldi tislerit tellima. Kõik kohandused tehakse ettevaatlikult, nii et kapi väljanägemine ei kannata.

Pliitasandate lõikeava ja tihendusnõuded

Induktsioon- ja keraamiliste pliitasandate paigaldus tööplaadile nõuab täpset lõikeava. Kasutame professionaalseid diamantveskeid ja lõikureid, mis tagavad sile ja täpse ava ilma klingerite praguneda laskmata. Tihenduse ja ülejõu vahekauguse nõuded on igal tootjal veidi erinevad — järgime alati tootja ametlikku paigaldusjuhendit.

Elektriühendus ja ohutus

Integreeritavad ahjud vajavad kindlalt maandatud ja piisava sektsiooniga elektriühendust. Kontrollime alati, et olemasolev elektripaigaldis vastab nõuetele. Gaasipliitasandate puhul koordineerime vajadusel gaasimontööri töö, et tagada ohutu kompleksne paigaldus.

Lõpptestimine ja kasutusjuhend

Iga paigalduse lõpus testim kõiki funktsioone — kuumutamistsoone, termostaati, programmijuhtimist, valgustust jne. Selgitame kliendile põhifunktsioonid ja anname soovitused hoolduse kohta. Vajadusel registreerime seadme ka tootja juures garantiiteeninduse aktiveerimiseks.

Garantii ja brändisertifikaadid

Kõikidele paigaldatud seadmetele anname 2-aastase töögarantii. Meie tehnikutel on brändisertifikaadid mitmete tootjate jaoks, mis tähendab, et paigaldus vastab tootja ametlikele standarditele ja ei kehti garantii tühistas. Helistage meile ja saage tasuta hinnapakkumine.`,

      // EN — 500+ words
      `Built-In Appliance Installation in Tallinn — Precise, Professional, Brand-Certified

Installing built-in and integrated appliances into kitchen furniture is considerably more complex than fitting freestanding units. It requires precise measurement, adaptation of both the appliance and the cabinet, skill with different materials, and thorough knowledge of each manufacturer's specific installation requirements. The TorudeAbi24 brand-certified technicians specialise in exactly this type of installation across Tallinn and Harjumaa.

Which integrated appliances do we install?

Our team installs the following built-in appliances: integrated electric ovens (including steam ovens and combi-microwave ovens), induction hobs (1-, 2-, 4- and 5-zone), ceramic hobs, gas hobs, integrated dishwashers (door-open and fully concealed panel versions), integrated fridge-freezers (including American-style side-by-side), integrated microwaves and combination microwave-oven units. We work with all major manufacturers: Bosch, Siemens, Miele, AEG, Electrolux, Gaggenau, Neff, Samsung, LG, Whirlpool and many more.

What makes built-in appliance installation complex?

Unlike freestanding appliances, integrated units must fit precisely within cabinet dimensions. Standard sizes exist (e.g. 60 cm width, 56–57 cm depth) but older kitchen furniture can vary. In addition, the following must all align correctly: ventilation apertures, especially for ovens; electrical connection position behind the cabinet; hob cut-out openings in worktops and drawers; connecting cables and socket positions. Our technicians know every one of these details and resolve issues in a single visit.

Cabinet modification and cutting

Integrated appliance installation often requires minor cabinet adaptation — cutting ventilation openings, allowing for removable partitions, fitting mounting hardware. Our technicians carry the necessary tools and can make such modifications on site, without you needing to hire a separate joiner. All modifications are carried out carefully so the cabinet's appearance is not compromised.

Hob cut-out and sealing requirements

Installing induction and ceramic hobs in a worktop requires a precise cut-out. We use professional diamond grinders and routers that produce a clean, accurate opening without cracking tiles or worktop material. Sealing and minimum clearance requirements vary slightly between manufacturers — we always follow the official installation guide.

Electrical connection and safety

Integrated ovens require a properly earthed electrical connection with adequate cable cross-section. We always verify that the existing electrical installation meets requirements. For gas hobs we coordinate with a gas engineer if needed to ensure a safe combined installation.

Final testing and user orientation

At the end of every installation we test all functions — heating zones, thermostat, programme controls, lighting and so on. We explain the main functions to the customer and provide care recommendations. Where required we also register the appliance with the manufacturer to activate the product warranty.

Warranty and brand certificates

We provide a 2-year workmanship guarantee on all installations. Our technicians hold brand certifications from several manufacturers, meaning the installation meets the manufacturer's official standards and does not void the product warranty. Call us for a free quote.`,

      // RU — 500+ words
      `Установка встроенной техники в Таллине — точно, профессионально, с сертификатом бренда

Установка встроенной и интегрируемой техники в кухонную мебель значительно сложнее, чем монтаж отдельностоящих приборов. Она требует точных замеров, адаптации как прибора, так и шкафа, умения работать с различными материалами и досконального знания специфических требований каждого производителя. Сертифицированные техники TorudeAbi24 специализируются именно на такой установке по всему Таллину и уезду Харьюмаа.

Какую встроенную технику мы устанавливаем?

Наша команда монтирует следующие встраиваемые приборы: встроенные электрические духовые шкафы (в том числе паровые и комби-микроволновые), индукционные варочные панели (1-, 2-, 4- и 5-конфорочные), стеклокерамические варочные панели, газовые варочные панели, встраиваемые посудомоечные машины (с открытой дверцей и полностью скрытые), встраиваемые холодильники и морозильные камеры (в том числе американские side-by-side), встраиваемые микроволновые печи и комбинированные микроволновые духовки. Работаем со всеми ведущими брендами: Bosch, Siemens, Miele, AEG, Electrolux, Gaggenau, Neff, Samsung, LG, Whirlpool и многими другими.

Что делает установку встроенной техники сложной задачей?

В отличие от отдельностоящих приборов, встраиваемые устройства должны идеально вписываться в размеры мебельного шкафа. Стандартные размеры существуют (например, ширина 60 см, глубина 56–57 см), но в старой кухонной мебели они могут отличаться. Кроме того, необходимо правильно согласовать: вентиляционные проёмы (особенно для духовых шкафов); место расположения электрического соединения за шкафом; прорезь под варочную панель в столешнице; соединительные кабели и положение розеток. Наши техники знают все эти нюансы и решают вопросы за одно посещение.

Модификация шкафов и сверление

Установка встроенной техники нередко требует небольшой адаптации шкафа — прорезания вентиляционных отверстий, учёта съёмных перегородок, монтажа крепёжных элементов. Наши техники оснащены необходимым инструментом и могут выполнить такие изменения на месте, без привлечения отдельного столяра. Все модификации проводятся аккуратно, так что внешний вид мебели не страдает.

Вырез под варочную панель и требования к уплотнению

Установка индукционных и стеклокерамических варочных панелей в столешницу требует точного выреза. Мы используем профессиональные алмазные шлифовальные машины и фрезеры, которые обеспечивают чистое и точное отверстие без трещин в кафеле или материале столешницы. Требования к уплотнению и минимальным зазорам немного различаются у разных производителей — мы всегда следуем официальному руководству по установке.

Электрическое подключение и безопасность

Встроенные духовые шкафы требуют надлежащего заземлённого электрического подключения с кабелем достаточного сечения. Мы всегда проверяем, соответствует ли существующая электропроводка требованиям. Для газовых варочных панелей при необходимости координируем работу газового инженера, чтобы обеспечить безопасный комплексный монтаж.

Финальное тестирование и инструктаж

По завершении каждой установки тестируем все функции — зоны нагрева, термостат, программное управление, освещение и т. д. Объясняем клиенту основные функции и даём рекомендации по уходу. При необходимости также регистрируем прибор у производителя для активации гарантии на изделие.

Гарантия и сертификаты бренда

На все выполненные установки предоставляем 2-летнюю гарантию на работы. Наши техники имеют сертификаты нескольких производителей, что означает соответствие установки официальным стандартам производителя и отсутствие аннулирования гарантии на изделие. Позвоните нам для получения бесплатной сметы.`
    ),
  },

  // ── 3. dishwasher-repair ──────────────────────────────────────────────────
  {
    slug: "dishwasher-repair",
    kw1: "dishwasher repair technician kitchen",
    kw2: "appliance repair service dishwasher",
    alt1: ls(
      "Nõudepesumasina remont — tehnik parandab köögis Tallinnas",
      "Dishwasher repair — technician fixing appliance in kitchen in Tallinn",
      "Ремонт посудомоечной машины — техник в кухне в Таллине"
    ),
    alt2: ls(
      "Nõudepesumasina remonditeenus — originaalvaruosad, garantii",
      "Dishwasher repair service — genuine spare parts, warranty",
      "Сервис по ремонту посудомоечной машины — оригинальные запчасти, гарантия"
    ),
    short: lt(
      "Nõudepesumasina remont Tallinnas — ei tühjenda, leke, viga, uksesulg, pumba rike. Kõik brändid: Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux. Originaalvaruosad, garantii tööle.",
      "Dishwasher repair in Tallinn — not draining, leaking, error codes, door latch fault, pump failure. All brands: Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux. Genuine spare parts, warranty on repairs.",
      "Ремонт посудомоечной машины в Таллине — не сливает, течёт, коды ошибок, дверной замок, насос. Все бренды: Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux. Оригинальные запчасти, гарантия."
    ),
    metaTitle: ls(
      "Nõudepesumasina remont Tallinnas | Bosch, Miele, Samsung",
      "Dishwasher Repair Tallinn | Bosch Miele Samsung, Warranty",
      "Ремонт посудомойки Таллин | Bosch Miele Samsung, гарантия"
    ),
    metaDesc: lt(
      "Nõudepesumasina remont Tallinnas. Ei tühjenda, leke, veakoodid, pump. Bosch, Miele, Samsung, AEG, Siemens, Electrolux. Originaalvaruosad, 1-aastane garantii. Helista kohe!",
      "Dishwasher repair in Tallinn, Estonia. Not draining, leaking, error codes, pump failure. Bosch, Miele, Samsung, AEG, Siemens, Electrolux. Genuine parts, 1-year warranty. Call now!",
      "Ремонт посудомоечных машин в Таллине. Не сливает, течёт, коды ошибок, насос. Bosch, Miele, Samsung, AEG, Siemens, Electrolux. Оригинальные запчасти, гарантия 1 год. Звоните!"
    ),
    body: lb(
      // ET — 500+ words
      `Nõudepesumasina remont Tallinnas — kiire, usaldusväärne, garantiiga

Nõudepesumasin on tänapäeva kodu üks olulisemaid kodumasinaid, mis säästab igapäevaselt aega ja vett. Seetõttu on selle rike alati ebamugav. TorudeAbi24 meeskond pakub professionaalset nõudepesumasinate remonti Tallinnas ja Harjumaal, töötades kõikide tuntud tootjate seadmetega. Kasutame ainult originaalvaruosi ja anname kõikidele remontidele garantii.

Milliseid rikkeid lahendame?

Meie tehnikud lahendavad kõiki levinud nõudepesumasinate rikeid:

Ei tühjenda — vesi jääb masina põhja pärast pesemist. Tavaliselt on põhjuseks ummistunud filter, rikki läinud drenažpump, kink väljalaskevoolikus või probleem tagasilöögiklapiga.

Ei täitu veega — masin käivitub, kuid vett ei lase sisse. Põhjuseks võib olla ummistunud sissetuleku filter, rikki läinud sissetulekuklapp (solenoidklapp) või probleem veepumba survestamisega.

Lekib — vett lekib masina alt, küljelt või ukse vahelt. Lekkeid põhjustavad tihendite kulumine, rikki läinud kütus-pumpla, kahjustunud veevooliku ühendused või uksetihend.

Ei pese korralikult — nõud jäävad mustaks, pestes. Põhjuseks võib olla ummistunud pritsikarid, kulunenud pesupump, vale detergendi kasutamine või probleem veesoojendi/termogaasiga.

Veakoodid — masin kuvab vigade koode (E1, E3, F9 jne). Iga tootja kasutab erinevaid koodisüsteeme — meie tehnikud teavad neid kõiki ja oskavad kiiresti diagnoosida.

Ukse salvesti/riivi probleem — uks ei sulgu korralikult või ei lukustu. Tavaliselt on vaja vahetada ukse riiv, käepide või tihend.

Mürakas töö — masin teeb ebatavalisi helisid (krigiseb, koliseb, vilistab). Sageli on põhjuseks väike eset (lusikas, luukoor) kuhugi kinni jäänud või laagrite kulumine.

Ei kuumuta vett — nõud ei ole kuivad või mitte puhtad, kuna masin ei kuumuta pesuvett piisavalt. Vajavad veesoojendi või termogaasi vahetus.

Kõik brändid — Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux ja teised

Oleme spetsialiseerunud järgmiste tootjate nõudepesumasinatele: Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko, Candy, Hotpoint, Indesit, Zanussi, Smeg ja paljud teised. Iga tootja kasutab oma erilist konstruktsiooni ja juhtimissüsteemi — meie tehnikutel on kogemus kõikidega.

Originaalvaruosad — mitte koopiad

Kasutame ainult originaalvaruosi, mis on tootja ametlike varukanalite kaudu hangitud. See tagab, et varuosa sobib täpselt teie seadme mudelile ja kestab nii kaua kui peab. Järelturuosad võivad olla odavamad, kuid sageli on need halvema kvaliteediga ning põhjustavad korduvrikkeid. Me ei kompromiteeri kvaliteediga.

Diagnostika ja hinnapakkumine kohapeal

Meie tehnik tuleb teie juurde, teeb diagnostika ja selgitab välja rikke põhjuse. Diagnostika eel ei küsi me teid üllatuslikke tasusid — meie diagnostikateenus on selgelt hinnakirjas. Pärast diagnoosimist anname kirjaliku hinnapakkumise remondi kohta. Ainult teie nõusolekul alustame remonditöid.

Garantii kõikidele remontidele

Kõikidele teostatud remontidele anname 1-aastase garantii. See tähendab, et kui sama rike kordub aasta jooksul, tuleme tagasi ja lahendame probleemi tasuta. Meie eesmärk on, et kliendid oleksid rahul ja masin töötaks häireteta.

Kiire reageerimine Tallinnas ja Harjumaal

Töötame Tallinnas, Viimsis, Maardus, Saues, Keilas ja kogu Harjumaal. Püüame jõuda kohale sama päeva jooksul või järgmiseks tööpäevaks. Helista meile ja lepi kokku sobiv aeg — nõudepesumasina remont ei pea kauaks ootama.`,

      // EN — 500+ words
      `Dishwasher Repair in Tallinn — Fast, Reliable and Guaranteed

The dishwasher is one of the most important appliances in a modern home, saving time and water every day. That is why a fault is always inconvenient. The TorudeAbi24 team provides professional dishwasher repair across Tallinn and Harjumaa, working on appliances from all major manufacturers. We use only genuine spare parts and back every repair with a guarantee.

Faults we diagnose and fix

Our technicians resolve all common dishwasher faults:

Not draining — water remains in the machine after the cycle. The usual causes are a blocked filter, a failed drain pump, a kinked outlet hose or a faulty non-return valve.

Not filling with water — the machine starts but does not take in water. Possible causes include a blocked inlet filter, a failed inlet valve (solenoid valve) or a problem with the water pump priming.

Leaking — water escapes from under the machine, from the sides or around the door. Leaks are caused by worn seals, a failed circulating pump, damaged hose connections or a faulty door gasket.

Not cleaning properly — dishes come out dirty after the cycle. Causes include blocked spray arms, a worn wash pump, incorrect detergent or a problem with the heater or thermostat.

Error codes — the machine displays error codes (E1, E3, F9, etc.). Every manufacturer uses different code systems — our technicians know all of them and can diagnose quickly.

Door latch or lock fault — the door does not close correctly or will not lock. Usually the door latch mechanism, handle or hinge requires replacement.

Noisy operation — the machine makes unusual sounds (grinding, clanking, whistling). Often a small item (a spoon, a piece of food residue) has become trapped, or bearings are worn.

Not heating water — dishes are not dry or clean because the machine is not heating the wash water sufficiently. The heater element or thermostat requires replacement.

All brands — Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux and more

We specialise in dishwashers from: Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko, Candy, Hotpoint, Indesit, Zanussi, Smeg and many others. Each manufacturer uses its own unique design and control system — our technicians have experience with all of them.

Genuine spare parts — not copies

We use only genuine spare parts sourced through the manufacturer's official supply channels. This ensures the part fits your exact appliance model precisely and lasts as long as it should. Aftermarket parts may be cheaper but are often lower quality and lead to repeat faults. We do not compromise on quality.

On-site diagnosis and written quote

Our technician visits your home, carries out a diagnosis and identifies the cause of the fault. We charge no surprise fees before the diagnosis — our diagnostic service is clearly listed in our price guide. After diagnosis we provide a written repair quote. We only proceed with repairs once you give your approval.

Guarantee on all repairs

Every repair we carry out is backed by a 1-year guarantee. This means that if the same fault recurs within a year, we return and resolve the issue at no charge. Our goal is for customers to be satisfied and for the machine to run faultlessly.

Fast response across Tallinn and Harjumaa

We work in Tallinn, Viimsi, Maardu, Saue, Keila and across Harjumaa. We aim to reach you on the same day or by the next working day. Call us and agree on a convenient time — dishwasher repair should not keep you waiting.`,

      // RU — 500+ words
      `Ремонт посудомоечной машины в Таллине — быстро, надёжно, с гарантией

Посудомоечная машина — один из важнейших бытовых приборов в современном доме, который ежедневно экономит время и воду. Именно поэтому её поломка всегда доставляет неудобства. Команда TorudeAbi24 предоставляет профессиональный ремонт посудомоечных машин по всему Таллину и уезду Харьюмаа, работая с приборами всех ведущих производителей. Используем только оригинальные запчасти и даём гарантию на каждый ремонт.

Какие неисправности мы устраняем?

Наши техники устраняют все распространённые неисправности посудомоечных машин:

Не сливает — вода остаётся в машине после завершения программы. Обычные причины: засоренный фильтр, вышедший из строя сливной насос, перегиб сливного шланга или неисправный обратный клапан.

Не набирает воду — машина запускается, но не заполняется водой. Возможные причины: засоренный входной фильтр, неисправный впускной клапан (соленоидный клапан) или проблема с насосным давлением.

Течёт — вода вытекает снизу, сбоку или через дверцу машины. Протечки вызываются износом уплотнителей, неисправным циркуляционным насосом, повреждёнными соединениями шлангов или неисправной дверной прокладкой.

Плохо моет — посуда остаётся грязной после цикла. Причины: засоренные оросители, изношенный моющий насос, неправильное моющее средство или проблема с нагревательным элементом/термостатом.

Коды ошибок — машина отображает коды ошибок (E1, E3, F9 и т. д.). Каждый производитель использует свои системы кодов — наши техники знают их все и быстро ставят диагноз.

Неисправность дверного замка — дверца не закрывается должным образом или не блокируется. Как правило, требуется замена механизма замка, ручки или петли.

Шумная работа — машина издаёт необычные звуки (скрежет, стук, свист). Нередко причиной является попавший внутрь небольшой предмет (ложка, кусочек пищи) или износ подшипников.

Не нагревает воду — посуда влажная или недостаточно чистая, поскольку машина не нагревает воду до нужной температуры. Требуется замена нагревательного элемента или термостата.

Все бренды — Bosch, Miele, Samsung, AEG, LG, Siemens, Electrolux и другие

Специализируемся на ремонте посудомоечных машин марок: Bosch, Siemens, Miele, Samsung, LG, AEG, Electrolux, Whirlpool, Gorenje, Beko, Candy, Hotpoint, Indesit, Zanussi, Smeg и многих других. Каждый производитель использует собственную конструкцию и систему управления — наши техники имеют опыт работы со всеми из них.

Оригинальные запчасти — не копии

Используем только оригинальные запчасти, поступающие через официальные каналы поставок производителей. Это гарантирует, что деталь идеально подойдёт к вашей модели и прослужит столько, сколько должна. Неоригинальные запчасти могут быть дешевле, но зачастую уступают в качестве и приводят к повторным поломкам. Мы не идём на компромисс в вопросах качества.

Диагностика и смета на месте

Наш техник приезжает к вам, проводит диагностику и выясняет причину неисправности. Мы не берём скрытых предварительных платежей — стоимость диагностики чётко указана в прайс-листе. После диагностики предоставляем письменную смету на ремонт. К работам приступаем только с вашего согласия.

Гарантия на все ремонты

На каждый выполненный ремонт предоставляем гарантию сроком 1 год. Это означает: если та же неисправность повторится в течение года, мы вернёмся и устраним проблему бесплатно. Наша цель — довольный клиент и бесперебойно работающая машина.

Быстрый выезд по Таллину и Харьюмаа

Работаем в Таллине, Виймси, Маарду, Сауэ, Кейла и по всему уезду Харьюмаа. Стараемся приехать в тот же день или на следующий рабочий день. Звоните и договаривайтесь об удобном времени — ремонт посудомоечной машины не должен затягиваться.`
    ),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  for (const svc of services) {
    try {
      console.log("\nProcessing:", svc.slug);

      console.log("  Uploading hero image...");
      const heroAsset = await uploadImg(svc.kw1, `${svc.slug}-hero.jpg`);
      console.log("  Hero asset:", heroAsset._id);

      console.log("  Uploading gallery image...");
      const galleryAsset = await uploadImg(svc.kw2, `${svc.slug}-g1.jpg`);
      console.log("  Gallery asset:", galleryAsset._id);

      await patch(svc.slug, {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: heroAsset._id },
          alt: svc.alt1,
        },
        gallery: [
          {
            _type: "image",
            _key: "g1",
            asset: { _type: "reference", _ref: galleryAsset._id },
            alt: svc.alt2,
          },
        ],
        shortDescription: svc.short,
        body: svc.body,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDesc,
      });
    } catch (e) {
      console.error("FAILED:", svc.slug, e.message);
    }
  }
  console.log("\nDone.");
}

main();
