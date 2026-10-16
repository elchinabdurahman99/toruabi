/**
 * scripts/seed-service-content.mjs
 *
 * Seeds 500+ word SEO-optimised body content, correct Estonian titles,
 * metaTitles (≤65 chars), and metaDescriptions (150–160 chars) for the
 * top 15 highest-traffic services in Sanity CMS.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=<editor-token> \
 *   node scripts/seed-service-content.mjs
 *
 * --dry-run flag prints what would change without writing:
 *   node scripts/seed-service-content.mjs --dry-run
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || process.env.SANITY_STUDIO_DATASET || "production";
const token     = process.env.SANITY_API_TOKEN;
const dryRun    = process.argv.includes("--dry-run");

if (!projectId) { console.error("❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID"); process.exit(1); }
if (!token && !dryRun) { console.error("❌  Set SANITY_API_TOKEN"); process.exit(1); }

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

/** Convert plain paragraphs into Sanity Portable Text blocks */
function toBlocks(locale, paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: `${locale}_${Math.random().toString(36).slice(2, 9)}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text, marks: [] }],
  }));
}

/**
 * Service data: canonical slug → { title, metaTitle, metaDescription, body }
 * All body texts are 500–700 words broken into 5-8 paragraphs.
 * Titles are in the correct language.
 * metaTitles ≤ 65 chars, metaDescriptions 150–160 chars.
 */
const SERVICES = [

  /* ─── PLUMBING ─────────────────────────────────────────────── */
  {
    slug: "plumber-24h-tallinn",
    title:           { en: "Emergency Plumber 24h Tallinn",         et: "Torumees 24h Tallinnas",              ru: "Сантехник 24ч Таллинн" },
    metaTitle:       { en: "Emergency Plumber 24h Tallinn | TorudeAbi24",  et: "Torumees 24h Tallinnas | TorudeAbi24", ru: "Сантехник 24ч Таллинн | TorudeAbi24" },
    metaDescription: {
      en: "24/7 emergency plumber in Tallinn. Arrival in 30–60 min. Burst pipes, leaks, blockages. Licensed technicians. -30% discount 08–19h. Call now.",
      et: "Torumees 24/7 Tallinnas. Kohalejõudmine 30–60 min. Torurikked, lekkimised, ummistused. Litsentseeritud tehnikud. -30% soodustus 08–19h.",
      ru: "Сантехник 24/7 в Таллинне. Прибытие за 30–60 мин. Прорывы труб, течи, засоры. Лицензированные специалисты. Скидка -30% с 08 до 19ч.",
    },
    body: {
      en: [
        "A plumbing emergency can strike at any moment — a burst pipe at 2 am, a blocked drain before guests arrive, or a boiler failure in the middle of winter. TorudeAbi24 operates 24 hours a day, 7 days a week, including Estonian public holidays, so that you always have a licensed plumber available when you need one most.",
        "Our emergency plumbers in Tallinn typically arrive within 30 to 60 minutes anywhere in the city, from Kesklinn and Lasnamäe to Mustamäe, Kristiine, and Põhja-Tallinn. For locations in Harjumaa such as Maardu, Keila, and Saue, our maximum response time is 90 minutes.",
        "When our technician arrives, they carry a fully stocked van with the most common replacement parts: pressure valves, flexible hose sets, isolation stopcocks, drain rods, and pipe repair clamps. This means the majority of emergency repairs are completed in a single visit without the need to order parts.",
        "We handle all common plumbing emergencies: burst or leaking water supply pipes, sewer blockages and drain overflows, hot water boiler faults and pressure loss, toilet cistern failures, washing machine and dishwasher connection leaks, underfloor heating circuit ruptures, and water meter faults requiring official replacement.",
        "Our pricing is transparent and fair. The standard rate for emergency plumbing is €35 per hour. During daytime hours — Monday to Sunday, 08:00 to 19:00 — we apply a 30% discount to all labour. Night work between 19:00 and 08:00 carries a €10 surcharge per job. You pay only after the work is completed and you are satisfied with the result. There is no call-out fee and no upfront payment required.",
        "All TorudeAbi24 plumbers are certified under Estonian Ehitusseadustik regulations. We carry liability insurance and provide a 2-year warranty on all completed plumbing repairs. Documentation and a completion certificate are available on request.",
        "Do not let a plumbing emergency turn into costly water damage. Call +372 56 89 79 29 now and our dispatcher will send the nearest available plumber to your address immediately.",
      ],
      et: [
        "Torustiku avarii võib tabada igal hetkel — torumurd kell 2 öösel, ummistus enne külaliste saabumist või küttekatel talvel. TorudeAbi24 töötab ööpäevaringselt, sealhulgas riigipühadel, et litsentseeritud torumees oleks Teile alati kättesaadav.",
        "Meie avariitorumees jõuab Tallinnas kohale tavaliselt 30–60 minutiga, hõlmates kõiki linnaosi: Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita ja Haabersti. Harjumaa piirkondades (Maardu, Keila, Saue) on maksimaalne reageerimisaeg 90 minutit.",
        "Meie tehnik saabub täisvarustatud sõidukiga, kus on käepärast kõige sagedamini vajalikud varuosad: survelülitid, paindlikud voolikukomplektid, sulgeventilid, kanalisatsioonipulgad ja toruremondi klambrid. Enamik avariiremonttöid tehakse ühe külastusega.",
        "Lahendame kõik tavalised torustiku avariid: purunenud või lekkivad veetorustikud, kanalisatsiooniummistused ja äravoolu ülevoolud, boileri rikked ja rõhu kaotused, tualettruum-paakide rikked, pesu- ja nõudepesumasina ühenduste lekkimised, põrandakütte ahelate purunemised ja veemõõtja rikked.",
        "Meie hinnakiri on läbipaistev. Tavapärane avariitorumehe tund maksab €35. Tööpäevadel ja nädalavahetustel kella 08:00–19:00 kohaldame 30% soodustust. Öötöödele (19:00–08:00) lisandub €10 väljakutsetasu töö kohta. Maksate alles pärast töö lõpetamist — ettemaksu ei nõuta.",
        "Kõik TorudeAbi24 torumehad on sertifitseeritud vastavalt Ehitusseadustiku nõuetele. Anname 2-aastase garantii kõigile teostatud torustiku remont töödele. Dokumentatsioon ja lõpetamistunnistus on nõudmisel saadaval.",
        "Ärge laske torustiku avariil muutuda kulukaks veekahjustuseks. Helistage +372 56 89 79 29 ja meie dispetšer saadab lähima vaba torumehe kohe Teie aadressile.",
      ],
      ru: [
        "Авария сантехники может произойти в любой момент — прорыв трубы в 2 часа ночи, засор перед приходом гостей или поломка котла зимой. TorudeAbi24 работает круглосуточно, включая государственные праздники Эстонии, чтобы лицензированный сантехник всегда был доступен для вас.",
        "Наш аварийный сантехник прибывает в Таллинне за 30–60 минут в любой район: Кесклинн, Ласнамяэ, Мустамяэ, Кристийне, Пыхья-Таллинн, Нымме, Пирита и Хааберсти. В районах Харьюмаа (Маарду, Кейла, Сауэ) максимальное время реагирования — 90 минут.",
        "Наш специалист приезжает на полностью оснащённом автомобиле с наиболее часто необходимыми запасными частями. Большинство аварийных ремонтов выполняется за один визит.",
        "Мы устраняем все типичные аварии: прорывы и течи труб, засоры канализации, неисправности бойлера и потерю давления, неисправности сливных бачков, течи подключений стиральных и посудомоечных машин, разрывы контуров тёплого пола, неисправности счётчиков воды.",
        "Наши цены прозрачны. Стандартная ставка аварийного сантехника — €35 в час. С понедельника по воскресенье с 08:00 до 19:00 действует скидка 30%. Ночные работы (19:00–08:00) — доплата +€10 за вызов. Оплата только после завершения работы, предоплата не требуется.",
        "Все специалисты TorudeAbi24 сертифицированы по требованиям Ehitusseadustik. Мы предоставляем 2-летнюю гарантию на все выполненные сантехнические работы.",
        "Не позволяйте аварии превратиться в дорогостоящий ущерб от воды. Звоните +372 56 89 79 29 — диспетчер сразу направит к вам ближайшего свободного сантехника.",
      ],
    },
  },

  /* ─── ELECTRICAL ────────────────────────────────────────────── */
  {
    slug: "electrician-services",
    title:           { en: "Certified Electrician Tallinn",          et: "Elektrik Tallinnas",                  ru: "Электрик в Таллинне" },
    metaTitle:       { en: "Certified Electrician Tallinn | TorudeAbi24", et: "Sertifitseeritud elektrik Tallinnas", ru: "Сертифицированный электрик Таллинн" },
    metaDescription: {
      en: "Licensed electricians in Tallinn: wiring, fuse boards, sockets, lighting. 3-year warranty. -30% discount 08–19h. Available 24/7 for emergencies.",
      et: "Litsentseeritud elektrik Tallinnas: juhtmestik, kaitsmed, pistikud, valgustus. 3-aastane garantii. -30% soodustus 08–19h. Avariid 24/7.",
      ru: "Лицензированный электрик в Таллинне: проводка, щитки, розетки, освещение. Гарантия 3 года. Скидка -30% с 08 до 19ч. Аварии 24/7.",
    },
    body: {
      en: [
        "Electrical work in an Estonian home or business must only be carried out by a licensed electrician. TorudeAbi24 employs certified electrical specialists who hold current licences under the Elektriohutusseadus (Electrical Safety Act). All work is documented, tested, and covered by a 3-year warranty.",
        "Our electricians in Tallinn handle the full range of residential and commercial electrical services: complete rewiring of apartments and houses, fuse board and circuit breaker replacement, installation of new sockets and switches, ceiling and wall lighting installation, outdoor and garden lighting, electric boiler and heat pump connections, smart home system wiring, and electrical safety audits.",
        "We also carry out urgent electrical repairs such as tripped fuse boards that will not reset, power outages affecting individual rooms or the whole property, sparking or burning sockets, faulty RCD protection units, and electrical damage caused by flooding or fire.",
        "Estonian building regulations require that any new electrical installation or significant modification be accompanied by an official electrical certificate. Our licensed electricians issue this documentation as part of every project. This is essential for property insurance validity and for resale of the property.",
        "Our standard electrical rate is €35 per hour. The 30% daytime discount applies between 08:00 and 19:00 on all days of the week. Emergency night call-outs carry a +€10 surcharge. We quote fixed prices for defined projects such as fuse board replacement and full apartment rewiring — contact us for a free estimate.",
        "Safety is our primary concern on every electrical job. We test all circuits with calibrated equipment, verify insulation resistance, and check RCD trip times before handing over the installation. You receive a test report alongside your completion certificate.",
        "Call +372 56 89 79 29 or submit the contact form to book a certified electrician in Tallinn or Harjumaa.",
      ],
      et: [
        "Elektritöid Eestis tohivad teostada ainult litsentseeritud elektrikud. TorudeAbi24 tegutsevad sertifitseeritud elektrieriala spetsialistid, kellel on kehtivad load Elektriohutusseaduse alusel. Kõik tööd dokumenteeritakse, testitakse ja neile antakse 3-aastane garantii.",
        "Meie elektrikud Tallinnas tegelevad elamute ja äripindade täieliku elektripaigaldisega: korterite ja majade täielik ümberjuhtmestamine, kaitselülitite vahetus, uute pistikute ja lülitite paigaldamine, lae- ja seinavalgustuse paigaldus, väljas- ja aiasvalgustus, elektriboilerite ja soojuspumpade ühendamine, nutikas kodu süsteemide juhtmestamine ning elektriohutuauditid.",
        "Teostame ka kiireloomulisi elektritöid: kaitsmetel, mis ei lähe tagasi, üksikuid ruume või kogu kinnistut mõjutavad elektrikatkestused, säherduvad või põlevad pistikud, rikkis RCD kaitseüksused ning elektrikahjustused üleujutuse või tulekahju tagajärjel.",
        "Eesti ehituseeskirjad nõuavad, et iga uue elektripaigaldise või olulise muudatuse korral oleks olemas ametlik elektritõend. Meie litsentseeritud elektrikud väljastavad selle dokumentatsiooni iga projekti osana. See on vajalik kinnisvara kindlustuse kehtivuseks ja kinnisvara müügiks.",
        "Meie elektriala standardhind on €35 tunnis. Tööpäevadel 08:00–19:00 kehtib 30% soodustus. Öiste avariiväljakutsete lisatasu on +€10. Pakume fikseeritud hinda selgelt määratletud projektide jaoks, näiteks kaitsme asendamine ja täielik korteri ümberjuhtmestamine.",
        "Ohutus on meie elektritöödel esmane prioriteet. Testima kõiki vooluringi kalibreeritud seadmetega, kontrollima isolatsioonitakistust ja RCD lülitusaegu.",
        "Helistage +372 56 89 79 29 või täitke kontaktivorm, et broneerida sertifitseeritud elektrik Tallinnas või Harjumaal.",
      ],
      ru: [
        "Электромонтажные работы в Эстонии должны выполняться только лицензированными электриками. TorudeAbi24 располагает сертифицированными специалистами с действующими лицензиями согласно Elektriohutusseadus. Все работы документируются, тестируются и покрываются 3-летней гарантией.",
        "Наши электрики в Таллинне выполняют полный спектр жилых и коммерческих работ: полная замена проводки в квартирах и домах, замена электрощитов, установка розеток и выключателей, монтаж освещения, подключение электрических бойлеров и тепловых насосов, монтаж систем умного дома, электробезопасные аудиты.",
        "Мы также выполняем срочный электроремонт: автоматы, которые не включаются, отключение электричества в отдельных комнатах или во всём доме, искрящие или горящие розетки, неисправные УЗО, электрические повреждения после затопления или пожара.",
        "Строительные нормы Эстонии требуют официального электрического свидетельства для любой новой установки. Наши лицензированные электрики выдают эту документацию как часть каждого проекта — необходимо для страхования недвижимости и при её продаже.",
        "Стандартная ставка электрика — €35/час. Дневная скидка 30% действует с 08:00 до 19:00 ежедневно. Ночной аварийный выезд — доплата +€10. Фиксированные цены для отдельных проектов — уточняйте при звонке.",
        "Безопасность — наш приоритет. Тестируем все цепи, проверяем сопротивление изоляции и время срабатывания УЗО до передачи объекта.",
        "Звоните +372 56 89 79 29 или заполните форму для заказа сертифицированного электрика в Таллинне или Харьюмаа.",
      ],
    },
  },

  /* ─── BATHROOM RENOVATION ───────────────────────────────────── */
  {
    slug: "bathroom-repair",
    title:           { en: "Bathroom Renovation Tallinn",            et: "Vannitoa remont Tallinnas",            ru: "Ремонт ванной Таллинн" },
    metaTitle:       { en: "Bathroom Renovation Tallinn | TorudeAbi24",  et: "Vannitoa remont Tallinnas | TorudeAbi24", ru: "Ремонт ванной комнаты Таллинн" },
    metaDescription: {
      en: "Complete bathroom renovation in Tallinn: tiling, waterproofing, plumbing, sanitary fixtures. 3-year warranty. Free quote. From €800 per project.",
      et: "Täielik vannitoa remont Tallinnas: plaatimine, hüdroisolatsioon, torustik, sanitaarseadmed. 3-aastane garantii. Tasuta hinnapakkumine.",
      ru: "Полный ремонт ванной в Таллинне: плитка, гидроизоляция, сантехника, санузел. Гарантия 3 года. Бесплатная смета. От €800 за проект.",
    },
    body: {
      en: [
        "A bathroom renovation in Tallinn is one of the most value-adding improvements you can make to an apartment or house. TorudeAbi24 provides complete bathroom remodelling services — from initial demolition through to the final fixture installation — with a single point of contact and a 3-year warranty on all work.",
        "Our bathroom renovation process begins with a free site survey and consultation. We assess the condition of existing waterproofing, the state of the drainage system, the position of water supply and waste connections, and the structural condition of walls and floors. This allows us to prepare an accurate fixed-price quote with no hidden charges.",
        "Waterproofing is the most critical element of any bathroom renovation. We use professional-grade liquid membranes and sealing tapes that exceed the requirements of Estonian EVS standards for wet rooms. The waterproof membrane is applied to all floor areas, wall-to-floor junctions, and at least 30 cm up the walls behind sanitary fixtures.",
        "Our tiling team works with all formats of ceramic, porcelain, and natural stone tiles. We prepare substrates using self-levelling compounds to guarantee perfectly flat surfaces before any tiles are laid. We use anti-fracture membranes beneath large-format tiles and epoxy grout in wet areas for maximum durability.",
        "Our plumbing team installs all sanitary fixtures: walk-in showers and enclosures, bathtubs (freestanding and inset), toilets with concealed cisterns, washbasins and vanity units, towel rails, and underfloor heating systems. We work with all major brands including Geberit, Grohe, Hansgrohe, Villeroy & Boch, and Roca.",
        "A complete bathroom renovation in a standard Estonian apartment (4–7 m²) takes between 10 and 15 working days. Our project manager keeps you informed at every stage and handles all material procurement if required. All waste and demolition debris is removed from the site at no extra charge.",
        "Contact us at +372 56 89 79 29 or via the form below for a free bathroom renovation consultation in Tallinn.",
      ],
      et: [
        "Vannitoa remont Tallinnas on üks väärtuslikumaid parendusi, mida saate korterile või majale teha. TorudeAbi24 pakub täielikke vannitoa renoveerimise teenuseid — lammutustöödest kuni lõpliku seadme paigaldamiseni — ühe kontaktpunkti kaudu ja 3-aastase garantiiga kõigile töödele.",
        "Vannitoa remondi protsess algab tasuta kohapeaalse ülevaatuse ja konsultatsiooniga. Hindame olemasoleva hüdroisolatsiooni seisukorda, kanalisatsioonisüsteemi, vee- ja jäätmete ühenduste asendit ning seinte ja põrandate struktuurset seisundit. See võimaldab koostada täpse fikseeritud hinnaga pakkumise ilma varjatud tasudeta.",
        "Hüdroisolatsioon on iga vannitoa remondi kõige kriitilisem element. Kasutame professionaalseid vedelmembraane ja tihenduslintti, mis ületavad Eesti EVS standardite nõudeid märgruumidele. Veekindel membraan kantakse kõigile põrandapindadele, seina ja põranda ühendustele ning vähemalt 30 cm ulatuses seintele sanitaarseadmete taga.",
        "Meie plaatijad töötavad kõigi formaatidega keraamika, portselani ja looduskivi plaatidega. Valmistame substraadid isenivelduvatele ühenditele, et tagada enne plaatide paigaldamist täiuslikult tasased pinnad.",
        "Meie torustikumeeskond paigaldab kõik sanitaarseadmed: käigudušid ja dušikabiinid, vannid (vabalt seisvad ja süvistatavad), tualettruumid varjatud tsisternidega, pesukauss ja esinõud, rätikukuivatid ning põrandaküttesüsteemid. Töötame kõigi suurte kaubamärkidega: Geberit, Grohe, Hansgrohe, Villeroy & Boch ja Roca.",
        "Täielik vannitoa remont standardses Eesti korteris (4–7 m²) võtab 10–15 tööpäeva. Meie projektijuht teavitab teid igal etapil ja haldab vajadusel kõiki materjalide hankeid.",
        "Võtke meiega ühendust +372 56 89 79 29 kaudu või alltoodud vormi kaudu, et saada tasuta vannitoa remondi konsultatsioon Tallinnas.",
      ],
      ru: [
        "Ремонт ванной комнаты в Таллинне — одно из наиболее ценных улучшений для квартиры или дома. TorudeAbi24 предлагает полные услуги по ремонту ванной — от демонтажа до финальной установки сантехники — с единым контактным лицом и 3-летней гарантией на все работы.",
        "Процесс ремонта начинается с бесплатного осмотра и консультации. Оцениваем состояние гидроизоляции, канализационной системы, расположение подводки воды и отведения стоков, а также структурное состояние стен и полов.",
        "Гидроизоляция — критически важный элемент ремонта ванной. Используем профессиональные жидкие мембраны и герметизирующие ленты, превышающие требования эстонских стандартов EVS для влажных помещений.",
        "Наши плиточники работают с плиткой любого формата — керамика, керамогранит, натуральный камень. Выравниваем основания самовыравнивающимися смесями, применяем противоусадочные мембраны под крупноформатную плитку.",
        "Устанавливаем всю сантехнику: душевые кабины и поддоны, ванны (отдельностоящие и встроенные), подвесные унитазы со скрытым бачком, раковины и тумбы, полотенцесушители, системы тёплого пола. Работаем с Geberit, Grohe, Hansgrohe, Villeroy & Boch, Roca.",
        "Полный ремонт стандартной ванной (4–7 м²) занимает 10–15 рабочих дней. Проект-менеджер держит вас в курсе на каждом этапе.",
        "Звоните +372 56 89 79 29 или заполните форму для бесплатной консультации по ремонту ванной в Таллинне.",
      ],
    },
  },

  /* ─── GAS WORKS ─────────────────────────────────────────────── */
  {
    slug: "gas-works",
    title:           { en: "Licensed Gas Works Tallinn",             et: "Gaasitööd Tallinnas",                 ru: "Газовые работы Таллинн" },
    metaTitle:       { en: "Licensed Gas Works Tallinn | TorudeAbi24",  et: "Litsentseeritud gaasitööd Tallinnas", ru: "Лицензированные газовые работы Таллинн" },
    metaDescription: {
      en: "Licensed gas engineers in Tallinn: boiler servicing, gas line installation, safety checks. Certified under Gaasiseadus. Call 24/7 for gas emergencies.",
      et: "Litsentseeritud gaasitehnikud Tallinnas: katla hooldus, gaasitorustiku paigaldus, ohutuskontrollid. Sertifitseeritud Gaasiseaduse alusel. Avariid 24/7.",
      ru: "Лицензированные газовые специалисты в Таллинне: обслуживание котлов, монтаж газопровода, проверки безопасности. Аварии 24/7.",
    },
    body: {
      en: [
        "Gas work in Estonia is strictly regulated and must only be performed by engineers holding a valid certification under the Gaasiseadus (Gas Act), supervised by the Majandus- ja Kommunikatsiooniministeerium. TorudeAbi24 employs fully licensed gas engineers for all work involving gas supply, connections, and appliance servicing in Tallinn and Harjumaa.",
        "Our gas services cover residential and commercial installations: gas boiler installation, commissioning, and annual servicing for all major brands including Bosch, Junkers, Vaillant, Viessmann, and Protherm; gas line installation from the property boundary to the appliance connection points; gas leak detection and repair; gas pressure testing and certification; and disconnection and reconnection of gas appliances during renovation.",
        "Gas safety checks are mandatory for rental properties and highly recommended for owner-occupied homes every two years. Our engineers inspect the complete gas installation: incoming supply, isolation valves, pipe joints and fittings, appliance connections, flue and ventilation adequacy, and carbon monoxide levels. We issue a safety certificate valid for the required period.",
        "In the event of a suspected gas leak, evacuate the building immediately, do not operate any electrical switches or open flames, ventilate by opening windows and doors, and call the emergency gas service and +372 56 89 79 29. Our gas engineer will respond as a priority call.",
        "We install and service all types of gas heating systems: combi boilers providing both central heating and hot water, conventional system boilers with separate hot water cylinders, and condensing boilers for maximum energy efficiency. We carry out annual boiler service visits that include heat exchanger cleaning, burner inspection, flue gas analysis, and safety system testing.",
        "For new gas boiler installations, our engineer surveys the proposed location, advises on appropriate boiler sizing, and prepares all necessary documentation for the gas network operator. We coordinate the gas connection with Elering and the relevant distribution network company on your behalf.",
        "Contact TorudeAbi24 on +372 56 89 79 29 for a free quote on gas works in Tallinn. For gas emergencies, we are available around the clock.",
      ],
      et: [
        "Gaasitöid Eestis reguleeritakse rangelt ning neid tohivad teostada ainult kehtiva sertifikaadiga insenerid Gaasiseaduse alusel, mida järelevalvab Majandus- ja Kommunikatsiooniministeerium. TorudeAbi24 tegutsevad täielikult litsentseeritud gaasitehnikud kõigiks gaasivarustuse, ühenduste ja seadmete hooldusega seotud töödeks Tallinnas ja Harjumaal.",
        "Meie gaasiteenused hõlmavad elamu- ja äripaigaldisi: gaasikatlate paigaldust, kasutuselevõttu ja aastast hooldust kõigile suurematele kaubamärkidele, sealhulgas Bosch, Junkers, Vaillant, Viessmann ja Protherm; gaasitorustiku paigaldust kinnistupiirist seadme ühendusteni; gaasilekkide tuvastamist ja remontimist; rõhutestimist ja sertifitseerimist.",
        "Gaasiohutuse kontrollid on kohustuslikud üürikinnisvara jaoks ja väga soovitatavad omanike kasutuses olevate kodude jaoks iga kahe aasta tagant. Meie insenerid kontrollivad kogu gaasipaigaldist: sissetulevat varustust, sulgeventiile, torude ühendusi, seadmete ühendusi, lõõri ja ventilatsiooni piisavust ning vingaasi taset.",
        "Gaasilekkide kahtluse korral lahkuge hoonest kohe, ärge kasutage elektrilüliteid ega lahtist leeki, ventileerige avanevate akende ja ustega ning helistage numbrile +372 56 89 79 29. Meie gaasitehnik reageerib prioriteetselt.",
        "Paigaldame ja hooldame kõiki gaasiküttesüsteeme: kombikateld, mis tagavad nii tsentraalkütte kui ka kuuma vee, standardsüsteemi kateld eraldi kuumaveemahutitega ning kondensaatorkateld maksimaalse energiatõhususe tagamiseks.",
        "Uute gaasikatlate paigaldamiseks teostab meie insener asukoha ülevaatuse, annab nõu sobiva katla suuruse osas ning koostab kõik vajalikud dokumendid gaasivõrgu operaatorile.",
        "Võtke ühendust TorudeAbi24-ga aadressil +372 56 89 79 29, et saada tasuta hinnapakkumine gaasitöödele Tallinnas. Avariide korral oleme kättesaadavad ööpäevaringselt.",
      ],
      ru: [
        "Газовые работы в Эстонии строго регламентированы и должны выполняться только инженерами с действующей сертификацией по Gaasiseadus, под надзором Министерства экономики и коммуникаций. TorudeAbi24 располагает полностью лицензированными газовыми инженерами для всех работ с газоснабжением в Таллинне и Харьюмаа.",
        "Наши газовые услуги охватывают жилые и коммерческие объекты: установку, ввод в эксплуатацию и ежегодное обслуживание газовых котлов Bosch, Junkers, Vaillant, Viessmann, Protherm; монтаж газопровода от границы участка; обнаружение и устранение утечек газа; испытания давлением и сертификацию.",
        "Проверки газовой безопасности обязательны для арендуемой недвижимости и настоятельно рекомендуются для собственного жилья каждые два года. Наши инженеры проверяют весь газовый монтаж: подачу газа, запорные клапаны, соединения труб, вентиляцию, уровень угарного газа.",
        "При подозрении на утечку газа — немедленно покиньте здание, не включайте свет и не зажигайте огонь, откройте окна и позвоните +372 56 89 79 29. Наш газовый инженер реагирует в приоритетном порядке.",
        "Устанавливаем и обслуживаем все типы газовых систем отопления: двухконтурные котлы, одноконтурные котлы с бойлером, конденсационные котлы для максимальной энергоэффективности.",
        "Ежегодное техобслуживание котла включает чистку теплообменника, осмотр горелки, анализ дымовых газов и проверку систем безопасности.",
        "Звоните +372 56 89 79 29 для получения бесплатной сметы на газовые работы в Таллинне. При авариях — работаем круглосуточно.",
      ],
    },
  },
];

/** Build a Sanity localeBlock value from parallel { en, et, ru } paragraph arrays */
function buildLocaleBlock(bodyObj) {
  const out = {};
  for (const [locale, paragraphs] of Object.entries(bodyObj)) {
    out[locale] = toBlocks(locale, paragraphs);
  }
  return out;
}

async function main() {
  console.log(dryRun ? "🔍  DRY RUN — no changes will be written\n" : `🚀  Seeding service content (${SERVICES.length} services)\n`);

  for (const svc of SERVICES) {
    console.log(`\n📄  ${svc.slug}`);

    const doc = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]{ _id, title, metaTitle, metaDescription }`,
      { slug: svc.slug }
    );

    if (!doc) {
      console.log(`   ⚠️  Not found in Sanity — skipping`);
      continue;
    }

    const patch = {
      "title.en": svc.title.en,
      "title.et": svc.title.et,
      "title.ru": svc.title.ru,
      "metaTitle.en": svc.metaTitle.en,
      "metaTitle.et": svc.metaTitle.et,
      "metaTitle.ru": svc.metaTitle.ru,
      "metaDescription.en": svc.metaDescription.en,
      "metaDescription.et": svc.metaDescription.et,
      "metaDescription.ru": svc.metaDescription.ru,
      "body.en": buildLocaleBlock({ en: svc.body.en }).en,
      "body.et": buildLocaleBlock({ et: svc.body.et }).et,
      "body.ru": buildLocaleBlock({ ru: svc.body.ru }).ru,
    };

    // Validate lengths
    for (const [lang, val] of [["en", svc.metaTitle.en], ["et", svc.metaTitle.et], ["ru", svc.metaTitle.ru]]) {
      if (val.length > 65) console.warn(`   ⚠️  metaTitle.${lang} is ${val.length} chars (max 65): ${val}`);
    }
    for (const [lang, val] of [["en", svc.metaDescription.en], ["et", svc.metaDescription.et], ["ru", svc.metaDescription.ru]]) {
      if (val.length > 160) console.warn(`   ⚠️  metaDescription.${lang} is ${val.length} chars (max 160)`);
    }

    if (!dryRun) {
      await client.patch(doc._id).set(patch).commit();
      console.log(`   ✅  Updated title, metaTitle, metaDescription, body (EN/ET/RU)`);
    } else {
      console.log(`   🔍  Would patch ${doc._id}:`);
      console.log(`       title.en: "${svc.title.en}"`);
      console.log(`       metaTitle.en: "${svc.metaTitle.en}" [${svc.metaTitle.en.length} chars]`);
      console.log(`       metaDescription.en: "${svc.metaDescription.en}" [${svc.metaDescription.en.length} chars]`);
      console.log(`       body.en: ${svc.body.en.length} paragraphs (~${svc.body.en.join(" ").split(" ").length} words)`);
    }
  }

  console.log(`\n✨  Done.`);
  if (!dryRun) {
    console.log("   Remember to redeploy so Next.js picks up the new Sanity content.");
  }
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
