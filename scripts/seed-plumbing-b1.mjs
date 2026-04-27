/**
 * scripts/seed-plumbing-b1.mjs
 * Seeds 3 plumbing service documents in Sanity with trilingual content + images.
 * Run: node --env-file=.env.local scripts/seed-plumbing-b1.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion= process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

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

const ls = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt = (et, en, ru) => ({ _type: "localeText",   et, en, ru });
const lb = (et, en, ru) => ({
  _type: "localeBlock",
  et: toPortableText(et),
  en: toPortableText(en),
  ru: toPortableText(ru),
});

async function uploadImg(kw, filename) {
  console.log(`  Uploading image: ${filename} (kw: ${kw})`);
  const res = await fetch(
    `https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`,
    { redirect: "follow" }
  );
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} for ${kw}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patch(slug, data) {
  const doc = await client.fetch(
    `*[_type=="service" && slug.current==$s][0]{_id}`,
    { s: slug }
  );
  if (!doc) { console.error(`NOT FOUND: ${slug}`); return false; }
  await client.patch(doc._id).set(data).commit();
  console.log(`  Patched: ${slug}`);
  return true;
}

// ── SERVICE 1: 24h-emergency-plumbing ─────────────────────────────────────────

const S1_ET = `Avariitorumees Tallinnas – 24/7 avariiabi kiirelt ja usaldusväärselt

Torude avarii ei küsi luba ega oota sobivat hetke. Meie avariitorumees on valmis saabuma teie juurde ööpäevaringselt – ka nädalavahetustel ja riigipühadel. Reageerimisaeg Tallinna piires on 30–60 minutit, Harjumaal mitte üle 90 minuti. Iga minutiga, mil leke jätkub, kasvab kahju – seepärast on kiire reageerimine kriitilise tähtsusega.

Meie 24/7 avariiabi teenus hõlmab kõiki levinumaid torustikurikeid: purunenud torud, lekked fittingutes ja liitmikes, äkiline vee kadumine, kraanikausis või duširuumis tagasi tulev vesi, WC ummistused ning üleujutuskahjude tõkestamine. Meie sertifitseeritud tehnikud on varustatud professionaalse diagnostikaseadmestiku ning varuosadega, et enamik töid saaks lahendatud ühe visiidiga.

Miks valida meid avariisituatsioonis?

Kõik meie torumehhannikud on sertifitseeritud ja omavad kehtivat kutsetunnistust. Iga töö on kaetud kirjaliku garantiiga – materjalid ja töökvaliteet. Pärast avariiabi teostamist teostame tasuta ülevaatuse ning anname teile hinnapakkumise täiendavate parendustööde jaoks ilma kohustuseta. Kasutame ainult sertifitseeritud materjale, mis vastavad Eesti ehitusnormidele.

Püsiklientidele ja uutele klientidele pakume -30% allahindlust järelteenuste pealt – hooldustööde, torude uuendamise või ventiilide vahetamise korral. Tasuta hinnapakkumine on saadaval kõikide tööde kohta enne tööde algust: meie põhimõte on läbipaistvus ja ausad hinnad ilma üllatusteta.

Tallinn ja Harjumaa – täielik katvus

Teenindame kõiki Tallinna linnaosasid: Kesklinn, Mustamäe, Lasnamäe, Põhja-Tallinn, Kristiine, Haabersti, Pirita, Nõmme. Samuti Harjumaa vallad: Viimsi, Saue, Keila, Maardu, Jõelähtme, Rae, Saku ja teised. Ei ole olukorda, millega meie meeskond hakkama ei saaks – aastakümnetepikkune kogemus tagab professionaalse ja kiire lahenduse.

Helistage meile kohe – meie avariiliin töötab 24 tundi ööpäevas, 7 päeva nädalas. Ärge laske väikesel lekel kasvada suureks kahjuks. Tasuta hinnapakkumine, garanteeritud töökvaliteet ja sertifitseeritud avariiabi – see on meie lubadus.`;

const S1_EN = `Emergency Plumber in Tallinn – 24/7 Response, 30–60 Minutes

A plumbing emergency doesn't wait for business hours. Our emergency plumber service operates 24 hours a day, 7 days a week – including weekends and public holidays. We reach addresses within Tallinn in 30 to 60 minutes and cover the wider Harjumaa county within 90 minutes. Every minute a burst pipe goes unattended increases water damage – fast response is everything.

Our 24/7 emergency plumbing service in Tallinn, Estonia covers all common crises: burst pipes, leaking joints and fittings, sudden loss of water pressure, sewage backing up into drains, blocked toilets, and emergency water damage containment. Our certified plumbers arrive fully equipped with professional diagnostic tools and a wide range of spare parts, so the majority of jobs are completed in a single visit.

Why choose our emergency plumbing service?

Every technician on our team is fully certified and holds a valid professional licence in accordance with Estonian building regulations. All work is covered by a written warranty covering both materials and workmanship. After completing emergency repairs, we provide a free follow-up inspection and a no-obligation quote for any additional improvements. We use only certified materials compliant with Estonian construction standards.

New and returning customers receive a 30% discount on follow-up services – maintenance visits, pipe upgrades, or valve replacements. A free quote is always available before any work begins: we believe in transparent, honest pricing with no hidden surprises.

Serving all of Tallinn and Harjumaa county

We cover every district in Tallinn: Kesklinn, Mustamäe, Lasnamäe, Põhja-Tallinn, Kristiine, Haabersti, Pirita, and Nõmme. We also serve Harjumaa municipalities including Viimsi, Saue, Keila, Maardu, Jõelähtme, Rae, and Saku. No emergency is too complex for our experienced team – decades of hands-on experience ensure a professional, efficient solution every time.

Call our emergency line now – open 24/7. Don't let a small leak turn into a major disaster. Free quote, written warranty, certified emergency plumbers: that is our promise to you.`;

const S1_RU = `Аварийный сантехник в Таллине – круглосуточно, выезд за 30–60 минут

Аварийная ситуация с трубами не ждёт рабочего времени. Наш аварийный сантехник работает 24 часа в сутки, 7 дней в неделю – включая выходные и праздничные дни. Время прибытия по Таллину составляет 30–60 минут, по всему уезду Харьюмаа – не более 90 минут. Каждая минута промедления при прорыве трубы увеличивает ущерб – скорость реагирования критически важна.

Наш круглосуточный аварийный сервис в Таллине, Эстония охватывает все типичные чрезвычайные ситуации: прорыв трубы, протечки в соединениях и фитингах, внезапное исчезновение воды, обратный заброс канализации, засоры унитаза и экстренное ограничение водяного ущерба. Наши сертифицированные специалисты приезжают с профессиональным диагностическим оборудованием и широким набором запчастей – большинство работ выполняется за один визит.

Почему выбирают нас в аварийной ситуации?

Все наши сантехники имеют действующий профессиональный сертификат в соответствии с эстонскими строительными нормами. Каждая работа покрывается письменной гарантией на материалы и качество выполнения. После устранения аварии мы проводим бесплатный осмотр и предоставляем смету на дополнительные работы без каких-либо обязательств. Мы используем исключительно сертифицированные материалы, соответствующие строительным стандартам Эстонии.

Новые и постоянные клиенты получают скидку 30% на последующие услуги – плановое обслуживание, замену труб или вентилей. Бесплатная смета всегда предоставляется до начала работ: мы придерживаемся принципа прозрачных и честных цен без скрытых доплат.

Таллин и уезд Харьюмаа – полное покрытие

Мы обслуживаем все районы Таллина: Кесклинн, Мустамяэ, Ласнамяэ, Пыхья-Таллин, Кристийне, Хааберсти, Пирита и Нымме. Также работаем по всему Харьюмаа: Виймси, Сауэ, Кейла, Маарду, Йыэляхтме, Рае, Саку и другие. Наша многолетняя практика гарантирует профессиональное и быстрое решение любой аварийной ситуации.

Позвоните на нашу аварийную линию прямо сейчас – мы работаем 24/7. Не позволяйте небольшой протечке превратиться в крупный ущерб. Бесплатная смета, письменная гарантия, сертифицированные аварийные сантехники – это наше обещание.`;

// ── SERVICE 2: pipe-works ─────────────────────────────────────────────────────

const S2_ET = `Torude paigaldus Tallinnas – täielik veevarustuse ja kanalisatsiooni lahendus

Torude paigaldus on maja infrastruktuuri alus. Olenemata sellest, kas tegemist on uue ehituse, renoveerimise või olemasoleva süsteemi asendamisega, pakub meie meeskond täielikku torustike lahendust kõikidele hoone tüüpidele. Meie sertifitseeritud torumehhaannikud töötavad Tallinnas ja kogu Harjumaal, pakkudes tipptasemel teenust alates projekteerimisest kuni surveproovide ja kasutuselevõtuni.

Materjalivaik ja tehniline pädevus

Töötame kõikide kaasaegsete torutüüpidega: vasktorud (Cu), polüpropüleentorud (PP), polüetüleentorud (PE) ning komposiittorud. Iga materjal sobib erinevatesse kasutustingimustesse ning meie tehnikud aitavad valida parimad lahendused lähtuvalt vee rõhust, temperatuurist, hoone east ja eelarvetest. Vasktorud pakuvad pikaealisust ja antibakteriaalset pinda – ideaalne joogiveele. PP ja PE torud on korrosioonikindlad ning sobivad nii külma kui sooja vee süsteemidesse.

Meie tööde ulatus

Veevarustussüsteemide täispaigaldus uusehitistesse. Olemasolevate torustike täielik või osaline asendamine. Kanalisatsioonisüsteemide paigaldus ja rekonstrueerimine. Soojaveetorude ja tsirkulatsioonisüsteemide ehitus. Surveproovid ja lekketestid enne kasutuselevõttu. Gaasitorude koostöös vastava loaga töövõtjaga.

Tallinn ja Harjumaa – kogenud meeskond kõikjal

Teenindame eramaju, kortermaju, büroohooned, kauplusi ja tootmishooneid kogu Tallinna piirkonnas ning Harjumaal. Projekti alguses teostame tasuta ülevaatuse ja esitame selge hinnapakkumise. Kõikidele töödele antakse kirjalik garantii nii materjalide kui tööde osas vastavalt Eesti ehitusseadustikule.

Kanalisatsioon – nõuetekohane lahendus iga hoonele

Kanalisatsioonitorude paigaldamisel arvestame hoolikalt kaldeid, liitumispunkte ning ventilatsiooninõudeid, et süsteem töötaks tõrgeteta aastaid. Kasutame PVC, PP ja malmist torusid vastavalt tingimustele. Ummistuste ennetamine algab juba projekteerimisfaasis – meie spetsialistid tagavad, et paigaldus vastab kõikidele normidele.

Kvaliteet, mis kestab

Sertifitseeritud tehnikud, tõestatud materjalid ja kirjalik garantii – see on meie standard. Tasuta hinnapakkumine on saadaval kõikide projektide jaoks. Helistage ja saame kokku leppida esialgse ülevaatuse juba täna.`;

const S2_EN = `Pipe Installation in Tallinn – Complete Plumbing Systems for Every Building

The pipe network is the circulatory system of any building. Whether you are constructing a new property, renovating an older one, or replacing a failing system, our team delivers a complete pipe installation solution tailored to your specific needs. Our certified plumbers operate across Tallinn and the wider Harjumaa county, covering everything from design and installation to pressure testing and commissioning.

Materials and technical expertise

We work with all modern pipe materials: copper (Cu), polypropylene (PP), polyethylene (PE), and composite pipes. Each material excels in different conditions, and our technicians help you choose the right solution based on water pressure requirements, temperature range, building age, and budget. Copper pipes offer exceptional longevity and an antimicrobial surface – ideal for drinking water systems. PP and PE pipes are corrosion-resistant and suitable for both cold and hot water applications.

Scope of our pipe installation services

Full water supply system installation in new builds. Complete or partial replacement of existing pipework. Drainage and sewage system installation and reconstruction. Hot water pipe and circulation system construction. Pressure tests and leak checks prior to commissioning. Gas pipe work in cooperation with licensed gas contractors.

Serving Tallinn and Harjumaa county

We serve residential homes, apartment buildings, office complexes, retail premises, and industrial facilities throughout Tallinn and Harjumaa. Every project begins with a free on-site inspection and a clear, detailed quote. All completed work is backed by a written warranty covering both materials and workmanship, in compliance with Estonian building regulations.

Drainage systems – engineered for lasting performance

When installing drainage and sewage pipes, we calculate gradients, connection points, and ventilation requirements meticulously to ensure the system performs reliably for decades. We use PVC, PP, and cast-iron pipes as conditions dictate. Blockage prevention starts at the design stage – our specialists ensure every installation meets all applicable standards.

Quality you can count on

Certified plumbers, proven materials, and a written warranty – that is our standard. A free quote is available for every project. Call us today to arrange your initial site inspection.`;

const S2_RU = `Монтаж труб в Таллине – полное решение для водоснабжения и канализации

Трубопроводная сеть – это кровеносная система любого здания. Независимо от того, строите ли вы новый объект, проводите реновацию или заменяете устаревшую систему, наша команда предлагает комплексное решение по монтажу труб, адаптированное к вашим потребностям. Наши сертифицированные специалисты работают по всему Таллину и уезду Харьюмаа – от проектирования и монтажа до опрессовки и ввода в эксплуатацию.

Материалы и техническая экспертиза

Мы работаем со всеми современными видами труб: медные (Cu), полипропиленовые (PP), полиэтиленовые (PE) и композитные трубы. Каждый материал подходит для разных условий эксплуатации, и наши техники помогут выбрать оптимальное решение с учётом давления воды, температурного режима, возраста здания и бюджета. Медные трубы отличаются долговечностью и антибактериальной поверхностью – идеальный выбор для систем питьевого водоснабжения. Трубы PP и PE устойчивы к коррозии и подходят как для холодной, так и для горячей воды.

Перечень наших услуг по монтажу труб

Полный монтаж систем водоснабжения в новостройках. Полная или частичная замена существующих трубопроводов. Монтаж и реконструкция систем канализации. Прокладка труб горячего водоснабжения и циркуляционных систем. Опрессовка и проверка на утечки перед вводом в эксплуатацию. Монтаж газовых трубопроводов совместно с лицензированными газовыми подрядчиками.

Таллин и уезд Харьюмаа

Мы обслуживаем жилые дома, многоквартирные здания, офисные комплексы, торговые и производственные помещения по всему Таллину и Харьюмаа. Каждый проект начинается с бесплатного выезда и предоставления чёткой детальной сметы. Все выполненные работы обеспечиваются письменной гарантией на материалы и качество в соответствии с эстонскими строительными нормами.

Канализационные системы – надёжность на долгие годы

При монтаже канализационных труб мы тщательно рассчитываем уклоны, точки подключения и требования к вентиляции, чтобы система работала безотказно десятилетиями. Мы применяем трубы из ПВХ, PP и чугуна в зависимости от условий. Предотвращение засоров начинается ещё на этапе проектирования – наши специалисты гарантируют соответствие монтажа всем действующим нормам.

Качество, которому доверяют

Сертифицированные специалисты, проверенные материалы и письменная гарантия – вот наш стандарт. Бесплатная смета доступна для каждого проекта. Позвоните нам сегодня, чтобы договориться о первичном осмотре объекта.`;

// ── SERVICE 3: tap-mixer-replacement ─────────────────────────────────────────

const S3_ET = `Kraani ja segisti vahetus Tallinnas – kiire, professionaalne ja garanteeritud teenus

Rikkis kraan või lekkiv segisti võib tunduda pisiasjana, kuid iga tilk raiskab vett ja raha. Meie torumehhannikud tegelevad kraanide ja segistite vahetusega köögis, vannitoas, dušikabiinis ja mujal – kiirelt, siistilt ja garantiiga. Enamik töid saab tehtud ühe päeva jooksul, sageli isegi sama päeva jooksul, mil helistate.

Kõik brändid ja mudelid

Meie tehnikud on harjunud töötama kõikide juhtivate kaubamärkidega: Grohe, Hansgrohe, Oras, Ideal Standard, Ravak, Kludi, Hansa jt. Paigaldame nii lihtsaid kraane kui keerukamaid termostaadilahendustega segisteid ja duššisüsteeme. Oleme sõltumatu teenusepakkuja – valite ise soovitud kaubamärgi ja mudeli, meie tagame korrektse paigalduse.

Teenuse ulatus

Köögikraanide ja segistite vahetus (ka köögipatarei). Vannitoa kraanide, segistite ja dušipatareide vahetamine. Duššisüsteemide, termostaatventiilide ja pesuruumide segistite paigaldus. Vananenud torumehhanismi asendamine uuega lekete kõrvaldamiseks. Kraanikausi ja vanni sifoonide paigaldus ja vahetus. Survereguleerija seadistamine optimaalse veesurve tagamiseks.

Miks valida meie teenust?

Tallinna parim hinna ja kvaliteedi suhe. Sama päeva teenindus – helistage hommikul, töö saab tehtud sama päeva jooksul (vabade aegade olemasolul). Kasutame ainult sertifitseeritud materjale ja garanteeritud tooteid. Kirjalik garantii kõikidele töödele – nii materjalidele kui tööde kvaliteedile. Läbipaistev hinnapakkumine enne tööde algust, ilma peidetud kuludeta.

Tallinn – kiire reageerimine kõikides linnaosades

Kesklinn, Mustamäe, Lasnamäe, Haabersti, Kristiine, Põhja-Tallinn, Pirita, Nõmme – meie tehnikud jõuavad teie juurde kiiresti. Vannitoa remont või köögikraani vahetus ei pea kestma kauem kui paar tundi. Sertifitseeritud torumehhaannikud, garanteeritud töökvaliteet ja tasuta hinnapakkumine – see on meie lubadus igale kliendile Tallinnas ja Harjumaal.

Võtke meiega ühendust juba täna

Helistage meile või täitke veebivorm ning meie meeskond võtab teiega esimesel võimalusel ühendust. Tasuta konsultatsioon ja hinnapakkumine – ilma igasuguste kohustuste ja peidetud tasudeta.`;

const S3_EN = `Tap and Mixer Replacement in Tallinn – Same-Day Service, All Brands, Guaranteed

A dripping tap or leaking mixer may seem like a minor issue, but every drop wastes water and money. Our plumbers handle tap and mixer replacements in kitchens, bathrooms, shower enclosures, and utility rooms – quickly, cleanly, and with a written warranty. Most jobs are completed within the day, often on the same day you call.

All brands and models

Our technicians are experienced with all leading brands: Grohe, Hansgrohe, Oras, Ideal Standard, Ravak, Kludi, Hansa, and more. We install everything from simple taps to sophisticated thermostatic mixers and integrated shower systems. As an independent service provider, you choose your preferred brand and model – we handle the professional installation.

Scope of our tap replacement service

Kitchen tap and mixer replacement (including kitchen bar taps). Bathroom basin taps, bath mixers, and shower mixers. Shower systems, thermostatic valves, and utility room fixtures. Replacement of worn internal tap mechanisms to eliminate drips. Basin and bath trap installation and replacement. Pressure regulator adjustment for optimal water pressure throughout your home.

Why choose our service?

Best value for money in Tallinn. Same-day service available – call in the morning and we aim to complete the work that same day (subject to availability). We use only certified materials and quality-guaranteed products. Written warranty covering both parts and labour. Transparent quote before work begins, with no hidden costs.

Serving all Tallinn districts

Kesklinn, Mustamäe, Lasnamäe, Haabersti, Kristiine, Põhja-Tallinn, Pirita, Nõmme – our technicians reach you fast. A bathroom upgrade or kitchen tap replacement shouldn't take more than a couple of hours. Certified plumbers, guaranteed workmanship, and a free quote: that is our promise to every customer in Tallinn and Harjumaa, Estonia.

Contact us today

Call us or submit the online form and our team will get back to you at the earliest opportunity. Free consultation and quote – no obligation, no hidden charges.`;

const S3_RU = `Замена крана и смесителя в Таллине – в тот же день, все бренды, гарантия

Капающий кран или текущий смеситель могут казаться мелочью, но каждая капля – это потраченная вода и деньги. Наши сантехники выполняют замену кранов и смесителей на кухне, в ванной, душевой кабине и подсобных помещениях – быстро, аккуратно и с письменной гарантией. Большинство работ завершается в течение дня, нередко в тот же день, когда вы позвонили.

Все бренды и модели

Наши техники имеют опыт работы со всеми ведущими брендами: Grohe, Hansgrohe, Oras, Ideal Standard, Ravak, Kludi, Hansa и другими. Мы устанавливаем как простые краны, так и сложные термостатические смесители и встроенные душевые системы. Как независимый поставщик услуг, мы не привязаны к конкретному бренду – вы выбираете желаемую марку и модель, мы обеспечиваем профессиональный монтаж.

Перечень наших услуг по замене кранов

Замена кухонного крана и смесителя (в том числе барных кранов). Замена кранов для раковины, смесителей для ванны и душевых смесителей. Монтаж душевых систем, термостатических клапанов и смесителей в подсобных помещениях. Замена изношенных внутренних механизмов кранов для устранения капания. Монтаж и замена сифонов для умывальника и ванны. Настройка регулятора давления для оптимального давления воды в системе.

Почему выбирают нас?

Лучшее соотношение цены и качества в Таллине. Услуга в тот же день – позвоните утром, и мы постараемся выполнить работу в тот же день (при наличии свободного времени). Мы используем только сертифицированные материалы и продукты с гарантией качества. Письменная гарантия на материалы и работу. Прозрачная смета до начала работ без скрытых доплат.

Обслуживаем все районы Таллина

Кесклинн, Мустамяэ, Ласнамяэ, Хааберсти, Кристийне, Пыхья-Таллин, Пирита, Нымме – наши техники прибудут к вам быстро. Замена крана на кухне или ремонт смесителя в ванной не должны занимать больше нескольких часов. Сертифицированные сантехники, гарантированное качество работ и бесплатная смета – это наше обещание каждому клиенту в Таллине и уезде Харьюмаа, Эстония.

Свяжитесь с нами сегодня

Позвоните нам или заполните форму на сайте – наша команда свяжется с вами при первой возможности. Бесплатная консультация и смета без каких-либо обязательств и скрытых платежей.`;

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const services = [
    {
      slug: "24h-emergency-plumbing",
      heroKw:    "emergency plumber water leak pipe",
      galleryKw: "plumber repairing burst pipe",
      heroFn:    "emergency-plumbing-hero.jpg",
      galleryFn: "emergency-plumbing-gallery.jpg",
      shortDesc: ls(
        "Avariitorumees Tallinnas ööpäevaringselt – saabume 30–60 minutiga ja lahendame kõik torustiku avariid professionaalselt.",
        "Emergency plumber in Tallinn available 24/7 – we arrive in 30–60 minutes and resolve all plumbing crises professionally.",
        "Аварийный сантехник в Таллине круглосуточно – приезжаем за 30–60 минут и профессионально устраняем любые аварии."
      ),
      metaTitle: ls(
        "Avariitorumees Tallinn 24/7 – kiire abi 30 min",
        "Emergency Plumber Tallinn 24/7 – Fast Response",
        "Аварийный сантехник Таллин 24/7 – выезд 30 мин"
      ),
      metaDesc: ls(
        "Avariitorumees Tallinnas 24/7 – reageerimisaeg 30–60 min. Purunenud torud, üleujutus, vee kadumine. Sertifitseeritud, garantii, tasuta hinnapakkumine.",
        "Emergency plumber Tallinn 24/7 – 30–60 min response. Burst pipes, flooding, no water. Certified plumbers, written warranty, free quote.",
        "Аварийный сантехник Таллин 24/7 – приезд 30–60 мин. Прорыв труб, затопление, нет воды. Сертификат, гарантия, бесплатная смета."
      ),
      heroAlt: ls(
        "Avariitorumees remondib leket Tallinnas",
        "Emergency plumber repairing a water leak in Tallinn",
        "Аварийный сантехник устраняет протечку в Таллине"
      ),
      galleryAlt: ls(
        "Purunenud toru remont – avariiabi",
        "Plumber repairing a burst pipe – emergency service",
        "Ремонт прорванной трубы – аварийная служба"
      ),
      body: lb(S1_ET, S1_EN, S1_RU),
    },
    {
      slug: "pipe-works",
      heroKw:    "plumbing pipe installation copper",
      galleryKw: "pipe repair water system",
      heroFn:    "pipe-works-hero.jpg",
      galleryFn: "pipe-works-gallery.jpg",
      shortDesc: ls(
        "Täielik torude paigaldus ja remont Tallinnas – vask, PP, PE torud, veevarustus, kanalisatsioon, surveproovid ja garantii.",
        "Complete pipe installation and repair in Tallinn – copper, PP, PE pipes, water supply, drainage, pressure tests, and warranty.",
        "Полный монтаж и ремонт труб в Таллине – медь, PP, PE, водоснабжение, канализация, опрессовка и гарантия."
      ),
      metaTitle: ls(
        "Torude paigaldus Tallinn – vask PP PE, garantii",
        "Pipe Installation Tallinn – Copper PP PE Systems",
        "Монтаж труб Таллин – медь PP PE, гарантия"
      ),
      metaDesc: ls(
        "Professionaalne torude paigaldus Tallinnas ja Harjumaal. Vask, PP, PE torud. Veevarustus, kanalisatsioon, surveproovid. Sertifitseeritud, garantii.",
        "Professional pipe installation in Tallinn and Harjumaa. Copper, PP, PE pipes. Water supply, drainage, pressure testing. Certified plumbers, warranty.",
        "Профессиональный монтаж труб в Таллине и Харьюмаа. Медь, PP, PE. Водоснабжение, канализация, опрессовка. Сертификат, гарантия."
      ),
      heroAlt: ls(
        "Vasktorude paigaldus torumehe poolt Tallinnas",
        "Copper pipe installation by a plumber in Tallinn",
        "Монтаж медных труб сантехником в Таллине"
      ),
      galleryAlt: ls(
        "Torusüsteemi remont ja uuendamine",
        "Pipe system repair and upgrade",
        "Ремонт и модернизация трубопроводной системы"
      ),
      body: lb(S2_ET, S2_EN, S2_RU),
    },
    {
      slug: "tap-mixer-replacement",
      heroKw:    "faucet mixer tap installation bathroom",
      galleryKw: "plumber replacing kitchen faucet",
      heroFn:    "tap-mixer-hero.jpg",
      galleryFn: "tap-mixer-gallery.jpg",
      shortDesc: ls(
        "Kraani ja segisti vahetus Tallinnas – sama päeva teenindus, kõik brändid (Grohe, Hansgrohe, Oras), kirjalik garantii.",
        "Tap and mixer replacement in Tallinn – same-day service, all brands (Grohe, Hansgrohe, Oras), written warranty.",
        "Замена крана и смесителя в Таллине – в тот же день, все бренды (Grohe, Hansgrohe, Oras), письменная гарантия."
      ),
      metaTitle: ls(
        "Kraani vahetus Tallinn – sama päev, kõik brändid",
        "Tap Mixer Replacement Tallinn – Same Day Service",
        "Замена крана Таллин – в день обращения, все бренды"
      ),
      metaDesc: ls(
        "Kraani ja segisti vahetus Tallinnas – köök, vannituba, dušš. Kõik brändid: Grohe, Hansgrohe, Oras, Ideal Standard. Sama päev, garantii, tasuta hinnapakkumine.",
        "Tap and mixer replacement Tallinn – kitchen, bathroom, shower. All brands: Grohe, Hansgrohe, Oras, Ideal Standard. Same-day, warranty, free quote.",
        "Замена крана и смесителя Таллин – кухня, ванная, душ. Все бренды: Grohe, Hansgrohe, Oras, Ideal Standard. В тот же день, гарантия, бесплатная смета."
      ),
      heroAlt: ls(
        "Segisti paigaldus vannitoas – professionaalne torumees",
        "Mixer tap installation in a bathroom – professional plumber",
        "Монтаж смесителя в ванной – профессиональный сантехник"
      ),
      galleryAlt: ls(
        "Köögikraani vahetus – kogenud torumees Tallinnas",
        "Kitchen faucet replacement – experienced plumber in Tallinn",
        "Замена кухонного крана – опытный сантехник в Таллине"
      ),
      body: lb(S3_ET, S3_EN, S3_RU),
    },
  ];

  for (const svc of services) {
    console.log(`\nProcessing: ${svc.slug}`);
    try {
      console.log("  Uploading hero image...");
      const heroAsset = await uploadImg(svc.heroKw, svc.heroFn);
      console.log("  Uploading gallery image...");
      const galleryAsset = await uploadImg(svc.galleryKw, svc.galleryFn);

      const data = {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: heroAsset._id },
          alt: svc.heroAlt,
        },
        gallery: [
          {
            _key: "g0",
            _type: "image",
            asset: { _type: "reference", _ref: galleryAsset._id },
            alt: svc.galleryAlt,
          },
        ],
        shortDescription: svc.shortDesc,
        body: svc.body,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDesc,
      };

      const ok = await patch(svc.slug, data);
      if (ok) console.log(`SUCCESS: ${svc.slug}`);
    } catch (err) {
      console.error(`FAILED: ${svc.slug}`, err.message);
    }
  }

  console.log("\nDone.");
}

main();
