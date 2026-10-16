/**
 * scripts/seed-dusikabiini-paigaldus.mjs
 *
 * Replaces "Riser Pipe Replacement" with "Dušikabiini paigaldus" (Shower Cabin Installation).
 * Patches _id: service-riser-pipe-replacement in-place — keeps existing image assets,
 * updates ALL other fields: title, slug, pathSegment, shortDescription, metaTitle,
 * metaDescription, body (500+ words × 3 langs), faq (5 items × 3 langs), icon,
 * image alt texts, gallery alt texts.
 *
 * Primary keywords (ET): dušikabiini paigaldus, dušikabiini paigaldus Tallinn,
 *   dušikabiini paigaldamine, dušikabiini vahetus, dušikabiini montaaž hind
 * Primary keywords (EN): shower cabin installation Tallinn, shower enclosure fitting,
 *   shower cabin replacement, shower cubicle installation Estonia
 * Primary keywords (RU): установка душевой кабины Таллин, монтаж душевой кабины,
 *   замена душевой кабины Таллинн, установка душевой кабины цена
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-dusikabiini-paigaldus.mjs
 *   node --env-file=.env.local scripts/seed-dusikabiini-paigaldus.mjs --dry-run
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token     = process.env.SANITY_API_WRITE_TOKEN;
const dryRun    = process.argv.includes("--dry-run");

if (!projectId) { console.error("❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID"); process.exit(1); }
if (!token && !dryRun) { console.error("❌  Set SANITY_API_WRITE_TOKEN"); process.exit(1); }

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

function toBlocks(locale, paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `${locale}_${i}_${Math.random().toString(36).slice(2, 8)}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text, marks: [] }],
  }));
}

const PATCH = {
  title: {
    _type: "localeString",
    et: "Dušikabiini paigaldus Tallinnas",
    en: "Shower Cabin Installation Tallinn",
    ru: "Установка душевой кабины в Таллинне",
  },

  slug: { _type: "slug", current: "shower-cabin-installation" },

  pathSegment: {
    et: "dusikabiini-paigaldus",
    ru: "ustanovka-dushevoi-kabiny",
  },

  icon: "ShowerHead",

  shortDescription: {
    _type: "localeText",
    et: "Professionaalne dušikabiini paigaldus ja vahetus Tallinnas. Paigaldame kõiki tüüpe — nurk, walk-in, poolring. 2-aastane garantii, reageerimine 30–60 min.",
    en: "Professional shower cabin installation and replacement in Tallinn. All types — corner, walk-in, semicircular. 2-year warranty, 30–60 min response. Call 24/7.",
    ru: "Профессиональная установка и замена душевой кабины в Таллинне. Все типы — угловые, walk-in, полукруглые. Гарантия 2 года, выезд 30–60 мин. Круглосуточно.",
  },

  metaTitle: {
    _type: "localeString",
    et: "Dušikabiini paigaldus Tallinnas | TorudeAbi24",
    en: "Shower Cabin Installation Tallinn | TorudeAbi24",
    ru: "Установка душевой кабины Таллин | TorudeAbi24",
  },

  metaDescription: {
    _type: "localeText",
    et: "Dušikabiini paigaldus Tallinnas — sertifitseeritud torumehad, 2a garantii. Reageerimine 30–60 min. -30% soodustus 08–19h. Helistage +372 56 89 79 29.",
    en: "Shower cabin installation Tallinn — certified plumbers, 2-year warranty. 30–60 min response time. -30% discount 08–19h. Call +372 56 89 79 29 now.",
    ru: "Установка душевой кабины в Таллинне — лицензированные сантехники, гарантия 2 года. Выезд 30–60 мин. Скидка -30% с 08 до 19ч. Звоните +372 56 89 79 29.",
  },

  faq: [
    {
      _type: "object",
      _key: "faq1",
      question: {
        _type: "localeString",
        et: "Kui kaua dušikabiini paigaldamine aega võtab?",
        en: "How long does shower cabin installation take?",
        ru: "Сколько времени занимает установка душевой кабины?",
      },
      answer: {
        _type: "localeText",
        et: "Standardse nurga- või poolringikujulise dušikabiini paigaldamine valmis äravoolu juures võtab 2–4 tundi. Kui vann tuleb esmalt eemaldada, äravool ümber nihutada või põrandat tasandada, kestab töö 4–8 tundi või kaks päeva. Keerulisematel juhtudel — näiteks walk-in duši paigaldamisel koos uute plaatimistöödega — hindame ajakulu kohapeal tasuta.",
        en: "Installing a standard corner or semicircular shower cabin over an existing drain takes 2–4 hours. If a bathtub must be removed first, the drain repositioned, or the floor levelled, the work takes 4–8 hours or two days. For more complex cases — such as a walk-in shower installation with new tiling — we assess the timeline on-site at no charge.",
        ru: "Установка стандартной угловой или полукруглой душевой кабины при наличии готового слива занимает 2–4 часа. Если сначала нужно демонтировать ванну, перенести сифон или выровнять пол, работа займёт 4–8 часов или два дня. При более сложных случаях — например, монтаж walk-in душа с новой укладкой плитки — оцениваем сроки бесплатно на месте.",
      },
    },
    {
      _type: "object",
      _key: "faq2",
      question: {
        _type: "localeString",
        et: "Mis maksab dušikabiini paigaldus Tallinnas?",
        en: "How much does shower cabin installation cost in Tallinn?",
        ru: "Сколько стоит установка душевой кабины в Таллине?",
      },
      answer: {
        _type: "localeText",
        et: "Dušikabiini paigalduse töötund algab €35-st. Tööpäevadel ja nädalavahetustel kella 08:00–19:00 kehtib -30% soodustus (€24,50/h). Öine töö (19:00–08:00) sisaldab €10 väljakutsulisa. Lõplik hind sõltub dušikabiini tüübist, äravoolu asukoha muutmisest, vana vanni eemaldamisest ja viimistlusmaterjalidest. Hinnapakkumine on alati tasuta.",
        en: "Shower cabin installation labour starts from €35/hour. A -30% discount applies between 08:00 and 19:00 every day (€24.50/h). Night work (19:00–08:00) carries a €10 surcharge. The final price depends on the cabin type, drain repositioning, old bath removal, and finishing materials. A quote is always free of charge.",
        ru: "Час работы по установке душевой кабины от €35. Скидка -30% действует ежедневно с 08:00 до 19:00 (€24,50/ч). Ночные работы (19:00–08:00) — доплата €10. Итоговая цена зависит от типа кабины, переноса слива, демонтажа старой ванны и отделочных материалов. Смета всегда бесплатна.",
      },
    },
    {
      _type: "object",
      _key: "faq3",
      question: {
        _type: "localeString",
        et: "Kas saate paigaldada dušikabiini kohale, kus oli vann?",
        en: "Can you install a shower cabin where there was a bathtub?",
        ru: "Можете ли вы установить душевую кабину на месте ванны?",
      },
      answer: {
        _type: "localeText",
        et: "Jah, see on meie kõige sagedasem tellimus. Eemaldame vana vanni, võtame maha vananenud plaadid, tasandame põranda, nihutame vajadusel äravoolu sifoni uuele positsioonile ning paigaldame dušialuse ja -kabiini. Kõik tööd teostatakse ühe meeskonnaga ning enamasti kahel tööpäeval. Soovi korral teostame ka uue plaatimise.",
        en: "Yes, this is our most common request. We remove the old bath, strip worn tiles, level the floor, reposition the drain siphon if needed, then install the shower tray and cabin. All work is completed by one team, typically across two working days. We also offer retiling if required.",
        ru: "Да, это наш самый частый запрос. Демонтируем старую ванну, снимаем изношенную плитку, выравниваем пол, при необходимости переносим сифон слива, затем устанавливаем поддон и кабину. Все работы выполняет одна бригада, как правило за два рабочих дня. По желанию выполним и новую укладку плитки.",
      },
    },
    {
      _type: "object",
      _key: "faq4",
      question: {
        _type: "localeString",
        et: "Kas annate dušikabiini paigaldusele garantii?",
        en: "Do you provide a warranty on shower cabin installation?",
        ru: "Предоставляете ли вы гарантию на установку душевой кабины?",
      },
      answer: {
        _type: "localeText",
        et: "Jah, kõigile meie paigaldus- ja torustikutöödele — sealhulgas äravool, sifon, veeühendused, silikoontihendus ja dušipanni kinnitus — kehtib 2-aastane garantii. Dušikabiini klaas, raam ja alus on kaetud tootja eraldi garantiiga. Garantiiajal on hooldusvisiidid meie poolt tasuta.",
        en: "Yes, all our installation and plumbing work — including drain, siphon, water connections, silicone sealing, and shower tray anchoring — carries a 2-year warranty. The glass panels, frame, and tray are covered by the manufacturer's own warranty. Warranty visits are free of charge during the coverage period.",
        ru: "Да, на все наши монтажные и сантехнические работы — включая слив, сифон, водоподключение, силиконовую герметизацию и крепление поддона — действует гарантия 2 года. Стеклянные панели, рама и поддон покрываются отдельной гарантией производителя. Гарантийные выезды бесплатны в течение срока действия гарантии.",
      },
    },
    {
      _type: "object",
      _key: "faq5",
      question: {
        _type: "localeString",
        et: "Milliseid dušikabiine te Tallinnas paigaldate?",
        en: "What types of shower cabins do you install in Tallinn?",
        ru: "Какие типы душевых кабин вы устанавливаете в Таллине?",
      },
      answer: {
        _type: "localeText",
        et: "Paigaldame kõiki populaarseid dušikabiini tüüpe: nurga dušikabiinid (ruut- ja ristkülikukujulised), poolringikujulised dušikabiinid, sirge esiplaadiga dušikabiinid, walk-in dušiseinad ilma ukseta, bifiksatsiooniga liuguksega kabiinid ning eritellimusel klaasduširuumid. Töötame Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Roca ja Ido kaubamärkide seadmetega.",
        en: "We install all popular shower cabin types: square and rectangular corner cabins, semicircular cabins, inline/straight-entry cabins, walk-in frameless shower walls, bi-fold sliding door enclosures, and bespoke glass shower rooms. We work with Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Roca, and Ido brands.",
        ru: "Устанавливаем все популярные типы душевых кабин: угловые квадратные и прямоугольные, полукруглые, с прямым входом, walk-in (без двери, frameless), с раздвижными дверями на складном механизме, а также душевые комнаты из стекла по индивидуальному заказу. Работаем с брендами Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Roca и Ido.",
      },
    },
  ],
};

function buildBody() {
  const et = [
    "Dušikabiini paigaldus on üks kõige populaarseimaid vannitoaremondi teenuseid Tallinnas — paljud elanikud otsustavad vana vanni dušikabiini vastu vahetada, et säästa ruumi, aega ja vett. Olenemata sellest, kas paigaldate dušikabiini esimest korda, vahetate riknenud kabiini uue vastu või uuendate tervet vannituba, TorudeAbi24 sertifitseeritud torumehad tagavad professionaalse, kiire ja puhta paigalduse kõigis Tallinna linnaosades — Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, Haabersti — ning kogu Harjumaal.",
    "Paigaldame kõiki populaarseid dušikabiini tüüpe: nurga dušikabiinid (ruut- ja ristkülikukujulised ühe või kahe liuguksega), poolringikujulised dušikabiinid piiratud ruumiga vannitubadesse, sirge esiplaadiga dušikabiinid, walk-in dušiseinad ilma ukseta minimalistlikule kujundusele, bi-fold liuguksega kabiinid ning eritellimusel klaasduširuumid. Töötame tuntud tootjate seadmetega — Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Ido, Roca — ning saame soovi korral aidata sobiva mudeli valikul vastavalt vannitoa mõõtmetele, kujundusele ja eelarvele.",
    "Dušikabiini paigaldusprotsess algab vannitoasse sobiliku asukohta hindamisest ja olemasoleva torustiku põhjaliku ülevaatusest. Kõigepealt eemaldame vana vanni, dušikabiini või muud olemasolevad elemendid ning puhastame pinna põhjalikult. Seejärel kontrollime põrandaäravoolu asukoht ja vajadusel nihutame sifoni uuele positsioonile — see töö hõlmab betoonlõikamist, uue kanalisatsioonitorustiku paigaldamist ja põranda tasandamist. Dušialusel (SMC-valmisalus, akriüülpann või plaaditud dušialus) on kriitiliselt oluline tagada täpne kaldesisene gradient 1,5–2%, et vesi voolaks sifoni suunas. Vale kalle on kõige sagedasem vaikne lekkeprobleem dušikabiinides, mis avaldub alles kuude pärast niiskuskahjustusena.",
    "Veeühenduste osas ühendame dušisegisti nii sooja- kui külmaveesüsteemiga, paigaldame termostaatse segisti (vajadusel), vahetame välja amortiseerunud sulgeventilid ja paindlikud liidetused. Kasutame ainult sertifitseeritud materjale ja komponente, millel on CE-märgistus ning Eesti ehitusregulatsioone rahuldavad tehnilised andmelehed. Standardsed tootjad, kellega töötame: Geberit, Hansgrohe, Grohe, Ravak ja Oras. Kõik veeühendused tehakse professionaalsete pressliitmike või keevitatud ühendustega — voolikusid ei kasutata püsiühendustes, et vältida tulevasi lekkeid.",
    "Dušikabiini tihedus on kriitilise tähtsusega — vähimgi leke põrandasse või seinakivide vahele võib mõne kuuga põhjustada ulatuslikke niiskuskahjustusi, hallitust ja konstruktsioonide kandvuse nõrgenemist. Meie spetsialistid kasutavad sanitaar-silikoontihendeid, nurgaühendustiheneid ja hüdroisolatsioonimaterjale, mis on ette nähtud püsivalt niiskesse keskkonda. Kõik ühendusvuugid täidetakse hallitusekindla silikooniga kahes kihis ja töödeldakse survega, et tagada pikaajaline tihedus ka temperatuurikõikumiste korral. Dušialuse ja seina vahelise nurkühenduse tihenduslindiga hüdroisolatsioon on samuti standardprotseduuri osa.",
    "Tallinna vanemas elamufondi — 1960.–1980. aastate paneelmajad, sõjajärgsed telliskivimajad ja 1990. aastate renoveerimata kortermajad — vannitoad on sageli kitsamad standardsetest moodulmõõdetest, madalama laega ja ebaühtlase betoonpõrandaga. Meie meeskond on harjunud töötama kitsastes tingimustes ning pakub kohandatud lahendusi: dušipann lõigatakse kohapeal sobiva suuruseni, kasutatakse reguleeritavaid raamkonstruktsioone ning vajadusel teostatakse väiksemahulised plaatimistööd. Lisaks arvestame Tallinna vanades korterelamutes paiknevate vertikaalse torustiku asukohaga, mis mõnikord piirab äravoolu nihutamise võimalusi — hindame alati kõigepealt torustiku paigutust ja pakume realistliku lahenduse enne tööde alustamist.",
    "Pärast dušikabiini paigaldust teostame kohustusliku lekkekontrolli: avame kõik veesulgurid täispingele, käivitame dušisegisti, laseme vee mitmeid minuteid läbi äravoolu, kontrollime kõiki torustikuühendusi, silikoonsõrmuseid, sifoni tihedust, klaasprofiilide tihendit ja äravoolu töövõimet. Klient jälgib kontrolli silmaga ning allkirjastab tööde vastuvõtuakti — see dokument on 2-aastase garantii aluseks. Anname ka hooldusnõu: milliseid puhastusvahendeid kasutada (happevabad puhastid klaasile), kuidas puhastada klaaspindu veelaigust lubjaämbriga ja millal uuendada silikoonitihendeid.",
    "Dušikabiini paigalduse töötund algab €35-st. Tööpäevadel ja nädalavahetustel kella 08:00–19:00 kehtib -30% soodustus (€24,50/h). Öisel ajal (19:00–08:00) lisandub €10 väljakutsulisa. Ettemaksu ei nõuta — maksate alles pärast töö lõpetamist ja üle võtmist. Garantii on 2 aastat kõigile meie teostatavale torustiku- ja paigaldistöödele, sealhulgas äravool, sifon, veeühendused, silikoontihendus ja dušipanni kinnitus. Dušikabiini enda klaasi, raami ja aluse katab tootja eraldi garantii.",
    "Soovite tasuta hinnapakkumist dušikabiini paigalduseks Tallinnas? Täitke meie kontaktivorm või helistage +372 56 89 79 29 — meie dispetšer vastab viivitamatult ja lepib kokku teile sobiva aja. Teenindame kõiki Tallinna linnaosi ja Harjumaa piirkonda, sealhulgas Viimsi, Maardu, Saue, Keila ja Rapla. Oleme ööpäevaringselt kättesaadavad — argipäevadel, nädalavahetustel ja riigipühadel. Usaldage dušikabiini paigaldus Tallinnas professionaalidele, kelle töö on kaetud kirjaliku garantiiga.",
  ];

  const en = [
    "Shower cabin installation is one of the most popular bathroom renovation services in Tallinn. Whether you are fitting a shower cabin for the first time, replacing a tired enclosure, or converting a bathtub alcove into a modern walk-in shower, TorudeAbi24 certified plumbers deliver professional, fast, and clean installation across every district in Tallinn — Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, Haabersti — and throughout Harjumaa county.",
    "We install every popular shower cabin type: square and rectangular corner cabins with single or double sliding doors, semicircular cabins ideal for compact bathrooms, straight-entry inline cabins, frameless walk-in shower walls for minimalist designs, bi-fold sliding door enclosures, and bespoke glass shower rooms built to any size. Our plumbers work with all major brands — Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Roca, and Ido — and can advise you on the right model for your bathroom dimensions, design style, and budget.",
    "The shower cabin installation process begins with an on-site assessment of the available space and existing pipework. We start by removing the old bath, shower cabin, or any existing fixture and thoroughly cleaning the surface. We then inspect the floor drain position and, where needed, reposition the siphon to the correct location — work that involves concrete cutting, laying a new waste pipe section, and floor levelling. On the shower tray itself — whether SMC prefabricated, acrylic, or tiled — a floor gradient of 1.5–2% directed towards the drain is critical. Incorrect fall angle is the single most common hidden-leak problem in shower cabins, often not visible until moisture damage appears months later.",
    "For water connections, we link the shower mixer to both the hot and cold supply, fit a thermostatic valve where required, and replace worn isolation valves and flexible tail pipes. We work exclusively with CE-certified components that meet Estonian building regulations — Geberit, Hansgrohe, Grohe, Ravak, and Oras are our standard supply partners. All water connections are made with professional press-fit or welded joints; flexible hoses are never used for permanent connections, eliminating a common source of future leaks.",
    "Shower cabin watertightness is critical: even a minor leak into the floor screed or behind tiles can cause extensive moisture damage, mould growth, and structural weakening within months. Our specialists use sanitary-grade silicone sealant, corner profile gaskets, and liquid membrane waterproofing materials designed for permanently wet environments. All joints are filled with mould-resistant silicone in two coats, applied under pressure, to maintain a long-term seal despite daily temperature cycling. The junction between shower tray and wall receives a waterproofing tape strip bedded into sealant as standard procedure.",
    "Tallinn's older housing stock — the concrete panel blocks built between 1960 and 1985, the post-war brick walk-up buildings, and the unrenovated 1990s apartment blocks — often features bathroom dimensions that are narrower than standard modular sizes, lower ceiling heights, and uneven concrete floors. Our team is experienced working in confined conditions and offers adapted solutions: shower trays can be cut on-site to fit non-standard alcoves, adjustable frame systems accommodate out-of-plumb walls, and small-scale tiling work is included in the scope when needed. We also account for the vertical pipework routing common in older Tallinn apartment buildings, which sometimes restricts drain repositioning — we always assess the pipe layout first and present a realistic solution before work begins.",
    "After every shower cabin installation we carry out a mandatory leak test: all isolation valves are opened to full mains pressure, the shower mixer is run for several minutes, and every pipework connection, silicone ring, siphon seal, glass profile gasket, and waste outlet is visually inspected under live flow. You observe the check alongside us and sign a completion certificate — this document forms the basis of your 2-year installation warranty. We also hand over care instructions: which cleaners to use on glass panels (acid-free), how to treat limescale on glass surfaces, and when silicone sealant should be renewed.",
    "Shower cabin installation and replacement labour starts from €35 per hour. A -30% discount applies between 08:00 and 19:00 on every day of the week — weekdays and weekends alike. Work between 19:00 and 08:00 carries a €10 surcharge per call-out. There is no upfront payment: you pay only after the work is completed and you are satisfied. The 2-year warranty covers all plumbing and installation work — drain, siphon, water connections, silicone sealing, and tray anchoring. The cabin glass, frame, and tray carry the manufacturer's separate warranty.",
    "For a free, no-obligation shower cabin installation quote in Tallinn, fill in the contact form below or call +372 56 89 79 29. Our dispatcher responds immediately and books a time that suits your schedule — weekdays, weekends, and public holidays included. We serve all Tallinn districts and the wider Harjumaa region, including Viimsi, Maardu, Saue, Keila, and beyond. Entrust your shower cabin installation to licensed professionals backed by a written guarantee.",
  ];

  const ru = [
    "Установка душевой кабины — одна из самых востребованных услуг по ремонту ванных комнат в Таллинне. Будь то первая установка, замена изношенной кабины или переоборудование пространства ванны в современный walk-in душ, сертифицированные сантехники TorudeAbi24 выполняют профессиональный, быстрый и аккуратный монтаж во всех районах Таллина — Кесклинн, Ласнамяэ, Мустамяэ, Кристийне, Пыхья-Таллинн, Нымме, Пирита, Хааберсти — и по всему уезду Харьюмаа.",
    "Мы устанавливаем все популярные типы душевых кабин: угловые квадратные и прямоугольные с одно- или двухдверными раздвижными панелями, полукруглые кабины для компактных ванных комнат, кабины с прямым входом, бесрамные walk-in душевые перегородки в минималистичном стиле, кабины с раскладными дверьми, а также душевые комнаты из стекла по индивидуальным размерам. Работаем со всеми ведущими брендами — Ravak, Cezares, Huppe, Simpsons, Matki, Riho, Roca, Ido — и поможем выбрать подходящую модель с учётом размеров ванной, дизайна и бюджета.",
    "Процесс установки душевой кабины начинается с осмотра помещения и существующего трубопровода. Сначала демонтируем старую ванну, душевую кабину или другие элементы и тщательно очищаем поверхность. Затем проверяем расположение напольного слива и при необходимости переносим сифон на новое место — это включает резку бетона, прокладку нового участка канализационной трубы и выравнивание пола. На поддоне — будь то SMC-поддон, акриловый или выложенный плиткой — принципиально важен правильный уклон 1,5–2% в сторону слива. Неправильный уклон — наиболее распространённая скрытая причина протечек, которая проявляется как повреждение от влаги спустя несколько месяцев.",
    "По части водоподключений соединяем смеситель с горячей и холодной водой, при необходимости устанавливаем термостатический смеситель, заменяем изношенные запорные клапаны и гибкие подводки. Используем только сертифицированные компоненты с маркировкой CE, соответствующие эстонским строительным нормам: Geberit, Hansgrohe, Grohe, Ravak и Oras. Все водопроводные соединения выполняются пресс-фитингами или сварными методами — гибкие шланги в постоянных соединениях не используются, что исключает распространённую причину будущих протечек.",
    "Герметичность душевой кабины — критически важный фактор: даже незначительная протечка в стяжку пола или за плитку способна за несколько месяцев вызвать серьёзное повреждение от влаги, рост плесени и ослабление несущих конструкций. Наши специалисты применяют санитарный силиконовый герметик, угловые профильные прокладки и жидкие гидроизоляционные материалы, рассчитанные на постоянную влажную среду. Все стыки заполняются антиплесневым силиконом в два слоя под давлением — это обеспечивает долговременную герметичность даже при ежедневных перепадах температур. Стык поддона и стены в обязательном порядке проклеивается гидроизоляционной лентой на силиконе.",
    "Старый жилой фонд Таллина — панельные дома 1960–1985 годов постройки, послевоенные кирпичные здания и нереновированные дома 1990-х — нередко имеет ванные комнаты уже стандартных модульных размеров, с низкими потолками и неровными бетонными полами. Наша бригада привыкла работать в стеснённых условиях и предлагает адаптированные решения: поддоны подрезаются под нестандартные проёмы, регулируемые рамные конструкции компенсируют неровные стены, а при необходимости в объём работ включается небольшой объём плиточных работ. Учитываем и расположение вертикальных стояков в старых таллинских многоквартирных домах, которые иногда ограничивают перенос слива — всегда сначала оцениваем схему трубопровода и предлагаем реалистичное решение до начала работ.",
    "После каждой установки проводим обязательную проверку на герметичность: запорные клапаны открываем на полное давление магистрали, смеситель включаем на несколько минут, и визуально проверяем все трубные соединения, силиконовые прокладки, уплотнение сифона, профильные прокладки стеклянных панелей и работу отвода. Вы наблюдаете за проверкой рядом с нами и подписываете акт выполненных работ — этот документ является основанием для 2-летней гарантии. Также передаём инструкцию по уходу: какие чистящие средства подходят для стекла (без кислоты), как бороться с известковым налётом и когда обновлять силиконовые уплотнения.",
    "Установка и замена душевой кабины — от €35 в час. Скидка -30% действует ежедневно с 08:00 до 19:00, включая выходные (€24,50/ч). Ночные работы (19:00–08:00) — доплата €10 за вызов. Предоплата не требуется: оплачиваете только после завершения работ и приёмки. Гарантия 2 года распространяется на все сантехнические и монтажные работы — слив, сифон, водоподключение, силиконовую герметизацию и крепление поддона. Стеклянные панели, рама и поддон кабины покрываются отдельной гарантией производителя.",
    "Для получения бесплатной сметы на установку душевой кабины в Таллинне — заполните контактную форму ниже или позвоните по номеру +372 56 89 79 29. Диспетчер ответит немедленно и согласует удобное для вас время — в будни, выходные и праздники. Обслуживаем все районы Таллина и Харьюмаа, включая Виймси, Маарду, Сауэ, Кейла и прилегающие территории. Доверьте установку душевой кабины лицензированным профессионалам с письменной гарантией на результат.",
  ];

  return {
    et: toBlocks("et", et),
    en: toBlocks("en", en),
    ru: toBlocks("ru", ru),
  };
}

const IMAGE_ALT = {
  _type: "localeString",
  et: "Dušikabiini paigaldus Tallinnas — professionaalne montaaž ja torustiku ühendamine",
  en: "Shower cabin installation in Tallinn — professional fitting and plumbing connections",
  ru: "Установка душевой кабины в Таллинне — профессиональный монтаж и подключение трубопровода",
};

const GALLERY_ALT = {
  _type: "localeString",
  et: "Uus dušikabiin paigaldatud Tallinna vannitoasse — nurkkabiin liugustega",
  en: "New shower cabin installed in a Tallinn bathroom — corner enclosure with sliding doors",
  ru: "Новая душевая кабина, установленная в ванной комнате Таллина — угловая кабина с раздвижными дверями",
};

function validateLengths() {
  const { metaTitle, metaDescription } = PATCH;
  let ok = true;
  for (const lang of ["et", "en", "ru"]) {
    const t = metaTitle[lang];
    const d = metaDescription[lang];
    if (t.length > 60) { console.warn(`  ⚠️  metaTitle.${lang} is ${t.length} chars (max 60): "${t}"`); ok = false; }
    else console.log(`  ✅  metaTitle.${lang}: ${t.length} chars OK`);
    if (d.length > 159) { console.warn(`  ⚠️  metaDescription.${lang} is ${d.length} chars (max 159): "${d}"`); ok = false; }
    else console.log(`  ✅  metaDescription.${lang}: ${d.length} chars OK`);
  }
  return ok;
}

async function main() {
  console.log("=".repeat(60));
  console.log("🚿  Dušikabiini paigaldus — seed/patch script");
  console.log("=".repeat(60));

  console.log("\n📏  Validating SEO field lengths…");
  const lengthsOk = validateLengths();
  if (!lengthsOk && !dryRun) {
    console.error("\n❌  Length validation failed — fix meta fields before seeding.");
    process.exit(1);
  }

  const body = buildBody();
  for (const lang of ["et", "en", "ru"]) {
    const wordCount = body[lang].reduce((n, b) => n + b.children[0].text.split(/\s+/).length, 0);
    console.log(`  📝  body.${lang}: ~${wordCount} words (min 500)`);
    if (wordCount < 500) console.warn(`  ⚠️  body.${lang} is below 500 words!`);
  }

  if (dryRun) {
    console.log("\n🔍  DRY RUN — patch that would be applied to service-riser-pipe-replacement:");
    const preview = { ...PATCH, body: { et: `[${body.et.length} blocks]`, en: `[${body.en.length} blocks]`, ru: `[${body.ru.length} blocks]` } };
    console.log(JSON.stringify(preview, null, 2));
    console.log("\n✨  Dry run complete — no changes written.");
    return;
  }

  console.log("\n🚀  Patching service-riser-pipe-replacement…");

  await client
    .patch("service-riser-pipe-replacement")
    .set({
      ...PATCH,
      body: { _type: "localeBlock", ...body },
      "image.alt": IMAGE_ALT,
      "gallery[_key==\"g1\"].alt": GALLERY_ALT,
    })
    .commit();

  console.log("   ✅  Patched service-riser-pipe-replacement");
  console.log("\n✨  Done!");
  console.log("   📌  Service title  → Dušikabiini paigaldus Tallinnas (ET)");
  console.log("   📌  Slug           → shower-cabin-installation");
  console.log("   📌  Path ET        → /teenused/dusikabiini-paigaldus");
  console.log("   📌  Path RU        → /teenused/ustanovka-dushevoi-kabiny");
  console.log("   📌  Images kept    — alt texts updated to match new service");
  console.log("   📌  Open Sanity Studio → Service → Dušikabiini paigaldus to verify");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
