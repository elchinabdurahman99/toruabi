/**
 * patch-faq-batch1.mjs — Services 1-20 (alphabetical, skip existing FAQs)
 * Run: node --env-file=.env.local scripts/patch-faq-batch1.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

const faq = (items) =>
  items.map((item, i) => ({
    _type: "object",
    _key: `faq${i + 1}`,
    question: { _type: "localeString", et: item.qet, en: item.qen, ru: item.qru },
    answer:   { _type: "localeText",   et: item.aet, en: item.aen, ru: item.aru },
  }));

const DATA = [
  {
    slug: "24h-emergency-electrical",
    faq: faq([
      {
        qet: "Kui kiiresti elektriku avariibrigaad Tallinnasse jõuab?",
        qen: "How fast does the 24h emergency electrician arrive in Tallinn?",
        qru: "Как быстро аварийный электрик приедет в Таллин?",
        aet: "Meie avariielektriku brigaad jõuab Tallinnasse ja Harjumaale 30–60 minuti jooksul. Helistage +372 56 89 79 29 ööpäevaringselt.",
        aen: "Our emergency electrician arrives in Tallinn and Harjumaa within 30–60 minutes. Call +372 56 89 79 29 any time, 24/7.",
        aru: "Наш аварийный электрик прибывает по Таллину и Харьюмаа в течение 30–60 минут. Звоните +372 56 89 79 29 круглосуточно.",
      },
      {
        qet: "Mis maksab avariielektriku väljakutse Tallinnas?",
        qen: "What does a 24h emergency electrician call-out cost in Tallinn?",
        qru: "Сколько стоит вызов аварийного электрика в Таллине?",
        aet: "Tund algab €35-st. Tööpäeviti 08:00–19:00 kehtib -30% soodustus. Öösel (19:00–08:00) lisandub €10 väljakutsetasu. Maksate pärast töö lõpetamist.",
        aen: "Work starts from €35/hour. A -30% discount applies on weekdays 08:00–19:00. Night work (19:00–08:00) has a €10 surcharge. You pay after job completion.",
        aru: "Работа от €35/час. Скидка -30% по будням 08:00–19:00. Ночные работы (19:00–08:00) +€10 за вызов. Оплата после завершения.",
      },
      {
        qet: "Kas avariielektriku töödele antakse garantii?",
        qen: "Is there a warranty on emergency electrical work?",
        qru: "Есть ли гарантия на аварийные электрические работы?",
        aet: "Jah, anname kõigile elektritöödele 2-aastase garantii. Kõik meie elektrikud on sertifitseeritud ja töötavad ametliku lepinguga.",
        aen: "Yes, we provide a 2-year warranty on all electrical work. All our electricians are certified and work under an official contract.",
        aru: "Да, мы даём 2-летнюю гарантию на все электрические работы. Все электрики сертифицированы и работают по официальному договору.",
      },
      {
        qet: "Millised avariitöid elektriku brigaad kõige sagedamini teeb?",
        qen: "What emergency electrical jobs do you handle most often?",
        qru: "Какие аварийные электрические работы вы выполняете чаще всего?",
        aet: "Kõige sagedamini tegeleme kaitsmelülitite väljalangemise, lühiste, pingerikete, kaablite läbipõlemise ja pistikupesade rikete parandamisega kogu Tallinnas.",
        aen: "Most commonly we handle tripped breakers, short circuits, power faults, burnt cables, and socket failures across Tallinn.",
        aru: "Чаще всего это выбитые автоматы, короткие замыкания, перебои питания, сгоревшие кабели и неисправные розетки по всему Таллину.",
      },
      {
        qet: "Kas avariielektriku teenus hõlmab ka Harjumaad?",
        qen: "Does the 24h emergency electrician service cover Harjumaa?",
        qru: "Распространяется ли аварийная электрослужба на Харьюмаа?",
        aet: "Jah, töötame kogu Tallinnas ja Harjumaal, sealhulgas Maardu, Keila, Saue ja ümbritsevad vallad. Lisatasu väljasõidu eest rakendatakse üle 20 km kaugusele.",
        aen: "Yes, we cover all of Tallinn and Harjumaa including Maardu, Keila, Saue, and surrounding areas. A travel fee applies for distances over 20 km.",
        aru: "Да, работаем по всему Таллину и Харьюмаа, включая Маарду, Кейла, Сауэ и прилегающие районы. Доплата за выезд свыше 20 км.",
      },
    ]),
  },
  {
    slug: "3d-visualization",
    faq: faq([
      {
        qet: "Kui kaua võtab 3D visualiseerimise projekt aega?",
        qen: "How long does a 3D visualization project take?",
        qru: "Сколько времени занимает проект 3D-визуализации?",
        aet: "Ühe ruumi 3D visualiseerimine valmib tavaliselt 3–7 tööpäeva jooksul. Suuremate projektide korral lepime tähtaja individuaalselt kokku.",
        aen: "A single-room 3D visualization is typically ready in 3–7 working days. For larger projects we agree on a timeline individually.",
        aru: "Визуализация одной комнаты обычно занимает 3–7 рабочих дней. Для крупных проектов сроки согласовываются индивидуально.",
      },
      {
        qet: "Mis failiformaadis 3D visualiseering esitatakse?",
        qen: "In what format is the 3D visualization delivered?",
        qru: "В каком формате предоставляется 3D-визуализация?",
        aet: "Esitame visualiseeringud kõrge resolutsiooniga JPEG/PNG formaadis ning vajadusel ka interaktiivse 3D-kõndimise või video animatsioonina.",
        aen: "We deliver visualizations in high-resolution JPEG/PNG and, if needed, as an interactive 3D walkthrough or video animation.",
        aru: "Визуализации предоставляются в формате JPEG/PNG высокого разрешения, а также, при необходимости, в виде интерактивной 3D-прогулки или видеоанимации.",
      },
      {
        qet: "Kas 3D visualiseerimise hind sõltub ruumi suurusest?",
        qen: "Does the 3D visualization price depend on room size?",
        qru: "Зависит ли цена 3D-визуализации от размера помещения?",
        aet: "Jah, hind sõltub ruumi suurusest, detailsuse astmest ja piltide arvust. Tasuta hinnapakkumise saamiseks võtke meiega ühendust.",
        aen: "Yes, pricing depends on room size, level of detail, and number of images. Contact us for a free quote.",
        aru: "Да, цена зависит от размера помещения, степени детализации и количества изображений. Свяжитесь с нами для бесплатного расчёта.",
      },
      {
        qet: "Kas saab tellida 3D visualiseerimise koos interjööriprojektiga?",
        qen: "Can I order 3D visualization together with an interior design project?",
        qru: "Можно ли заказать 3D-визуализацию вместе с дизайн-проектом интерьера?",
        aet: "Jah, pakume komplektteenust: interjööridisain + 3D visualiseerimine. Koos tellimisel kehtib soodustus. Küsige täpsemat pakkumist.",
        aen: "Yes, we offer a package: interior design + 3D visualization. A discount applies when ordered together. Ask for a quote.",
        aru: "Да, предлагаем пакет: дизайн интерьера + 3D-визуализация. При совместном заказе действует скидка. Запросите расчёт.",
      },
    ]),
  },
  {
    slug: "apartment-associations",
    faq: faq([
      {
        qet: "Milliseid teenuseid pakute korteriühistutele Tallinnas?",
        qen: "What services do you provide to apartment associations in Tallinn?",
        qru: "Какие услуги вы предоставляете товариществам квартировладельцев в Таллине?",
        aet: "Pakume KÜ-dele täisteenust: torustiku ja elektrisüsteemide hooldus, avariireageerimine, ühisalade remont ja halduse tugi kogu Tallinnas ja Harjumaal.",
        aen: "We offer full service for apartment associations: plumbing and electrical maintenance, emergency response, common area repairs, and management support across Tallinn and Harjumaa.",
        aru: "Предлагаем полный спектр услуг для ТКВ: обслуживание сантехники и электросистем, аварийный выезд, ремонт мест общего пользования по Таллину и Харьюмаа.",
      },
      {
        qet: "Kas sõlmite korteriühistutega hooldusleping?",
        qen: "Do you sign maintenance contracts with apartment associations?",
        qru: "Заключаете ли вы договоры на обслуживание с товариществами квартировладельцев?",
        aet: "Jah, sõlmime KÜ-dega pikaajalisi hoolduslepinguid fikseeritud kuutasuga. See tagab kiirema reageerimise ja soodsama hinna.",
        aen: "Yes, we sign long-term maintenance contracts with apartment associations at a fixed monthly rate, ensuring faster response times and better pricing.",
        aru: "Да, заключаем долгосрочные договоры на обслуживание с фиксированной ежемесячной оплатой. Это обеспечивает быстрый выезд и выгодные цены.",
      },
      {
        qet: "Kui kiiresti reageerite korteriühistu avariiteatele?",
        qen: "How quickly do you respond to an apartment association emergency?",
        qru: "Как быстро вы реагируете на аварийный сигнал от ТКВ?",
        aet: "Avariidele reageerime 30–60 minuti jooksul. Lepingulistele KÜ-dele on tagatud prioriteetne reageerimine ööpäevaringselt.",
        aen: "We respond to emergencies within 30–60 minutes. Contract clients receive priority 24/7 response.",
        aru: "На аварии выезжаем в течение 30–60 минут. Договорным клиентам гарантирован приоритетный выезд круглосуточно.",
      },
      {
        qet: "Kas teete ka kortermaja ühisalade renoveerimist?",
        qen: "Do you also renovate common areas in apartment buildings?",
        qru: "Занимаетесь ли вы ремонтом мест общего пользования в многоквартирных домах?",
        aet: "Jah, teeme trepikodade, keldrite, katusealuste ja muude ühisalade täielikku renoveerimist. Koostame eelarve ja ajakava KÜ juhatusele.",
        aen: "Yes, we carry out full renovation of stairwells, basements, attics, and other common areas. We prepare a budget and schedule for the association board.",
        aru: "Да, выполняем полный ремонт лестничных клеток, подвалов, чердаков и других мест общего пользования. Составляем смету и график для правления ТКВ.",
      },
    ]),
  },
  {
    slug: "apartment-office-repair",
    faq: faq([
      {
        qet: "Kui kaua võtab korteri täielik remont aega Tallinnas?",
        qen: "How long does a full apartment renovation take in Tallinn?",
        qru: "Сколько времени занимает полный ремонт квартиры в Таллине?",
        aet: "Ühe magamistoaga korteri täielik remont võtab tavaliselt 4–8 nädalat, sõltuvalt töömahust ja materjalide valikust. Esitame üksikasjaliku ajakava enne töö algust.",
        aen: "A full renovation of a one-bedroom apartment typically takes 4–8 weeks, depending on scope and material choices. We provide a detailed schedule before work begins.",
        aru: "Полный ремонт однокомнатной квартиры обычно занимает 4–8 недель в зависимости от объёма работ и выбора материалов. Предоставляем подробный график до начала работ.",
      },
      {
        qet: "Mis maksab korteri remont Tallinnas ruutmeetri kohta?",
        qen: "What is the cost of apartment renovation per square metre in Tallinn?",
        qru: "Сколько стоит ремонт квартиры в Таллине за квадратный метр?",
        aet: "Hind sõltub töömahust ja viimistlustasemest: lihttöödelt €150–250/m² ja kvaliteetsema viimistluse puhul €300–500/m². Tasuta hinnapakkumiseks helistage meile.",
        aen: "Price depends on scope and finish level: basic renovation €150–250/m², premium finish €300–500/m². Call us for a free quote.",
        aru: "Цена зависит от объёма и уровня отделки: базовый ремонт €150–250/м², качественная отделка €300–500/м². Позвоните нам для бесплатной оценки.",
      },
      {
        qet: "Kas teete ka kontori renoveerimist äriruumides?",
        qen: "Do you also carry out office renovations in commercial premises?",
        qru: "Выполняете ли вы ремонт офисов в коммерческих помещениях?",
        aet: "Jah, renoveerime nii kortereid kui kontorid ja äriruume. Planeerime tööde teostamise väljaspool tööaega, et teie äri ei kannataks.",
        aen: "Yes, we renovate both apartments and offices or commercial premises. We plan work outside business hours to minimise disruption.",
        aru: "Да, ремонтируем как квартиры, так и офисы и коммерческие помещения. Планируем работы вне рабочего времени, чтобы не мешать бизнесу.",
      },
      {
        qet: "Kas annate renoveerimistöödele garantii?",
        qen: "Do you provide a warranty on renovation work?",
        qru: "Предоставляете ли вы гарантию на ремонтные работы?",
        aet: "Jah, kõigile meie renoveerimistöödele kehtib 2-aastane garantii. Kasutame ainult sertifitseeritud materjale ja kõik tööd teeb litsentseeritud meeskond.",
        aen: "Yes, all our renovation work carries a 2-year warranty. We use only certified materials and all work is carried out by a licensed team.",
        aru: "Да, на все ремонтные работы даём 2-летнюю гарантию. Используем только сертифицированные материалы, работает лицензированная бригада.",
      },
    ]),
  },
  {
    slug: "apartment-renovation",
    faq: faq([
      {
        qet: "Mida hõlmab korteri täielik renoveerimine Tallinnas?",
        qen: "What does a complete apartment renovation in Tallinn include?",
        qru: "Что включает полный ремонт квартиры в Таллине?",
        aet: "Täielik renoveerimine hõlmab põrandate, seinte, lagede, torustiku, elektrisüsteemi, akende ja uste väljavahetamist ning köök- ja vannitoarenoveerimist.",
        aen: "A full renovation includes replacing floors, walls, ceilings, plumbing, electrical, windows, and doors, plus kitchen and bathroom renovation.",
        aru: "Полный ремонт включает замену полов, стен, потолков, сантехники, электрики, окон и дверей, а также ремонт кухни и ванной.",
      },
      {
        qet: "Kas te hoolitsete ka materjalide ostmise eest?",
        qen: "Do you handle purchasing the materials as well?",
        qru: "Занимаетесь ли вы закупкой материалов?",
        aet: "Jah, saame materjale soetada meie partnerite kaudu hulgihindadega ning säästate nii aega kui raha. Samuti saate materjale ise valida ja meie paigaldame.",
        aen: "Yes, we can procure materials through our partners at wholesale prices, saving you time and money. You can also choose your own materials and we install them.",
        aru: "Да, можем закупать материалы через наших партнёров по оптовым ценам — экономите время и деньги. Также можете выбрать материалы самостоятельно, мы установим.",
      },
      {
        qet: "Kas on võimalik renoveerida korteris elades?",
        qen: "Is it possible to renovate the apartment while living in it?",
        qru: "Можно ли делать ремонт в квартире, продолжая в ней жить?",
        aet: "Osalise renoveerimise puhul on see sageli võimalik — teeme tööd ruumide kaupa. Täisrenoveerimise korral soovitame ajutist elamist mujal.",
        aen: "For partial renovation this is often possible — we work room by room. For a full renovation we recommend temporary accommodation elsewhere.",
        aru: "При частичном ремонте это часто возможно — работаем комнату за комнатой. При полном ремонте рекомендуем временно жить в другом месте.",
      },
      {
        qet: "Kui suur on renoveerimislepingu alusel töö eelraha?",
        qen: "What advance payment is required when signing a renovation contract?",
        qru: "Какой аванс требуется при подписании договора на ремонт?",
        aet: "Tavaliselt küsime 20–30% ettemaksu materjalide soetamiseks. Töö eest maksate etappide kaupa kokkulepitud ajakava järgi.",
        aen: "We typically request 20–30% upfront for material procurement. Work payments follow agreed milestones in the schedule.",
        aru: "Обычно просим 20–30% аванса для закупки материалов. Оплата работ производится поэтапно по согласованному графику.",
      },
    ]),
  },
  {
    slug: "appliance-installation",
    faq: faq([
      {
        qet: "Milliseid kodumasinaid te Tallinnas paigaldate?",
        qen: "What household appliances do you install in Tallinn?",
        qru: "Какую бытовую технику вы устанавливаете в Таллине?",
        aet: "Paigaldame pesumasinaid, nõudepesumasinaid, kuivateid, pliite, kapikülmikuid, boilereid, õhukonditsioneeride välisüksusi ja teisi kodumasinaid.",
        aen: "We install washing machines, dishwashers, dryers, cookers, fridge-freezers, boilers, air conditioning units, and other household appliances.",
        aru: "Устанавливаем стиральные машины, посудомоечные машины, сушилки, плиты, холодильники, бойлеры, внешние блоки кондиционеров и другую бытовую технику.",
      },
      {
        qet: "Mis maksab kodumasina paigaldamine Tallinnas?",
        qen: "How much does appliance installation cost in Tallinn?",
        qru: "Сколько стоит установка бытовой техники в Таллине?",
        aet: "Lihttöö (nt pesumasina ühendamine) algab €35-st. Keerukamad paigaldused (nt sisseehitatav ahi) on kallimad. Hinnapakkumine on tasuta.",
        aen: "Simple installation (e.g. washing machine connection) starts from €35. Complex fit-outs (e.g. built-in oven) are higher. Free quotes available.",
        aru: "Простая установка (напр. подключение стиральной машины) от €35. Сложный монтаж (напр. встроенная духовка) дороже. Оценка бесплатна.",
      },
      {
        qet: "Kas teil on garantii paigaldustöödele?",
        qen: "Do you provide a warranty on installation work?",
        qru: "Даёте ли вы гарантию на монтажные работы?",
        aet: "Jah, kõigile meie paigaldustöödele kehtib 2-aastane garantii. Masina enda tootjagarantii sellega ei kattu — see on eraldiseisev.",
        aen: "Yes, all our installation work has a 2-year warranty. The appliance manufacturer's warranty is separate and not affected.",
        aru: "Да, на все монтажные работы даём 2-летнюю гарантию. Гарантия производителя техники — отдельная и не затрагивается.",
      },
      {
        qet: "Kas paigaldate ka kasutatud kodumasinaid?",
        qen: "Do you also install second-hand appliances?",
        qru: "Устанавливаете ли вы б/у бытовую технику?",
        aet: "Jah, paigaldame nii uusi kui kasutatud kodumasinaid. Enne paigaldust kontrollime masina töökorras olekut ja anname soovituse.",
        aen: "Yes, we install both new and second-hand appliances. Before installation we check the unit is in working order and provide our assessment.",
        aru: "Да, устанавливаем как новую, так и б/у технику. Перед установкой проверяем работоспособность и даём рекомендацию.",
      },
    ]),
  },
  {
    slug: "appliance-repair",
    faq: faq([
      {
        qet: "Milliseid kodumasinaid te Tallinnas remondite?",
        qen: "What household appliances do you repair in Tallinn?",
        qru: "Какую бытовую технику вы ремонтируете в Таллине?",
        aet: "Remondime pesumasinaid, nõudepesumasinaid, külmikuid, pliite, ahjusid, kuivateid ja muid kodumasinaid. Remont teostame kohapeal teie kodus Tallinnas.",
        aen: "We repair washing machines, dishwashers, fridges, cookers, ovens, dryers, and other appliances. Repairs are carried out on-site at your home in Tallinn.",
        aru: "Ремонтируем стиральные машины, посудомоечные машины, холодильники, плиты, духовки, сушилки и другую технику. Ремонт на дому в Таллине.",
      },
      {
        qet: "Mis maksab kodumasina remont Tallinnas?",
        qen: "How much does appliance repair cost in Tallinn?",
        qru: "Сколько стоит ремонт бытовой техники в Таллине?",
        aet: "Diagnostika on tasuta. Töötund algab €35-st. Lõplik hind sõltub rikke iseloomust ja varuosade hinnast. Hinnapakkumine antakse enne töö alustamist.",
        aen: "Diagnostics are free. Labour starts from €35/hour. The final price depends on the nature of the fault and spare parts. A quote is given before work begins.",
        aru: "Диагностика бесплатна. Час работы от €35. Итоговая цена зависит от характера поломки и стоимости запчастей. Смета — до начала работ.",
      },
      {
        qet: "Kas teil on kodumasinate remondi garantii?",
        qen: "Is there a warranty on appliance repair?",
        qru: "Есть ли гарантия на ремонт бытовой техники?",
        aet: "Jah, kõikidele remonditöödele anname 6-kuulise garantii. Varuosadele kehtib tootja garantii eraldi.",
        aen: "Yes, all repair work carries a 6-month warranty. Spare parts are covered separately by the manufacturer's warranty.",
        aru: "Да, на все ремонтные работы даём 6-месячную гарантию. На запасные части действует отдельная гарантия производителя.",
      },
      {
        qet: "Kui kaua kodumasina remont tavaliselt aega võtab?",
        qen: "How long does a typical appliance repair take?",
        qru: "Сколько обычно занимает ремонт бытовой техники?",
        aet: "Enamik remonditöid tehakse kohapeal ühe visiidi jooksul (1–2 tundi). Kui vaja on tellida varuosi, võib remont kesta 3–5 tööpäeva.",
        aen: "Most repairs are completed on-site in a single visit (1–2 hours). If parts need to be ordered, repair may take 3–5 working days.",
        aru: "Большинство ремонтов выполняется на месте за один визит (1–2 часа). Если нужно заказать запчасти, ремонт может занять 3–5 рабочих дней.",
      },
    ]),
  },
  {
    slug: "as-built-drawings",
    faq: faq([
      {
        qet: "Mis on teostusjoonised ja millal neid vaja on?",
        qen: "What are as-built drawings and when are they required?",
        qru: "Что такое исполнительные чертежи и когда они нужны?",
        aet: "Teostusjoonised kajastavad ehituse tegelikku lõppseisu — kõrvalekaldeid projektist. Neid nõuavad omavalitsused ehitusloa lõpetamiseks ja hoonete registreerimiseks.",
        aen: "As-built drawings document the actual final state of construction, including deviations from the original design. Municipalities require them to close building permits and register buildings.",
        aru: "Исполнительные чертежи фиксируют фактическое состояние строительства, включая отклонения от проекта. Требуются для закрытия разрешений на строительство и регистрации зданий.",
      },
      {
        qet: "Kui kaua teostusjooniste koostamine aega võtab?",
        qen: "How long does preparing as-built drawings take?",
        qru: "Сколько времени занимает составление исполнительных чертежей?",
        aet: "Korteri teostusjoonised valmivad 3–7 tööpäeva jooksul. Suuremate hoonete korral lepime tähtaja individuaalselt kokku pärast objekti ülevaatust.",
        aen: "As-built drawings for an apartment are ready in 3–7 working days. For larger buildings we agree on a timeline after a site inspection.",
        aru: "Исполнительные чертежи для квартиры готовы за 3–7 рабочих дней. Для крупных объектов срок согласовывается после обследования.",
      },
      {
        qet: "Mis formaadis teostusjoonised esitatakse?",
        qen: "What format are as-built drawings delivered in?",
        qru: "В каком формате предоставляются исполнительные чертежи?",
        aet: "Joonised esitatakse DWG (AutoCAD) ja PDF formaadis. Vajadusel esitame ka paberkandjal allkirjastatud eksemplarid.",
        aen: "Drawings are delivered in DWG (AutoCAD) and PDF formats. Signed paper copies are available on request.",
        aru: "Чертежи предоставляются в формате DWG (AutoCAD) и PDF. Подписанные бумажные экземпляры — по запросу.",
      },
      {
        qet: "Kas teete teostusjooniseid nii eramajadele kui kortermajadele?",
        qen: "Do you produce as-built drawings for both houses and apartment buildings?",
        qru: "Составляете ли вы исполнительные чертежи для частных домов и многоквартирных зданий?",
        aet: "Jah, koostame teostusjooniseid nii eramulistele kui kortermajadele, äriruumidele ja tööstushoonetele kõikjal Tallinnas ja Harjumaal.",
        aen: "Yes, we produce as-built drawings for private houses, apartment buildings, commercial premises, and industrial buildings throughout Tallinn and Harjumaa.",
        aru: "Да, составляем исполнительные чертежи для частных домов, многоквартирных зданий, коммерческих и производственных объектов по всему Таллину и Харьюмаа.",
      },
    ]),
  },
  {
    slug: "balcony-repair",
    faq: faq([
      {
        qet: "Mida hõlmab rõdu renoveerimine Tallinnas?",
        qen: "What does balcony renovation in Tallinn include?",
        qru: "Что включает ремонт балкона в Таллине?",
        aet: "Rõdu renoveerimistööd hõlmavad katte-, soojustus-, piirdeaia-, veepidavuse ja viimistlustöid. Vajadusel teeme ka rõdu klaasimist.",
        aen: "Balcony renovation includes covering, insulation, railing, waterproofing, and finishing works. We also carry out balcony glazing if needed.",
        aru: "Ремонт балкона включает облицовку, утепление, ограждение, гидроизоляцию и отделочные работы. При необходимости выполняем остекление.",
      },
      {
        qet: "Mis maksab rõdu remont Tallinnas?",
        qen: "How much does balcony repair cost in Tallinn?",
        qru: "Сколько стоит ремонт балкона в Таллине?",
        aet: "Hind sõltub rõdu suurusest ja töömahust. Lihtne viimistlus algab €500-st, täielik renoveerimine klaasimisega €2000+. Tasuta ülevaatus ja hinnapakkumine.",
        aen: "Price depends on balcony size and scope. Basic finishing starts from €500, full renovation with glazing from €2,000+. Free inspection and quote.",
        aru: "Цена зависит от размера балкона и объёма работ. Простая отделка от €500, полный ремонт с остеклением от €2 000+. Бесплатный осмотр и смета.",
      },
      {
        qet: "Kas rõdu klaasimiseks on vaja ehitusluba?",
        qen: "Is a building permit required for balcony glazing?",
        qru: "Нужно ли разрешение на строительство для остекления балкона?",
        aet: "See sõltub hoone tüübist ja asukoha piirkonnast. Aiame teid loa küsimuse selgitamisel ja vajadusel esitame dokumendid teie eest.",
        aen: "It depends on the building type and area. We help clarify the permit question and can submit documentation on your behalf if required.",
        aru: "Это зависит от типа здания и района. Помогаем разобраться с вопросом разрешения и при необходимости подаём документы за вас.",
      },
      {
        qet: "Kui kaua rõdu remont aega võtab?",
        qen: "How long does balcony renovation take?",
        qru: "Сколько времени занимает ремонт балкона?",
        aet: "Lihtsamad tööd (nt katte vahetus) tehakse 1–2 päevaga. Täielik renoveerimine koos klaasimisega võtab 5–10 tööpäeva.",
        aen: "Simpler jobs (e.g. cover replacement) take 1–2 days. Full renovation with glazing takes 5–10 working days.",
        aru: "Простые работы (напр. замена покрытия) выполняются за 1–2 дня. Полный ремонт с остеклением занимает 5–10 рабочих дней.",
      },
    ]),
  },
  {
    slug: "bathroom-renovation",
    faq: faq([
      {
        qet: "Mis maksab vannitoa täielik remont Tallinnas?",
        qen: "How much does a complete bathroom renovation cost in Tallinn?",
        qru: "Сколько стоит полный ремонт ванной комнаты в Таллине?",
        aet: "Vannitoa täielik remont maksab keskmiselt €3 000–8 000 sõltuvalt pindalast, plaatide valikust ja santehnikaseadmetest. Tasuta mõõduvõtt ja hinnapakkumine.",
        aen: "A full bathroom renovation costs on average €3,000–8,000 depending on floor area, tile selection, and sanitary ware. Free measurement and quote.",
        aru: "Полный ремонт ванной обходится в среднем €3 000–8 000 в зависимости от площади, выбора плитки и сантехники. Бесплатный замер и смета.",
      },
      {
        qet: "Kui kaua vannitoa remont Tallinnas aega võtab?",
        qen: "How long does a bathroom renovation take in Tallinn?",
        qru: "Сколько времени занимает ремонт ванной комнаты в Таллине?",
        aet: "Standardse vannitoa täielik remont võtab 10–20 tööpäeva. Selle aja sisse jääb plaatimine, torustiku- ja elektritööd ning seadmete paigaldamine.",
        aen: "A standard bathroom full renovation takes 10–20 working days, including tiling, plumbing, electrical work, and fitting sanitary ware.",
        aru: "Полный ремонт стандартной ванной занимает 10–20 рабочих дней, включая укладку плитки, сантехнику, электрику и установку оборудования.",
      },
      {
        qet: "Kas te teete ka vannitoa plaatimist ilma täieliku remondita?",
        qen: "Do you do bathroom tiling without a full renovation?",
        qru: "Делаете ли вы укладку плитки в ванной без полного ремонта?",
        aet: "Jah, teeme ka üksikuid töid: ainult plaatimine, ainult torustiku vahetus või ainult seadmete paigaldamine. Küsige täpset hinnapakkumist.",
        aen: "Yes, we also carry out individual tasks: tiling only, plumbing replacement only, or fitting sanitary ware only. Ask for a specific quote.",
        aru: "Да, выполняем и отдельные работы: только плитка, только замена сантехники или только установка оборудования. Запросите точную смету.",
      },
      {
        qet: "Annate te vannitoa renoveerimistöödele garantii?",
        qen: "Do you offer a warranty on bathroom renovation?",
        qru: "Даёте ли вы гарантию на ремонт ванной комнаты?",
        aet: "Jah, kõigile vannitoa renoveerimistöödele kehtib 2-aastane garantii. Eriti kontrollime veepidavust ja plaatimise kvaliteeti.",
        aen: "Yes, all bathroom renovation work carries a 2-year warranty. We pay special attention to waterproofing and tiling quality.",
        aru: "Да, на все работы по ремонту ванной комнаты даём 2-летнюю гарантию. Особое внимание уделяем гидроизоляции и качеству укладки плитки.",
      },
    ]),
  },
  {
    slug: "bathroom-repair",
    faq: faq([
      {
        qet: "Mida hõlmab vannitoa renoveerimine TorudeAbi24 puhul Tallinnas?",
        qen: "What does bathroom renovation by TorudeAbi24 in Tallinn include?",
        qru: "Что включает ремонт ванной комнаты от TorudeAbi24 в Таллине?",
        aet: "Meie vannitoa renoveerimine hõlmab täielikku plaatimist, torustiku ja sanitaarseadmete vahetust, elektritöid, veepidavuse tagamist ja viimistlust.",
        aen: "Our bathroom renovation includes full tiling, plumbing and sanitary fixture replacement, electrical work, waterproofing, and finishing.",
        aru: "Наш ремонт ванной включает полную укладку плитки, замену сантехники, электрику, гидроизоляцию и финишную отделку.",
      },
      {
        qet: "Mis on vannitoa renoveerimise hind ruutmeetri kohta Tallinnas?",
        qen: "What is the price per square metre for bathroom renovation in Tallinn?",
        qru: "Какова цена ремонта ванной комнаты за квадратный метр в Таллине?",
        aet: "Plaatimistöö koos materjalidega algab €80/m². Täielik renoveerimine (sanitaartehnoloogia + plaatimine + elekter) algab €400/m².",
        aen: "Tiling including materials starts from €80/m². Full renovation (plumbing + tiling + electrical) starts from €400/m².",
        aru: "Укладка плитки с материалами от €80/м². Полный ремонт (сантехника + плитка + электрика) от €400/м².",
      },
      {
        qet: "Kui kiiresti saate vannitoa renoveerimisega alustada Tallinnas?",
        qen: "How soon can you start a bathroom renovation in Tallinn?",
        qru: "Как скоро вы можете начать ремонт ванной комнаты в Таллине?",
        aet: "Tavaliselt alustame 5–10 tööpäeva jooksul pärast lepingu sõlmimist. Kiiremates olukordades püüame leida varasema aja.",
        aen: "We typically start within 5–10 working days of signing the contract. In urgent cases we try to find an earlier slot.",
        aru: "Как правило, приступаем в течение 5–10 рабочих дней после подписания договора. В срочных случаях стараемся найти более ранний срок.",
      },
      {
        qet: "Kas kasutate garanteeritud veepidavaid materjale vannitoa renoveerimiseks?",
        qen: "Do you use guaranteed waterproof materials for bathroom renovation?",
        qru: "Используете ли вы гарантированно водонепроницаемые материалы для ремонта ванной?",
        aet: "Jah, kasutame ainult sertifitseeritud veepidavaid materjale ja hüdroisolatsiooni. Kõik vannitoa tööd vastavad Eesti ehitusnormidele.",
        aen: "Yes, we use only certified waterproof materials and proper waterproofing membranes. All bathroom work meets Estonian building regulations.",
        aru: "Да, используем только сертифицированные водонепроницаемые материалы и гидроизоляцию. Все работы соответствуют строительным нормам Эстонии.",
      },
    ]),
  },
  {
    slug: "blockage-clearing",
    faq: faq([
      {
        qet: "Mis põhjustab ummistusi kanalisatsioonitorudes Tallinnas?",
        qen: "What causes drain blockages in Tallinn?",
        qru: "Что вызывает засоры в канализационных трубах Таллина?",
        aet: "Levinumad põhjused on rasv, juuksed, toidujäägid, pabertaskurätid ja lasteriistad. Vanematel Tallinna hoonetel on sageli uriinkivi ladestused ja roosteprobleemid.",
        aen: "Common causes are grease, hair, food debris, wet wipes, and children's objects. Older Tallinn buildings often have limescale deposits and rust build-up.",
        aru: "Частые причины: жир, волосы, пищевые отходы, влажные салфетки и детские предметы. В старых домах Таллина — отложения известняка и ржавчина.",
      },
      {
        qet: "Kui kiiresti saate ummistuse likvideerida Tallinnas?",
        qen: "How quickly can you clear a blockage in Tallinn?",
        qru: "Как быстро вы устраните засор в Таллине?",
        aet: "Reageerime 30–60 minuti jooksul Tallinna linna piires. Enamik ummistusi likvideeritakse ühe visiidi käigus. Töötame ööpäevaringselt.",
        aen: "We respond within 30–60 minutes within Tallinn city limits. Most blockages are cleared in a single visit. We operate 24/7.",
        aru: "Выезжаем в течение 30–60 минут в пределах Таллина. Большинство засоров устраняется за один визит. Работаем круглосуточно.",
      },
      {
        qet: "Mis maksab ummistuse likvideerimine Tallinnas?",
        qen: "How much does drain blockage clearing cost in Tallinn?",
        qru: "Сколько стоит устранение засора в Таллине?",
        aet: "Töötund algab €35-st. Tööpäeviti 08:00–19:00 kehtib -30% soodustus. Enne töö alustamist anname täpse hinnapakkumise.",
        aen: "Work starts from €35/hour. A -30% discount applies on weekdays 08:00–19:00. We provide an exact quote before starting.",
        aru: "Работа от €35/час. Скидка -30% по будням с 08:00 до 19:00. Точную смету даём до начала работ.",
      },
      {
        qet: "Kuidas ummistusi ennetada?",
        qen: "How can I prevent drain blockages?",
        qru: "Как предотвратить засоры канализации?",
        aet: "Paigaldage rasvafilter kööki, kasutage karvafiltreid vannituppa ja loputage torustikku iga kuu kuuma vee ja soodaga. Vältige pabertaskurätikute loputamist.",
        aen: "Install a grease trap in the kitchen, use hair filters in the bathroom, and flush pipes monthly with hot water and bicarbonate. Avoid flushing wet wipes.",
        aru: "Установите жироуловитель на кухне, используйте фильтры для волос в ванной и ежемесячно промывайте трубы горячей водой с содой. Не смывайте влажные салфетки.",
      },
    ]),
  },
  {
    slug: "boiler-installation",
    faq: faq([
      {
        qet: "Kui kaua boileri paigaldamine Tallinnas aega võtab?",
        qen: "How long does boiler installation take in Tallinn?",
        qru: "Сколько времени занимает установка бойлера в Таллине?",
        aet: "Tavapärane boileri paigaldamine võtab 2–4 tundi. Kui eelnev boiler tuleb eemaldada ja veetoru ümber paigaldada, võib see kesta kuni poole päeva.",
        aen: "Standard boiler installation takes 2–4 hours. If an old boiler needs removing and pipework adjusting, it may take up to half a day.",
        aru: "Стандартная установка бойлера занимает 2–4 часа. Если нужно снять старый бойлер и переделать подводку, может занять полдня.",
      },
      {
        qet: "Mis mahutit soovitate Tallinna korteri jaoks?",
        qen: "What capacity boiler do you recommend for a Tallinn apartment?",
        qru: "Какой объём бойлера вы рекомендуете для квартиры в Таллине?",
        aet: "1–2-inimesele sobib 50–80-liitrine boiler, 3–4-liikmelisele perele 100–150 liitrit ja suuremale perele 200 liitrit. Anname nõu valikul tasuta.",
        aen: "For 1–2 people a 50–80 litre boiler suits; for a family of 3–4, 100–150 litres; for larger families, 200 litres. Free advice on selection.",
        aru: "Для 1–2 человек подойдёт бойлер 50–80 л, для семьи 3–4 человек — 100–150 л, для большой семьи — 200 л. Бесплатно помогаем с выбором.",
      },
      {
        qet: "Kas annate boileri paigaldamisele garantii?",
        qen: "Do you provide a warranty on boiler installation?",
        qru: "Даёте ли вы гарантию на установку бойлера?",
        aet: "Jah, paigaldustöödele anname 2-aastase garantii. Boileri enda tootjagarantii (tavaliselt 2–5 aastat) kehtib eraldi.",
        aen: "Yes, we provide a 2-year warranty on the installation work. The boiler's own manufacturer warranty (typically 2–5 years) applies separately.",
        aru: "Да, на монтажные работы даём 2-летнюю гарантию. Гарантия производителя на сам бойлер (обычно 2–5 лет) действует отдельно.",
      },
      {
        qet: "Kas teete ka vanema boileri vahetust uue vastu Tallinnas?",
        qen: "Do you also replace old boilers with new ones in Tallinn?",
        qru: "Делаете ли вы замену старого бойлера на новый в Таллине?",
        aet: "Jah, eemaldame vana boileri ja paigaldame uue. Vanadest seadmetest saame ka ise vabaneda. Hind sisaldab nii demontaaži kui paigaldust.",
        aen: "Yes, we remove the old boiler and install the new one. We can also dispose of the old unit. The price includes both removal and installation.",
        aru: "Да, снимаем старый бойлер и устанавливаем новый. Также можем утилизировать старое оборудование. Цена включает демонтаж и установку.",
      },
    ]),
  },
  {
    slug: "builtin-appliance-installation",
    faq: faq([
      {
        qet: "Milliseid sisseehitatud kodumasinaid te Tallinnas paigaldate?",
        qen: "What built-in appliances do you install in Tallinn?",
        qru: "Какую встроенную бытовую технику вы устанавливаете в Таллине?",
        aet: "Paigaldame sisseehitatud ahjusid, pliidiplaate, nõudepesumasinaid, külmikuid, prügikaste, pesumasinaid ja ventilatsiooniga väljatõmbeid köökidesse.",
        aen: "We install built-in ovens, hobs, dishwashers, fridges, waste bins, washing machines, and extractor fans in kitchens.",
        aru: "Устанавливаем встроенные духовки, варочные панели, посудомоечные машины, холодильники, мусорные вёдра, стиральные машины и вытяжки на кухнях.",
      },
      {
        qet: "Kas sisseehitatud tehnika paigaldus nõuab elektri- ja torustikutöid?",
        qen: "Does built-in appliance installation require electrical and plumbing work?",
        qru: "Требует ли установка встроенной техники электромонтажных и сантехнических работ?",
        aet: "Sageli jah. Meie meeskond teostab kõik vajalikud elektri- ja torustikutööd ühe visiidiga, et teie köök oleks valmis kasutamiseks.",
        aen: "Often yes. Our team carries out all required electrical and plumbing work in a single visit so your kitchen is ready to use.",
        aru: "Часто да. Наша команда выполняет все необходимые электромонтажные и сантехнические работы за один визит, чтобы кухня была готова к использованию.",
      },
      {
        qet: "Mis maksab sisseehitatud tehnika paigaldamine Tallinnas?",
        qen: "What does built-in appliance installation cost in Tallinn?",
        qru: "Сколько стоит установка встроенной техники в Таллине?",
        aet: "Ühe seadme paigaldamine algab €45-st. Täiskomplekt (ahi + plaat + nõudepesumasin + külmik) algab €250-st. Küsige täpset pakkumist.",
        aen: "Single appliance installation starts from €45. A full set (oven + hob + dishwasher + fridge) starts from €250. Ask for a precise quote.",
        aru: "Установка одного устройства от €45. Полный комплект (духовка + панель + посудомойка + холодильник) от €250. Запросите точную смету.",
      },
      {
        qet: "Annate te garantii sisseehitatud tehnika paigaldusele?",
        qen: "Do you offer a warranty on built-in appliance installation?",
        qru: "Даёте ли вы гарантию на установку встроенной техники?",
        aet: "Jah, kõikidele paigaldustöödele kehtib 2-aastane garantii. Garantii ei kata tehnika enda rikkeid — see jääb tootja garantii alla.",
        aen: "Yes, all installation work carries a 2-year warranty. The warranty does not cover appliance faults — those fall under the manufacturer's warranty.",
        aru: "Да, на все монтажные работы даём 2-летнюю гарантию. Гарантия не распространяется на неисправности техники — это гарантия производителя.",
      },
    ]),
  },
  {
    slug: "cleaning-services",
    faq: faq([
      {
        qet: "Milliseid koristustöid te Tallinnas pakute?",
        qen: "What cleaning services do you offer in Tallinn?",
        qru: "Какие услуги уборки вы предлагаете в Таллине?",
        aet: "Pakume korterite, majade, kontorite ja trepikodade koristust, ehitusjärgset lõppkoristust, aknapesu ja korrapärast hoolduskoristust Tallinnas.",
        aen: "We offer apartment, house, office, and stairwell cleaning, post-construction deep cleaning, window washing, and regular maintenance cleaning across Tallinn.",
        aru: "Предлагаем уборку квартир, домов, офисов и лестничных клеток, уборку после ремонта, мытьё окон и регулярную поддерживающую уборку в Таллине.",
      },
      {
        qet: "Mis maksab korteri koristamine Tallinnas?",
        qen: "How much does apartment cleaning cost in Tallinn?",
        qru: "Сколько стоит уборка квартиры в Таллине?",
        aet: "Ühetoalise korteri standardkoristus algab €45-st. Hind sõltub pinna suurusest ja koristuse mahust. Ehitusjärgne lõppkoristus on kallim. Küsige pakkumist.",
        aen: "Standard one-room apartment cleaning starts from €45. Price depends on size and scope. Post-construction cleaning is higher. Ask for a quote.",
        aru: "Стандартная уборка однокомнатной квартиры от €45. Цена зависит от площади и объёма работ. Уборка после ремонта дороже. Запросите смету.",
      },
      {
        qet: "Kas kasutate keskkonnasõbralikke puhastusaineid?",
        qen: "Do you use eco-friendly cleaning products?",
        qru: "Используете ли вы экологически чистые моющие средства?",
        aet: "Jah, kasutame sertifitseeritud keskkonnasõbralikke puhastusaineid, mis on ohutud lastele, loomadele ja allergeenikoostisele tundlikele inimestele.",
        aen: "Yes, we use certified eco-friendly cleaning products that are safe for children, pets, and people sensitive to allergens.",
        aru: "Да, используем сертифицированные экологически чистые средства, безопасные для детей, животных и людей с чувствительностью к аллергенам.",
      },
      {
        qet: "Kas pakute ka regulaarset koristustöötajat korteriühistule?",
        qen: "Do you offer regular cleaning staff for apartment associations?",
        qru: "Предлагаете ли вы регулярного уборщика для товариществ квартировладельцев?",
        aet: "Jah, sõlmime korteriühistutega regulaarse hoolduskoristuse lepinguid. Trepikodade, ühisruumide ja hoovide regulaarne hooldus fikseeritud hinnaga.",
        aen: "Yes, we sign regular maintenance cleaning contracts with apartment associations — stairwells, common areas, and yards at a fixed price.",
        aru: "Да, заключаем с ТКВ договоры на регулярную уборку — лестничных клеток, мест общего пользования и дворов по фиксированной цене.",
      },
    ]),
  },
  {
    slug: "concrete-works",
    faq: faq([
      {
        qet: "Milliseid betoontöid te Tallinnas teete?",
        qen: "What concrete works do you carry out in Tallinn?",
        qru: "Какие бетонные работы вы выполняете в Таллине?",
        aet: "Teostame betoonpõrandate valamist, tasandamist, tugevdamist, pragude parandamist, vundamentide betoneerimist ja muud betoontöid Tallinnas ja Harjumaal.",
        aen: "We carry out concrete floor pouring, levelling, reinforcement, crack repair, foundation concreting, and other concrete work in Tallinn and Harjumaa.",
        aru: "Выполняем заливку бетонных полов, нивелировку, армирование, ремонт трещин, бетонирование фундаментов и другие бетонные работы в Таллине и Харьюмаа.",
      },
      {
        qet: "Mis maksab betoonpõranda valamine Tallinnas?",
        qen: "How much does concrete floor pouring cost in Tallinn?",
        qru: "Сколько стоит заливка бетонного пола в Таллине?",
        aet: "Betoonpõranda valamine algab €25/m². Hind sõltub põranda paksusest, armatuurist ja pinna töötlemisest. Tasuta mõõduvõtt ja hinnapakkumine.",
        aen: "Concrete floor pouring starts from €25/m². Price depends on thickness, reinforcement, and surface treatment. Free measurement and quote.",
        aru: "Заливка бетонного пола от €25/м². Цена зависит от толщины, армирования и обработки поверхности. Бесплатный замер и смета.",
      },
      {
        qet: "Kui kaua betooni kuivamine aega võtab?",
        qen: "How long does concrete take to cure?",
        qru: "Сколько времени затвердевает бетон?",
        aet: "Betoon saavutab esialgse kõvaduse 24–48 tunni jooksul, kuid täiskõvadus saabub 28 päeva pärast. Sel ajal tuleb vältida raskete esemete paigutamist.",
        aen: "Concrete reaches initial hardness in 24–48 hours, but full strength comes after 28 days. Heavy loads should be avoided during this period.",
        aru: "Бетон достигает начальной твёрдости за 24–48 часов, но полная прочность наступает через 28 дней. В этот период следует избегать тяжёлых нагрузок.",
      },
      {
        qet: "Kas saate parandada pragunenud betooni?",
        qen: "Can you repair cracked concrete?",
        qru: "Можете ли вы отремонтировать треснувший бетон?",
        aet: "Jah, teeme pragude injekteerimist, pinna tasandamist ja tugevdamist. Esmalt hindame pragu põhjuse, seejärel valime sobiva parandusmeetodi.",
        aen: "Yes, we carry out crack injection, surface levelling, and reinforcement. We first assess the cause of the cracking, then choose the right repair method.",
        aru: "Да, выполняем инъектирование трещин, нивелировку и армирование. Сначала оцениваем причину трещины, затем выбираем подходящий метод ремонта.",
      },
    ]),
  },
  {
    slug: "construction-projects",
    faq: faq([
      {
        qet: "Milliseid ehitusprojekte te Tallinnas realiseerite?",
        qen: "What construction projects do you carry out in Tallinn?",
        qru: "Какие строительные проекты вы реализуете в Таллине?",
        aet: "Ehitame eramuid, juurdeehitusi, garaaže, aiamajakesi ja äriruume Tallinnas ning Harjumaal. Pakume täisteenust projekteerimisest kuni üleandmiseni.",
        aen: "We build private houses, extensions, garages, garden buildings, and commercial premises in Tallinn and Harjumaa. Full service from design to handover.",
        aru: "Строим частные дома, пристройки, гаражи, садовые домики и коммерческие помещения в Таллине и Харьюмаа. Полный цикл — от проектирования до сдачи.",
      },
      {
        qet: "Kas te aitate ka ehitusloa taotlemisega?",
        qen: "Do you help with obtaining a building permit?",
        qru: "Помогаете ли вы с получением разрешения на строительство?",
        aet: "Jah, aitame koostada ehitusdokumentatsiooni ja esitada ehitusloa taotluse. Tunneme hästi Tallinna linna ja Harjumaa valla nõudeid.",
        aen: "Yes, we help prepare construction documentation and submit the building permit application. We are well-versed in Tallinn city and Harjumaa municipality requirements.",
        aru: "Да, помогаем подготовить строительную документацию и подать заявку на разрешение. Хорошо знаем требования Таллина и муниципалитетов Харьюмаа.",
      },
      {
        qet: "Kas annate ehitustöödele garantii?",
        qen: "Do you provide a warranty on construction work?",
        qru: "Даёте ли вы гарантию на строительные работы?",
        aet: "Jah, kõigile ehitustöödele anname 2-aastase garantii. Kasutame sertifitseeritud materjale ja töötame ametliku ehituslepinguga.",
        aen: "Yes, all construction work carries a 2-year warranty. We use certified materials and operate under a formal construction contract.",
        aru: "Да, на все строительные работы даём 2-летнюю гарантию. Используем сертифицированные материалы и работаем по официальному договору подряда.",
      },
      {
        qet: "Kuidas on reguleeritud ehitustöödega kaasnev müra ja tolm?",
        qen: "How is noise and dust from construction works managed?",
        qru: "Как регулируется шум и пыль от строительных работ?",
        aet: "Järgime Tallinna linna müraeeskirju (ehitustööd lubatud E–P 7:00–22:00). Kasutame tolmukaitseid ja koristame ehitusplatsi iga tööpäeva lõpus.",
        aen: "We follow Tallinn city noise regulations (construction permitted Mon–Sun 7:00–22:00). We use dust protection and clean the site at the end of each working day.",
        aru: "Соблюдаем правила Таллина по шуму (строительные работы разрешены пн–вс 7:00–22:00). Используем пылезащиту и убираем стройплощадку в конце каждого дня.",
      },
    ]),
  },
  {
    slug: "construction-works",
    faq: faq([
      {
        qet: "Milliseid üldehitustöid te Tallinnas teete?",
        qen: "What general construction works do you carry out in Tallinn?",
        qru: "Какие общестроительные работы вы выполняете в Таллине?",
        aet: "Teeme müüritöid, krohvimist, karkaasehitust, puittöid, põrandate paigaldust, lammutustöid ja muid üldehitustöid Tallinnas ning Harjumaal.",
        aen: "We carry out bricklaying, plastering, frame construction, carpentry, flooring, demolition, and other general construction works in Tallinn and Harjumaa.",
        aru: "Выполняем кладку, штукатурку, каркасное строительство, плотничные работы, укладку полов, снос и другие общестроительные работы в Таллине и Харьюмаа.",
      },
      {
        qet: "Kas teete ka väikeseid üldehitustöid ja parandusi?",
        qen: "Do you also handle small general construction jobs and repairs?",
        qru: "Выполняете ли вы небольшие общестроительные работы и ремонт?",
        aet: "Jah, alates üksiku plaadi vahetusest kuni täispinnaga renoveeerimiseni. Miinimum väljakutse on 1 töötund.",
        aen: "Yes, from replacing a single tile to full-surface renovation. Minimum call-out is 1 working hour.",
        aru: "Да, от замены одной плитки до полной отделки. Минимальный вызов — 1 рабочий час.",
      },
      {
        qet: "Kas teete ehitusperioodi ajal materjali varustust?",
        qen: "Do you supply materials during the construction period?",
        qru: "Обеспечиваете ли вы поставку материалов в период строительства?",
        aet: "Jah, saame materjale hankida partnerite kaudu hulgihindadega. Alternatiivina võite materjale ise valida — meie paigaldame.",
        aen: "Yes, we can source materials through our partners at trade prices. Alternatively you choose the materials and we install them.",
        aru: "Да, можем закупать материалы через партнёров по оптовым ценам. Как вариант — выбираете сами, мы монтируем.",
      },
      {
        qet: "Mis maksab üldehitustöö tund Tallinnas?",
        qen: "What is the hourly rate for general construction work in Tallinn?",
        qru: "Какова почасовая ставка за общестроительные работы в Таллине?",
        aet: "Töötund algab €35-st. Tööpäeviti 08:00–19:00 kehtib -30% soodustus. Suurematele projektidele teeme eraldi hinnapakkumise.",
        aen: "Labour starts from €35/hour. A -30% discount applies weekdays 08:00–19:00. For larger projects we prepare a separate quote.",
        aru: "Час работы от €35. Скидка -30% по будням 08:00–19:00. Для крупных проектов составляем отдельную смету.",
      },
    ]),
  },
  {
    slug: "container-rental",
    faq: faq([
      {
        qet: "Millised konteinerid on rendile saadaval Tallinnas?",
        qen: "What containers are available for rental in Tallinn?",
        qru: "Какие контейнеры доступны для аренды в Таллине?",
        aet: "Pakume 5 m³, 8 m³, 10 m³ ja 15 m³ jäätmekonteinereid ehitus-, remondi- ja kolijäätmete tarvis. Tarnime ja viime ära teie ajakava järgi.",
        aen: "We offer 5 m³, 8 m³, 10 m³, and 15 m³ waste containers for construction, renovation, and moving waste. We deliver and collect on your schedule.",
        aru: "Предлагаем контейнеры 5 м³, 8 м³, 10 м³ и 15 м³ для строительных, ремонтных и переездных отходов. Привозим и забираем по вашему графику.",
      },
      {
        qet: "Mis maksab konteineri rentimine Tallinnas?",
        qen: "How much does container rental cost in Tallinn?",
        qru: "Сколько стоит аренда контейнера в Таллине?",
        aet: "Hind sisaldab tarnimist, kuni 7-päevast renti ja äraviimist. 5 m³ konteiner algab €95-st. Täpsem hind sõltub asukohast ja jäätme liigist.",
        aen: "Price includes delivery, up to 7-day rental, and collection. A 5 m³ container starts from €95. Exact price depends on location and waste type.",
        aru: "Цена включает доставку, аренду до 7 дней и вывоз. Контейнер 5 м³ от €95. Точная цена зависит от адреса и типа отходов.",
      },
      {
        qet: "Milliseid jäätmeid konteinerisse ei tohi panna?",
        qen: "What waste cannot be put into the container?",
        qru: "Какие отходы нельзя помещать в контейнер?",
        aet: "Keelatud on ohtlikud jäätmed (värvid, lahustid, akud), elektroonikajäätmed ja rehvid. Lubatud on tavapärased ehitusjäätmed, mööbel ja kodumasinad.",
        aen: "Prohibited: hazardous waste (paints, solvents, batteries), electronic waste, and tyres. Permitted: ordinary construction waste, furniture, and household appliances.",
        aru: "Запрещено: опасные отходы (краски, растворители, аккумуляторы), электронные отходы и шины. Разрешено: строительный мусор, мебель и бытовая техника.",
      },
      {
        qet: "Kui kiiresti konteiner peale tellimust toimetatakse?",
        qen: "How quickly is the container delivered after ordering?",
        qru: "Как быстро контейнер доставляется после заказа?",
        aet: "Tavaliselt tarnime järgmisel tööpäeval. Kiirtellimuse puhul võimalik samal päeval — helistage meile hommikul.",
        aen: "We usually deliver the next working day. For urgent orders, same-day delivery may be possible — call us in the morning.",
        aru: "Обычно доставляем на следующий рабочий день. При срочном заказе возможна доставка в тот же день — звоните утром.",
      },
    ]),
  },
  {
    slug: "containers-for-rent",
    faq: faq([
      {
        qet: "Milliseid jäätmekonteineri suurusi pakute Tallinnas?",
        qen: "What skip sizes do you offer in Tallinn?",
        qru: "Какие размеры бункер-накопителей вы предлагаете в Таллине?",
        aet: "Pakume väiksest 5 m³ kuni suure 20 m³ jäätmekonteinerini. Aitame valida sobiva suuruse vastavalt teie projekti mahule.",
        aen: "We offer sizes from a small 5 m³ to a large 20 m³ skip. We help you choose the right size for your project scope.",
        aru: "Предлагаем бункеры от малого 5 м³ до большого 20 м³. Помогаем выбрать нужный размер под объём вашего проекта.",
      },
      {
        qet: "Kas konteineri rent sisaldab jäätmete utiliseerimist?",
        qen: "Does container rental include waste disposal?",
        qru: "Включает ли аренда контейнера утилизацию отходов?",
        aet: "Jah, hind sisaldab äraviimist ja jäätmete asjakohast utiliseerimist litsentseeritud jäätmekäitluskeskuses vastavalt Eesti keskkonnaseadustele.",
        aen: "Yes, the price includes collection and proper waste disposal at a licensed waste management facility in accordance with Estonian environmental law.",
        aru: "Да, цена включает вывоз и надлежащую утилизацию отходов в лицензированном центре обращения с отходами в соответствии с законодательством Эстонии.",
      },
      {
        qet: "Kas konteinerit saab paigaldada tänavale?",
        qen: "Can the container be placed on a public street?",
        qru: "Можно ли установить контейнер на общественной улице?",
        aet: "Tänavale paigaldamine nõuab Tallinna linna luba. Aitame vajadusel luba taotleda. Eramaale ja hoovi paigaldamiseks luba ei ole vaja.",
        aen: "Placing on a public street requires a Tallinn city permit. We can help apply for the permit if needed. No permit is required for private land or a yard.",
        aru: "Размещение на общественной улице требует разрешения города Таллина. Поможем с подачей заявки при необходимости. На частной территории разрешение не нужно.",
      },
      {
        qet: "Kui pikaks ajaks saab konteinerit rentida?",
        qen: "For how long can the container be rented?",
        qru: "На какой срок можно арендовать контейнер?",
        aet: "Standardne rent on 7 päeva. Vajadusel saab pikendada nädalaste intervallidega. Pikema üüriperioodi eest on soodustus.",
        aen: "Standard rental is 7 days. Extension in weekly increments is available. A discount applies for longer rental periods.",
        aru: "Стандартная аренда — 7 дней. Возможно продление с шагом в неделю. На длительную аренду предусмотрена скидка.",
      },
    ]),
  },
];

async function run() {
  for (const svc of DATA) {
    const docs = await client.fetch(
      `*[_type == "service" && slug.current == $slug]{ _id, "faqCount": count(faq) }`,
      { slug: svc.slug }
    );
    if (!docs || docs.length === 0) {
      console.log(`⚠️  Not found: ${svc.slug}`);
      continue;
    }
    for (const doc of docs) {
      if (doc.faqCount >= 4) {
        console.log(`✅ Skip (${doc.faqCount} FAQs): ${svc.slug}`);
        continue;
      }
      await client.patch(doc._id).set({ faq: svc.faq }).commit();
      console.log(`✔  Patched (${svc.faq.length} FAQs): ${svc.slug}`);
    }
  }
  console.log("\nBatch 1 done.");
}

run().catch((e) => { console.error(e); process.exit(1); });
