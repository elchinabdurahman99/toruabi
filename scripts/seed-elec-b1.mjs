/**
 * scripts/seed-elec-b1.mjs
 * Seeds 4 electrical home-service documents in Sanity with trilingual content.
 * Run: node --env-file=.env.local scripts/seed-elec-b1.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function toPortableText(text) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((para, i) => ({
      _key:  `b${i}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: `c${i}`, _type: "span", text: para.trim(), marks: [] }],
    }));
}

const ls = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt = (et, en, ru) => ({ _type: "localeText",   et, en, ru });
const lb = (et, en, ru) => ({ _type: "localeBlock",  et: toPortableText(et), en: toPortableText(en), ru: toPortableText(ru) });

async function uploadImg(kw, filename) {
  const res = await fetch(`https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`, { redirect: "follow" });
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patch(slug, data) {
  const doc = await client.fetch(`*[_type=="service"&&slug.current==$s][0]{_id}`, { s: slug });
  if (!doc) { console.error("NOT FOUND:", slug); return; }
  await client.patch(doc._id).set(data).commit();
  console.log("✓", slug);
}

// ── SERVICE 1: 24h-emergency-electrical ──────────────────────────────────────

const S1_ET = `Avariielektrik 24/7 – Tallinn ja Harjumaa

Elektririkked ei küsi luba ega oota sobivat aega. Meie avariielektrik on Tallinna ja kogu Harjumaa piirkonnas kättesaadav ööpäevaringselt, seitse päeva nädalas, 365 päeva aastas. Kui teil tekib ootamatu elektririke, lühis, kaitsmete väljalülitumine või ohtlikult sädelevad pistikupesad, on meie meeskond kohal 30–60 minuti jooksul.

Miks valida meie avariiteenust?

Reageerimisaeg 30–60 minutit – olenemata kellajast, meie brigaad jõuab kohale kiiresti. Ootamine elektririkke ajal ei ole mitte ainult ebamugav, vaid võib olla ka ohtlik. Lühised, lahtised juhtmed ja ülekoormatud kaitselülitid on tulekahjude peamised põhjused kodudes ja ettevõtetes.

Meie elektrikutel on 5. kategooria elektritöödeks vajalik litsents – kõrgeim eraisikutele kättesaadav tase Eestis. See tähendab, et meie spetsialistid on kvalifitseeritud teostama kõiki elektritöid vastavalt EVS standarditele ning Eesti elektriohutuse nõuetele. Kõik avariitööd dokumenteeritakse ja sertifitseeritakse nõuetekohaselt.

Millised olukorrad nõuavad avariielektriku kutsumist?

Täielik voolukatkes kodus või äriruumides, mis ei ole tingitud tänavavoolu katkestusest – see võib viidata sisemisele lühisele või kahjustatud peakaitsele. Korduvalt välja lülituvad kaitselülitid on märk sellest, et elektrivõrk on ülekoormatud või esineb varjatud viga. Sädelevad pistikupesad või lülitid viitavad ohtlikele lahtistele ühendustele, mis võivad põhjustada tulekahju. Põlenud lõhn elektrikilbist, seinast või pistikupesadest on alati hädaolukorra tunnus. Veega kokkupuutunud elektrisüsteemid – näiteks pärast tulvavett või torrupurset – tuleb viivitamatult kontrollida.

Meie avariielektrikud kasutavad kaasaegseid diagnostikavahendeid, sealhulgas termokaamerat ja multimeetreid, et tuvastada vead täpselt ja kiiresti. Kõikidele avariitöödele anname kirjaliku garantii ning väljastame vajalikud aktid ja dokumendid.

Hind ja hinnapakkumine

Avariiväljakutsele reageerime ilma eelnevate peidetud tasudeta. Pärast olukorra hindamist saate selge ja läbipaistva hinnapakkumise enne töödega alustamist. Tallinn, Harjumaa, Viimsi, Maardu, Saue, Keila, Rapla – kõik piirkonnad on meie teeninduspiirkonnas. Tasuta hinnapakkumine päevaste tööde jaoks. Võtke meiega ühendust kohe – avariielektrik on alati valmis appi tulema.`;

const S1_EN = `Emergency Electrician 24/7 – Tallinn & Harjumaa

Electrical emergencies don't wait for business hours. Our emergency electrician service covers Tallinn and the entire Harjumaa region around the clock, every day of the year. Whether you're dealing with a sudden power outage, a short circuit, tripped breakers, or dangerously sparking outlets, our team will be at your door within 30 to 60 minutes.

Why choose our emergency electrical service?

Fast response time of 30–60 minutes regardless of the time of day or night. Electrical faults are not only inconvenient — they can be life-threatening. Short circuits, exposed wiring, and overloaded breakers are among the leading causes of house fires. Every minute counts when your home or business is at risk.

Our electricians hold a Category 5 electrical licence — the highest level available to private practitioners in Estonia. This means every technician dispatched to your home is fully qualified to work on all electrical systems in compliance with EVS standards and Estonian electrical safety regulations. All emergency work is properly documented and certified upon completion.

What situations require an emergency electrician?

A complete power failure in your home or business that is not related to a grid outage may indicate an internal short circuit or a blown main fuse. Repeatedly tripping circuit breakers signal that the electrical system is overloaded or that a hidden fault is present. Sparking outlets or switches point to dangerous loose connections that could start a fire at any moment. A burning smell from the electrical panel, walls, or sockets is always an emergency. Electrical systems that have come into contact with water — after flooding or a burst pipe — must be inspected immediately.

Our emergency electricians use modern diagnostic tools including thermal imaging cameras and precision multimeters to identify faults quickly and accurately. All emergency repairs come with a written warranty, and the necessary certificates and documentation are issued upon completion.

Pricing and quotes

We respond to emergency call-outs with no hidden fees. After assessing the situation, you will receive a clear and transparent quote before any work begins. We serve Tallinn, Harjumaa, Viimsi, Maardu, Saue, Keila, Rapla, and surrounding areas. Free quotes available for daytime work. Call us now — our emergency electrician is always ready to help.`;

const S1_RU = `Аварийный электрик 24/7 – Таллин и Харьюмаа

Электрические аварии не знают удобного времени. Наша служба аварийного электрика работает в Таллине и по всему уезду Харьюмаа круглосуточно, семь дней в неделю, 365 дней в году. Отключение электричества, короткое замыкание, выбивание автоматов или опасные искры из розеток — наша бригада прибудет к вам в течение 30–60 минут.

Почему стоит выбрать наш аварийный сервис?

Время реагирования 30–60 минут — в любое время суток. Электрические неисправности — это не просто неудобство, они могут представлять прямую угрозу жизни. Короткие замыкания, оголённая проводка и перегруженные автоматы являются одной из главных причин пожаров в жилых и коммерческих помещениях.

Наши электрики имеют лицензию 5-й категории — высший уровень квалификации для частных специалистов в Эстонии. Это означает, что каждый выезжающий к вам специалист полностью квалифицирован для работы со всеми электрическими системами в соответствии со стандартами EVS и требованиями электробезопасности Эстонии. Все аварийные работы надлежащим образом документируются и сертифицируются.

В каких ситуациях нужно вызывать аварийного электрика?

Полное отключение электричества в доме или офисе, не связанное с аварией на внешней сети, может указывать на внутреннее короткое замыкание или сгоревший главный предохранитель. Регулярное срабатывание автоматических выключателей свидетельствует о перегрузке сети или скрытой неисправности. Искры из розеток или выключателей указывают на опасные незакреплённые соединения, способные вызвать пожар. Запах гари из щитка, стен или розеток — это всегда аварийная ситуация. Электросистемы, контактировавшие с водой после затопления или прорыва трубы, подлежат немедленной проверке.

Наши аварийные электрики используют современные диагностические инструменты, включая тепловизоры и мультиметры, для точного и быстрого выявления неисправностей. На все аварийные работы предоставляется письменная гарантия, по завершении выдаются необходимые акты и документы.

Стоимость и расчёт цены

Мы выезжаем на аварийные вызовы без скрытых платежей. После оценки ситуации вы получите чёткое и прозрачное коммерческое предложение до начала работ. Мы обслуживаем Таллин, Харьюмаа, Виймси, Маарду, Сауэ, Кейлу, Рапла и прилегающие районы. Бесплатный расчёт стоимости для дневных работ. Звоните прямо сейчас — аварийный электрик всегда готов помочь.`;

// ── SERVICE 2: electrical-installation ───────────────────────────────────────

const S2_ET = `Elektripaigaldus uus- ja rekonstrueeritavatele hoonetele – Tallinn ja Harjumaa

Kvaliteetne elektripaigaldus on iga hoone alus. Meie sertifitseeritud elektrikud teostavad täismahulist elektripaigaldust nii uusehitistele kui ka rekonstrueeritavatele hoonetele Tallinnas ja kogu Harjumaal. Meie töö vastab kõigile EVS standarditele ning Eesti elektriohutuse nõuetele.

Mida hõlmab täismahus elektripaigaldus?

Elektripaigaldus algab hoolikast projekteerimisest. Meie spetsialistid koostavad elektriskeemi vastavalt hoone planeeringule ja kliendi vajadustele. Arvestame tarbijate paiknemist, koormuste jaotust ning tulevikuvajadusi, et vältida ülekoormust ja tagada süsteemi pikaajaline töökindlus.

Juhtmestik ja kaablite paigaldus – kasutame ainult sertifitseeritud kaableid ja materjale, mis vastavad EVS-EN standarditele. Kaablid paigaldatakse nii peidetult (krohvi sisse, põranda alla) kui ka avatud kanalites vastavalt projektile. Korrektne kaablite ristlõige, kaitsetorude kasutamine ja nõuetekohased klemmid tagavad pikaajalise ohutuse.

Pistikupesade ja lülitite paigaldus – paigaldame pistikupesad ja lülitid vastavalt projektile. Märgades ruumides (vannituba, köök, pesemisruum) kasutame vastava kaitseklassiga pistikupesi (IP44/IP55), et tagada ohutus niiskuses. Pakume erinevaid disainilahendusi – klassikalised, minimalistlikud ja nutikad lahendused.

Elektrikilbi paigaldus ja seadistamine – kilp on kogu elektriseadme süda. Paigaldame kaasaegsed kaitselülitid (MCB), rikkevoolukaitsmed (RCD/FI-lülitid), ülepingekaitsmed ja mootorikaitsmed. Kilp projekteeri-takse nii, et see oleks laiendatav tulevikuvajadustele.

Maandus ja kaitsejuhtmed – korrektne maandussüsteem on elektriohutuse alus. Paigaldame nõuetekohase maanduse vastavalt EVS-EN 62305 ning tagame, et kõik metallosad on maandatud. See kaitseb nii seadmeid kui ka inimesi.

Lõppkontroll ja sertifitseerimine – pärast paigaldust teostatakse mõõtmised ja kontroll: isolatsioonitakistus, maandustakistus, kaitselülitite reageerimisaeg. Väljastame elektriseadme kasutusloa aktid ning vajalikud dokumendid.

Meie elektripaigalduse teenus hõlmab:

Eramajad, korterid, äriruumid, tootmishooned ja laoruumid. Elektrikilpide projekteerimine ja paigaldus. Nõrkvoolupaigaldised (andmeside, turvasüsteemid, videovalve). Välispaigaldised (aiatuled, laadimispunktid elektriautodele). Kõik tööd dokumenteeritakse ja sertifitseeritakse vastavalt Eesti õigusaktidele. Tasuta eelarvestus ja konsultatsioon.`;

const S2_EN = `Electrical Installation for New Builds and Renovations – Tallinn & Harjumaa

A high-quality electrical installation is the foundation of every safe and efficient building. Our certified electricians carry out full-scope electrical installations for new constructions and renovation projects in Tallinn and across Harjumaa. All work is performed to EVS standards and Estonian electrical safety regulations.

What does a complete electrical installation include?

Every installation begins with careful design and planning. Our specialists create a detailed electrical schematic based on the building's layout and the client's requirements. We account for the location of consumers, load distribution, and future expansion needs to prevent overloading and ensure long-term system reliability.

Cable laying and wiring – we use only certified cables and materials compliant with EVS-EN standards. Cables are installed concealed (in plaster, under flooring) or in open conduit systems depending on the project. Correct cable cross-section, use of protective conduits, and proper terminals ensure lasting safety.

Socket and switch installation – sockets and switches are installed in accordance with the approved project. In wet areas (bathroom, kitchen, utility room) we use sockets with the appropriate ingress protection rating (IP44/IP55) to ensure safety in humid conditions. We offer a range of design options — classic, minimalist, and smart home solutions.

Distribution board installation and configuration – the distribution board is the heart of the entire electrical system. We install modern miniature circuit breakers (MCB), residual current devices (RCD), surge protectors, and motor protection devices. The board is designed with room for future expansion.

Earthing and protective conductors – a proper earthing system is the cornerstone of electrical safety. We install earthing in accordance with EVS-EN 62305 and ensure that all metallic components are correctly bonded. This protects both equipment and people.

Final inspection and certification – after installation, all required measurements and tests are performed: insulation resistance, earthing resistance, and circuit breaker trip times. We issue the electrical installation commissioning certificates and all necessary documentation.

Our electrical installation service covers:

Residential homes, apartments, commercial premises, industrial and warehouse facilities. Design and installation of distribution boards. Low-voltage systems (data cabling, security systems, CCTV). Outdoor installations (garden lighting, electric vehicle charging points). All work is documented and certified in accordance with Estonian legislation. Free estimates and consultation available.`;

const S2_RU = `Электромонтаж в новостройках и при реконструкции – Таллин и Харьюмаа

Качественный электромонтаж — основа каждого безопасного и надёжного здания. Наши сертифицированные электрики выполняют полный комплекс электромонтажных работ для новостроек и объектов реконструкции в Таллине и по всему уезду Харьюмаа. Все работы соответствуют стандартам EVS и требованиям электробезопасности Эстонии.

Что включает полный электромонтаж?

Каждая установка начинается с тщательного проектирования. Наши специалисты составляют подробную электрическую схему на основе планировки здания и требований заказчика. Мы учитываем расположение потребителей, распределение нагрузок и перспективы расширения, чтобы исключить перегрузки и обеспечить долгосрочную надёжность системы.

Прокладка кабелей и проводки – мы используем только сертифицированные кабели и материалы, соответствующие стандартам EVS-EN. Кабели прокладываются скрытым способом (в штукатурке, под полом) или в открытых кабельных каналах согласно проекту. Правильное сечение кабелей, применение защитных труб и надлежащие клеммники обеспечивают длительную безопасность.

Монтаж розеток и выключателей – розетки и выключатели устанавливаются в соответствии с утверждённым проектом. В помещениях с повышенной влажностью (ванная, кухня, санузел) используются розетки с соответствующей степенью защиты (IP44/IP55). Предлагаем различные дизайнерские решения — классические, минималистичные и системы умного дома.

Монтаж и настройка распределительного щита – щиток является сердцем всей электрической системы. Мы устанавливаем современные автоматические выключатели (MCB), устройства защитного отключения (УЗО/RCD), защиту от перенапряжения и защиту двигателей. Щиток проектируется с возможностью расширения.

Заземление и защитные проводники – правильная система заземления является краеугольным камнем электробезопасности. Монтаж выполняется в соответствии с EVS-EN 62305, все металлические части надлежащим образом заземляются. Это защищает как оборудование, так и людей.

Итоговая проверка и сертификация – после монтажа выполняются все необходимые измерения и испытания: сопротивление изоляции, сопротивление заземления, время срабатывания автоматов. Выдаются акты ввода электроустановки в эксплуатацию и вся необходимая документация.

Наши услуги электромонтажа охватывают:

Жилые дома, квартиры, коммерческие, промышленные и складские помещения. Проектирование и монтаж распределительных щитов. Слаботочные системы (компьютерные сети, системы безопасности, видеонаблюдение). Наружный монтаж (садовое освещение, зарядные станции для электромобилей). Все работы документируются и сертифицируются согласно законодательству Эстонии. Бесплатный расчёт стоимости и консультация.`;

// ── SERVICE 3: lighting-installation ─────────────────────────────────────────

const S3_ET = `Valgustuse paigaldus – LED, nutikas valgustus ja disainlahendused Tallinnas

Kaasaegne valgustus ei ole pelgalt funktsionaalne vajadus – see on oluline osa sisekujundusest ja igapäevasest mugavusest. Meie valgustuse paigalduse meeskond pakub täisteenust alates valgustusprojekti konsultatsioonist kuni valmis paigalduseni Tallinnas ja Harjumaal.

Valgustusliigid, mida paigaldame:

LED süvistatavad valgustitid (downlight) – populaarne valik kaasaegsetesse elamutesse ja büroodesse. Süvistatavad LED-valgustid annavad ühtlase, pimendamisvõimalusega valguse ilma rippuvate detailideta. Paigaldame nii ühe- kui ka mitmetsoonilisi lahendusi. Kasutame juhtivate tootjate valgustiteid: Philips, OSRAM, Ideal Lux, Eglo ja Astro.

Liikvalgustid (track lighting) – paindlik süsteem, mis võimaldab suunata valgust täpselt sinna, kuhu vaja. Eriti populaarne köökides, galeriides, kauplustes ja tööruumides. Liikvalgusteid saab hõlpsasti ümber seadistada vastavalt ruumi muutuvatele vajadustele.

Rippvalgustid ja lühtrid – annavad ruumile iseloomu ja stiili. Paigaldame kõikvõimalikke rippvalgusteid alates minimalistlikest disainlahendusest kuni klassikaliste lühtriteni. Tagame ohutu elektriühenduse ja korrektse riputuse erinevate laetüüpide korral.

LED ribavalgustid – dekoratiivne ja energiasäästlik lahendus nii sisetingimustesse kui väljaspoole. Kasutamine: kapialused, trepid, koopad, välisvalgustus, teleri taustavalgus. Pakume nii lihtsat ühevärvilist lahendust kui ka RGBW ja nutikat juhtimist.

Välisvalgustus – fassaadivalgustus, aiavalgustus, sisenemisteed, garaažid ja turvasvalgustus. Paigaldame IP65/IP67 kaitseklassiga välivalgustiteid, mis on mõeldud Eesti ilmastiku jaoks. Liikumisanduritega valgustus suurendab turvalisust ja säästab energiat.

Nutikas valgustus (smart lighting) – ühildame valgustussüsteeme juhtimissüsteemidega nagu Philips Hue, Shelly, DALI, KNX ja Zigbee. Nutivalgustus võimaldab häälkäsklusi, ajastamist, stseenide loomist ja energiasäästu automatiseerimist. Ühilduvus Apple HomeKit, Google Home ja Amazon Alexa platvormidega.

Energiaarvutused ja projekteerimine

Enne paigaldust teostame energiaarvutused, et tagada optimaalne valgustugevus (lux-tase) vastavalt ruumi otstarbele. Elutoa soovituslik valgustugevus on 150–300 lux, töölaua juures 500 lux ning vannitoas 300 lux. Korrektsed arvutused tagavad mugavuse ja energia kokkuhoiu.

Kõik paigaldused vastavad EVS standarditele ja on dokumenteeritud. Anname garantii nii paigalduse kui ka kasutatud materjalide kohta. Konsultatsioon on tasuta.`;

const S3_EN = `Lighting Installation – LED, Smart Lighting and Design Solutions in Tallinn

Modern lighting is more than a functional necessity — it is an essential part of interior design and everyday comfort. Our lighting installation team provides a full service from design consultation to completed installation in Tallinn and Harjumaa.

Types of lighting we install:

LED recessed downlights – a popular choice for contemporary homes and offices. Recessed LED fittings provide even, dimmable light without hanging elements. We install single-zone and multi-zone solutions using fixtures from leading brands: Philips, OSRAM, Ideal Lux, Eglo, and Astro.

Track lighting – a flexible system that allows light to be directed exactly where it is needed. Particularly popular in kitchens, galleries, shops, and workspaces. Track systems can easily be reconfigured as the room's needs change.

Pendant lights and chandeliers – add character and style to any space. We install all types of pendant lights, from minimalist designer pieces to classic chandeliers. We ensure safe electrical connections and correct mounting for different ceiling types.

LED strip lights – a decorative and energy-efficient solution for both indoor and outdoor use. Applications include under-cabinet lighting, staircases, niches, outdoor accents, and TV backlighting. We offer simple single-colour options as well as RGBW and smart-controlled strips.

Outdoor lighting – facade illumination, garden lights, pathways, garages, and security lighting. We install IP65/IP67-rated outdoor fittings designed to withstand Estonian weather conditions. Motion sensor lighting improves security and saves energy.

Smart lighting – we integrate lighting systems with control platforms such as Philips Hue, Shelly, DALI, KNX, and Zigbee. Smart lighting enables voice control, scheduling, scene creation, and automated energy saving. Compatible with Apple HomeKit, Google Home, and Amazon Alexa.

Energy calculations and design

Before installation, we carry out energy calculations to ensure optimal light levels (lux values) for each space's intended use. The recommended illuminance is 150–300 lux in a living room, 500 lux at a desk, and 300 lux in a bathroom. Accurate calculations guarantee comfort and energy efficiency.

All installations comply with EVS standards and are fully documented. We provide a warranty on both workmanship and materials. Consultation is free of charge.`;

const S3_RU = `Установка освещения – LED, умное освещение и дизайнерские решения в Таллине

Современное освещение — это не просто функциональная необходимость, это важная часть интерьера и повседневного комфорта. Наша команда по установке освещения предоставляет полный спектр услуг: от консультации по проекту до завершённого монтажа в Таллине и Харьюмаа.

Виды освещения, которые мы устанавливаем:

Встраиваемые светодиодные светильники (даунлайты) – популярный выбор для современных домов и офисов. Встраиваемые LED-светильники обеспечивают равномерный, диммируемый свет без навесных элементов. Устанавливаем одно- и многозонные решения с использованием светильников ведущих брендов: Philips, OSRAM, Ideal Lux, Eglo и Astro.

Трековое освещение – гибкая система, позволяющая направить свет именно туда, где это необходимо. Особенно популярна на кухнях, в галереях, магазинах и рабочих пространствах. Трековые системы легко перенастраиваются по мере изменения потребностей помещения.

Подвесные светильники и люстры – придают помещению характер и стиль. Устанавливаем все типы подвесных светильников: от минималистичных дизайнерских решений до классических люстр. Обеспечиваем безопасное электрическое подключение и правильный монтаж для различных типов потолков.

Светодиодные ленты – декоративное и энергосберегающее решение для использования как внутри, так и снаружи. Применение: подсветка шкафов, лестниц, ниш, наружная подсветка, фоновая подсветка телевизора. Предлагаем простые монохромные варианты, а также RGBW и управляемые ленты.

Наружное освещение – подсветка фасадов, садовые фонари, дорожки, гаражи и охранное освещение. Устанавливаем наружные светильники со степенью защиты IP65/IP67, предназначенные для эстонских климатических условий. Освещение с датчиками движения повышает безопасность и экономит электроэнергию.

Умное освещение – интегрируем системы освещения с платформами управления: Philips Hue, Shelly, DALI, KNX и Zigbee. Умное освещение позволяет управлять голосом, устанавливать расписание, создавать сцены и автоматизировать экономию энергии. Совместимость с Apple HomeKit, Google Home и Amazon Alexa.

Энергетические расчёты и проектирование

Перед монтажом выполняем энергетические расчёты для обеспечения оптимального уровня освещённости (люкс) в соответствии с назначением каждого помещения. Рекомендуемая освещённость: 150–300 лк в гостиной, 500 лк за рабочим столом, 300 лк в ванной. Точные расчёты гарантируют комфорт и энергоэффективность.

Все монтажные работы соответствуют стандартам EVS и полностью документируются. Предоставляем гарантию как на работу, так и на используемые материалы. Консультация бесплатна.`;

// ── SERVICE 4: switchboard-maintenance ───────────────────────────────────────

const S4_ET = `Elektrikilbi hooldus ja vahetus – Tallinn ja Harjumaa

Elektrikilp on kogu maja elektriseadme tähtsaim osa. Vananenud, ülekoormatud või vigased kaitseseadmed kujutavad tõsist tulekahju- ja elektrilöögiriski. Meie sertifitseeritud elektrikud pakuvad elektrikilpide täielikku hooldust, moderniseerimist ja vahetust Tallinnas ja kogu Harjumaal, vastavalt Eesti elektriohutuse standarditele.

Millal on vaja elektrikilpi hooldada või vahetada?

Vana korgikaitsmesüsteem – vanad porselen- või korgikaitsmepesadega kilbid ei vasta tänapäeva ohutusnõuetele ega kaitse tõhusalt lühisvoolude ja ülekoormuse eest. Nende vahetus kaasaegse automaatkaitselülitite süsteemiga on investeering turvalisusesse ja mugavusse.

Korduvalt välja lülituvad kaitselülitid viitavad sellele, et kilp on ülekoormatud, kaitselüliti on kulunud, või esineb varjatud viga elektrivõrgus. Diagnoosimine ja vahetus on hädavajalik.

Kilbis puuduvad rikkevoolukaitmed (RCD/FI-lülitid) – rikkevoolukaitme puudumine on otsene ohtlike olukordade allikas. RCD lülitub välja murdosa sekundiga ja kaitseb inimest elektrilöögiohu eest. Eesti ehitusnormid nõuavad RCD paigaldamist märgades ruumides ja välispaigaldistele.

Kilp on vana ja dokumenteerimata – paljudes vanades hoonetes on elektrikilbid paigaldatud ilma nõuetekohaste skeemide ja dokumentideta. See muudab hoolduse ja rikete otsimise keeruliseks ning ohtlikuks. Meie paigaldame kõik nõuetekohaste skeemide ja dokumentidega.

Meie elektrikilbi teenused hõlmavad:

Kilbi täielik audit ja diagnostika – termokaamerapiltidega kontrollime ülekuumenenud liitmeid, mõõdame koormuste jaotust ja hindame kaitseseadmete seisukorda. Tulemusena saate põhjaliku aruande kilbi hetkeolukorrast.

Kaitselülitite ja rikkevoolukaitsme vahetus – paigaldame juhtivate tootjate (ABB, Schneider Electric, Hager, Legrand) kaitselüliteid (MCB), rikkevoolukaitsmeid (RCD/RCCB) ja kombineeritud kaitseseadmeid (RCBO).

Koormuste tasakaalustamine – ebaühtlane koormuse jaotus faasidel põhjustab ülekoormust ja energia raiskamist. Meie spetsialistid jaotavad koormused tasakaalustatult kõigi faaside vahel.

Ülepingekaitse paigaldus – kaitseb kalleid seadmeid (telerid, arvutid, kodumasinad) äikese ja voolupiikide eest.

Täielik kilbi vahetus – vahetame vana kilbi kaasaegse, laiendatava ja hästi dokumenteeritud kilbiga. Kõik tööd sertifitseeritakse ja dokumenteeritakse vastavalt Eesti õigusaktidele.

Hoolduslepingud – regulaarne kilbihooldus (1–2 korda aastas) pikendab seadmete eluiga, tagab ohutuse ja hoiab ära kallid avariid. Pakume ettevõtetele ja korteriühistutele hoolduslepinguid.

Kõik tööd vastavad EVS standarditele. Garantii, tasuta hinnapakkumine.`;

const S4_EN = `Switchboard Maintenance and Replacement – Tallinn & Harjumaa

The electrical distribution board is the most critical component of your home's electrical system. Outdated, overloaded, or faulty protective devices pose a serious risk of fire and electric shock. Our certified electricians offer complete switchboard maintenance, modernisation, and full replacement in Tallinn and across Harjumaa, in full compliance with Estonian electrical safety standards.

When does your switchboard need maintenance or replacement?

An old fuse-based system – older switchboards with porcelain or rewirable fuse carriers do not meet modern safety requirements and provide inadequate protection against short circuits and overloads. Replacing them with a modern circuit breaker panel is an investment in safety and convenience.

Repeatedly tripping circuit breakers indicate that the panel is overloaded, that a breaker has worn out, or that a hidden fault exists in the electrical network. Diagnosis and replacement are essential.

Missing residual current devices (RCD) – the absence of an RCD is a direct source of danger. An RCD trips within a fraction of a second and protects people from electric shock. Estonian building regulations require RCDs in wet areas and for external installations.

An old, undocumented panel – in many older buildings, electrical switchboards were installed without proper schematic drawings or documentation. This makes maintenance and fault-finding difficult and dangerous. We install all panels with full documentation and accurate schematics.

Our switchboard services include:

Full panel audit and diagnostics – using thermal imaging cameras we check for overheating connections, measure load distribution, and assess the condition of all protective devices. You receive a comprehensive report on the current state of your panel.

Circuit breaker and RCD replacement – we install devices from leading manufacturers (ABB, Schneider Electric, Hager, Legrand): miniature circuit breakers (MCB), residual current devices (RCD/RCCB), and combined protective devices (RCBO).

Load balancing – uneven load distribution across phases causes overloading and energy waste. Our specialists redistribute loads evenly across all phases.

Surge protection installation – protects valuable equipment (televisions, computers, appliances) from lightning strikes and voltage spikes.

Full switchboard replacement – we replace old panels with modern, expandable, and fully documented distribution boards. All work is certified and documented in accordance with Estonian legislation.

Maintenance contracts – regular switchboard servicing (1–2 times per year) extends equipment life, maintains safety, and prevents costly breakdowns. We offer maintenance contracts for businesses and apartment associations.

All work complies with EVS standards. Warranty provided, free quotes available.`;

const S4_RU = `Техническое обслуживание и замена электрощитка – Таллин и Харьюмаа

Электрический распределительный щиток — важнейший компонент электрической системы любого здания. Устаревшие, перегруженные или неисправные защитные устройства представляют серьёзную угрозу пожара и поражения электрическим током. Наши сертифицированные электрики предлагают полный комплекс услуг по обслуживанию, модернизации и замене щитков в Таллине и по всему уезду Харьюмаа в соответствии с эстонскими стандартами электробезопасности.

Когда щиток нуждается в обслуживании или замене?

Старая предохранительная система – устаревшие щитки с пробковыми или керамическими предохранителями не отвечают современным требованиям безопасности и не обеспечивают надлежащей защиты от коротких замыканий и перегрузок. Замена на современную систему с автоматическими выключателями — это инвестиция в безопасность и комфорт.

Регулярное срабатывание автоматических выключателей свидетельствует о перегрузке щитка, износе автомата или наличии скрытой неисправности в электросети. Диагностика и замена необходимы.

Отсутствие устройств защитного отключения (УЗО/RCD) – отсутствие УЗО является прямым источником опасности. УЗО отключается в доли секунды и защищает людей от поражения электрическим током. Строительные нормы Эстонии требуют установки УЗО в помещениях с повышенной влажностью и для наружных электроустановок.

Старый, недокументированный щиток – во многих старых зданиях электрические щитки были установлены без надлежащих схем и документации. Это затрудняет и делает опасным техническое обслуживание и поиск неисправностей. Мы устанавливаем все щитки с полной документацией и точными схемами.

Наши услуги по щиткам включают:

Полный аудит и диагностика щитка – с помощью тепловизоров проверяем перегревающиеся соединения, измеряем распределение нагрузок и оцениваем состояние всех защитных устройств. Вы получаете подробный отчёт о текущем состоянии щитка.

Замена автоматических выключателей и УЗО – устанавливаем устройства ведущих производителей (ABB, Schneider Electric, Hager, Legrand): автоматические выключатели (MCB), устройства защитного отключения (УЗО/RCD/RCCB) и комбинированные защитные устройства (RCBO).

Балансировка нагрузки – неравномерное распределение нагрузки по фазам вызывает перегрузку и потери электроэнергии. Наши специалисты перераспределяют нагрузки равномерно по всем фазам.

Монтаж защиты от перенапряжений – защищает ценное оборудование (телевизоры, компьютеры, бытовые приборы) от ударов молнии и скачков напряжения.

Полная замена щитка – заменяем старые щитки современными, расширяемыми и полностью документированными распределительными щитами. Все работы сертифицируются и документируются согласно законодательству Эстонии.

Договоры на обслуживание – регулярное обслуживание щитка (1–2 раза в год) продлевает срок службы оборудования, обеспечивает безопасность и предотвращает дорогостоящие аварии. Предлагаем договоры на обслуживание для предприятий и товариществ собственников квартир.

Все работы соответствуют стандартам EVS. Предоставляется гарантия, бесплатный расчёт стоимости.`;

// ── services array ────────────────────────────────────────────────────────────

const services = [
  {
    slug: "24h-emergency-electrical",
    kw1:  "electrician emergency repair electrical fault",
    kw2:  "electrical wiring repair professional",
    alt1: ls(
      "Avariielektrik töötab elektrikilbi kallal öösel",
      "Emergency electrician working on electrical panel at night",
      "Аварийный электрик работает с электрощитком ночью"
    ),
    alt2: ls(
      "Professionaalne elektrik parandab juhtmestikku",
      "Professional electrician repairing electrical wiring",
      "Профессиональный электрик ремонтирует электропроводку"
    ),
    short: lt(
      "Meie avariielektrik jõuab kohale 30–60 minutiga ööpäevaringselt üle kogu Tallinna ja Harjumaa – lühisest voolukatkes kuni sädelevate pistikupesadeni.",
      "Our 24/7 emergency electrician reaches you within 30–60 minutes anywhere in Tallinn and Harjumaa – from short circuits and power outages to sparking outlets.",
      "Наш аварийный электрик 24/7 прибудет к вам в течение 30–60 минут по всему Таллину и Харьюмаа — от короткого замыкания и отключения электричества до искрящих розеток."
    ),
    metaTitle: ls(
      "Avariielektrik 24/7 Tallinn – kiire abi elektririkke korral",
      "Emergency Electrician 24/7 Tallinn – Fast Response",
      "Аварийный электрик 24/7 Таллин – быстрый выезд"
    ),
    metaDesc: ls(
      "Avariielektrik Tallinnas ja Harjumaal ööpäevaringselt. Reageerime 30–60 minutiga lühise, voolukatkes või ohtlike elektrivigade korral. Sertifitseeritud, garantiiga.",
      "Emergency electrician in Tallinn and Harjumaa available 24/7. We respond in 30–60 min for short circuits, power outages and dangerous faults. Licensed, certified, warranty.",
      "Аварийный электрик в Таллине и Харьюмаа 24/7. Выезд за 30–60 минут при КЗ, отключении электричества и опасных неисправностях. Лицензия, сертификат, гарантия."
    ),
    body: lb(S1_ET, S1_EN, S1_RU),
  },
  {
    slug: "electrical-installation",
    kw1:  "electrical wiring installation new building",
    kw2:  "electrician installing circuits panel",
    alt1: ls(
      "Elektrik paigaldab uue hoone juhtmestikku",
      "Electrician installing wiring in a new building",
      "Электрик монтирует проводку в новом здании"
    ),
    alt2: ls(
      "Sertifitseeritud elektrik seadistab elektrikilpi",
      "Certified electrician configuring distribution board",
      "Сертифицированный электрик настраивает распределительный щит"
    ),
    short: lt(
      "Täismahus elektripaigaldus uus- ja rekonstrueeritavatele hoonetele – juhtmestikust kilbini, maandusest pistikupesadeni, kõik EVS standarditele vastavalt.",
      "Full-scope electrical installation for new builds and renovations – from wiring and distribution boards to earthing and sockets, all to EVS standards.",
      "Полный электромонтаж для новостроек и реконструкции — от проводки и щитка до заземления и розеток, всё по стандартам EVS."
    ),
    metaTitle: ls(
      "Elektripaigaldus Tallinn – uusehitised ja renoveerimine",
      "Electrical Installation Tallinn – New Builds & Renovations",
      "Электромонтаж Таллин – новостройки и реконструкция"
    ),
    metaDesc: ls(
      "Sertifitseeritud elektripaigaldus Tallinnas ja Harjumaal. Juhtmestik, kilp, pistikupesad, maandus – kõik vastavalt EVS standarditele. Garantii ja dokumentatsioon.",
      "Certified electrical installation in Tallinn and Harjumaa. Wiring, distribution boards, sockets, earthing – all to EVS standards. Warranty and full documentation.",
      "Сертифицированный электромонтаж в Таллине и Харьюмаа. Проводка, щиток, розетки, заземление — всё по стандартам EVS. Гарантия и документация."
    ),
    body: lb(S2_ET, S2_EN, S2_RU),
  },
  {
    slug: "lighting-installation",
    kw1:  "interior lighting installation LED ceiling",
    kw2:  "lighting design installation modern home",
    alt1: ls(
      "Kaasaegne LED valgustus paigaldatakse laes",
      "Modern LED ceiling lighting being installed",
      "Монтаж современного светодиодного потолочного освещения"
    ),
    alt2: ls(
      "Disainvalgustus kaasaegses kodus",
      "Designer lighting installation in a modern home",
      "Установка дизайнерского освещения в современном доме"
    ),
    short: lt(
      "Paigaldame kõiki valgustusliike – LED süvistatavad, liik-, ripp-, riba- ja välisvalgustid ning nutikat valgustust – Tallinnas ja Harjumaal.",
      "We install all types of lighting – LED recessed, track, pendant, strip and outdoor fittings, plus smart lighting systems – in Tallinn and Harjumaa.",
      "Устанавливаем все виды освещения — встраиваемые LED, трековые, подвесные, ленточные и наружные светильники, а также системы умного освещения в Таллине и Харьюмаа."
    ),
    metaTitle: ls(
      "Valgustuse paigaldus Tallinn – LED ja nutikas valgustus",
      "Lighting Installation Tallinn – LED & Smart Lighting",
      "Установка освещения Таллин – LED и умное освещение"
    ),
    metaDesc: ls(
      "Professionaalne valgustuse paigaldus Tallinnas. LED süvistatavad, liik-, ripp- ja ribavalgustid, nutikas juhtimine. Philips, OSRAM, Ideal Lux. Garantii.",
      "Professional lighting installation in Tallinn. LED recessed, track, pendant and strip lights, smart controls. Philips, OSRAM, Ideal Lux. Warranty included.",
      "Профессиональная установка освещения в Таллине. Встраиваемые, трековые, подвесные, ленточные LED, умное управление. Philips, OSRAM, Ideal Lux. Гарантия."
    ),
    body: lb(S3_ET, S3_EN, S3_RU),
  },
  {
    slug: "switchboard-maintenance",
    kw1:  "electrical switchboard panel fuse box",
    kw2:  "circuit breaker distribution board maintenance",
    alt1: ls(
      "Elektrik kontrollib elektrikilpi diagnostikaga",
      "Electrician inspecting electrical switchboard with diagnostics",
      "Электрик проверяет электрощиток с помощью диагностики"
    ),
    alt2: ls(
      "Kaasaegne elektrikilp kaitselülitite ja RCD-ga",
      "Modern distribution board with MCBs and RCD devices",
      "Современный распределительный щит с автоматами и УЗО"
    ),
    short: lt(
      "Elektrikilpide hooldus, diagnostika ja täielik vahetus – vanad korgikaitsmesüsteemid asendame kaasaegsete RCD ja MCB kilpidega, kõik EVS standarditele vastavalt.",
      "Switchboard maintenance, diagnostics and full replacement – we upgrade old fuse-box systems to modern RCD and MCB panels, all in compliance with EVS standards.",
      "Техническое обслуживание, диагностика и полная замена щитков — заменяем старые предохранительные системы современными панелями с УЗО и автоматами по стандартам EVS."
    ),
    metaTitle: ls(
      "Elektrikilbi hooldus ja vahetus Tallinnas",
      "Switchboard Maintenance & Upgrade Tallinn Estonia",
      "Обслуживание и замена щитка Таллин Эстония"
    ),
    metaDesc: ls(
      "Elektrikilpide hooldus, diagnostika ja vahetus Tallinnas. RCD, MCB, ülepingekaitse, koormuste tasakaalustamine. Sertifitseeritud, EVS standardid, garantii.",
      "Switchboard maintenance, diagnostics and full upgrade in Tallinn. RCD, MCB, surge protection, load balancing. Certified, EVS standards compliant, warranty.",
      "Обслуживание, диагностика и замена щитков в Таллине. УЗО, автоматы, защита от перенапряжений, балансировка нагрузки. Сертификат, стандарты EVS, гарантия."
    ),
    body: lb(S4_ET, S4_EN, S4_RU),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  for (const svc of services) {
    try {
      console.log(`\nProcessing: ${svc.slug}`);
      console.log("  Uploading hero image...");
      const hero = await uploadImg(svc.kw1, `${svc.slug}-hero.jpg`);
      console.log("  Uploading gallery image...");
      const gal  = await uploadImg(svc.kw2, `${svc.slug}-g1.jpg`);
      await patch(svc.slug, {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: hero._id },
          alt: svc.alt1,
        },
        gallery: [{
          _type: "image",
          _key:  "g1",
          asset: { _type: "reference", _ref: gal._id },
          alt: svc.alt2,
        }],
        shortDescription: svc.short,
        body:             svc.body,
        metaTitle:        svc.metaTitle,
        metaDescription:  svc.metaDesc,
      });
    } catch (e) {
      console.error("FAIL:", svc.slug, e.message);
    }
  }
  console.log("\nDone");
}

main();
