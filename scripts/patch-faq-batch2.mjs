/**
 * patch-faq-batch2.mjs — Services 21-40
 * Run: node --env-file=.env.local scripts/patch-faq-batch2.mjs
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
    slug: "defrosting-pipes",
    faq: faq([
      {
        qet: "Kuidas aru saada, et toru on külmunud?",
        qen: "How can I tell if a pipe is frozen?",
        qru: "Как понять, что труба замёрзла?",
        aet: "Peamised märgid: kraanist ei tule vett, vooluhulk on järsult vähenenud, toru on puudutades külm ja värisemine puudub. Talvisel perioodil on see eriti levinud väliskraanikaussidel ja keldrites.",
        aen: "Main signs: no water from the tap, flow has dropped sharply, the pipe feels cold to the touch, and there is no vibration. In winter this is especially common with outside taps and basement pipes.",
        aru: "Основные признаки: из крана не идёт вода, напор резко упал, труба холодная на ощупь, нет вибрации. Зимой это особенно часто касается уличных кранов и подвальных труб.",
      },
      {
        qet: "Kas külmunud toru sulatamine on ohtlik?",
        qen: "Is defrosting a frozen pipe dangerous?",
        qru: "Опасно ли размораживать замёрзшую трубу?",
        aet: "Valesti tehtud sulatamine võib põhjustada torude lõhkemist ja ulatuslikke veekahju. Meie kasutame professionaalset seadet, mis soojendab toru ühtlaselt ja turvaliselt.",
        aen: "Improper defrosting can cause pipes to burst and lead to extensive water damage. We use professional equipment that heats the pipe evenly and safely.",
        aru: "Неправильное размораживание может привести к разрыву трубы и серьёзному ущербу. Мы используем профессиональное оборудование для равномерного и безопасного нагрева.",
      },
      {
        qet: "Kui kiiresti saate külmunud toru sulatada Tallinnas?",
        qen: "How quickly can you defrost a frozen pipe in Tallinn?",
        qru: "Как быстро вы можете разморозить трубу в Таллине?",
        aet: "Reageerime 30–60 minuti jooksul Tallinnas. Sulatamine võtab tavaliselt 1–3 tundi olenevalt toru pikkusest ja külmumise astmest.",
        aen: "We respond within 30–60 minutes in Tallinn. Defrosting usually takes 1–3 hours depending on pipe length and degree of freezing.",
        aru: "Выезжаем за 30–60 минут по Таллину. Разморозка занимает обычно 1–3 часа в зависимости от длины трубы и степени замерзания.",
      },
      {
        qet: "Kuidas külmumist tulevikus ära hoida?",
        qen: "How can I prevent pipes from freezing in the future?",
        qru: "Как предотвратить замерзание труб в будущем?",
        aet: "Paigaldage torusoojustus riskipiirkondadesse, hoidke sisetemperatuur üle 15°C, avage külmadel öödel kraanid pisut. Pakume ka torude soojustamise teenust.",
        aen: "Install pipe insulation in risk areas, keep indoor temperature above 15°C, and leave taps slightly open on cold nights. We also offer pipe insulation service.",
        aru: "Установите теплоизоляцию в зонах риска, поддерживайте температуру в помещении выше 15°C и немного открывайте краны в холодные ночи. Предлагаем и услугу утепления труб.",
      },
    ]),
  },
  {
    slug: "design",
    faq: faq([
      {
        qet: "Mida hõlmab interjööriplaneerimine TorudeAbi24 puhul?",
        qen: "What does interior planning with TorudeAbi24 include?",
        qru: "Что включает планирование интерьера от TorudeAbi24?",
        aet: "Teenus hõlmab ruumiplaneeringut, mööblipaiknemise lahendust, materjalide valikut, värviskeemat ja 3D visualiseerimist. Saate täieliku disainipaketi.",
        aen: "The service includes space planning, furniture layout, material selection, colour scheme, and 3D visualisation. You receive a complete design package.",
        aru: "Услуга включает планировку пространства, расстановку мебели, подбор материалов, цветовую схему и 3D-визуализацию. Вы получаете полный дизайн-пакет.",
      },
      {
        qet: "Kas te disainite ka väikseid ruume nagu vannituba?",
        qen: "Do you also design small spaces like bathrooms?",
        qru: "Проектируете ли вы небольшие помещения, такие как ванные комнаты?",
        aet: "Jah, disainime kõiki ruume alates vannitoast ja köögist kuni terve korteri või majani. Väikestes ruumides pöörame erilist tähelepanu ruumipärasusele.",
        aen: "Yes, we design all spaces from bathrooms and kitchens to complete apartments or houses. For small spaces we focus especially on space efficiency.",
        aru: "Да, проектируем все помещения — от ванных и кухонь до целых квартир или домов. В маленьких пространствах уделяем особое внимание эффективному использованию площади.",
      },
      {
        qet: "Kui kaua interjööriprojekti koostamine aega võtab?",
        qen: "How long does it take to prepare an interior design project?",
        qru: "Сколько времени занимает подготовка дизайн-проекта интерьера?",
        aet: "Ühe ruumi disainikontseptsioon valmib 5–10 tööpäevaga. Terve korteri projekt võtab 3–6 nädalat sõltuvalt keerukusest ja kooskõlastusele kuluvast ajast.",
        aen: "A single-room design concept takes 5–10 working days. A full apartment project takes 3–6 weeks depending on complexity and approval rounds.",
        aru: "Концепция одной комнаты готова за 5–10 рабочих дней. Проект целой квартиры занимает 3–6 недель в зависимости от сложности и процесса согласования.",
      },
      {
        qet: "Kas disainer aitab ka materjalide ja kaupade ostmisel?",
        qen: "Does the designer also help with purchasing materials and goods?",
        qru: "Помогает ли дизайнер с закупкой материалов и товаров?",
        aet: "Jah, aitame koostada ostunimekirja ja soovitame partnerettevõtteid, kust saate materjale soodsamalt hankida. Vajadusel korraldame ka hanke.",
        aen: "Yes, we help compile a shopping list and recommend partner companies where you can source materials at better prices. We can also manage procurement if needed.",
        aru: "Да, помогаем составить список закупок и рекомендуем партнёров, где можно приобрести материалы выгоднее. При необходимости организуем закупку.",
      },
    ]),
  },
  {
    slug: "dishwasher-repair",
    faq: faq([
      {
        qet: "Milliseid nõudepesumasinate rikke liike te remondite Tallinnas?",
        qen: "What dishwasher faults do you repair in Tallinn?",
        qru: "Какие неисправности посудомоечных машин вы ремонтируете в Таллине?",
        aet: "Remondime kõiki levinud rikke liike: ei kuumuta, ei tühjene, ei täitu, teeb müra, jätab plaake märjaks, uksetihendusleke ja elektroonikariked.",
        aen: "We repair all common faults: not heating, not draining, not filling, making noise, leaving dishes wet, door seal leaks, and electronic faults.",
        aru: "Ремонтируем все типичные поломки: не нагревает, не сливает, не наполняется, шумит, оставляет посуду мокрой, течёт дверной уплотнитель, электронные неисправности.",
      },
      {
        qet: "Mis maksab nõudepesumasina remont Tallinnas?",
        qen: "How much does dishwasher repair cost in Tallinn?",
        qru: "Сколько стоит ремонт посудомоечной машины в Таллине?",
        aet: "Diagnostika on tasuta. Töötund algab €35-st. Lõplik hind sõltub rikke iseloomust ja varuosade hinnast. Hinnapakkumine enne töö alustamist.",
        aen: "Diagnosis is free. Labour starts from €35/hour. Final cost depends on the fault and spare parts. A quote is given before work begins.",
        aru: "Диагностика бесплатна. Час работы от €35. Итоговая цена зависит от поломки и запчастей. Смета до начала работ.",
      },
      {
        qet: "Kas teete nõudepesumasina remonti kohapeal kodus?",
        qen: "Do you repair dishwashers on-site at home?",
        qru: "Ремонтируете ли вы посудомоечные машины прямо дома?",
        aet: "Jah, teeme kõik remonditööd kohapeal teie kodus Tallinnas ja Harjumaal. Masinat ei ole vaja ise kuhugi transportida.",
        aen: "Yes, all repairs are carried out on-site at your home in Tallinn and Harjumaa. You do not need to transport the machine anywhere.",
        aru: "Да, все ремонтные работы выполняются на дому в Таллине и Харьюмаа. Машину никуда везти не нужно.",
      },
      {
        qet: "Milliste brändide nõudepesumasinaid te remondite?",
        qen: "Which dishwasher brands do you service?",
        qru: "Какие марки посудомоечных машин вы обслуживаете?",
        aet: "Remondime kõigi peamiste brändide masinaid: Bosch, Siemens, Samsung, LG, Electrolux, AEG, Miele, Whirlpool, Beko jt.",
        aen: "We service all major brands: Bosch, Siemens, Samsung, LG, Electrolux, AEG, Miele, Whirlpool, Beko, and others.",
        aru: "Обслуживаем все основные марки: Bosch, Siemens, Samsung, LG, Electrolux, AEG, Miele, Whirlpool, Beko и другие.",
      },
    ]),
  },
  {
    slug: "drain-blockage-removal",
    faq: faq([
      {
        qet: "Mis meetodeid kasutate kanalisatsiooniummistuse eemaldamiseks?",
        qen: "What methods do you use to remove drain blockages?",
        qru: "Какие методы вы используете для устранения засора канализации?",
        aet: "Kasutame mehaanilist trasseerimist, survepesu, keemilisi vahendeid ja vajadusel videoinspektsiooni probleemi täpseks lokaliseeerimiseks.",
        aen: "We use mechanical rodding, high-pressure jetting, chemical treatment, and if needed, CCTV inspection to pinpoint the exact blockage location.",
        aru: "Используем механическую прочистку, гидродинамическую промывку, химические средства и при необходимости видеодиагностику для точного определения засора.",
      },
      {
        qet: "Kui kaua ummistuse eemaldamine aega võtab?",
        qen: "How long does drain blockage removal take?",
        qru: "Сколько времени занимает устранение засора?",
        aet: "Enamik ummistusi eemaldatakse 30–90 minutiga. Raskematel juhtudel (nt juurte tungimine torustikku) võib see kesta kauem.",
        aen: "Most blockages are cleared within 30–90 minutes. In more severe cases (e.g. root intrusion) it may take longer.",
        aru: "Большинство засоров устраняется за 30–90 минут. В сложных случаях (напр. проникновение корней) может потребоваться больше времени.",
      },
      {
        qet: "Kas hind sisaldab survepesu seadet?",
        qen: "Does the price include high-pressure jetting equipment?",
        qru: "Включает ли цена использование гидродинамической установки?",
        aet: "Esmane mehaaniline trasseemine on kaasas standardhinnas. Survepesu on lisateenus, mille hind sõltub torustiku pikkusest ja ummistuse iseloomust.",
        aen: "Initial mechanical rodding is included in the standard price. High-pressure jetting is an additional service priced on pipe length and blockage type.",
        aru: "Первичная механическая прочистка включена в стандартную цену. Гидродинамическая промывка — дополнительная услуга, цена зависит от длины трубы и типа засора.",
      },
      {
        qet: "Millised viisid aitavad ummistusi ennnetada köögis?",
        qen: "What measures help prevent kitchen drain blockages?",
        qru: "Какие меры помогают предотвратить засоры кухонной канализации?",
        aet: "Kasutage rasvafiltreid, puhastage sifoon igakuiselt ja vältige rasva, kohvipaksude ja toidujäätmete valamist kanalisatsiooni. Soovitame ka profülaktilist survepesu kord aastas.",
        aen: "Use grease traps, clean the siphon monthly, and avoid pouring fat, coffee grounds, and food waste down the drain. Annual preventive jetting is also recommended.",
        aru: "Используйте жироуловители, ежемесячно чистите сифон и не выливайте в канализацию жир, кофейную гущу и пищевые отходы. Рекомендуем ежегодную профилактическую промывку.",
      },
    ]),
  },
  {
    slug: "drywall-works",
    faq: faq([
      {
        qet: "Milliseid kipskarkassitöid te Tallinnas teete?",
        qen: "What drywall works do you carry out in Tallinn?",
        qru: "Какие гипсокартонные работы вы выполняете в Таллине?",
        aet: "Teeme vaheseinu, ripplaesid, niššisid, tulekindlaid konstruktsioone ja välimise soojustuse katteid kipskarkassist Tallinnas ja Harjumaal.",
        aen: "We build partition walls, suspended ceilings, niches, fire-resistant constructions, and external insulation cladding in drywall in Tallinn and Harjumaa.",
        aru: "Возводим перегородки, подвесные потолки, ниши, огнестойкие конструкции и облицовку внешнего утепления из гипсокартона в Таллине и Харьюмаа.",
      },
      {
        qet: "Mis maksab kipsseina ehitamine Tallinnas?",
        qen: "How much does building a drywall partition cost in Tallinn?",
        qru: "Сколько стоит возведение гипсокартонной перегородки в Таллине?",
        aet: "Lihtne kipskarkas vahesein algab €25/m² (koos materjalidega). Heli- ja tulekindlus tõstab hinda. Tasuta mõõduvõtt ja hinnapakkumine.",
        aen: "A simple drywall partition starts from €25/m² including materials. Sound and fire insulation increases the price. Free measurement and quote.",
        aru: "Простая гипсокартонная перегородка от €25/м² (с материалами). Звуко- и огнезащита увеличивают стоимость. Бесплатный замер и смета.",
      },
      {
        qet: "Kas kipskarkas sobib vannitoaseina jaoks?",
        qen: "Is drywall suitable for a bathroom wall?",
        qru: "Подходит ли гипсокартон для стен в ванной комнате?",
        aet: "Vannitoades kasutame ainult niiskuskindlat (rohelist) kipskarkast, mis on mõeldud kõrgniiskusega ruumidesse. Enne plaatimist töötleme pinna veepidava krundiga.",
        aen: "In bathrooms we use only moisture-resistant (green) drywall designed for high-humidity spaces. Before tiling we treat the surface with a waterproof primer.",
        aru: "В ванных комнатах используем только влагостойкий (зелёный) гипсокартон, предназначенный для помещений с высокой влажностью. Перед укладкой плитки обрабатываем поверхность гидрогрунтовкой.",
      },
      {
        qet: "Kui kaua kipsseina ehitamine aega võtab?",
        qen: "How long does drywall construction take?",
        qru: "Сколько времени занимает возведение гипсокартонной конструкции?",
        aet: "Ühe vaheseinaplaani paigaldamine (krohvimiseta) võtab tavaliselt 4–8 tundi. Suuremad projektid (lagi + seinad) võtavad 2–5 tööpäeva.",
        aen: "Installing a single partition (without plastering) typically takes 4–8 hours. Larger projects (ceiling + walls) take 2–5 working days.",
        aru: "Установка одной перегородки (без шпаклёвки) обычно занимает 4–8 часов. Крупные проекты (потолок + стены) — 2–5 рабочих дней.",
      },
    ]),
  },
  {
    slug: "electrical-installation",
    faq: faq([
      {
        qet: "Milliseid elektriseadmete paigaldusi te Tallinnas teete?",
        qen: "What electrical installations do you carry out in Tallinn?",
        qru: "Какие электромонтажные работы вы выполняете в Таллине?",
        aet: "Teeme täielikku elektrisüsteemi paigaldust, juhtmestamist, kilbi paigaldust, pistikupesade ja lülitite paigaldust, maandamist ja peakaabli vahetust.",
        aen: "We carry out complete electrical system installation, wiring, panel fitting, socket and switch installation, earthing, and mains cable replacement.",
        aru: "Выполняем полный монтаж электросистем, прокладку кабелей, установку щитков, розеток и выключателей, заземление и замену вводного кабеля.",
      },
      {
        qet: "Kas elektriku tööde jaoks on Eestis litsents vajalik?",
        qen: "Is a licence required for electrical work in Estonia?",
        qru: "Нужна ли лицензия для электромонтажных работ в Эстонии?",
        aet: "Jah, elektritöid tohib teha ainult sertifitseeritud ja litsentseeritud elektrik. Kõik meie elektrikud omavad vajalikke lube ja sertifikaate.",
        aen: "Yes, electrical work may only be carried out by a certified and licensed electrician. All our electricians hold the required permits and certificates.",
        aru: "Да, электромонтажные работы может выполнять только сертифицированный и лицензированный электрик. Все наши специалисты имеют необходимые допуски и сертификаты.",
      },
      {
        qet: "Kas annate elektripaigaldusele garantii?",
        qen: "Do you provide a warranty on electrical installation?",
        qru: "Даёте ли вы гарантию на электромонтаж?",
        aet: "Jah, kõigile meie elektritöödele kehtib 2-aastane garantii. Väljastame ka elektritöö akti, mis on vajalik kindlustuseks ja kinnisvara müümisel.",
        aen: "Yes, all our electrical work carries a 2-year warranty. We also issue an electrical completion certificate, required for insurance and property sale.",
        aru: "Да, на все электромонтажные работы даём 2-летнюю гарантию. Также выдаём акт выполненных работ, необходимый для страховки и продажи недвижимости.",
      },
      {
        qet: "Kui palju maksab korteri täielik ümberjuhtmestamine Tallinnas?",
        qen: "How much does complete rewiring of an apartment cost in Tallinn?",
        qru: "Сколько стоит полная замена проводки в квартире в Таллине?",
        aet: "Ühe magamistoaga korteri täielik ümberjuhtmestamine maksab ligikaudu €1 500–3 000 sõltuvalt ruumide arvust ja kaablite pikkusest. Tasuta hinnapakkumine.",
        aen: "Complete rewiring of a one-bedroom apartment costs approximately €1,500–3,000 depending on the number of rooms and cable runs. Free quote available.",
        aru: "Полная замена проводки в однокомнатной квартире обходится примерно €1 500–3 000 в зависимости от количества комнат и длины кабелей. Бесплатная оценка.",
      },
    ]),
  },
  {
    slug: "electrician-services",
    faq: faq([
      {
        qet: "Millised elektrikutööd on kõige sagedamini tellitavad Tallinnas?",
        qen: "What are the most commonly requested electrician jobs in Tallinn?",
        qru: "Какие работы электрика чаще всего заказывают в Таллине?",
        aet: "Levinuimad tööd: pistikupesade ja lülitite paigaldus, kaitseautomaatide vahetus, valgustitite monteerimine, tüherdusmahutite ühendamine ja elektrikilbi kaasajastamine.",
        aen: "Most common jobs: fitting sockets and switches, replacing circuit breakers, installing light fixtures, connecting appliances, and upgrading electrical panels.",
        aru: "Самые частые работы: установка розеток и выключателей, замена автоматов, монтаж светильников, подключение приборов и модернизация электрощита.",
      },
      {
        qet: "Kui kiiresti elektriku töö Tallinnas tellida saab?",
        qen: "How quickly can an electrician job in Tallinn be booked?",
        qru: "Как быстро можно заказать электрика в Таллине?",
        aet: "Tavapärased elektritööd saame teha 24–48 tunni jooksul. Avariidel reageerime 30–60 minutiga ööpäevaringselt.",
        aen: "Regular electrical work can be booked within 24–48 hours. For emergencies we respond within 30–60 minutes, 24/7.",
        aru: "Плановые электроработы выполняем в течение 24–48 часов. На аварии выезжаем за 30–60 минут круглосуточно.",
      },
      {
        qet: "Mis maksab elektrik Tallinnas tunnihinna alusel?",
        qen: "What is the hourly rate for an electrician in Tallinn?",
        qru: "Какова почасовая ставка электрика в Таллине?",
        aet: "Töötund algab €35-st. Tööpäeviti 08:00–19:00 kehtib -30% soodustus. Öösel ja nädalavahetusel lisandub €10 väljakutsetasu.",
        aen: "Labour starts from €35/hour. A -30% discount applies weekdays 08:00–19:00. Night and weekend work has a €10 surcharge.",
        aru: "Час работы от €35. Скидка -30% по будням 08:00–19:00. Ночью и в выходные добавляется €10 за вызов.",
      },
      {
        qet: "Kas teete ka väikseid elektritöid, nagu ühe pistikupesa paigaldus?",
        qen: "Do you carry out small electrical jobs like fitting a single socket?",
        qru: "Выполняете ли вы небольшие электроработы, например установку одной розетки?",
        aet: "Jah, miinimum töö on 1 tund. Selle aja jooksul saame paigaldada mitu pistikupesa, vahetada kaitsmed või lahendada muu lihtsa elektririkke.",
        aen: "Yes, the minimum job is 1 hour. In that time we can fit multiple sockets, replace fuses, or fix another simple electrical fault.",
        aru: "Да, минимум — 1 час. За это время можно установить несколько розеток, заменить предохранители или устранить другую простую неисправность.",
      },
    ]),
  },
  {
    slug: "entrance-repair",
    faq: faq([
      {
        qet: "Mida hõlmab trepikoja renoveerimine Tallinnas?",
        qen: "What does stairwell renovation in Tallinn include?",
        qru: "Что включает ремонт лестничной клетки в Таллине?",
        aet: "Trepikoja renoveerimine hõlmab seinte krohvimist ja värvimist, põrandate katte vahetust, lampide uuendamist, postkastitahvlite paigaldust ja vajadusel uksevahetust.",
        aen: "Stairwell renovation includes wall plastering and painting, floor covering replacement, lighting upgrade, letterbox installation, and door replacement if needed.",
        aru: "Ремонт подъезда включает штукатурку и покраску стен, замену напольного покрытия, модернизацию освещения, установку почтовых ящиков и при необходимости замену дверей.",
      },
      {
        qet: "Mis maksab trepikoja renoveerimine Tallinnas?",
        qen: "How much does stairwell renovation cost in Tallinn?",
        qru: "Сколько стоит ремонт лестничной клетки в Таллине?",
        aet: "Korruse trepikoja lihtremont algab €800-st. Täielik renoveerimine (5-korruselises majas) maksab €4 000–12 000 sõltuvalt töömahust. Tasuta hinnapakkumine.",
        aen: "Basic one-floor stairwell repair starts from €800. Full renovation (5-storey building) costs €4,000–12,000 depending on scope. Free quote.",
        aru: "Базовый ремонт одного этажа подъезда от €800. Полный ремонт (5-этажного дома) €4 000–12 000 в зависимости от объёма работ. Бесплатная смета.",
      },
      {
        qet: "Kas trepikoja renoveerimiseks on vaja korteriühistu otsust?",
        qen: "Does stairwell renovation require an apartment association decision?",
        qru: "Нужно ли решение товарищества квартировладельцев для ремонта подъезда?",
        aet: "Jah, trepikoja renoveerimine on ühisvara töö ja nõuab KÜ üldkoosoleku otsust. Aitame KÜ juhatust dokumentide ettevalmistamisel ja hinnapakkumise esitamisel.",
        aen: "Yes, stairwell renovation involves common property and requires an apartment association general meeting decision. We help the board with documentation and quotation.",
        aru: "Да, ремонт подъезда затрагивает общее имущество и требует решения общего собрания ТКВ. Помогаем правлению с документацией и представлением сметы.",
      },
      {
        qet: "Kas töötate ka elanike kohaloleku ajal?",
        qen: "Do you work while residents are present in the building?",
        qru: "Работаете ли вы в присутствии жильцов в здании?",
        aet: "Jah, teeme trepikoja renoveerimist ilma elanikke häirimata. Tagame juurdepääsu korteritesse kogu töö ajal ja koristame ehitusjäätmed iga päev.",
        aen: "Yes, we renovate stairwells without disrupting residents. We maintain access to apartments throughout, and clear construction waste daily.",
        aru: "Да, ремонтируем подъезды, не мешая жильцам. Обеспечиваем доступ к квартирам в течение всего ремонта и ежедневно убираем строительный мусор.",
      },
    ]),
  },
  {
    slug: "external-water-supply",
    faq: faq([
      {
        qet: "Mida hõlmab väliste kommunikatsioonide paigaldus Tallinnas?",
        qen: "What does external utility network installation in Tallinn include?",
        qru: "Что включает монтаж внешних инженерных сетей в Таллине?",
        aet: "Teenus hõlmab veetorude, kanalisatsioonitrasside, sademevee süsteemide ja septiku paigaldust kruntidel Tallinnas ja Harjumaal, koos maakaevude rajamisega.",
        aen: "The service includes installation of water mains, sewer lines, stormwater systems, and septic tanks on plots in Tallinn and Harjumaa, including digging inspection chambers.",
        aru: "Услуга включает прокладку водопровода, канализационных трасс, ливневых систем и монтаж септиков на участках в Таллине и Харьюмаа, включая устройство смотровых колодцев.",
      },
      {
        qet: "Kas väliste kommunikatsioonide paigaldamiseks on vaja luba?",
        qen: "Is a permit required for external utility network installation?",
        qru: "Нужно ли разрешение для прокладки внешних инженерных сетей?",
        aet: "Jah, välisvõrkude rajamine nõuab ehitusluba ja kooskõlastust kommunaalettevõtetega. Aitame kõigi dokumentide ettevalmistamisega.",
        aen: "Yes, external network installation requires a building permit and coordination with utilities. We help prepare all the necessary documents.",
        aru: "Да, прокладка внешних сетей требует разрешения на строительство и согласования с коммунальными службами. Помогаем с подготовкой всей документации.",
      },
      {
        qet: "Millise sügavuseni tuleb veetoru matta?",
        qen: "How deep should a water pipe be buried?",
        qru: "На какую глубину нужно закапывать водопроводную трубу?",
        aet: "Eestis tuleb veetoru matta vähemalt 1,5–2 meetri sügavusele, et see talvel ei külmuks. Kanalisatsioonitrasside sügavus sõltub maastiku kaldest.",
        aen: "In Estonia, water pipes must be buried at least 1.5–2 metres deep to prevent winter freezing. Sewer trench depth depends on the slope of the terrain.",
        aru: "В Эстонии водопроводные трубы укладывают на глубину не менее 1,5–2 метров, чтобы они не замерзали зимой. Глубина канализации зависит от уклона рельефа.",
      },
      {
        qet: "Mis maksab septiku paigaldamine Harjumaal?",
        qen: "How much does septic tank installation cost in Harjumaa?",
        qru: "Сколько стоит монтаж септика в Харьюмаа?",
        aet: "Septiku paigaldamine maksab €2 500–6 000 olenevalt mahust, pinnasest ja lisasüsteemidest. Hinnapakkumine pärast tasuta ülevaatust.",
        aen: "Septic tank installation costs €2,500–6,000 depending on capacity, soil conditions, and additional systems. Quote after a free site inspection.",
        aru: "Монтаж септика стоит €2 500–6 000 в зависимости от объёма, грунтовых условий и дополнительных систем. Смета после бесплатного осмотра.",
      },
    ]),
  },
  {
    slug: "facade-works",
    faq: faq([
      {
        qet: "Milliseid fassaaditöid te Tallinnas teete?",
        qen: "What facade works do you carry out in Tallinn?",
        qru: "Какие фасадные работы вы выполняете в Таллине?",
        aet: "Teeme fassaadisoojustust, krohvimist, värvimist, klinker- ja kompoziitplaatide paigaldust ning vana fassaadi renoveerimist Tallinnas ja Harjumaal.",
        aen: "We carry out facade insulation, plastering, painting, clinker and composite panel cladding, and renovation of existing facades in Tallinn and Harjumaa.",
        aru: "Выполняем утепление фасадов, штукатурку, покраску, монтаж клинкерных и композитных панелей, а также реновацию существующих фасадов в Таллине и Харьюмаа.",
      },
      {
        qet: "Mis maksab maja fassaadisoojustus Tallinnas?",
        qen: "How much does house facade insulation cost in Tallinn?",
        qru: "Сколько стоит утепление фасада дома в Таллине?",
        aet: "Fassaadisoojustus (mineraalvilla + krohv) algab €60/m². Kliinkerkivi või kompositvooderdisega variandid on kallimad. Tasuta ülevaatus ja hinnapakkumine.",
        aen: "Facade insulation (mineral wool + plaster) starts from €60/m². Clinker brick or composite cladding options are higher. Free inspection and quote.",
        aru: "Утепление фасада (минвата + штукатурка) от €60/м². Варианты с клинкером или композитной облицовкой дороже. Бесплатный осмотр и смета.",
      },
      {
        qet: "Kas fassaaditööde jaoks on Tallinnas ehitusluba vaja?",
        qen: "Is a building permit required for facade works in Tallinn?",
        qru: "Нужно ли разрешение на строительство для фасадных работ в Таллине?",
        aet: "See sõltub töö mahust. Värvimist ja krohvimist ei nõua tavaliselt luba. Soojustus ja fassaadi muutmine nõuavad sageli ehitusteatis või -luba. Aitame selgitada.",
        aen: "It depends on the scope. Painting and plastering usually don't require a permit. Insulation and facade alterations often need a notification or permit. We help clarify.",
        aru: "Зависит от объёма работ. Покраска и штукатурка обычно не требуют разрешения. Утепление и изменение фасада часто требуют уведомления или разрешения. Поможем разобраться.",
      },
      {
        qet: "Millal on parim aeg fassaaditöödeks Tallinnas?",
        qen: "When is the best time for facade works in Tallinn?",
        qru: "Когда лучшее время для фасадных работ в Таллине?",
        aet: "Parim aeg on mai–september, kui temperatuur on üle +5°C. Krohvimine ja värvimistööd ei sobi külmades tingimustes. Soojustus on võimalik ka sügiseti.",
        aen: "The best period is May–September when temperatures stay above +5°C. Plastering and painting are not suitable in cold conditions. Insulation is possible in autumn too.",
        aru: "Лучшее время — май–сентябрь, когда температура выше +5°C. Штукатурка и покраска не подходят при морозе. Утепление возможно и осенью.",
      },
    ]),
  },
  {
    slug: "floor-heating",
    faq: faq([
      {
        qet: "Millised on põrandakütte tüübid Tallinna korteritele?",
        qen: "What types of underfloor heating are available for Tallinn apartments?",
        qru: "Какие виды тёплого пола доступны для квартир в Таллине?",
        aet: "Pakume vee-põrandakütet (ühendub küttekatla külge) ja elektrilist põrandakütet (kaabel või matt). Korterites on enamasti populaarsem elektriline variant.",
        aen: "We offer water underfloor heating (connected to the boiler) and electric underfloor heating (cable or mat). In apartments the electric option is more popular.",
        aru: "Предлагаем водяной тёплый пол (подключается к котлу) и электрический (кабель или мат). В квартирах чаще популярен электрический вариант.",
      },
      {
        qet: "Mis maksab põrandakütte paigaldamine Tallinnas?",
        qen: "How much does underfloor heating installation cost in Tallinn?",
        qru: "Сколько стоит установка тёплого пола в Таллине?",
        aet: "Elektriline põrandakütematt algab €25/m² (paigaldusega). Kaabelpõrandaküte on pisut kallim. Vee-põrandaküte sõltub hoone soojussüsteemist.",
        aen: "Electric underfloor heating mat starts from €25/m² including installation. Cable underfloor heating is slightly higher. Water underfloor heating depends on the building's heating system.",
        aru: "Электрический мат тёплого пола от €25/м² с монтажом. Кабельный тёплый пол немного дороже. Водяной тёплый пол зависит от системы отопления здания.",
      },
      {
        qet: "Kas põrandaküte sobib ka vannitoasse?",
        qen: "Is underfloor heating suitable for a bathroom?",
        qru: "Подходит ли тёплый пол для ванной комнаты?",
        aet: "Jah, vannituba on üks levinuim põrandakütte paigalduse koht. Kasutame niiskuskindlaid kaableid ja matte, mis vastavad Eesti elektriohutuse normidele.",
        aen: "Yes, the bathroom is one of the most common underfloor heating locations. We use moisture-resistant cables and mats that comply with Estonian electrical safety standards.",
        aru: "Да, ванная комната — одно из самых распространённых мест для тёплого пола. Используем влагостойкие кабели и маты, соответствующие нормам электробезопасности Эстонии.",
      },
      {
        qet: "Kas põrandaküte kulutab palju elektrit?",
        qen: "Does underfloor heating consume a lot of electricity?",
        qru: "Потребляет ли тёплый пол много электроэнергии?",
        aet: "Elektritar bei kasutamine on efektiivne, kui kasutate termostaati ja ajakava. Vannitoa (5 m²) ülalpidamine maksab ca €5–10 kuus tavalise kasutuse korral.",
        aen: "Consumption is efficient when you use a thermostat and schedule. Running a bathroom (5 m²) costs approximately €5–10 per month with normal use.",
        aru: "Потребление эффективно при использовании термостата и расписания. Обслуживание ванной (5 м²) обходится примерно в €5–10 в месяц при обычном использовании.",
      },
    ]),
  },
  {
    slug: "flooring-works",
    faq: faq([
      {
        qet: "Milliseid põrandakatteid te Tallinnas paigaldate?",
        qen: "What flooring types do you install in Tallinn?",
        qru: "Какие напольные покрытия вы укладываете в Таллине?",
        aet: "Paigaldame laminaati, parkettt, vinüülpõrandat (LVT), plaate, vaipu ja epoksüpõrandaid nii korterelamutesse kui äriruumidesse Tallinnas.",
        aen: "We install laminate, parquet, vinyl flooring (LVT), tiles, carpet, and epoxy floors in both residential apartments and commercial premises in Tallinn.",
        aru: "Укладываем ламинат, паркет, виниловый пол (LVT), плитку, ковролин и эпоксидные полы как в жилых квартирах, так и в коммерческих помещениях Таллина.",
      },
      {
        qet: "Mis maksab laminaatpõranda paigaldamine Tallinnas?",
        qen: "How much does laminate flooring installation cost in Tallinn?",
        qru: "Сколько стоит укладка ламинатного пола в Таллине?",
        aet: "Laminaatpõranda paigaldus (ilma materjalideta) algab €10/m². Koos materjalidega algab €25/m² sõltuvalt laminaadi klassist.",
        aen: "Laminate installation (excluding materials) starts from €10/m². Including materials from €25/m² depending on laminate grade.",
        aru: "Укладка ламината (без материалов) от €10/м². С материалами от €25/м² в зависимости от класса ламината.",
      },
      {
        qet: "Kui kaua põranda paigaldamine aega võtab?",
        qen: "How long does flooring installation take?",
        qru: "Сколько времени занимает укладка напольного покрытия?",
        aet: "Kahetoalise korteri laminaatpõrand paigaldatakse 1 tööpäevaga. Plaatimistöö võtab kauem sõltuvalt pindalast ja mustri keerukusest.",
        aen: "Laminate flooring in a two-room apartment is installed in 1 working day. Tiling takes longer depending on area and pattern complexity.",
        aru: "Ламинат в двухкомнатной квартире укладывается за 1 рабочий день. Плитка занимает дольше — зависит от площади и сложности узора.",
      },
      {
        qet: "Kas te valmistate ka põrandat ette enne paigaldust?",
        qen: "Do you also prepare the floor before installation?",
        qru: "Выполняете ли вы подготовку пола перед укладкой?",
        aet: "Jah, teeme vajalikud ettevalmistustööd: vana katte eemaldamine, tasandamise, praguparanduse ja niiskusbarjääri paigaldamise.",
        aen: "Yes, we carry out necessary preparation: removing old covering, levelling, crack repair, and installing a moisture barrier.",
        aru: "Да, выполняем необходимую подготовку: снятие старого покрытия, нивелировку, ремонт трещин и укладку парозащитного слоя.",
      },
    ]),
  },
  {
    slug: "gas-appliance-installation",
    faq: faq([
      {
        qet: "Milliseid gaasiseadmeid te Tallinnas paigaldate?",
        qen: "What gas appliances do you install in Tallinn?",
        qru: "Какое газовое оборудование вы устанавливаете в Таллине?",
        aet: "Paigaldame gaasipliite, gaasikatlaid, gaasikombisid, gaasi boilereid ja muid gaasiseadmeid. Kõik tööd teostab litsentseeritud gaasitehnik.",
        aen: "We install gas cookers, gas boilers, combi boilers, gas water heaters, and other gas appliances. All work is carried out by a licensed gas technician.",
        aru: "Устанавливаем газовые плиты, газовые котлы, комбинированные котлы, газовые водонагреватели и другое газовое оборудование. Работы выполняет лицензированный газовый техник.",
      },
      {
        qet: "Kas gaasiseadmete paigaldamiseks on vaja litsents?",
        qen: "Is a licence required to install gas appliances?",
        qru: "Нужна ли лицензия для установки газового оборудования?",
        aet: "Jah, gaasitöid tohib teha ainult litsentseeritud gaasimontöör. Kõik meie tehnikud omavad Eestis kehtivaid gaasilube. Pärast paigaldust tehakse kohustuslik survetilte test.",
        aen: "Yes, gas work may only be performed by a licensed gas fitter. All our technicians hold valid Estonian gas permits. A mandatory pressure test is carried out after installation.",
        aru: "Да, газовые работы может выполнять только лицензированный газовый монтажник. Все наши техники имеют действующие газовые допуски в Эстонии. После монтажа — обязательный опрессовочный тест.",
      },
      {
        qet: "Mis maksab gaasipliidi paigaldamine Tallinnas?",
        qen: "How much does gas cooker installation cost in Tallinn?",
        qru: "Сколько стоит установка газовой плиты в Таллине?",
        aet: "Gaasipliidi paigaldamine algab €75-st (ilma vooliku ja regulaatorita). Lisavarustus arvestatakse eraldi. Hind sõltub töö mahust.",
        aen: "Gas cooker installation starts from €75 (excluding hose and regulator). Additional equipment is priced separately. Price depends on job scope.",
        aru: "Установка газовой плиты от €75 (без шланга и редуктора). Дополнительное оборудование оплачивается отдельно. Цена зависит от объёма работ.",
      },
      {
        qet: "Kas annate gaasiseadmete paigaldusele garantii?",
        qen: "Do you provide a warranty on gas appliance installation?",
        qru: "Даёте ли вы гарантию на установку газового оборудования?",
        aet: "Jah, kõigile paigaldustöödele anname 2-aastase garantii. Väljastame gaasitöö akti, mis on vajalik kindlustuseks ja seadme kasutamiseks.",
        aen: "Yes, all installation work carries a 2-year warranty. We issue a gas work completion certificate, required for insurance and operating the appliance.",
        aru: "Да, на все монтажные работы даём 2-летнюю гарантию. Выдаём акт на газовые работы, необходимый для страховки и эксплуатации оборудования.",
      },
    ]),
  },
  {
    slug: "gas-leak-detection",
    faq: faq([
      {
        qet: "Mida teha, kui tunnete gaasilõhna Tallinnas?",
        qen: "What should I do if I smell gas in Tallinn?",
        qru: "Что делать, если вы чувствуете запах газа в Таллине?",
        aet: "Ärge lülitage elektrit sisse ega välja. Avage aknad, lahkuge ruumist ja helistage kohe +372 56 89 79 29. Vältige lahtist tuld. Teavitage ka gaasifirmat.",
        aen: "Do not switch any electrics on or off. Open windows, leave the room, and call +372 56 89 79 29 immediately. Avoid open flames. Also notify the gas supplier.",
        aru: "Не включайте и не выключайте электроприборы. Откройте окна, покиньте помещение и срочно звоните +372 56 89 79 29. Не допускайте открытого огня. Уведомите поставщика газа.",
      },
      {
        qet: "Milliste vahenditega leiate gaasileket?",
        qen: "What equipment do you use to detect gas leaks?",
        qru: "Какое оборудование вы используете для обнаружения утечки газа?",
        aet: "Kasutame professionaalseid elektroonilisi gaasidetekoreid, survetestimist ja vajadusel vahendiga kontrollimist lekkekoha täpseks lokaliseeerimiseks.",
        aen: "We use professional electronic gas detectors, pressure testing, and leak-detection fluid to pinpoint the exact location of the leak.",
        aru: "Используем профессиональные электронные газоанализаторы, опрессовку и мыльный раствор для точного определения места утечки.",
      },
      {
        qet: "Kas gaasileke on tõsine oht?",
        qen: "Is a gas leak a serious hazard?",
        qru: "Является ли утечка газа серьёзной опасностью?",
        aet: "Jah, gaas on tuleohtlik ja potentsiaalselt plahvatusohtlik. Isegi väike leke tuleb koheselt kõrvaldada. Helistage meile ööpäevaringselt: +372 56 89 79 29.",
        aen: "Yes, gas is flammable and potentially explosive. Even a small leak must be fixed immediately. Call us 24/7: +372 56 89 79 29.",
        aru: "Да, газ горюч и потенциально взрывоопасен. Даже небольшую утечку нужно устранить немедленно. Звоните круглосуточно: +372 56 89 79 29.",
      },
      {
        qet: "Kui kiiresti te gaasilekke korral kohale jõuate?",
        qen: "How quickly do you arrive for a gas leak emergency?",
        qru: "Как быстро вы прибываете при утечке газа?",
        aet: "Reageerime gaasilekke avariidele prioriteedina — 30–60 minuti jooksul Tallinnas ja Harjumaal ööpäevaringselt.",
        aen: "We treat gas leak emergencies as top priority — we arrive within 30–60 minutes across Tallinn and Harjumaa, 24/7.",
        aru: "Утечки газа обрабатываем в приоритетном порядке — прибываем в течение 30–60 минут по Таллину и Харьюмаа круглосуточно.",
      },
    ]),
  },
  {
    slug: "gas-pipeline-construction",
    faq: faq([
      {
        qet: "Millised load on vajalikud gaasitrassi rajamiseks Eestis?",
        qen: "What permits are required for gas pipeline construction in Estonia?",
        qru: "Какие разрешения нужны для строительства газопровода в Эстонии?",
        aet: "Gaasitrassi rajamine nõuab ehitusluba, kooskõlastust Elering AS-ga ja kohaliku omavalitsuse nõusolekut. Aitame kõigi dokumentide koostamisel.",
        aen: "Gas pipeline construction requires a building permit, coordination with Elering AS, and local government consent. We help prepare all the necessary documents.",
        aru: "Строительство газопровода требует разрешения на строительство, согласования с Elering AS и согласия местного самоуправления. Помогаем с подготовкой всей документации.",
      },
      {
        qet: "Mis materjale kasutate gaasitrasside rajamisel?",
        qen: "What materials do you use for gas pipeline construction?",
        qru: "Какие материалы вы используете при строительстве газопровода?",
        aet: "Kasutame ainult sertifitseeritud PE (polüetüleen) ja terastorusid, mis vastavad Euroopa gaasisüsteemide standarditele ja Eesti õigusaktide nõuetele.",
        aen: "We use only certified PE (polyethylene) and steel pipes that comply with European gas system standards and Estonian regulatory requirements.",
        aru: "Используем только сертифицированные трубы из полиэтилена (ПЭ) и стали, соответствующие европейским стандартам газовых систем и требованиям законодательства Эстонии.",
      },
      {
        qet: "Kas teete ka gaasitrassi maapaigaldust?",
        qen: "Do you also carry out underground gas pipeline installation?",
        qru: "Выполняете ли вы подземную прокладку газопровода?",
        aet: "Jah, teeme nii maa-aluseid kui maapealset gaasitrasside paigaldust. Maa-alused trassid kaitstakse korrosioonivastase kaitsega.",
        aen: "Yes, we carry out both underground and above-ground gas pipeline installation. Underground lines are protected with anti-corrosion coating.",
        aru: "Да, выполняем как подземную, так и наземную прокладку газопроводов. Подземные трассы защищаются антикоррозионным покрытием.",
      },
      {
        qet: "Kui kaua gaasitrassi rajamine kestab?",
        qen: "How long does gas pipeline construction take?",
        qru: "Сколько времени занимает строительство газопровода?",
        aet: "Tavapärane eramaja gaasitrass (kuni 50 m) valmistatakse 2–5 tööpäevaga pärast lubade saamist. Suuremate projektide tähtaeg sõltub töö mahust.",
        aen: "A typical private house gas line (up to 50 m) is completed in 2–5 working days after permits are obtained. Timelines for larger projects depend on scope.",
        aru: "Типовой газопровод для частного дома (до 50 м) прокладывается за 2–5 рабочих дней после получения разрешений. Сроки для крупных проектов зависят от объёма.",
      },
    ]),
  },
  {
    slug: "gas-works",
    faq: faq([
      {
        qet: "Milliseid gaasitöid te Tallinnas teete?",
        qen: "What gas works do you carry out in Tallinn?",
        qru: "Какие газовые работы вы выполняете в Таллине?",
        aet: "Teeme gaasikatelde paigaldust ja hooldust, gaasilekete kõrvaldamist, gaasitrasside ehitust, gaasiseadmete ühendamist ja gaasisüsteemide kontrollimist.",
        aen: "We carry out gas boiler installation and servicing, gas leak repair, gas pipeline construction, appliance connection, and gas system inspection.",
        aru: "Выполняем монтаж и обслуживание газовых котлов, устранение утечек, строительство газопроводов, подключение оборудования и проверку газовых систем.",
      },
      {
        qet: "Kas teil on gaasitöödeks vajalik litsents Eestis?",
        qen: "Do you hold the required licence for gas work in Estonia?",
        qru: "Есть ли у вас лицензия на газовые работы в Эстонии?",
        aet: "Jah, kõik meie gaasitehnikud on litsentseeritud ja sertifitseeritud vastavalt Eesti gaasiseadusele. Pärast töid väljastame vajalikud aktid.",
        aen: "Yes, all our gas technicians are licensed and certified in accordance with Estonian Gas Act. After work is completed we issue the required certificates.",
        aru: "Да, все наши газовые техники лицензированы и сертифицированы в соответствии с Законом о газе Эстонии. После выполнения работ выдаём необходимые акты.",
      },
      {
        qet: "Kui kiiresti saate gaasiavariile reageerida Tallinnas?",
        qen: "How quickly can you respond to a gas emergency in Tallinn?",
        qru: "Как быстро вы можете отреагировать на газовую аварию в Таллине?",
        aet: "Gaasiavariile reageerime 30–60 minuti jooksul ööpäevaringselt. Helistage +372 56 89 79 29 kohe.",
        aen: "We respond to gas emergencies within 30–60 minutes, 24/7. Call +372 56 89 79 29 immediately.",
        aru: "На газовые аварии выезжаем в течение 30–60 минут круглосуточно. Звоните +372 56 89 79 29 немедленно.",
      },
      {
        qet: "Kas annate gaasitöödele garantii?",
        qen: "Do you provide a warranty on gas works?",
        qru: "Даёте ли вы гарантию на газовые работы?",
        aet: "Jah, kõigile gaasitöödele anname 2-aastase garantii. Väljastame gaasitöö akti, mis on vajalik kindlustuseks ja korteri üleandmiseks.",
        aen: "Yes, all gas work carries a 2-year warranty. We issue a gas work certificate, required for insurance and property handover.",
        aru: "Да, на все газовые работы даём 2-летнюю гарантию. Выдаём акт на газовые работы, необходимый для страховки и передачи имущества.",
      },
    ]),
  },
  {
    slug: "handyman-services",
    faq: faq([
      {
        qet: "Milliseid majapidamistöid te Tallinnas teete?",
        qen: "What handyman jobs do you carry out in Tallinn?",
        qru: "Какие работы по дому вы выполняете в Таллине?",
        aet: "Teeme mööbli kokkupanekut, piltide riputamist, kardinapeede paigaldust, väikseid plaadiremondi töid, uste seadistamist, silikoonimist ja muid väiketöid.",
        aen: "We assemble furniture, hang pictures and curtain rails, do minor tile repairs, adjust doors, apply silicone sealant, and carry out other small jobs.",
        aru: "Собираем мебель, вешаем картины и карнизы, делаем мелкий ремонт плитки, регулируем двери, наносим силикон и выполняем другие мелкие работы.",
      },
      {
        qet: "Mis maksab käsitöötegija tund Tallinnas?",
        qen: "What is the hourly rate for a handyman in Tallinn?",
        qru: "Какова почасовая ставка мастера на все руки в Таллине?",
        aet: "Töötund algab €35-st. Tööpäeviti 08:00–19:00 kehtib -30% soodustus. Miinimum töö on 1 tund. Maksate pärast töö lõpetamist.",
        aen: "Labour starts from €35/hour. A -30% discount applies weekdays 08:00–19:00. Minimum job is 1 hour. You pay after work is completed.",
        aru: "Час работы от €35. Скидка -30% по будням 08:00–19:00. Минимум — 1 час. Оплата после выполнения работы.",
      },
      {
        qet: "Kui kiiresti käsitöötegija Tallinnasse jõuab?",
        qen: "How quickly does a handyman arrive in Tallinn?",
        qru: "Как быстро мастер приедет в Таллин?",
        aet: "Tavaliselt saame broneerida aja 24–48 tunni jooksul. Kiiremates olukordades püüame leida varasema aja.",
        aen: "We can usually book a slot within 24–48 hours. For urgent cases we try to find an earlier appointment.",
        aru: "Обычно можем забронировать время в течение 24–48 часов. В срочных случаях стараемся найти более ранний слот.",
      },
      {
        qet: "Kas toon oma tööriistad kaasa?",
        qen: "Do you bring your own tools?",
        qru: "Вы приезжаете со своими инструментами?",
        aet: "Jah, meie käsitöötegijad toovad kõik vajalikud tööriistad kaasa. Materjale saame vajaduse korral ka ise hankida.",
        aen: "Yes, our handymen bring all necessary tools. If needed, we can also source materials ourselves.",
        aru: "Да, наши мастера привозят все необходимые инструменты. При необходимости можем самостоятельно закупить материалы.",
      },
    ]),
  },
  {
    slug: "insurance-claims",
    faq: faq([
      {
        qet: "Milliste kindlustuskahjude parandamisega te tegelette Tallinnas?",
        qen: "What insurance damage repairs do you handle in Tallinn?",
        qru: "Какими страховыми убытками вы занимаетесь в Таллине?",
        aet: "Teeme veekahju, tulekahjujärgset ja muude kindlustusjuhtumite remonti. Koostame kahju ülevaatuse protokolli ja hinnapakkumise kindlustusfirmale.",
        aen: "We carry out water damage, fire damage, and other insurance case repairs. We prepare a damage inspection report and quote for the insurance company.",
        aru: "Выполняем ремонт после затопления, пожара и других страховых случаев. Составляем акт осмотра ущерба и смету для страховой компании.",
      },
      {
        qet: "Kas aitate kindlustusnõude esitamisel?",
        qen: "Do you help with filing an insurance claim?",
        qru: "Помогаете ли вы с подачей страхового заявления?",
        aet: "Jah, aitame dokumenteerida kahjusid, koostame ekspertiisiakti ja suhtleme vajadusel kindlustusseltsiga teie nimel.",
        aen: "Yes, we help document the damage, prepare an expert assessment report, and communicate with the insurance company on your behalf if needed.",
        aru: "Да, помогаем документировать ущерб, составляем экспертный акт и при необходимости общаемся со страховой компанией от вашего имени.",
      },
      {
        qet: "Kui kiiresti saate kahjustuse hindamise teostada?",
        qen: "How quickly can you carry out a damage assessment?",
        qru: "Как быстро вы можете провести оценку ущерба?",
        aet: "Tuleme kahjustust hindama 24–48 tunni jooksul. Kiireloomulistel juhtudel (nt aktiivne veekahjustus) reageerime sama päeva jooksul.",
        aen: "We come to assess the damage within 24–48 hours. For urgent cases (e.g. active water damage) we respond the same day.",
        aru: "Приезжаем для оценки ущерба в течение 24–48 часов. В срочных случаях (например, активное затопление) — в тот же день.",
      },
      {
        qet: "Kas maksate töö eest ise ja saate hiljem kindlustuselt raha tagasi?",
        qen: "Do you pay for the work yourself and then get reimbursed by insurance?",
        qru: "Вы платите за работу сами, а потом получаете возмещение от страховой?",
        aet: "See sõltub teie kindlustuslepingust. Sageli tasub kindlustus otse töövõtjale. Aitame protsessis navigeerimisel.",
        aen: "This depends on your insurance policy. Often the insurer pays the contractor directly. We help you navigate the process.",
        aru: "Зависит от вашего страхового договора. Часто страховщик платит подрядчику напрямую. Помогаем разобраться в процессе.",
      },
    ]),
  },
  {
    slug: "insured-accident-repair",
    faq: faq([
      {
        qet: "Mida hõlmab veekahju taastusremont Tallinnas?",
        qen: "What does water damage restoration in Tallinn include?",
        qru: "Что включает восстановительный ремонт после затопления в Таллине?",
        aet: "Veekahju taastusremont hõlmab kuivatamist, niiskunud materjalide eemaldamist, hallituse tõrjet, uue viimistluse paigaldamist ja torustiku parandamist.",
        aen: "Water damage restoration includes drying, removing damp materials, mould treatment, installing new finishes, and repairing plumbing.",
        aru: "Восстановительный ремонт после затопления включает осушку, удаление повреждённых материалов, обработку от плесени, новую отделку и ремонт сантехники.",
      },
      {
        qet: "Kas kindlustus katab tavaliselt veekahju remondi?",
        qen: "Does insurance usually cover water damage repair?",
        qru: "Обычно ли страховка покрывает ремонт после затопления?",
        aet: "See sõltub teie koduõnnetuste kindlustuslepingust. Äkilised ja ettenägematud vekahjud on enamasti kaetud. Aitame kahjunõude koostamisel.",
        aen: "It depends on your home insurance policy. Sudden and unforeseen water damage is usually covered. We help prepare the damage claim.",
        aru: "Зависит от вашего договора страхования жилья. Внезапные и непредвиденные водные повреждения обычно покрываются. Помогаем с оформлением требования.",
      },
      {
        qet: "Kui kiiresti reageerite veekahju juhtumile?",
        qen: "How quickly do you respond to a water damage incident?",
        qru: "Как быстро вы реагируете на случай затопления?",
        aet: "Reageerime veekahju juhtumitele 30–60 minuti jooksul Tallinnas ja Harjumaal. Peatame esmalt lekke, seejärel alustame kahjuhindamist.",
        aen: "We respond to water damage incidents within 30–60 minutes in Tallinn and Harjumaa. We stop the leak first, then begin the damage assessment.",
        aru: "На случаи затопления выезжаем в течение 30–60 минут по Таллину и Харьюмаа. Сначала останавливаем течь, затем приступаем к оценке ущерба.",
      },
      {
        qet: "Annate te garantii kindlustusjuhtumi parandustöödele?",
        qen: "Do you provide a warranty on insurance case repair work?",
        qru: "Даёте ли вы гарантию на ремонтные работы по страховому случаю?",
        aet: "Jah, kõigile teostatud taastustöödele anname 2-aastase garantii. Väljastame kõik vajalikud aktid kindlustusfirma jaoks.",
        aen: "Yes, all restoration work carries a 2-year warranty. We issue all certificates required by the insurance company.",
        aru: "Да, на все выполненные восстановительные работы даём 2-летнюю гарантию. Выдаём все документы, необходимые страховой компании.",
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
  console.log("\nBatch 2 done.");
}

run().catch((e) => { console.error(e); process.exit(1); });
