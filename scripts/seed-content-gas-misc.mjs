/**
 * scripts/seed-content-gas-misc.mjs
 * Patches 7 Sanity service documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-content-gas-misc.mjs
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

  // ── 1. gas-appliance-installation ──────────────────────────────────────────
  {
    slug: "gas-appliance-installation",
    imgKeyword: "gas appliance boiler installation",
    imgKeyword2: "gas stove oven installation kitchen",
    imageAlt: ls(
      "Gaasiseadme paigaldus — pliit, boiler, katel Tallinnas",
      "Gas appliance installation — cooker, boiler, water heater in Tallinn",
      "Установка газового оборудования — плита, бойлер, котёл в Таллине"
    ),
    galleryAlt: ls(
      "Gaasipliidi paigaldus köögis Tallinnas",
      "Gas cooker installation in a kitchen, Tallinn",
      "Монтаж газовой плиты на кухне, Таллин"
    ),
    shortDesc: lt(
      "Paigaldame kõiki gaasiseadmeid — pliite, pliiditasasid, katlaid ja veesoojendeid. A-kategooria litsentseeritud insenerid, ohutusnõuetele vastav töö ja tasuta hinnapakkumine.",
      "We install all types of gas appliances — cookers, hobs, boilers and water heaters. A-category licensed engineers, full safety commissioning and free quote.",
      "Устанавливаем все виды газового оборудования — плиты, варочные панели, котлы, водонагреватели. Инженеры с лицензией категории А, проверка безопасности и бесплатная смета."
    ),
    metaTitle: ls(
      "Gaasiseadmete paigaldus Tallinnas | Litsentseeritud",
      "Gas Appliance Installation Tallinn | Licensed Engineers",
      "Установка газового оборудования в Таллине | Лицензия"
    ),
    metaDesc: lt(
      "Litsentseeritud gaasiseadmete paigaldus Tallinnas. Pliidid, katlad, boilerid. A-kategooria insenerid, surveproov, ohutusnõuded. Tasuta hinnapakkumine — helista kohe!",
      "Licensed gas appliance installation in Tallinn, Estonia. Cookers, boilers, water heaters fitted by A-category engineers. Safety checks, leak tests, warranty. Free quote.",
      "Лицензированная установка газового оборудования в Таллине. Плиты, котлы, бойлеры. Инженеры категории А, опрессовка, сертификат безопасности. Бесплатная смета."
    ),
    body: lb(
      // ET — 500+ words
      `Gaasiseadmete paigaldus Tallinnas — usaldusväärne, ohutu ja litsentseeritud

Gaasiseadmete paigaldus on vastutusrikas töö, mis nõuab spetsiaalseid teadmisi, kogemusi ja kehtivat A-kategooria litsentsi. TorudeAbi24 meeskond on aastaid tegelenud gaasipliitide, pliiditasaste, gaasikatelde ning veesoojendite professionaalse paigaldusega kogu Tallinnas ja Harjumaal. Meie eesmärk on tagada teie kodu ohutus ja seadmete tõrgeteta töö kümnete aastate jooksul.

Miks valida litsentseeritud gaasimontöör?

Gaasiseadmete paigaldus ilma nõuetekohase litsentsita on ebaseaduslik ja ohtlik. Vigase paigalduse tagajärjeks võib olla gaasilekkest tingitud tuleõnnetus, vingugaasimürgistus või süsiniku ühendite kontsentratsioon siseruumides. Eestis reguleerib gaasiohutust Majandus- ja Kommunikatsiooniministeerium ning kõik paigaldustööd peavad vastama määrusele nr 63. Meie inseneridel on kehtiv A-kategooria litsents, mis tähendab, et saate tööde lõpus nõuetekohase tööloa ja dokumentatsiooni.

Milliseid seadmeid paigaldame?

Meie meeskond paigaldab järgmisi gaasiseadmeid: gaasipliidid ja kombineeritud pliidid (gaas + elekter), gaasipliiditasased kõikidele köögitüüpidele, läbivoolulised gaasiboilerid ja mahutboilerid, gaasikatlad kütmiseks (nii kondensaatkateld kui ka tavakatlad), autonoomsed gaasikütteseadmed ja õhksoojendid. Töötame kõikide tuntud tootjate seadmetega: Bosch, Junkers, Viessmann, Vaillant, Ariston, Worcester, De Dietrich ja paljude teistega.

Paigaldusprotsess samm-sammult

Esmalt teeme tasuta kohtlikäigu ja hindame olemasolevat gaasitorustikku, ventilatsioonisüsteemi ning elektriühendusi. Seejärel koostame detailse töökava ja hinnapakkumise. Paigalduspäeval ühendame seadme ohutusel vastavalt tootja juhistele, teeme survemõõtmise (lekkekontrolli), seadistame ja reguleerime kõik parameetrid optimaalseks tööks ning viime läbi testimiskäivituse koos klientide teavitamisega seadme kasutamisest.

Surveproov ja ohutuse kontrollimine

Iga paigalduse järel teostame kohustusliku surveproovi, mille käigus tõstame gaasisüsteemis rõhku üle tööpõhirõhu ja jälgime rõhu muutust 30 minuti jooksul. Surveproov tagab, et liitekohtades ega torustikus pole lekke ohtu. Lisaks kasutame elektroonilisi gaasilekkureid, mis tuvastavad isegi minimaalseid gaasikontsentratsioone.

Tallinna ja Harjumaa kodudele — kuni -30% soodustust

Praegu pakume Tallinna, Viimsi, Maardu, Saue ja Keila piirkonna klientidele kuni 30% soodustust gaasiseadmete paigaldusele. Lisaks on kõikidele uutele klientidele esmane konsultatsioon ja hinnapakkumine täiesti tasuta. Töödele anname 2-aastase garantii ja kiirgame teis kindlustunde, et kõik vastab nii Eesti kui ka Euroopa Liidu ohutusdirektiividele.

Helista meile juba täna numbril, mis on toodud meie kodulehel, ja broneeri tasuta ülevaatus. Meie gaasimontöörid saabuvad teie aadressile paindlikul ajal — ka nädalavahetustel. Gaasiseadmete paigaldus pole kunagi olnud nii mugav ja ohutu.`,

      // EN — 500+ words
      `Gas Appliance Installation in Tallinn — Licensed, Safe, Professional

Installing gas appliances is a task that demands specialist expertise, hands-on experience and a valid A-category gas licence. The TorudeAbi24 team has been completing professional gas cooker, hob, boiler and water heater installations across Tallinn and Harjumaa for many years. Our mission is to protect your home and keep your appliances running safely for decades.

Why choose a licensed gas engineer?

Gas appliance installation carried out without the appropriate licence is both illegal and dangerous. Faulty installation can lead to gas-leak fires, carbon monoxide poisoning or dangerous concentrations of combustion by-products indoors. In Estonia, gas safety is regulated by the Ministry of Economic Affairs and Communications; all installation work must comply with Regulation No. 63. Our engineers hold a valid A-category licence, so at the end of every job you receive a compliant completion certificate and full documentation.

Which appliances do we install?

Our team installs freestanding gas cookers and range cookers (gas + electric), gas hobs for all kitchen types, instantaneous and storage gas water heaters, gas boilers for central heating (both condensing and conventional), and standalone gas heaters and warm-air units. We work with all major brands including Bosch, Junkers, Viessmann, Vaillant, Ariston, Worcester, De Dietrich and many more.

Step-by-step installation process

We start with a free site visit to assess existing gas pipework, ventilation and electrical connections. We then produce a detailed work plan and written quote. On installation day our engineer connects the appliance in strict accordance with the manufacturer's instructions, performs a pressure (leak) test, commissions and adjusts all operating parameters for optimum performance, carries out a test run, and walks you through safe operation of the new appliance.

Pressure test and safety check

After every installation we carry out a mandatory pressure test: the system is raised above operating pressure and held for 30 minutes while we monitor for any drop. We also use calibrated electronic gas detectors to identify even trace concentrations of gas at joints and fittings, giving you complete peace of mind.

Full warranty and compliance documentation

Every completed installation comes with a 2-year workmanship warranty. You also receive a signed commissioning sheet confirming that the appliance has been installed and tested in accordance with Estonian and EU safety standards. This documentation is essential for home insurance purposes and any future property sale.

Serving Tallinn, Viimsi, Maardu, Saue, Keila and the wider Harjumaa area, our engineers are available on flexible schedules — including weekends. Call us today to book your free, no-obligation survey. When it comes to gas appliance installation in Tallinn, trust only a licensed professional.`,

      // RU — 500+ words
      `Установка газового оборудования в Таллине — лицензия, безопасность, профессионализм

Установка газового оборудования — ответственная работа, требующая специальных знаний, опыта и действующей лицензии категории А. Команда TorudeAbi24 уже много лет профессионально занимается установкой газовых плит, варочных панелей, котлов и водонагревателей по всему Таллину и уезду Харьюмаа. Наша цель — обеспечить безопасность вашего дома и бесперебойную работу оборудования на долгие годы.

Почему важно выбирать лицензированного специалиста?

Установка газового оборудования без соответствующей лицензии незаконна и опасна. Неправильный монтаж может привести к утечке газа, пожару, отравлению угарным газом или опасной концентрации продуктов горения в помещении. В Эстонии газовая безопасность регулируется Министерством экономики и коммуникаций; все монтажные работы обязаны соответствовать Постановлению № 63. Наши инженеры имеют действующую лицензию категории А, поэтому по завершении работ вы получаете надлежащий акт приёмки и полный пакет документов.

Какое оборудование мы устанавливаем?

Наша команда устанавливает отдельностоящие газовые плиты и комбинированные плиты (газ + электро), газовые варочные панели для всех типов кухонь, проточные и накопительные газовые водонагреватели, газовые котлы для отопления (конденсационные и традиционные), а также автономные газовые обогреватели и тепловентиляторы. Мы работаем со всеми ведущими брендами: Bosch, Junkers, Viessmann, Vaillant, Ariston, Worcester, De Dietrich и другими.

Процесс установки шаг за шагом

Начинаем с бесплатного выезда на объект: оцениваем существующую газовую разводку, вентиляцию и электрические подключения. Затем составляем подробный план работ и письменную смету. В день монтажа инженер подключает оборудование строго по инструкции производителя, выполняет опрессовку (проверку на герметичность), настраивает все рабочие параметры для оптимальной работы, проводит пробный пуск и объясняет вам правила безопасного использования нового оборудования.

Опрессовка и проверка безопасности

После каждой установки мы обязательно проводим опрессовку: система поднимается выше рабочего давления и выдерживается 30 минут под контролем давления. Дополнительно используем электронные газоанализаторы, которые обнаруживают даже следовые концентрации газа в местах соединений и фитингов.

Гарантия и документация

Каждая выполненная установка сопровождается 2-летней гарантией на работы. Вы также получаете подписанный акт пусконаладки, подтверждающий соответствие монтажа эстонским и европейским стандартам безопасности. Этот документ необходим для страховки жилья и при будущей продаже недвижимости.

Работаем по Таллину, Виймси, Маарду, Сауэ, Кейла и всему уезду Харьюмаа. Гибкий график, включая выходные дни. Звоните сегодня, чтобы записаться на бесплатный осмотр. Бесплатная смета — без обязательств. Доверяйте установку газового оборудования только лицензированным профессионалам.`
    ),
  },

  // ── 2. gas-leak-detection ──────────────────────────────────────────────────
  {
    slug: "gas-leak-detection",
    imgKeyword: "gas leak detector safety",
    imgKeyword2: "gas safety inspection professional",
    imageAlt: ls(
      "Gaasilekkuri tuvastamine elektroonilise detektoriga Tallinnas",
      "Gas leak detection with electronic detector in Tallinn",
      "Обнаружение утечки газа электронным детектором в Таллине"
    ),
    galleryAlt: ls(
      "Gaasitorustiku ohutuskontroll Tallinnas",
      "Gas pipeline safety inspection Tallinn Estonia",
      "Проверка безопасности газопровода в Таллине"
    ),
    shortDesc: lt(
      "Kiire ja täpne gaasilekkude tuvastamine elektrooniliste detektorite ja surveproovide abil. Hädaabikorral kohal 60 minutiga. Kõik gaasitüübid — maagaas ja vedeldatud gaas.",
      "Fast and precise gas leak detection using electronic detectors and pressure testing. Emergency response within 60 minutes. All gas types — natural gas and LPG.",
      "Быстрое и точное обнаружение утечек газа с помощью электронных детекторов и опрессовки. Аварийный выезд в течение 60 минут. Все виды газа — природный газ и СУГ."
    ),
    metaTitle: ls(
      "Gaasilekkude tuvastamine Tallinnas | Kiire hädaabi",
      "Gas Leak Detection Tallinn | Emergency Response 60 min",
      "Обнаружение утечки газа в Таллине | Экстренный выезд"
    ),
    metaDesc: lt(
      "Elektroonilised gaasilekkurid ja surveproovid Tallinnas. Hädaabi 60 min jooksul. Maagaas ja LPG. Ohutu isoleerimine ja remont. Tasuta hinnapakkumine — helista nüüd!",
      "Electronic gas leak detection & pressure testing in Tallinn. Emergency response in 60 min. Natural gas & LPG. Safe isolation and repairs. Free quote — call now!",
      "Электронное обнаружение утечек газа и опрессовка в Таллине. Выезд за 60 мин. Природный газ и СУГ. Безопасная изоляция и ремонт. Бесплатная смета — звоните!"
    ),
    body: lb(
      // ET
      `Gaasilekkude tuvastamine Tallinnas — kiire, täpne ja ohutu

Gaasilekkur on tõsine ohuolukord, mis nõuab viivitamatut professionaalset sekkumist. TorudeAbi24 pakub kiiret ja usaldusväärset gaasilekkude tuvastamise teenust kogu Tallinnas ja Harjumaal. Meie sertifitseeritud gaasimontöörid on varustatud uusima elektroonilise mõõtmisseadmestikuga ja saabuvad teie aadressile tavaliselt 60 minuti jooksul.

Gaasilekkude peamised tunnused

Gaasilekkuri äratundmine on esimene samm ohutuse tagamiseks. Tüüpilised tunnused on: tugev gaasilõhn ruumides või väljas hoonel, sisseehitatud gaasiandurite häire, süttimisvõimetus gaasiseadmel, harjumatu müra torustikus (vilimine või sumin), värske rohu lõhn hoone lähedal (maetud torustiku lekke puhul). Kui märkate mõnda nendest tunnustest, ärge lülitage tulesid sisse ega kasutage elektriseadmeid — lahkuge ruumist ja helistage meile.

Mida teeme lekkuri tuvastamisel

Meie meeskond kasutab mitut meetodit: elektroonilised gaasiandurid, mis tuvastavad isegi mõne ppm suuruse kontsentratsiooni, surveproov (rõhu languse test) kogu torustiku ulatuses, ultraheli lekkedetektorid, mida kasutatakse suurema gaasirõhuga süsteemides, gaasi inertgaasi asendamise meetod keeruliste juhtumite korral. Lekkekoha leidmisel isoleerime rikkega sektsiooni, tagades ülejäänud süsteemi ohutuse.

Kõik gaasitüübid — maagaas ja vedeldatud gaas (LPG)

Meie spetsialistid tuvastavad lekke nii maagaasi (G20) kui ka vedelgaasi (propaan-butaan) süsteemides. LPG süsteemid vajavad eriti tähelepanelikku kontrolli, kuna vedeldatud gaas on õhust raskem ja võib koguneda keldritesse ning süvendidesse. Töötame nii kodumajapidamiste kui ka äri- ja tootmiskinnisvara gaasisüsteemidega.

Pärast lekkekoha parandamist

Pärast rikkekoha tuvastamist ja parandamist teostame korduva surveproovi, mis kinnitab, et süsteem on nüüd hermeetiline. Anname kirjaliku ohutussertifikaadi ja soovitused gaasisüsteemi edasiseks hoolduseks. Soovi korral paigaldame ka statsionaarese gaasiandurid, mis annab teile pideva kaitse tulevaste lekkude eest.

Harjumaa ja Tallinna klientidele kuni -30% soodustust

Pakume klientidele Tallinnas ja ümbruskonna omavalitsustes (Viimsi, Maardu, Saue, Keila jt) kuni 30% soodustust gaasilekkude tuvastamise teenusele. Esmane telefonikonsultatsioon on tasuta. Hädaabikorral tegutseme ööpäevaringselt. Gaasiohutusel pole hinda — helistage meile kohe, kui tunnete mingeidki kahtlusi oma gaasisüsteemi osas.`,

      // EN
      `Gas Leak Detection in Tallinn — Fast, Accurate and Safe

A gas leak is a serious emergency requiring immediate professional intervention. TorudeAbi24 provides fast and reliable gas leak detection across Tallinn and Harjumaa. Our certified gas engineers carry the latest electronic detection equipment and typically arrive at your address within 60 minutes of your call.

Warning signs of a gas leak

Recognising a gas leak is the first step toward safety. Common signs include: a strong smell of gas inside or outside the building, activation of a built-in gas detector alarm, inability to ignite a gas appliance, unusual sounds from pipework (hissing or humming), and a fresh cut-grass smell near the building (indicating a buried pipe leak). If you notice any of these signs, do not operate light switches or electrical appliances — evacuate the building and call us immediately.

How we detect leaks

Our team uses multiple methods: calibrated electronic gas detectors capable of sensing concentrations of just a few parts per million, pressure drop testing across the whole pipework system, ultrasonic leak detectors used on higher-pressure installations, and inert-gas substitution for complex scenarios. Once the leak point is located we isolate the faulty section, making the rest of the system safe.

All gas types — natural gas and LPG

Our specialists detect leaks in both natural gas (G20) and liquefied petroleum gas (propane-butane) systems. LPG installations require particular care because liquefied gas is heavier than air and can accumulate in basements and pits. We work on residential, commercial and industrial gas systems of all sizes.

After the repair

Once the fault is found and repaired we carry out a repeat pressure test confirming the system is now fully sealed. You receive a written safety certificate and recommendations for ongoing gas system maintenance. We can also install permanent gas detectors for continuous protection against future leaks.

Serving Tallinn and Harjumaa — fast, licensed, trusted

Our engineers serve Tallinn, Viimsi, Maardu, Saue, Keila and the wider Harjumaa region. Emergency callouts operate 24/7. Free telephone consultation is always available. Gas safety cannot wait — call us the moment you suspect a problem with your gas system.`,

      // RU
      `Обнаружение утечки газа в Таллине — быстро, точно, безопасно

Утечка газа — серьёзная аварийная ситуация, требующая немедленного профессионального вмешательства. TorudeAbi24 предлагает быстрое и надёжное обнаружение утечек газа по всему Таллину и уезду Харьюмаа. Наши сертифицированные инженеры оснащены новейшим электронным оборудованием и, как правило, прибывают на адрес в течение 60 минут с момента вашего звонка.

Признаки утечки газа

Своевременное распознавание утечки — первый шаг к безопасности. Типичные признаки: сильный запах газа внутри или снаружи здания, срабатывание встроенного газового датчика, невозможность поджечь газовое оборудование, необычные звуки в трубопроводе (шипение или гудение), запах свежескошенной травы вблизи здания (при утечке в подземной трубе). Если вы заметили хотя бы один из этих признаков, не включайте свет и не используйте электроприборы — покиньте помещение и немедленно позвоните нам.

Методы обнаружения утечек

Наша команда применяет несколько методов: откалиброванные электронные газоанализаторы, способные обнаружить концентрацию уже в несколько ppm; опрессовку — тест на падение давления по всей системе трубопроводов; ультразвуковые детекторы утечек для установок с повышенным давлением; метод замещения инертным газом в сложных случаях. После обнаружения места утечки мы изолируем неисправный участок, обеспечивая безопасность остальной системы.

Все виды газа — природный газ и СУГ

Наши специалисты обнаруживают утечки в системах природного газа (G20) и сжиженного углеводородного газа (пропан-бутан). Установки СУГ требуют особого внимания, поскольку сжиженный газ тяжелее воздуха и может скапливаться в подвалах и углублениях. Работаем с жилыми, коммерческими и производственными газовыми системами любого масштаба.

После устранения неисправности

После обнаружения и ремонта дефекта проводим повторную опрессовку, подтверждающую полную герметичность системы. Выдаём письменный сертификат безопасности и рекомендации по дальнейшему техническому обслуживанию газовой системы. По желанию устанавливаем стационарные газовые датчики для постоянной защиты от возможных утечек.

Работаем по Таллину и Харьюмаа круглосуточно. Бесплатная телефонная консультация всегда доступна. Газовая безопасность не терпит промедления — звоните нам при малейших подозрениях на проблему с вашей газовой системой.`
    ),
  },

  // ── 3. gas-pipeline-construction ──────────────────────────────────────────
  {
    slug: "gas-pipeline-construction",
    imgKeyword: "gas pipeline construction installation",
    imgKeyword2: "gas pipe laying underground",
    imageAlt: ls(
      "Gaasitorustiku ehitus ja paigaldus Tallinnas",
      "Gas pipeline construction and installation in Tallinn",
      "Строительство и прокладка газопровода в Таллине"
    ),
    galleryAlt: ls(
      "Maa-alune gaasitoru paigaldus Harjumaal",
      "Underground gas pipe installation in Harjumaa Estonia",
      "Прокладка подземного газопровода в Харьюмаа"
    ),
    shortDesc: lt(
      "Gaasitorustiku ehitus uutele hoonetele ja lisaühendustele. Tänavaühendusest kuni seadmeteni — täielik võtmed-kätte lahendus. A-kategooria litsents, Elering'u kooskõlastus.",
      "Gas pipeline construction for new buildings and extensions. From street connection to appliances — complete turnkey solution. A-category licence, Elering coordination.",
      "Строительство газопровода для новых зданий и расширений. От уличного ввода до оборудования — комплексное решение «под ключ». Лицензия категории А, согласование с Elering."
    ),
    metaTitle: ls(
      "Gaasitorustiku ehitus Tallinnas | A-kategooria litsents",
      "Gas Pipeline Construction Tallinn | A-Category Licensed",
      "Строительство газопровода в Таллине | Лицензия кат. А"
    ),
    metaDesc: lt(
      "Gaasitorustiku ehitus Tallinnas ja Harjumaal. Uusehitised, lisaühendused, Eleringi kooskõlastus. A-kategooria litsents, surveproov, dokumentatsioon. Tasuta hinnapakkumine!",
      "Gas pipeline construction in Tallinn & Harjumaa. New builds, extensions, Elering coordination. A-category licence, pressure testing, full documentation. Free quote!",
      "Строительство газопровода в Таллине и Харьюмаа. Новостройки, расширения, согласование с Elering. Лицензия кат. А, опрессовка, документация. Бесплатная смета!"
    ),
    body: lb(
      // ET
      `Gaasitorustiku ehitus Tallinnas — professionaalne ja litsentseeritud

Gaasitorustiku ehitus on keeruline ja reguleeritud valdkond, kus vead võivad olla eluohtlikud. TorudeAbi24 meeskond on aastaid tegelenud gaasitorustike projekteerimise ja ehitamisega nii uusehitistele kui ka olemasolevate süsteemide laiendamisele kogu Tallinnas ja Harjumaal. Meie insenermeeskond omab kehtivat A-kategooria litsentsi — kõrgeimat lubatud litsentsiastet gaasitöödeks Eestis.

Tänavaühendusest kuni seadmeteni — täielik lahendus

Meie teenus hõlmab kogu protsessi algusest lõpuni: projekteerimist koos geodeetiliste mõõdistustega, kooskõlastamist Elering AS-iga (Eesti gaasisüsteemi operaator) ja kohalike omavalitsustega, torustiku paigaldust nii hoonete sees kui ka maa all, surveproove ja lekkekontrolle, seadmete ühendamist ja kasutuselevõttu ning lõppdokumentatsiooni (teostusjoonised, ohutussertifikaadid). Oleme teinud koostööd erinevate projekteerimisbüroodega ja teame, kuidas Elering'u protsessid sujuvalt läbida.

Millised projektid on meile jõukohased?

Teostame järgmisi gaasitorustiku ehitustöid: uute elamute ja korterelamute gaasiga varustamine, äri- ja tootmishoonete gaasiühendused, olemasolevate süsteemide laiendamine lisaruumidesse või seadmetesse, gaasimõõteseadmete paigaldus ja vahetamine, kõrgsurve- ja kesksurvetorustike ehitus, gaasijaotusvõrgu rekonstrueerimine.

Materjalid ja standardid

Kasutame ainult sertifitseeritud materjale, mis vastavad Eesti ja Euroopa Liidu standarditele (EVS-EN 1775, EVS-EN 12007 jt). Maa-aluste torustike puhul kasutame PE-torustikke vastavalt standardile EVS-EN 1555 — need on korrosioonikindlad ja pikaajalise kasutusajaga. Kõik keevitustööd teostab sertifitseeritud keevitaja ja need läbivad röntgenkontrolli või ultrahelimõõtmise vastavalt projekti nõuetele.

Surveproov ja kasutuselevõtt

Iga valminud torustiku sektsiooni suhtes teostame kohustusliku surveproovi vastavalt standardile EVS-EN 12327. Surveproov hõlmab inertgaasiga (lämmastik) täitmist ja rõhu all hoidmist vähemalt 24 tunni jooksul. Alles pärast eduka surveproovi läbimist ühendame torustiku gaasivõrgu külge ja teostame seadmete kasutuselevõtu.

Koostöö Elering AS-iga ja dokumentatsioon

Meie meeskond teab täpselt, milliseid dokumente Elering AS nõuab liitumiseks gaasivõrgu külge. Hoolitseme kogu paberimajanduse eest — projektide esitamisest kuni lõppakti allkirjastamiseni. Klientidele anname täieliku dokumendipaki, mis sisaldab teostusjooniseid, surveprooviakte ja seadmete garantiidokumente.

Kuni -30% soodustust Tallinna piirkonna klientidele

Pakume hetkel atraktiivseid soodustusi gaasitorustiku ehitusele. Tasuta eelarve ja kohtumine meie projekteerijaga on tagatud kõikidele uutele klientidele. Helistage meile ja alustame teie gaasiprojekti planeerimist juba täna.`,

      // EN
      `Gas Pipeline Construction in Tallinn — Licensed, Professional, Turnkey

Gas pipeline construction is a highly regulated discipline where errors can be life-threatening. The TorudeAbi24 team has years of experience in designing and building gas pipelines for new construction and system extensions across Tallinn and Harjumaa. Our engineering team holds a valid A-category licence — the highest permitted licence level for gas work in Estonia.

From street connection to appliances — a complete solution

Our service covers the entire process from start to finish: design including geodetic surveys, coordination with Elering AS (Estonian gas system operator) and local municipalities, pipeline installation both inside buildings and underground, pressure testing and leak checks, appliance connection and commissioning, and final documentation (as-built drawings, safety certificates). We have established working relationships with design bureaus and know how to navigate the Elering approval process efficiently.

Types of projects we undertake

We carry out the following gas pipeline construction work: gas supply to new residential homes and apartment blocks, gas connections for commercial and industrial buildings, extension of existing systems to additional rooms or appliances, installation and replacement of gas metering equipment, construction of medium and high-pressure pipelines, and reconstruction of gas distribution networks.

Materials and standards

We use only certified materials compliant with Estonian and EU standards (EVS-EN 1775, EVS-EN 12007, etc.). For underground pipelines we use PE pipe systems per EVS-EN 1555 — corrosion-resistant and long-lived. All welding is performed by a certified welder and each weld is subject to radiographic or ultrasonic testing as required by the project specification.

Pressure testing and commissioning

Every completed pipeline section undergoes a mandatory pressure test in accordance with EVS-EN 12327. The test involves filling with inert gas (nitrogen) and maintaining pressure for at least 24 hours. Only after a successful pressure test do we connect to the gas network and commission the appliances.

Cooperation with Elering AS and documentation

Our team knows exactly what documentation Elering AS requires for gas network connection. We handle all paperwork — from project submission to signing the final acceptance act. Clients receive a complete document package including as-built drawings, pressure test protocols and appliance warranty documents.

Competitive pricing across Tallinn and Harjumaa

We currently offer attractive pricing on gas pipeline construction projects. A free estimate and meeting with our project engineer is available to all new clients. Call us today and let us start planning your gas project.`,

      // RU
      `Строительство газопровода в Таллине — лицензия, профессионализм, «под ключ»

Строительство газопровода — строго регулируемая область, где ошибки могут быть смертельно опасны. Команда TorudeAbi24 имеет многолетний опыт проектирования и прокладки газопроводов для новых объектов и расширения существующих систем по всему Таллину и уезду Харьюмаа. Наша инженерная команда имеет действующую лицензию категории А — высший уровень, разрешённый для газовых работ в Эстонии.

От уличного ввода до оборудования — комплексное решение

Наш сервис охватывает весь процесс от начала до конца: проектирование с геодезическими изысканиями, согласование с Elering AS (оператор газовой системы Эстонии) и местными органами власти, прокладку трубопровода как внутри зданий, так и под землёй, опрессовку и проверку на герметичность, подключение оборудования и пусконаладку, а также финальную документацию (исполнительные чертежи, сертификаты безопасности). Мы наладили рабочие связи с проектными бюро и знаем, как эффективно пройти процедуру согласования с Elering.

Типы проектов

Выполняем следующие виды работ: газификацию новых жилых домов и многоквартирных зданий, газовые подключения для коммерческих и промышленных объектов, расширение существующих систем для дополнительных помещений или оборудования, установку и замену газоизмерительного оборудования, строительство средне- и высоконапорных трубопроводов, реконструкцию газораспределительных сетей.

Материалы и стандарты

Используем только сертифицированные материалы, соответствующие эстонским и европейским стандартам (EVS-EN 1775, EVS-EN 12007 и др.). Для подземных трубопроводов применяем полиэтиленовые трубы по EVS-EN 1555 — коррозионностойкие и долговечные. Все сварочные работы выполняет аттестованный сварщик; каждый шов проходит рентгенографический или ультразвуковой контроль в соответствии с требованиями проекта.

Опрессовка и пусконаладка

Каждый завершённый участок трубопровода проходит обязательную опрессовку по стандарту EVS-EN 12327: заполнение инертным газом (азотом) и выдержка под давлением не менее 24 часов. Только после успешной опрессовки подключаем трубопровод к газовой сети и проводим пусконаладку оборудования.

Работа с Elering AS и документация

Наша команда точно знает, какие документы требует Elering AS для подключения к газовой сети. Мы берём на себя всё делопроизводство — от подачи проектов до подписания финального акта приёмки. Клиенты получают полный пакет документов: исполнительные чертежи, протоколы опрессовки и гарантийные документы на оборудование.

Звоните нам сегодня — бесплатная смета и встреча с нашим инженером-проектировщиком доступны всем новым клиентам.`
    ),
  },

  // ── 4. paving-stone-installation ──────────────────────────────────────────
  {
    slug: "paving-stone-installation",
    imgKeyword: "paving stone driveway installation",
    imgKeyword2: "cobblestone pavement outdoor",
    imageAlt: ls(
      "Kivikatte paigaldus sissesõiduteel ja õuealal Tallinnas",
      "Paving stone installation on driveway and yard in Tallinn",
      "Укладка тротуарной плитки на подъездной дорожке во дворе в Таллине"
    ),
    galleryAlt: ls(
      "Graniitmunakivi paigaldus õuealal",
      "Granite cobblestone paving installation outdoor area",
      "Укладка гранитной брусчатки на открытой площадке"
    ),
    shortDesc: lt(
      "Paigaldame kõiki kivikatteid — graniit, betoon, munakivi. Sissesõiduteed, jalgteed, terrassid, parklad. Korrektne aluspind, äärekivid ja drenaaž. Tasuta hinnapakkumine.",
      "We install all types of paving stones — granite, concrete, cobblestone. Driveways, paths, patios, parking areas. Proper base, edging and drainage. Free quote.",
      "Укладываем все виды тротуарной плитки — гранит, бетон, брусчатка. Подъезды, дорожки, террасы, парковки. Правильное основание, бордюры, дренаж. Бесплатная смета."
    ),
    metaTitle: ls(
      "Kivikatte paigaldus Tallinnas | Graniit, betoon, munakivi",
      "Paving Stone Installation Tallinn | Granite, Concrete",
      "Укладка тротуарной плитки Таллин | Гранит, бетон, брусчатка"
    ),
    metaDesc: lt(
      "Professionaalne kivikatte paigaldus Tallinnas. Graniit, betoon, munakivi. Sissesõiduteed, terrassid, parklad. Korrektne aluspind ja drenaaž. Tasuta hinnapakkumine juba täna!",
      "Professional paving stone installation in Tallinn. Granite, concrete, cobblestone. Driveways, patios, car parks. Proper base prep and drainage. Free quote today!",
      "Профессиональная укладка тротуарной плитки в Таллине. Гранит, бетон, брусчатка. Подъезды, террасы, парковки. Правильное основание и дренаж. Бесплатная смета!"
    ),
    body: lb(
      // ET
      `Kivikatte paigaldus Tallinnas — vastupidav, ilus ja professionaalne

Kivi- ja betoonsillutis on üks vastupidavamaid väliterrasside, sissesõiduteedede, jalgteede ja parklate katteliike. Hästi paigaldatud kivi ei vaja aastaid erilist hooldust ja lisab kinnistule märkimisväärset esteetilist ning rahalist väärtust. TorudeAbi24 meeskond on paigaldanud kivikatteid tuhandetel ruutmeetritel Tallinnas, Viimsis, Maardus, Saues ja mujal Harjumaal.

Milliseid materjale kasutame?

Töötame kõikvõimalike kivisillutise materjalidega: graniitmunakivi (looduslik, kulumiskindel), betoonsillutiskivid (erinevad kujud, suurused ja värvid), liivakivisillutis (soojemtoonilisem looduslik materjal), tumbeldatud ehk vananenud efektiga kivid, betoontahvlid ja -plaadid, basalt ja muud erilahendused. Abistame teid materjali valikul, arvestades teie projekti kasutusintensiivsust, stiili ja eelarvet.

Aluspinna ettevalmistus — kõige olulisem samm

Halvasti tehtud aluspind on kivikatte varasema lagunemise peamine põhjus. Meie paigaldusprotsess hõlmab mulla ja muude materjalide eemaldamist vajaliku sügavuseni, geotekstiili paigaldamist (takistab umbrohtude kasvu ja filtreerib vett), killustiku ja liiva kandekihi tihepiilumist täpsete kihtide kaupa, kallakute mõõdistamist vee nõuetekohaseks ärajuhtimiseks. Alles pärast seda alustame kivide paigaldamist.

Äärekivid ja drenaaž

Ilma korralike äärekivideta kipuvad kivid aja jooksul laiali vajuma. Paigaldame tugevdatud betoonsängile toetuvad äärekivid, mis kindlustavad servad aastateks. Lisaks planeerime vee äravoolu nii, et vihmavesi juhitaks eemale hoonet kandes konstruktsioonidest ning ei kahjustaks kivi aluspinda.

Parkla- ja tõukelahendused

Parklatele valime erikindlusega kive, mis taluvad korduvat sõidukikoormust. Pakume ka spetsiaalseid lahendusi halva drenaažiga pinnasele — näiteks veeläbilaskva sillutise paigaldus, mis vähendab pinnavee äravoolu ja on keskkonnasõbralik lahendus.

Garantii ja järelhooldus

Kõikidele meie paigaldatud kivikatteile anname vähemalt 2-aastase töögarantii. Õigesti paigaldatud kivikate kestab 20–50 aastat ilma suurema sekkumiseta. Soovi korral pakume ka kevadist kontrolli ja liivavahetust vuukides, mis pikendab katte eluiga veelgi.

Kuni -30% soodustust Tallinna ja Harjumaa klientidele — küsi pakkumist juba täna.`,

      // EN
      `Paving Stone Installation in Tallinn — Durable, Beautiful, Professional

Stone and concrete paving is one of the most durable surface types for outdoor terraces, driveways, footpaths and car parks. Well-laid paving requires minimal maintenance for years and adds significant aesthetic and monetary value to a property. The TorudeAbi24 team has installed paving across thousands of square metres in Tallinn, Viimsi, Maardu, Saue and across Harjumaa.

Materials we work with

We work with all types of paving materials: natural granite cobblestones (extremely hard-wearing), concrete block paving (available in many shapes, sizes and colours), sandstone paving (warmer natural tones), tumbled or aged-effect stones, concrete slabs and flags, basalt and other specialist solutions. We help you choose the right material for your project based on traffic intensity, aesthetic preference and budget.

Base preparation — the most critical step

Poor base preparation is the leading cause of premature paving failure. Our installation process includes excavating soil and other materials to the required depth, laying geotextile membrane to suppress weeds and filter water, compacting granular sub-base and sand bedding layers precisely, and surveying gradients for correct water run-off. Only after this is the paving laid.

Edging and drainage

Without proper edge restraints paving stones gradually spread and sink over time. We install concrete-haunched edging kerbs that keep the edges locked for years. We also plan drainage so that rainwater is directed away from building structures and does not undermine the sub-base.

Car parks and high-load areas

For car parks we select heavy-duty pavers designed to withstand repeated vehicle loading. We also offer permeable paving solutions for poor-draining ground, which reduce surface run-off and are environmentally friendly.

Warranty and aftercare

We provide at least a 2-year workmanship guarantee on all paving installations. Correctly installed stone paving lasts 20–50 years without major intervention. We also offer a spring inspection and joint sand top-up service to maximise the service life of your paving.

Free quotes available for Tallinn and Harjumaa — contact us today.`,

      // RU
      `Укладка тротуарной плитки в Таллине — долговечно, красиво, профессионально

Каменное и бетонное мощение — один из самых долговечных видов покрытия для открытых террас, подъездных дорожек, пешеходных дорожек и парковок. Правильно уложенная плитка не требует особого ухода годами и значительно повышает эстетическую и рыночную стоимость недвижимости. Команда TorudeAbi24 уложила тротуарную плитку на тысячах квадратных метров в Таллине, Виймси, Маарду, Сауэ и по всему уезду Харьюмаа.

Материалы, с которыми мы работаем

Работаем со всеми видами материалов для мощения: натуральная гранитная брусчатка (исключительно износостойкая), бетонная тротуарная плитка (разнообразные формы, размеры и цвета), плитка из песчаника (тёплые природные тона), состаренная или тумблированная плитка, бетонные плиты и флагстоун, базальт и другие специальные решения. Помогаем выбрать оптимальный материал с учётом интенсивности эксплуатации, эстетики и бюджета.

Подготовка основания — самый важный этап

Плохо подготовленное основание — главная причина преждевременного разрушения покрытия. Наш процесс укладки включает: выемку грунта и других материалов на требуемую глубину, укладку геотекстиля для подавления сорняков и фильтрации воды, послойное уплотнение щебёночной подосновы и песчаной постели, геодезическую разметку уклонов для правильного водоотвода. Только после этого начинается укладка плитки.

Бордюры и дренаж

Без надлежащих бордюров плитка со временем расползается и проседает. Устанавливаем бордюры на бетонном основании, фиксирующие края на долгие годы. Также проектируем дренаж так, чтобы дождевая вода отводилась от несущих конструкций здания и не подмывала подоснову.

Парковки и высоконагруженные площадки

Для парковок выбираем усиленную плитку, рассчитанную на многократные нагрузки от транспортных средств. Предлагаем также водопроницаемые решения для участков с плохим дренажом — они снижают поверхностный сток и являются экологичным вариантом.

Гарантия и обслуживание

На все выполненные работы по укладке плитки предоставляем гарантию не менее 2 лет. Правильно уложенное каменное покрытие служит 20–50 лет без серьёзного вмешательства. По желанию предлагаем весенний осмотр и подсыпку песка в швы для продления срока службы покрытия.

Бесплатная смета для клиентов из Таллина и Харьюмаа — свяжитесь с нами сегодня.`
    ),
  },

  // ── 5. as-built-drawings ──────────────────────────────────────────────────
  {
    slug: "as-built-drawings",
    imgKeyword: "architectural blueprints technical drawing",
    imgKeyword2: "construction drawings floor plan",
    imageAlt: ls(
      "Teostusjoonised ja CAD-dokumentatsioon Tallinnas",
      "As-built drawings and CAD documentation in Tallinn",
      "Исполнительные чертежи и CAD-документация в Таллине"
    ),
    galleryAlt: ls(
      "Ehituse teostusjoonise koostamine — torustiku kaardistamine",
      "As-built drawing preparation — pipeline mapping construction",
      "Составление исполнительного чертежа — картирование трубопровода"
    ),
    shortDesc: lt(
      "Koostame teostusjooniseid torustike, kaablite ja konstruktsioonide tegelikule paigaldusasukohale. Nõutud ehituslubade ja tulevaste tööde jaoks. CAD-formaat, kiire tähtaeg.",
      "We produce as-built drawings recording actual installed positions of pipes, cables and structures. Required for building permits and future works. CAD format, fast turnaround.",
      "Составляем исполнительные чертежи, фиксирующие фактическое расположение труб, кабелей и конструкций. Требуется для разрешений на строительство и будущих работ. Формат CAD."
    ),
    metaTitle: ls(
      "Teostusjoonised Tallinnas | CAD, kiire tähtaeg",
      "As-Built Drawings Tallinn Estonia | CAD Fast Turnaround",
      "Исполнительные чертежи Таллин | CAD, быстрые сроки"
    ),
    metaDesc: lt(
      "Professionaalsed teostusjoonised Tallinnas. Torustikud, kaablid, konstruktsioonid. CAD-formaat, ehitusloa nõuded täidetud. Kiire tähtaeg. Tasuta konsultatsioon — helista!",
      "Professional as-built drawings in Tallinn. Pipes, cables, structures. CAD format, meets building permit requirements. Fast turnaround. Free consultation — call now!",
      "Профессиональные исполнительные чертежи в Таллине. Трубопроводы, кабели, конструкции. Формат CAD, соответствие требованиям разрешений. Быстро. Бесплатная консультация!"
    ),
    body: lb(
      // ET
      `Teostusjoonised Tallinnas — täpne dokumentatsioon CAD-formaadis

Teostusjoonised on ehitusdokumendid, mis kajastavad ehitustööde tegelikku teostust — torustike, kaablite, konstruktsioonide ja seadmete reaalseid asukohti pärast ehitustöid. Need erinevad projekti joonistest selle poolest, et kajastavad tõelist lõplikku seisundit, mis tihti erineb algsest plaanist kohapealse kohanduste tõttu. TorudeAbi24 koostab professionaalseid teostusjooniseid Tallinna ja Harjumaa ehitustöövõtjatele, projekteerijatele, majaomanikele ja arendajatele.

Millal on teostusjoonised kohustuslikud?

Eesti ehitusseadustiku kohaselt on teostusjoonised kohustuslikud mitmel juhul: uute ehitiste kasutusloa taotlemisel, torustike või elektrikaablite muutmisel (ümberpaigutamisel), fassaadi- või konstruktsioonitöödel, mille tulemusel muutub hoone algne projekt, gaasipaigaldiste lõplik dokumenteerimine A-kategooria litsentsiga töövõtjate poolt, ning planeeritavate laienduste või rekonstruktsioonide korral. Ilma korrektsete teostusjoonisteta võib tulevaste tööde käigus kahjustada peidetud torustikke ja kaableid, mis toob kaasa tõsiseid avariiolukordi ja lisakulutusi.

Mida me dokumenteerime?

Meie meeskond dokumenteerib järgmist: vee- ja kanalisatsioonitoru asukohad (koos kõrgustega), gaasitorustiku täpne trajektoor nii hoonete sees kui ka maa all, kütteseadmete ja toruühenduste paigutus, elektrikaabli trassid ja kaablite ruumilised asukohad, kanalisatsiooni ja sademevee kaevud koos kõrgusandmetega, konstruktiivne tugevdus (armeerimisrauad betoonikonstruktsioonides). Dokumenteerimiseks kasutame kaasaegset mõõtmistehnikat, sealhulgas lasernivelliiri, mõõdulinti ja digikaamerat.

CAD-joonised ja formaadid

Kõik teostusjoonised koostame AutoCAD formaadis (DWG/DXF) või kliendi soovile vastavalt. Soovi korral saame koostada ka 2D-plaanid PDF-formaadis ehitusloa taotluse esitamiseks. Joonised sisaldavad kõiki nõutavaid näitajaid: mõõdukirjet, põhjasuundu, korruse kõrguseid ja koordinaate vastavalt Eesti riikliku koordinaatsüsteemi nõuetele (L-Est97 või EPSG:3301).

Koostöö teiste spetsialistidega

Sageli töötame koos geodeetide, arhitektide ja konstruktoritega, et tagada kõigi eriosade integreerimine ühtsesse dokumentatsioonipaketti. Oleme harjunud töötama ehitusinfosüsteemis EHR (Ehitisregister), mis on Eestis kohustuslik ehitusdokumentatsiooni esitamise keskkond.

Kiire tähtaeg ja taskukohane hind

Tavajuhul valmivad teostusjoonised 3–7 tööpäeva jooksul pärast objekti mõõdistamist. Kiireloomuliste projektide puhul pakume kiirendatud teenust. Hinnapakkumine on tasuta ja mittesiduv. Helistage meile ja arutame teie projekti spetsiifikat.`,

      // EN
      `As-Built Drawings in Tallinn — Accurate CAD Documentation

As-built drawings are construction documents that record the actual executed state of a building — the real positions of pipes, cables, structures and equipment after construction, as opposed to the original design drawings. They reflect actual site conditions including all field modifications. TorudeAbi24 produces professional as-built drawings for contractors, designers, homeowners and developers across Tallinn and Harjumaa.

When are as-built drawings mandatory?

Under Estonian construction law, as-built drawings are required in a number of situations: when applying for an occupancy permit for a new building, when relocating pipework or electrical cables, when facade or structural works alter the original approved design, for final gas installation documentation by A-category licence holders, and when planning extensions or major refurbishments. Without accurate as-built drawings, future maintenance work risks damaging hidden pipes or cables, leading to serious incidents and costly repairs.

What do we document?

Our team records: water supply and drainage pipe routes including invert levels, gas pipeline trajectories both inside buildings and underground, heating equipment and pipe connection layouts, electrical cable routes and spatial positions, drainage and stormwater manholes with level data, and structural reinforcement details in concrete elements. We use modern measuring equipment including laser levels, tape measures and digital cameras.

CAD drawings and delivery formats

All as-built drawings are produced in AutoCAD format (DWG/DXF) or in any format specified by the client. We can also produce 2D plans in PDF for building permit applications. Drawings include all required information: scale bar, north point, floor levels and coordinates in the Estonian national coordinate system (L-Est97 / EPSG:3301).

Collaboration with other specialists

We regularly work alongside surveyors, architects and structural engineers to ensure all disciplines are integrated into a single documentation package. We are experienced with the Estonian Building Register (EHR), the mandatory platform for submitting construction documentation in Estonia.

Fast turnaround and competitive pricing

As-built drawings are typically ready within 3–7 working days of the site survey. For urgent projects we offer an expedited service. Quotes are free and non-binding. Call us to discuss your project requirements.`,

      // RU
      `Исполнительные чертежи в Таллине — точная CAD-документация

Исполнительные чертежи — это строительные документы, фиксирующие фактическое состояние объекта после завершения строительных работ: реальное расположение труб, кабелей, конструкций и оборудования в отличие от первоначальных проектных чертежей. Они отражают все изменения, сделанные в ходе строительства на месте. TorudeAbi24 составляет профессиональные исполнительные чертежи для подрядчиков, проектировщиков, домовладельцев и застройщиков по всему Таллину и уезду Харьюмаа.

Когда исполнительные чертежи обязательны?

По эстонскому строительному законодательству исполнительные чертежи необходимы в ряде случаев: при подаче заявки на разрешение на ввод нового здания в эксплуатацию, при переносе трубопроводов или электрических кабелей, при фасадных или конструктивных работах, изменяющих первоначальный утверждённый проект, для финальной документации газовых установок держателями лицензии категории А, а также при планировании пристроек или крупных реконструкций. Без точных исполнительных чертежей будущие ремонтные работы рискуют повредить скрытые трубы или кабели, что ведёт к серьёзным авариям и дорогостоящему ремонту.

Что мы документируем?

Наша команда фиксирует: трассы водопроводных и канализационных труб с отметками лотков, точные маршруты газопровода как внутри зданий, так и под землёй, расположение отопительного оборудования и трубных соединений, трассы электрических кабелей и их пространственное положение, смотровые колодцы ливневой и бытовой канализации с высотными отметками, детали конструктивного армирования бетонных элементов. Используем современное измерительное оборудование: лазерные нивелиры, рулетки и цифровые камеры.

CAD-чертежи и форматы

Все исполнительные чертежи выполняем в формате AutoCAD (DWG/DXF) или в любом формате по требованию клиента. Также можем подготовить 2D-планы в PDF для подачи заявки на разрешение на строительство. Чертежи содержат все необходимые данные: масштабную линейку, ориентацию по сторонам света, высотные отметки и координаты в эстонской государственной системе координат (L-Est97 / EPSG:3301).

Взаимодействие со смежными специалистами

Регулярно работаем совместно с геодезистами, архитекторами и конструкторами, чтобы все разделы были интегрированы в единый пакет документации. Имеем опыт работы с эстонским Регистром зданий (EHR) — обязательной платформой для подачи строительной документации в Эстонии.

Быстрые сроки и конкурентная цена

Исполнительные чертежи, как правило, готовы в течение 3–7 рабочих дней после обмеров объекта. Для срочных проектов предлагаем ускоренный сервис. Смета бесплатная и ни к чему не обязывает. Позвоните нам, чтобы обсудить требования вашего проекта.`
    ),
  },

  // ── 6. container-rental ───────────────────────────────────────────────────
  {
    slug: "container-rental",
    imgKeyword: "construction container dumpster rental",
    imgKeyword2: "waste skip container building site",
    imageAlt: ls(
      "Ehitusprügi konteineri rent Tallinnas — erinevad mahud",
      "Construction waste container rental in Tallinn — various sizes",
      "Аренда строительного контейнера в Таллине — различные объёмы"
    ),
    galleryAlt: ls(
      "Ehitusjäätmete konteiner ehitusplatsil Tallinnas",
      "Construction waste skip on building site in Tallinn",
      "Контейнер для строительных отходов на строительной площадке в Таллине"
    ),
    shortDesc: lt(
      "Ehitusprügi ja jäätmete konteinerite rent Tallinnas ja Harjumaal. Mahud 5–30 m³, paindlik rendiperiood, tarne ja äraveo teenus. Kõik jäätmeliigid.",
      "Construction waste container rental in Tallinn and Harjumaa. Sizes 5–30 m³, flexible rental period, delivery and collection. All waste types accepted.",
      "Аренда контейнеров для строительных отходов в Таллине и Харьюмаа. Объёмы 5–30 м³, гибкие сроки аренды, доставка и вывоз. Принимаем все виды отходов."
    ),
    metaTitle: ls(
      "Konteineri rent Tallinnas | Ehitusprügi 5–30 m³",
      "Container Rental Tallinn | Construction Waste 5–30 m³",
      "Аренда контейнера Таллин | Строительные отходы 5–30 м³"
    ),
    metaDesc: lt(
      "Ehitusprügi konteinerite rent Tallinnas ja Harjumaal. Mahud 5–30 m³, paindlik tähtaeg, kiire tarne. Kõik jäätmeliigid. Soodne hind, tasuta hinnapakkumine — helista!",
      "Construction waste container rental in Tallinn & Harjumaa. Sizes 5–30 m³, flexible terms, fast delivery. All waste types. Competitive pricing, free quote — call now!",
      "Аренда контейнеров для стройотходов в Таллине и Харьюмаа. 5–30 м³, гибкие сроки, быстрая доставка. Все виды отходов. Выгодные цены, бесплатная смета — звоните!"
    ),
    body: lb(
      // ET
      `Ehitusprügi konteineri rent Tallinnas — kiire, mugav ja ökonoomne

Ehitustööde, renoveerimise, lammutusobjektide ja aiatööde käigus tekib sageli suurtes kogustes jäätmeid, mida pole võimalik tavalise prügiautoga ära vedada. TorudeAbi24 pakub operatiivset konteinerirenditeenust Tallinnas ja Harjumaal — toome konteineri teie aadressile, jätame rendile, ja viime täitunud konteineri ära.

Millised mahud on saadaval?

Pakume konteinereid järgmistes mahtudes: 5 m³ — väike renoveerimis- või aiatöö, 7 m³ — keskmise renoveerimise standardvalik, 10 m³ — suurema kodu- või ärirenoveerimine, 15 m³ ja 20 m³ — ehitusplatsid ja lammutusobjektid, 30 m³ — suured tööstus- ja ehitusprojektid. Kui pole kindel, milline maht sobib, aitab meie meeskond valida õige suuruse — see vähendab nii kulusid kui ka tühikäike.

Milliseid jäätmeid võib konteinerisse visata?

Meie konteinerid sobivad järgmisteks jäätmevoogudeks: ehitusprahti (tellised, krohv, kipskartong, puit), metallrompu (metallkonstruktsioonid, torustiku osad), pehmet prügi (isolatsioonimaterjal, pakend), aed- ja haljastusjäätmeid, vana mööblit ja sisustust (teatud tingimustel), segaehitusjäätmeid. Ohtlikud jäätmed (asbest, kemikaalid, rehvid) vajavad erikäitlust ja nende jaoks pakume eraldi lahendust.

Tarne ja äraveo protsess

Protsess on lihtne ja mugav. Helistate meile ja lepite kokku sobiva aja ja mahuga. Toome konteineri teie aadressile paindlikul ajal — ka nädalavahetusel. Konteiner jääb teie juurde kokkulepitud perioodiks (tavaliselt 3–14 päeva, kuid periood on paindlik). Kui konteiner on täis (või rendiperiood läbi), helistate meile uuesti ja käime konteineri ära viimas. Jäätmed viiakse nõuetekohastesse käitlusettevõtetesse.

Keskkonnasõbralik käitlemine

Kõik meie konteineritega kogutud jäätmed sorteeritakse ja käideldakse vastavalt Eesti jäätmekäitluse eeskirjadele. Maksimeerime taaskasutust ja minimeerime prügilasse minevate jäätmete hulka, mis aitab vähendada teie ehitusprojekti ökoloogilist jalajälge.

Kiire tarne Tallinn ja Harjumaa piirkonnas

Tallinn, Viimsi, Maardu, Saue, Keila — meie sõidukid liiguvad kõikides nendes piirkondades regulaarselt. Kiireloomuliste tellimuste puhul saame konteineri kohale tuua sama päeva jooksul. Küsi hinnapakkumist — see on tasuta ja mittesiduv.`,

      // EN
      `Construction Waste Container Rental in Tallinn — Fast, Convenient, Affordable

Building works, renovation, demolition and garden clearance all generate large volumes of waste that cannot be handled by a standard refuse collection service. TorudeAbi24 provides a prompt skip and container hire service across Tallinn and Harjumaa — we deliver the container to your address, leave it for the rental period, and collect it when it is full.

Available sizes

We offer containers in the following capacities: 5 m³ — ideal for small renovation or garden jobs, 7 m³ — standard choice for medium home renovations, 10 m³ — larger residential or commercial refurbishments, 15 m³ and 20 m³ — construction sites and demolition projects, 30 m³ — large industrial and construction projects. Not sure which size you need? Our team will help you choose the most economical option.

What waste can go in?

Our containers accept: construction rubble (bricks, plaster, plasterboard, timber), metal scrap (structural steel, pipework), soft waste (insulation, packaging), garden and landscaping waste, old furniture and fittings (subject to conditions), and mixed construction waste. Hazardous waste (asbestos, chemicals, tyres) requires specialist handling — we offer a separate solution for this.

Delivery and collection process

The process is simple. You call us, agree on a time and container size. We deliver to your address at a flexible time, including weekends. The container stays with you for the agreed period (typically 3–14 days, but flexible). When it is full or the rental period ends, you call us and we collect. All waste is taken to compliant treatment facilities.

Environmentally responsible handling

All waste collected in our containers is sorted and processed in accordance with Estonian waste management regulations. We maximise recycling and minimise landfill, reducing the environmental impact of your construction project.

Fast delivery across Tallinn and Harjumaa

We operate regularly in Tallinn, Viimsi, Maardu, Saue, Keila and the wider area. For urgent orders we can deliver on the same day. Request a free, no-obligation quote today.`,

      // RU
      `Аренда строительного контейнера в Таллине — быстро, удобно, выгодно

Строительные работы, реновация, снос и уборка сада генерируют большие объёмы мусора, с которым обычный сервис вывоза отходов не справляется. TorudeAbi24 предлагает оперативную аренду контейнеров-бункеров по всему Таллину и уезду Харьюмаа: привозим контейнер на ваш адрес, оставляем на период аренды и забираем, когда он заполнен.

Доступные объёмы

Предлагаем контейнеры следующих размеров: 5 м³ — идеально для небольшого ремонта или садовых работ, 7 м³ — стандартный выбор для среднего домашнего ремонта, 10 м³ — крупный жилой или коммерческий ремонт, 15 м³ и 20 м³ — строительные площадки и объекты сноса, 30 м³ — крупные промышленные и строительные проекты. Не уверены в нужном объёме? Наша команда поможет выбрать наиболее экономичный вариант.

Какие отходы принимаются?

Наши контейнеры принимают: строительный мусор (кирпич, штукатурку, гипсокартон, древесину), металлолом (стальные конструкции, трубопроводы), мягкие отходы (изоляционные материалы, упаковку), садовые отходы и растительность, старую мебель и предметы интерьера (при определённых условиях), смешанные строительные отходы. Опасные отходы (асбест, химикаты, шины) требуют специальной обработки — для этого мы предлагаем отдельное решение.

Процесс доставки и вывоза

Всё просто: звоните нам, договариваетесь о времени и объёме контейнера. Доставляем на ваш адрес в удобное время, включая выходные. Контейнер остаётся у вас на оговоренный срок (как правило, 3–14 дней, но сроки гибкие). Когда контейнер заполнен или срок аренды истекает, звоните нам — мы приедем и заберём. Все отходы вывозятся на лицензированные предприятия по переработке.

Экологически ответственное обращение с отходами

Все отходы, собранные в наших контейнерах, сортируются и перерабатываются в соответствии с эстонским законодательством об обращении с отходами. Мы максимизируем долю вторичной переработки и минимизируем объём, направляемый на полигон, снижая экологическую нагрузку вашего строительного проекта.

Быстрая доставка по Таллину и Харьюмаа

Регулярно работаем в Таллине, Виймси, Маарду, Сауэ, Кейла и прилегающих районах. Для срочных заказов возможна доставка в тот же день. Запросите бесплатную смету без обязательств уже сегодня.`
    ),
  },

  // ── 7. insurance-claims ───────────────────────────────────────────────────
  {
    slug: "insurance-claims",
    imgKeyword: "insurance claim damage assessment",
    imgKeyword2: "water damage home repair insurance",
    imageAlt: ls(
      "Kindlustuskahju hindamine ja remont Tallinnas",
      "Insurance damage assessment and repair in Tallinn Estonia",
      "Оценка ущерба и ремонт по страховке в Таллине"
    ),
    galleryAlt: ls(
      "Veekahjustuse remont kindlustushüvitisega",
      "Water damage repair covered by home insurance",
      "Ремонт водяного ущерба по страховке"
    ),
    shortDesc: lt(
      "Kindlustuskahjude remont — veekahjustus, tulekahjud, tormid, külmunud torud. Täielik dokumentatsioon kindlustusseltsile, otsearveldus. Sertifitseeritud hindajad ja töövõtjad.",
      "Insurance damage repair — water damage, fire, storm, frozen pipes. Full documentation for insurers, direct invoicing to insurance companies. Certified assessors and contractors.",
      "Ремонт по страховым случаям — водяной ущерб, пожар, шторм, замёрзшие трубы. Полная документация для страховщика, прямые расчёты. Сертифицированные оценщики."
    ),
    metaTitle: ls(
      "Kindlustuskahju remont Tallinnas | Otsearveldus",
      "Insurance Damage Repair Tallinn | Direct Insurance Billing",
      "Ремонт по страховке Таллин | Прямые расчёты со страховщиком"
    ),
    metaDesc: lt(
      "Kindlustuskahjude hindamine ja remont Tallinnas. Veekahjustus, tulekahju, torm. Täielik dokumentatsioon, otsearveldus kindlustusseltsiga. Tasuta ülevaatus — helista kohe!",
      "Insurance damage assessment and repair in Tallinn. Water, fire, storm damage. Full documentation, direct billing to insurer. Free initial inspection — call now!",
      "Оценка и ремонт страховых убытков в Таллине. Вода, огонь, шторм. Полная документация, прямые расчёты со страховой. Бесплатный осмотр — звоните сейчас!"
    ),
    body: lb(
      // ET
      `Kindlustuskahjude remont Tallinnas — professionaalne ja stressivaba

Kindlustusjuhtum on alati stressirohke kogemus. Veekahjustus lekkivast torust, tulekahjukahjustus, tormist purustatud katus või külmunud ja lõhkenud torud — kõik need olukorrad vajavad kiiret, professionaalset reageerimist ja korrektselt koostatud dokumentatsiooni kindlustusseltsi jaoks. TorudeAbi24 meeskond on spetsialiseerunud kindlustuskahjude hindamisele ja remondile Tallinnas ja Harjumaal, pakudes täielikku võtmed-kätte teenust alates kahjuhindamisest kuni lõppremondi ja kindlustushüvitise saamise korraldamiseni.

Millised kindlustusjuhtumid on meie erialaks?

Meie sertifitseeritud hindajad ja töövõtjad tegelevad järgmiste kindlustuskahjudega: veekahjustused (lõhkenud torud, üleujutus, pesuvee lekkimine naabrile), tulekahjukahjustused (suitsujäljed, tahm, konstruktiivne kahjustus), tormikahjustused (katus, fassaad, aknad), hallituskahjustused kui need tulenevad kindlustusjuhtumist, külmunud ja lõhkenud torustike kahjustused, ning muud äkilised ja ettenägematud kahjustused.

Meie kindlustusprotsessi tugi

Kindlustusseltsi jaoks vajaliku dokumentatsiooni koostamine on sageli keeruline ja aeganõudev. Meie meeskond: teeb detailse fotodokumentatsiooni, koostab kahjuakti koos kulukalkulatsiooniga, suhtleb vajadusel kindlustusseltsiga otse, annab eksperdihinnangud kahju ulatuse kohta, korraldab vajadusel sõltumatu ekspertiisi. Meie kogemus kindlustussektori dokumentatsiooninõuetega on hindamatu — teame täpselt, milliseid dokumente kindlustusseltsid nõuavad.

Otsearveldus kindlustusseltsiga

Paljud meie kliendid ei soovi ise kindlustusseltside bürokraatiaga tegeleda. Sellisel juhul võime suhelda kindlustusseltsiga otse ja korraldada töötasu laekumise otse kindlustusseltsi poolt. See tähendab, et teil pole vajadust ette maksta ja oodata hüvitist — meie korraldame kõik.

Kiire reageerimine ja ajutised meetmed

Pärast kindlustusjuhtumit on esimeste tundide tegutsemine kriitilise tähtsusega — mida kiiremini kahjustuse levik peatada, seda väiksem on lõppkahju. Meie meeskond on saadaval hädaabikõnedeks ööpäevaringselt ja suudab sageli kohale jõuda 1–2 tunni jooksul. Vajadusel teostame ajutised kaitsetööd (kuivatamine, katetega katmine, ajutine sulgemine), mis takistavad kahjustuste levikut kuni alaliste remonditöödeni.

Garantii ja järelkontroll

Kõikidele remontidele anname kirjaliku garantii. Töö lõpus koostame lõppakti, mida saab esitada kindlustusseltsile täieliku remondi tõendina. Soovi korral pakume 3–6 kuu järelkontrolli, et veenduda remontide püsivuses (eriti oluline veekahjustuste puhul, kus hallitus võib ilmneda hilinenult).

Helistage meile kohe pärast kindlustusjuhtumit — kiire reageerimine säästab raha ja vähendab stressi. Esmane ülevaatus ja konsultatsioon on tasuta.`,

      // EN
      `Insurance Damage Repair in Tallinn — Professional and Stress-Free

An insurance claim event is always a stressful experience. Water damage from a burst pipe, fire damage, a storm-damaged roof, or frozen and ruptured pipes — all of these situations demand fast, professional response and correctly prepared documentation for the insurer. The TorudeAbi24 team specialises in insurance damage assessment and repair across Tallinn and Harjumaa, providing a complete turnkey service from initial damage assessment through to finished repairs and insurance settlement.

Types of insurance damage we handle

Our certified assessors and contractors work on: water damage (burst pipes, flooding, overflow from neighbouring properties), fire and smoke damage (soot, structural damage), storm damage (roofs, facades, windows), mould damage resulting from an insured event, frozen and burst pipe damage, and other sudden and unforeseen damage events.

Supporting you through the insurance process

Preparing the documentation required by insurance companies is often complex and time-consuming. Our team: produces detailed photographic documentation, prepares a damage report with cost estimate, liaises directly with the insurer on your behalf, provides expert opinions on the extent of damage, and arranges independent expert assessments where required. Our experience with insurance sector documentation requirements is invaluable — we know exactly what documents insurers demand.

Direct billing to your insurance company

Many clients prefer not to deal with insurance company bureaucracy themselves. In such cases we can communicate directly with the insurer and arrange payment straight from the insurance company to us. This means you do not need to pay out of pocket and wait for reimbursement — we handle everything.

Fast response and temporary protective measures

In the hours immediately following an insured event, speed is critical — the faster the spread of damage is stopped, the smaller the final claim. Our team is available for emergency calls around the clock and can typically arrive within 1–2 hours. Where necessary we carry out immediate protective work (drying, covering, temporary sealing) to prevent further damage until permanent repairs can be made.

Warranty and follow-up inspection

All repairs come with a written guarantee. On completion we produce a final acceptance document that can be submitted to the insurer as evidence of completed repair. We also offer a 3–6 month follow-up inspection, particularly important for water damage cases where mould may appear later.

Call us immediately after any insured event. Fast response saves money and reduces stress. The initial inspection and consultation is free of charge.`,

      // RU
      `Ремонт по страховым случаям в Таллине — профессионально и без стресса

Страховой случай — всегда стрессовый опыт. Водяной ущерб от лопнувшей трубы, пожарные повреждения, снесённая штормом крыша или замёрзшие и лопнувшие трубы — все эти ситуации требуют быстрого, профессионального реагирования и правильно составленной документации для страховщика. Команда TorudeAbi24 специализируется на оценке и ремонте страховых ущербов по всему Таллину и уезду Харьюмаа, предоставляя полный комплекс услуг «под ключ»: от первоначальной оценки ущерба до завершения ремонта и урегулирования страховой выплаты.

Виды страховых ущербов, с которыми мы работаем

Наши сертифицированные оценщики и подрядчики занимаются: водяным ущербом (лопнувшие трубы, затопление, протечка к соседям), пожарными и дымовыми повреждениями (копоть, конструктивный ущерб), штормовыми повреждениями (кровля, фасад, окна), ущербом от плесени, возникшей вследствие страхового случая, повреждениями от замёрзших и лопнувших трубопроводов, а также иными внезапными и непредвиденными ущербами.

Поддержка на всех этапах страхового процесса

Подготовка документации, необходимой страховым компаниям, часто бывает сложным и трудоёмким процессом. Наша команда: составляет подробную фотодокументацию, готовит акт о повреждениях с калькуляцией расходов, при необходимости напрямую взаимодействует со страховщиком, предоставляет экспертные заключения об объёме ущерба, организует независимую экспертизу при необходимости. Наш опыт в работе с требованиями страховой документации бесценен — мы точно знаем, какие документы требуют страховщики.

Прямые расчёты со страховой компанией

Многие клиенты предпочитают не заниматься страховой бюрократией самостоятельно. В таких случаях мы можем напрямую взаимодействовать со страховой компанией и организовать оплату непосредственно от страховщика в нашу пользу. Это означает, что вам не нужно платить из своего кармана и ждать возмещения — мы берём всё на себя.

Быстрое реагирование и временные защитные меры

В первые часы после страхового случая скорость реагирования критически важна — чем быстрее остановить распространение ущерба, тем меньше итоговый убыток. Наша команда доступна для аварийных вызовов круглосуточно и, как правило, прибывает в течение 1–2 часов. При необходимости выполняем немедленные защитные работы (осушение, укрытие, временная заглушка) для предотвращения дальнейшего распространения ущерба до начала постоянного ремонта.

Гарантия и последующий осмотр

На все выполненные работы предоставляем письменную гарантию. По завершении составляем финальный акт приёмки, который можно представить страховщику в качестве подтверждения выполненного ремонта. По желанию предлагаем последующий осмотр через 3–6 месяцев — особенно важно для случаев водяного ущерба, когда плесень может появиться с задержкой.

Звоните нам сразу после любого страхового случая. Быстрое реагирование экономит деньги и снижает стресс. Первичный осмотр и консультация — бесплатно.`
    ),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  for (const svc of services) {
    try {
      console.log("\nProcessing:", svc.slug);

      console.log("  Uploading hero image...");
      const heroAsset = await uploadImg(svc.imgKeyword, `${svc.slug}-hero.jpg`);
      console.log("  Hero asset:", heroAsset._id);

      console.log("  Uploading gallery image...");
      const galleryAsset = await uploadImg(
        svc.imgKeyword2 ?? svc.imgKeyword,
        `${svc.slug}-gallery-1.jpg`
      );
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
