/**
 * scripts/seed-elec-b3.mjs
 * Seeds 3 home-appliance service documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-elec-b3.mjs
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
function lt(et, en, ru) { return { _type: "localeText", et, en, ru }; }
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

  // ── 1. refrigerator-repair ─────────────────────────────────────────────────
  {
    slug: "refrigerator-repair",
    kw1: "refrigerator fridge repair technician",
    kw2: "freezer appliance repair service",
    imageAlt: ls(
      "Külmiku remont — tehnik parandab külmikut Tallinnas",
      "Refrigerator repair — technician fixing fridge in Tallinn",
      "Ремонт холодильника — техник чинит холодильник в Таллине"
    ),
    galleryAlt: ls(
      "Sügavkülmiku remont — kompressori ja termostaadi vahetus",
      "Freezer repair — compressor and thermostat replacement service",
      "Ремонт морозильника — замена компрессора и термостата"
    ),
    shortDesc: lt(
      "Külmiku ja sügavkülmiku remont Tallinnas — ei jahuta, jäätub, kompressori müra, vee lekkimine, termostaadi rike, uksetihendi vahetus. Kõik brändid, originaalvaruosad, garantii.",
      "Refrigerator and freezer repair in Tallinn — not cooling, ice build-up, compressor noise, water leaking, thermostat failure, door seal replacement. All brands, genuine parts, warranty.",
      "Ремонт холодильника и морозильника в Таллине — не охлаждает, намерзает, шумит компрессор, течёт, не работает термостат, замена уплотнителя. Все бренды, оригинальные запчасти, гарантия."
    ),
    metaTitle: ls(
      "Külmiku remont Tallinnas | Kõik brändid, garantii",
      "Refrigerator Repair Tallinn | All Brands, Warranty",
      "Ремонт холодильника в Таллине | Все бренды, гарантия"
    ),
    metaDesc: lt(
      "Külmiku ja sügavkülmiku remont Tallinnas. Ei jahuta, jäätub, müra, leke, termostaat. Samsung, LG, Bosch, Liebherr, Electrolux. Originaalvaruosad, garantii. Helista kohe!",
      "Refrigerator & freezer repair in Tallinn. Not cooling, ice build-up, compressor noise, leaking. Samsung, LG, Bosch, Liebherr, Electrolux. Genuine parts, warranty. Call now!",
      "Ремонт холодильника и морозильника в Таллине. Не охлаждает, намерзает, шумит, течёт. Samsung, LG, Bosch, Liebherr, Electrolux. Оригинальные запчасти, гарантия. Звоните!"
    ),
    body: lb(
      // ET — 500+ words
      `Külmiku remont Tallinnas — kiire, usaldusväärne ja garanteeritud

Külmik on üks olulisemaid kodumajapidamises kasutatavaid seadmeid ja selle rike võib tekitada märkimisväärseid probleeme — toiduained riknevad, liigne energiatarbimine kasvab ning pereelu satub segadusse. TorudeAbi24 kodumasinate remondimeeskond pakub professionaalset külmiku ja sügavkülmiku remonti kogu Tallinnas ja Harjumaal. Meie tehnikud omavad pikaajalisi kogemusi kõigi peamiste tootjate seadmete parandamisel ning kasutavad ainult originaalvaruosasid.

Millised on levinumad külmikurikked?

Külmikurikked on erinevad, kuid kõige sagedamini kohtame järgmisi probleeme: külmik ei jahuta või jahtub liiga vähe — temperatuur jääb seatud tasemest kõrgemale, toidu säilitamine on ohustatud. Jäätumine sügavkülmikuosas — liigne jää kogunemine võib blokeerida ventilaatori ja põhjustada soojuse tasakaalustamatust. Kompressori müra — kõva mürin, klõpsud või sumin, mis viitab kompressori või selle aluste kulumisele. Vee lekkimine seadme sisemusse või alt põrandale — purunenud drenaaživoolik, ummistunud sulaveekogumisanum. Termostaadi rike — seade ei hoia soovitud temperatuuri, vaheldub sooja ja külma vahel ebaregulaarselt. Uksetihendi kulumine — katkine tihend laseb sooja õhu sisse, mistõttu kompressor töötab ületundides. Külmiku taustvalgustuse talitlushäired — LED või hõõgpirni vahetus. Kondensaatori ja aurustaja jäätumine — tekib soojusvahetuse blokeerumist, mis halvendab jahutusvõimet.

Kõigi brändide remont

Meie tehnikud on välja õppinud kõikide suurimate tootjate külmikuid remontima: Samsung, LG, Bosch, Liebherr, Whirlpool, Electrolux, Beko, Hotpoint, AEG, Miele, Gorenje, Siemens ja paljud teised. Olenemata sellest, kas tegemist on ühekambrilise miniülmikuga, kahe- või kolmekambrilise perekülmikuga, ameerika stiilis külmikuga (Side-by-Side) või sisseehitatud külmikuga, meie tehnikud tunnevad nende seadmete spetsiifikat ja teavad, kust kõige sagedamini probleemid tekivad.

Originaalvaruosad — usaldusväärne remont

Kasutame ainult tootjate heakskiidetud originaalvaruosasid või kõrge kvaliteediga sertifitseeritud asendusosi. See tagab remondi pikaealisuse ja hoiab ära korduvrikke riski. Meie laovarudes hoiame kõige levinumaid varuosi, mis võimaldab paljud remonttööd läbi viia ühekordse visiidiga ilma tarne ootamise vajaduseta.

Remondiprotsess samm-sammult

Kõigepealt võtate meiega ühendust ja kirjeldate probleemi. Lepime kokku teile sobiva aja ja meie tehnik saabub kokkulepitud ajal. Tehnik teeb põhjaliku diagnostika — kontrollib elektriühendusi, kompressorit, termostaati, tihendeid, drenaaži ja muid osasid. Pärast diagnostika teeme hinnapakkumise ja alustame teiega nõustumise korral koheselt remonttöödega. Kasutame kaasaegset mõõte- ja diagnostikaseadmestikku, mis võimaldab kiiresti ja täpselt tuvastada rikke.

Garantii ja järelhooldus

Kõikidele teostatud remonttöödele anname kirjaliku garantii. Töögarantii periood sõltub tehtud töö iseloomust, kuid on üldjuhul 3–12 kuud. Varuosadele kehtib tootja garantii. Soovi korral pakume ka aastahoolduslepinguid, mis hõlmavad regulaarset kontrolli ja puhastust ning tagavad seadme optimaalse tõhususe ja pika eluea.

Teeninduspiirkond — Tallinn ja Harjumaa

Meie tehnikud teenindavad kliente Tallinnas ja kogu Harjumaal, sealhulgas Viimsis, Maardus, Saues, Keilas ja teistes ümbritsevates piirkondades. Pakume paindlikku graafikut, sealhulgas õhtuseid aegu ja nädalavahetusi. Hädaabijuhtumitel püüame kohale jõuda võimalikult kiiresti. Esmane telefonikonsultatsioon on tasuta — helistage meile juba täna ja kirjeldage oma probleemi, et saaksime anda esialgse hinnangiku võimaliku lahenduse kohta.`,

      // EN — 500+ words
      `Refrigerator Repair in Tallinn — Fast, Reliable and Guaranteed

A refrigerator is one of the most important appliances in any home, and a breakdown can cause significant disruption — food spoils, energy bills spike, and everyday life is thrown into confusion. The TorudeAbi24 home appliance repair team offers professional refrigerator and freezer repair across Tallinn and Harjumaa. Our technicians have extensive experience repairing appliances from all major manufacturers and use only genuine spare parts.

Most common refrigerator faults

Refrigerator faults vary, but the most frequent problems we encounter are: not cooling or cooling insufficiently — the temperature stays above the set level and food preservation is at risk. Ice build-up in the freezer compartment — excessive ice accumulation can block the fan and cause thermal imbalance. Compressor noise — loud humming, clicking or buzzing indicating worn compressor components or mounts. Water leaking inside the appliance or onto the floor — a split drain hose or blocked melt-water collection tray. Thermostat failure — the appliance cannot maintain the desired temperature and swings irregularly between warm and cold. Worn door seal — a damaged seal lets warm air in, forcing the compressor to overwork. Interior lighting faults — LED or bulb replacement. Condenser or evaporator icing — frost build-up blocks heat exchange and reduces cooling efficiency.

All brands repaired

Our technicians are trained to repair refrigerators from all major manufacturers: Samsung, LG, Bosch, Liebherr, Whirlpool, Electrolux, Beko, Hotpoint, AEG, Miele, Gorenje, Siemens and many others. Whether it is a compact single-door fridge, a family two- or three-door model, an American-style side-by-side, or a built-in integrated refrigerator, our technicians know the specific characteristics of each and where faults most commonly occur.

Genuine spare parts — lasting repairs

We use only manufacturer-approved original parts or high-quality certified equivalents. This ensures the repair is durable and greatly reduces the risk of the same fault recurring. We keep the most common spare parts in stock, which means many repairs can be completed in a single visit without waiting for delivery.

Step-by-step repair process

First you contact us and describe the problem. We agree on a convenient time and our technician arrives at the appointed time. The technician carries out a thorough diagnostic — checking electrical connections, the compressor, thermostat, seals, drainage and other components. After diagnosis we provide a quote, and on your approval work begins immediately. We use modern diagnostic and measuring equipment to identify the fault quickly and accurately.

Warranty and aftercare

All completed repairs come with a written guarantee. The warranty period depends on the nature of the work but is typically 3–12 months. Spare parts carry the manufacturer's warranty. We also offer annual maintenance contracts covering regular inspection and cleaning to keep your appliance running at peak efficiency and extend its service life.

Service area — Tallinn and Harjumaa

Our technicians serve clients throughout Tallinn and Harjumaa, including Viimsi, Maardu, Saue, Keila and surrounding areas. We offer flexible scheduling including evenings and weekends. For emergencies we aim to arrive as quickly as possible. The initial telephone consultation is free — call us today and describe your problem so we can give you a preliminary assessment of the likely solution.`,

      // RU — 500+ words
      `Ремонт холодильника в Таллине — быстро, надёжно, с гарантией

Холодильник — один из важнейших приборов в доме, и его поломка может вызвать серьёзные неудобства: продукты портятся, счета за электроэнергию растут, повседневная жизнь нарушается. Команда TorudeAbi24 по ремонту бытовой техники предлагает профессиональный ремонт холодильников и морозильников по всему Таллину и уезду Харьюмаа. Наши техники имеют большой опыт ремонта техники всех ведущих производителей и используют только оригинальные запасные части.

Наиболее распространённые неисправности холодильников

Поломки холодильников разнообразны, но чаще всего мы сталкиваемся со следующими проблемами: не охлаждает или охлаждает недостаточно — температура не достигает заданного уровня, сохранность продуктов под угрозой. Намерзание в морозильной камере — избыточное накопление льда может заблокировать вентилятор и нарушить тепловой баланс. Шум компрессора — громкое гудение, щелчки или жужжание, свидетельствующие об износе компрессора или его опор. Течь воды внутрь прибора или на пол — лопнувший дренажный шланг или засорённый поддон для талой воды. Неисправность термостата — прибор не поддерживает нужную температуру, хаотично переключается между тёплым и холодным. Износ уплотнителя двери — повреждённый уплотнитель пропускает тёплый воздух, заставляя компрессор работать в перегрузочном режиме. Неисправность освещения — замена LED-лампы или лампы накаливания. Обмерзание конденсатора или испарителя — иней блокирует теплообмен и снижает эффективность охлаждения.

Ремонт всех брендов

Наши техники обучены ремонту холодильников всех ведущих производителей: Samsung, LG, Bosch, Liebherr, Whirlpool, Electrolux, Beko, Hotpoint, AEG, Miele, Gorenje, Siemens и многих других. Независимо от того, компактный ли это однодверный холодильник, семейный двух- или трёхкамерный, американский Side-by-Side или встроенная модель, наши техники знают особенности каждого и знают, где чаще всего возникают неисправности.

Оригинальные запасные части — долговечный ремонт

Используем только одобренные производителем оригинальные детали или высококачественные сертифицированные аналоги. Это гарантирует долговечность ремонта и значительно снижает риск повторения той же неисправности. Наиболее распространённые запасные части мы держим на складе, что позволяет завершить многие ремонтные работы за один визит без ожидания доставки.

Процесс ремонта шаг за шагом

Вы связываетесь с нами и описываете проблему. Мы договариваемся об удобном времени, и техник прибывает в назначенный час. Техник проводит тщательную диагностику: проверяет электрические соединения, компрессор, термостат, уплотнители, дренаж и другие компоненты. После диагностики мы предоставляем смету и при вашем согласии немедленно приступаем к работе. Используем современное диагностическое и измерительное оборудование для быстрого и точного выявления неисправности.

Гарантия и послегарантийное обслуживание

На все выполненные ремонтные работы предоставляем письменную гарантию. Срок гарантии зависит от характера работ, но, как правило, составляет 3–12 месяцев. На запасные части действует гарантия производителя. По желанию предлагаем годовые договоры на техническое обслуживание, включающие регулярный осмотр и чистку для поддержания оптимальной эффективности и продления срока службы прибора.

Зона обслуживания — Таллин и Харьюмаа

Наши техники обслуживают клиентов по всему Таллину и уезду Харьюмаа, включая Виймси, Маарду, Сауэ, Кейла и прилегающие районы. Предлагаем гибкий график, включая вечернее время и выходные дни. При аварийных ситуациях стараемся прибыть как можно скорее. Первичная телефонная консультация бесплатна — позвоните нам сегодня и опишите вашу проблему, чтобы мы могли дать предварительную оценку возможного решения.`
    ),
  },

  // ── 2. stove-oven-repair ───────────────────────────────────────────────────
  {
    slug: "stove-oven-repair",
    kw1: "oven stove repair kitchen appliance",
    kw2: "electric gas oven repair technician",
    imageAlt: ls(
      "Ahju ja pliidi remont — tehnik parandab elektriahju Tallinnas",
      "Stove and oven repair — technician fixing electric oven in Tallinn",
      "Ремонт плиты и духовки — техник чинит электрическую духовку в Таллине"
    ),
    galleryAlt: ls(
      "Gaasipliidi süüte ja põleti remont köögis",
      "Gas stove ignition and burner repair in kitchen",
      "Ремонт розжига и горелки газовой плиты на кухне"
    ),
    shortDesc: lt(
      "Ahju ja pliidi remont Tallinnas — elektri- ja gaasipliit, ei kuumene, termostaadi rike, uksetihend, süüte ebaõnnestumine, põleti probleemid, ventilaator ei tööta, ekraaniviga. Kõik brändid, kiire teenindus.",
      "Stove and oven repair in Tallinn — electric and gas, not heating to temperature, thermostat fault, door seal, ignition failure, burner problems, fan not working, display fault. All brands, fast service.",
      "Ремонт плиты и духовки в Таллине — электрическая и газовая, не нагревается, неисправность термостата, уплотнитель, нет розжига, проблемы горелок, вентилятор не работает, дисплей. Все бренды, быстрый сервис."
    ),
    metaTitle: ls(
      "Ahju ja pliidi remont Tallinnas | Elekter, gaas",
      "Stove & Oven Repair Tallinn | Electric & Gas, All Brands",
      "Ремонт плиты и духовки Таллин | Электро, газ, все бренды"
    ),
    metaDesc: lt(
      "Ahju ja pliidi remont Tallinnas. Elekter ja gaas, ei kuumene, termostaat, süüte, põleti. Bosch, AEG, Electrolux, Samsung, Gorenje, Miele, Beko. Kiire teenindus, garantii. Helista!",
      "Stove & oven repair Tallinn. Electric & gas, not heating, thermostat, ignition, burner. Bosch, AEG, Electrolux, Samsung, Gorenje, Miele. Fast service, warranty. Call now!",
      "Ремонт плиты и духовки в Таллине. Электро и газ, не нагревается, термостат, розжиг, горелки. Bosch, AEG, Electrolux, Gorenje, Miele. Быстрый сервис, гарантия. Звоните!"
    ),
    body: lb(
      // ET — 500+ words
      `Ahju ja pliidi remont Tallinnas — elekter, gaas, kõik brändid

Köögipliit ja ahi on igapäevaselt kasutatavad seadmed, mille rike segab perekonna igapäevaelu märkimisväärselt. Olgu tegemist elektripliidi, gaasipliidi, kombineeritud (gaas + elekter) pliidi või autonoomse ahjuga — TorudeAbi24 kodumasinate remondimeeskond parandab kõiki ahju- ja pliidirikkeid kiirelt ja professionaalselt Tallinnas ja Harjumaal.

Levinumad ahju ja pliidi rikked

Elektriahju ei kuumene ettenähtud temperatuurini — üldjuhul on põhjuseks katkine küttekeha (spiraal), termostaadi rike või juhtplaadi probleem. Gaasipliidi süüte ei tööta — elektrooniline süütesüsteem on niiskunud, elektrood on kulunud või mooduli rike. Gaasipõleti ei sütti või läheb ise kustuma — põleti pesad on ummistunud või gaasisooniku on kahjustatud. Pliidiklaasi või paneeli pragenemine — kuumusšokist tingitud klaaskeramika mõranemine. Fan-ahju ventilaator ei tööta — mootori või laba rike, mis takistab soojuse ühtlast levimist. Uksetihend on kulunud — kuumus pääseb ahju uksest välja, küpsetusaeg pikeneb, energiatarbimine suureneb. Ahjuküttekeha põlemine läbi — elektriahju ülemise või alumise kütteelemendi purunemine. Ekraani ja juhtpaneeli rikked — nuppude takerdumised, ekraan ei kuva õiget temperatuuri.

Elektripliidid ja -ahjud

Elektripliitide puhul asendame katkiseid küttekehasid, termostaate, lüliteid, juhtplaate ning pliidiklaasi. Töötame nii klassikaliste spiraalküttepõletitega pliitidega kui ka kaasaegsete klaaskeramika- ja induktsioonpliitidega. Induktsioonpliitide puhul diagnoosime ja parandame mooduleid, tuvastame klaaspinna kahjustusi ning vahetame vajadusel tervet klaasplaati.

Gaasipliidid ja -ahjud

Gaaspliitide remont nõuab erilist tähelepanu ohutusele — meie tehnikud on läbinud gaasiseadmete ohutuskoolituse. Parandame ja vahetame gaasipõleteid, süütemootorite elektroode, termopare (mis tagavad põleti kustumise gaasitarnega), gaasisolenoidklappasid ning juhtimismooduleid. Iga gaasipliidi remondi järel teostame lekkeproovi, mis tagab teie kodu ohutuse.

Kõigi brändide remont

Remondime järgmiste tootjate ahje ja pliite: Bosch, AEG, Electrolux, Samsung, Gorenje, Beko, Miele, Neff, Zanussi, Siemens, Hotpoint, Whirlpool, Smeg, Candy, Hisense ja paljud teised. Meie laovarudes on saadaval levinumad varuosad, mis võimaldab paljud remonttööd sooritada ühekordse visiidiga.

Remondiprotsess

Helistage meile, kirjeldage probleemi ja lepige kokku visiidiaeg. Meie tehnik saabub varustatud diagnostikavahendite ja levinumate varuosadega. Pärast diagnostikat esitame selge hinnapakkumise — ilma peidetud tasudeta. Remondime teiega nõustumise korral koheselt. Töö lõpus testime seadet, et veenduda selle normaalses töös.

Garantii ja teeninduspiirkond

Kõikidele remonttöödele anname kirjaliku garantii (3–12 kuud sõltuvalt töö iseloomust). Teenindame Tallinna ja Harjumaad, sealhulgas Viimsi, Maardu, Saue, Keila ja lähiümbrust. Paindlik graafik, sealhulgas õhtused ajad ja nädalavahetused. Tasuta telefonikonsultatsioon — helistage meile kohe!`,

      // EN — 500+ words
      `Stove and Oven Repair in Tallinn — Electric, Gas, All Brands

A kitchen stove and oven are used every day, and a breakdown significantly disrupts family life. Whether it is an electric hob, gas cooker, combination (gas + electric) range, or a built-in oven — the TorudeAbi24 home appliance repair team fixes all stove and oven faults quickly and professionally across Tallinn and Harjumaa.

Most common stove and oven faults

Electric oven not reaching the set temperature — usually a failed heating element (element coil), thermostat fault, or control board problem. Gas stove ignition not working — the electronic ignition system is damp, the electrode is worn, or the ignition module has failed. Gas burner not lighting or going out by itself — burner ports are clogged or the gas jet is damaged. Hob glass or panel cracking — thermal shock causing ceramic glass to fracture. Fan oven fan not running — motor or blade failure preventing even heat distribution. Worn door seal — heat escaping through the oven door, increasing cooking times and energy consumption. Oven heating element burning out — failure of the upper or lower electric element. Display and control panel faults — stuck buttons, screen not showing the correct temperature.

Electric hobs and ovens

For electric hobs and ovens we replace faulty heating elements, thermostats, switches, control boards and hob glass. We work on both traditional coil-element hobs and modern ceramic glass and induction hobs. For induction hobs we diagnose and repair modules, assess glass surface damage, and replace the entire glass panel where necessary.

Gas hobs and ovens

Gas appliance repair demands particular attention to safety — our technicians have undergone gas appliance safety training. We repair and replace gas burners, ignition electrodes, thermocouples (which cut off gas if the flame goes out), gas solenoid valves and control modules. After every gas appliance repair we perform a leak test to ensure your home is safe.

All brands repaired

We repair stoves and ovens from: Bosch, AEG, Electrolux, Samsung, Gorenje, Beko, Miele, Neff, Zanussi, Siemens, Hotpoint, Whirlpool, Smeg, Candy, Hisense and many others. We keep the most common spare parts in stock, allowing many repairs to be completed in a single visit.

The repair process

Call us, describe the problem and agree on a visit time. Our technician arrives equipped with diagnostic tools and the most common spare parts. After diagnosis we present a clear quote — no hidden charges. With your approval we begin work immediately. At the end of the job we test the appliance to confirm it is working normally.

Warranty and service area

All repairs come with a written guarantee (3–12 months depending on the nature of the work). We serve Tallinn and Harjumaa, including Viimsi, Maardu, Saue, Keila and the surrounding area. Flexible scheduling including evenings and weekends. Free telephone consultation — call us now!`,

      // RU — 500+ words
      `Ремонт плиты и духовки в Таллине — электро, газ, все бренды

Кухонная плита и духовка используются каждый день, и их поломка существенно нарушает привычный уклад жизни. Будь то электрическая варочная панель, газовая плита, комбинированная (газ + электро) плита или встроенная духовка — команда TorudeAbi24 по ремонту бытовой техники быстро и профессионально устраняет любые неисправности плит и духовок по всему Таллину и уезду Харьюмаа.

Наиболее распространённые неисправности плит и духовок

Электродуховка не нагревается до заданной температуры — как правило, причиной является перегоревший нагревательный элемент (тэн), неисправность термостата или проблема с платой управления. Не работает розжиг газовой плиты — система электроподжига отсырела, электрод изношен или вышел из строя модуль розжига. Газовая горелка не загорается или гаснет сама по себе — засорены отверстия горелки или повреждён жиклёр. Трещина на стекле или панели варочной поверхности — термическая нагрузка вызвала растрескивание стеклокерамики. Не работает вентилятор конвекционной духовки — поломка мотора или крыльчатки, нарушающая равномерное распределение тепла. Износ уплотнителя дверцы — тепло выходит через дверцу духовки, увеличивая время приготовления и потребление энергии. Перегорание нагревательного элемента духовки — выход из строя верхнего или нижнего тэна электродуховки. Неисправность дисплея и панели управления — залипание кнопок, экран показывает неверную температуру.

Электрические варочные панели и духовки

Для электрических плит и духовок заменяем неисправные нагревательные элементы, термостаты, переключатели, платы управления и стекло варочной панели. Работаем как с классическими плитами с конфорками, так и с современными стеклокерамическими и индукционными поверхностями. Для индукционных плит диагностируем и ремонтируем модули, оцениваем повреждения стеклянной поверхности, при необходимости заменяем стеклянную плиту целиком.

Газовые плиты и духовки

Ремонт газового оборудования требует особого внимания к безопасности — наши техники прошли обучение по безопасности газовых приборов. Ремонтируем и заменяем газовые горелки, электроды системы розжига, термопары (которые перекрывают газ при погасании пламени), электромагнитные газовые клапаны и управляющие модули. После каждого ремонта газового прибора проводим проверку на герметичность, чтобы обеспечить безопасность вашего дома.

Ремонт всех брендов

Ремонтируем плиты и духовки: Bosch, AEG, Electrolux, Samsung, Gorenje, Beko, Miele, Neff, Zanussi, Siemens, Hotpoint, Whirlpool, Smeg, Candy, Hisense и многих других. Наиболее распространённые запасные части есть на складе, что позволяет завершить многие ремонтные работы за один визит.

Процесс ремонта

Позвоните нам, опишите проблему и договоритесь о времени визита. Техник приезжает с диагностическим оборудованием и наиболее распространёнными запасными частями. После диагностики мы предоставляем чёткую смету без скрытых платежей. С вашего согласия приступаем к работе немедленно. По окончании работ тестируем прибор, чтобы убедиться в его нормальной работе.

Гарантия и зона обслуживания

На все ремонтные работы предоставляем письменную гарантию (3–12 месяцев в зависимости от характера работ). Обслуживаем Таллин и Харьюмаа, включая Виймси, Маарду, Сауэ, Кейла и прилегающие районы. Гибкий график, включая вечернее время и выходные дни. Бесплатная телефонная консультация — звоните нам прямо сейчас!`
    ),
  },

  // ── 3. washing-machine-repair ──────────────────────────────────────────────
  {
    slug: "washing-machine-repair",
    kw1: "washing machine repair laundry technician",
    kw2: "laundry appliance repair service professional",
    imageAlt: ls(
      "Pesumasina remont — tehnik parandab pesumasinat Tallinnas",
      "Washing machine repair — technician fixing washing machine in Tallinn",
      "Ремонт стиральной машины — техник чинит стиральную машину в Таллине"
    ),
    galleryAlt: ls(
      "Pesumasina trumli ja hiiliku vahetus remonditöökojas",
      "Washing machine drum and carbon brush replacement repair service",
      "Замена барабана и угольных щёток стиральной машины при ремонте"
    ),
    shortDesc: lt(
      "Pesumasina remont Tallinnas — ei tsentrifuugi, ei tühjenda, leke, trumlimüra, veakoodid, programm ei lõpe, ukse riivi rike, hiiliku vahetus. Kõik brändid, originaalvaruosad, garantii, Tallinn/Harjumaa.",
      "Washing machine repair in Tallinn — not spinning, not draining, leaking, drum noise, error codes, programme not completing, door latch broken, carbon brush replacement. All brands, original parts, warranty, Tallinn/Harjumaa.",
      "Ремонт стиральной машины в Таллине — не отжимает, не сливает, течёт, шумит барабан, коды ошибок, программа не завершается, сломан замок люка, замена щёток. Все бренды, оригинальные детали, гарантия."
    ),
    metaTitle: ls(
      "Pesumasina remont Tallinnas | Kõik brändid, garantii",
      "Washing Machine Repair Tallinn | All Brands, Warranty",
      "Ремонт стиральной машины Таллин | Все бренды, гарантия"
    ),
    metaDesc: lt(
      "Pesumasina remont Tallinnas ja Harjumaal. Ei tsentrifuugi, leke, trumlimüra, veakoodid. Samsung, Bosch, Miele, LG, Whirlpool, Beko, Indesit. Originaalvaruosad, garantii. Helista!",
      "Washing machine repair Tallinn & Harjumaa. Not spinning, leaking, drum noise, error codes. Samsung, Bosch, Miele, LG, Whirlpool, Beko, Indesit. Original parts, warranty. Call!",
      "Ремонт стиральной машины в Таллине и Харьюмаа. Не отжимает, течёт, шумит, коды ошибок. Samsung, Bosch, Miele, LG, Whirlpool, Beko, Indesit. Оригинальные детали, гарантия."
    ),
    body: lb(
      // ET — 500+ words
      `Pesumasina remont Tallinnas — kiire, usaldusväärne, kõigi brändide tehnikud

Pesumasin on kodumajapidamise oluline seade, mille rikke korral koguneb pesu kiiresti ja igapäevaelu muutub tülikaks. TorudeAbi24 meeskond pakub professionaalset pesumasina remonti Tallinnas ja Harjumaal — meie tehnikud teavad täpselt, kuidas diagnoosida ja parandada kõikvõimalikke pesumašinarikkeid kiiresti ja õigeaegselt.

Levinumad pesumašinarikked

Ei tsentrifuugi — trummel täitub veega, kuid pesuprogramm jääb tsentrifuugimisfaasis seisma. Põhjused võivad olla katkine pingelint, läbipõlenud mootor, kollektor või kontaktbürsti kulumine. Ei tühjenda — vesi jääb trumli sisse. Põhjused: ummistunud pump, katkine pump, filtri ummistus, drenaaživooliku kinnijook. Lekkimine — vesi voolab alt või küljelt välja. Põhjused: katkine tihend, halvenenud tihendid pumpade ühenduskohtades, lõhkenud voolik. Trumlimüra — tugev müra pesemise või tsentrifuugimise ajal. Põhjused: laagrikulumine, trumli rihmavedu, võõrkehad trumlis. Veakoodid — kaasaegsete pesumašinate ekraan kuvab tõrkoode (E1, F3, UE jms), mis viitavad konkreetsele probleemile. Programm ei lõpe — pesumasin jääb pesuprogrammi keskel seisma ega reageeri käsklustele. Ukse riivi rike — pesumasina uks ei sulgu või ei avane, interlokk ei töötata korrektselt. Hiiliku (söebürsti) vahetus — kulumine põhjustab mootorimüra, ebaühtlast tsentrifuugimist või seadme täielikku seiskumist.

Kõigi brändide remont

Meie tehnikud remondivad järgmiste tootjate pesumašinaid: Samsung, Bosch, Miele, LG, Whirlpool, Indesit, Hotpoint, Beko, AEG, Electrolux, Zanussi, Candy, Haier, Gorenje, Siemens ja paljud teised. Oleme valmis tegelema nii eeslaadivate (frontloader) kui ka ülaltlaadivate (toploader) pesumašinatega, sealhulgas integreeritud ja kombo (pesija-kuivati) mudelitega.

Originaalvaruosad — usaldusväärne remont

Kasutame ainult originaalvaruosasid või sertifitseeritud kõrgekvaliteedilisi asendusosi. Meie laos on alati levinumad pesumašinate komponendid — pumbad, laagrid, tihendid, hiilud, lahtritused, juhtplaadid —, mis võimaldab paljud remonttööd lõpetada ühe visiidiga.

Remondiprotsess

Võtate meiega ühendust ja kirjeldate probleemi. Lepime kokku sobiva aja. Tehnik saabub teie koju ja teeb põhjaliku diagnostika — kontrollib elektriühendusi, pumpa, mootorit, trumlit, laagrit, tihendit ja juhtplaati. Pärast diagnostikat esitame selge ja läbipaistva hinnapakkumise. Teiega nõustumise korral alustame remonttöödega koheselt. Pärast remonti teeme proovipesuprogrammi, et veenduda seadme normaalses töös.

Hooldus ja ennetusmeetmed

Paljud pesumašinarikked on välditavad regulaarse hooldusega. Soovitame puhastada filtrit vähemalt kord kolme kuu jooksul, kasutada pesuvahendite koguste osas tootja soovitusi, mitte üle koormata trumlit, kasutada regulaarselt pesumašina puhastusprogramme ning kontrollida veevoolikute seisukorda igal aastal. Pakume ka ennetava hoolduse teenust, mis hõlmab filtri puhastust, tihendite ja voolikute kontrolli ning laagrite seisukorra hindamist.

Garantii ja teeninduspiirkond

Kõikidele remonttöödele anname kirjaliku garantii (3–12 kuud). Teenindame Tallinna ja Harjumaad, sealhulgas Viimsi, Maardu, Saue, Keila ja lähiümbrust. Paindlik graafik, hädaabiteenindus. Tasuta telefonikonsultatsioon — helistage meile kohe!`,

      // EN — 500+ words
      `Washing Machine Repair in Tallinn — Fast, Reliable, All Brand Technicians

A washing machine is an essential home appliance, and when it breaks down laundry quickly piles up and daily life becomes inconvenient. The TorudeAbi24 team offers professional washing machine repair across Tallinn and Harjumaa — our technicians know exactly how to diagnose and fix all types of washing machine faults quickly and effectively.

Most common washing machine faults

Not spinning — the drum fills with water but the cycle stalls at the spin phase. Causes include a snapped drive belt, burned-out motor, worn collector or carbon brushes. Not draining — water remains inside the drum. Causes: blocked or failed pump, clogged filter, kinked drain hose. Leaking — water escaping from underneath or from the sides. Causes: split door seal, deteriorated pump connection seals, burst hose. Drum noise — loud banging or grinding during washing or spinning. Causes: worn bearings, drive belt slippage, foreign objects inside the drum. Error codes — the display shows fault codes (E1, F3, UE, etc.) pointing to a specific problem. Programme not completing — the machine stops mid-cycle and becomes unresponsive. Door latch broken — the door will not close or open, the interlock not engaging correctly. Carbon brush replacement — worn brushes cause motor noise, uneven spinning or complete machine shutdown.

All brands repaired

Our technicians repair washing machines from: Samsung, Bosch, Miele, LG, Whirlpool, Indesit, Hotpoint, Beko, AEG, Electrolux, Zanussi, Candy, Haier, Gorenje, Siemens and many others. We handle both front-loading and top-loading machines, including integrated and washer-dryer combination models.

Original spare parts — lasting repairs

We use only original spare parts or certified high-quality equivalents. We keep the most common washing machine components in stock — pumps, bearings, seals, carbon brushes, control boards — which means many repairs can be completed in a single visit.

The repair process

You contact us and describe the problem. We agree on a convenient time. Our technician arrives at your home and carries out a thorough diagnostic — checking electrical connections, the pump, motor, drum, bearings, seals and control board. After diagnosis we present a clear, transparent quote. On your approval we begin work immediately. After the repair we run a test programme to confirm the machine is working normally.

Maintenance and preventive tips

Many washing machine faults are avoidable with regular maintenance. We recommend cleaning the filter at least every three months, following the manufacturer's recommended detergent quantities, not overloading the drum, running a drum clean programme regularly, and inspecting water hoses annually. We also offer a preventive maintenance service covering filter cleaning, seal and hose inspection and bearing condition assessment.

Warranty and service area

All repairs come with a written guarantee (3–12 months). We serve Tallinn and Harjumaa including Viimsi, Maardu, Saue, Keila and the surrounding area. Flexible scheduling, emergency call-out available. Free telephone consultation — call us now!`,

      // RU — 500+ words
      `Ремонт стиральной машины в Таллине — быстро, надёжно, техники всех брендов

Стиральная машина — важный бытовой прибор, и при её поломке бельё быстро накапливается, а повседневная жизнь становится неудобной. Команда TorudeAbi24 предлагает профессиональный ремонт стиральных машин по всему Таллину и уезду Харьюмаа — наши техники точно знают, как диагностировать и устранить любые неисправности стиральных машин быстро и эффективно.

Наиболее распространённые неисправности стиральных машин

Не отжимает — барабан наполняется водой, но цикл останавливается на фазе отжима. Причины: порванный приводной ремень, сгоревший мотор, износ коллектора или угольных щёток. Не сливает воду — вода остаётся внутри барабана. Причины: засорённый или сломанный насос, забитый фильтр, перегнутый сливной шланг. Течёт — вода вытекает снизу или сбоку. Причины: разрыв манжеты люка, износ уплотнений в местах соединения насоса, лопнувший шланг. Шум в барабане — громкий стук или скрежет во время стирки или отжима. Причины: износ подшипников, проскальзывание приводного ремня, посторонние предметы внутри барабана. Коды ошибок — дисплей показывает коды неисправностей (E1, F3, UE и т. д.), указывающие на конкретную проблему. Программа не завершается — машина останавливается в середине цикла и не реагирует на команды. Сломан замок люка — дверь не закрывается или не открывается, блокировка не срабатывает корректно. Замена угольных щёток — износ щёток вызывает шум двигателя, неравномерный отжим или полную остановку машины.

Ремонт всех брендов

Наши техники ремонтируют стиральные машины: Samsung, Bosch, Miele, LG, Whirlpool, Indesit, Hotpoint, Beko, AEG, Electrolux, Zanussi, Candy, Haier, Gorenje, Siemens и многих других. Работаем как с фронтальными, так и с вертикальными (top-loader) машинами, включая встроенные модели и стиральные машины-сушки.

Оригинальные запасные части — долговечный ремонт

Используем только оригинальные запасные части или сертифицированные высококачественные аналоги. На складе всегда есть наиболее распространённые компоненты стиральных машин — насосы, подшипники, уплотнители, угольные щётки, платы управления, — что позволяет завершить многие ремонтные работы за один визит.

Процесс ремонта

Вы связываетесь с нами и описываете проблему. Договариваемся об удобном времени. Техник приезжает к вам домой и проводит тщательную диагностику: проверяет электрические соединения, насос, двигатель, барабан, подшипники, уплотнители и плату управления. После диагностики предоставляем чёткую прозрачную смету. С вашего согласия немедленно приступаем к работе. После ремонта запускаем тестовую программу стирки, чтобы убедиться в нормальной работе машины.

Техническое обслуживание и профилактика

Многих поломок стиральных машин можно избежать при регулярном техобслуживании. Рекомендуем чистить фильтр не реже одного раза в три месяца, соблюдать рекомендованное производителем количество моющего средства, не перегружать барабан, регулярно запускать программу очистки барабана и ежегодно проверять состояние шлангов. Также предлагаем услугу профилактического обслуживания, включающую чистку фильтра, осмотр уплотнителей и шлангов, а также оценку состояния подшипников.

Гарантия и зона обслуживания

На все ремонтные работы предоставляем письменную гарантию (3–12 месяцев). Обслуживаем Таллин и Харьюмаа, включая Виймси, Маарду, Сауэ, Кейла и прилегающие районы. Гибкий график, доступен аварийный выезд. Бесплатная телефонная консультация — звоните нам прямо сейчас!`
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
      const galleryAsset = await uploadImg(svc.kw2, `${svc.slug}-gallery-1.jpg`);
      console.log("  Gallery asset:", galleryAsset._id);

      await patch(svc.slug, {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: heroAsset._id },
          alt: svc.imageAlt,
        },
        gallery: [
          {
            _type: "image",
            _key: "g1",
            asset: { _type: "reference", _ref: galleryAsset._id },
            alt: svc.galleryAlt,
          },
        ],
        shortDescription: svc.shortDesc,
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
