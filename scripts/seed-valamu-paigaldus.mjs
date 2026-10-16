/**
 * scripts/seed-valamu-paigaldus.mjs
 *
 * Creates the new "Valamu paigaldus" (Sink Installation) service in Sanity CMS.
 * - 3 languages: ET, EN, RU
 * - 500+ word body in each language
 * - SEO title ≤ 60 chars, SEO description ≤ 159 chars
 * - 5 FAQ items (3 languages each)
 * - Category: Plumbing Works (serviceCategory-plumbing-works)
 * - The user adds 2 images manually in the Sanity Studio after running this script.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-valamu-paigaldus.mjs
 *   node --env-file=.env.local scripts/seed-valamu-paigaldus.mjs --dry-run
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

const SERVICE = {
  _type: "service",
  _id: "service-valamu-paigaldus",

  title: {
    _type: "localeString",
    et: "Valamu paigaldus Tallinnas",
    en: "Sink Installation Tallinn",
    ru: "Установка раковины в Таллинне",
  },

  slug: { _type: "slug", current: "sink-installation" },

  pathSegment: {
    et: "valamu-paigaldus",
    ru: "ustanovka-rakoviny",
  },

  category: {
    _type: "reference",
    _ref: "serviceCategory-plumbing-works",
  },

  icon: "Droplets",

  shortDescription: {
    _type: "localeText",
    et: "Professionaalne valamu paigaldus ja vahetus Tallinnas. Kiire kohalejõudmine, 2-aastane garantii, läbipaistev hinnakiri. Helistage ööpäevaringselt.",
    en: "Professional sink installation and replacement in Tallinn. Fast response, 2-year warranty, transparent pricing. Call us 24/7.",
    ru: "Профессиональная установка и замена раковины в Таллинне. Быстрый выезд, гарантия 2 года, прозрачные цены. Звоните круглосуточно.",
  },

  metaTitle: {
    _type: "localeString",
    et: "Valamu paigaldus Tallinnas | TorudeAbi24",
    en: "Sink Installation Tallinn | TorudeAbi24",
    ru: "Установка раковины Таллинн | TorudeAbi24",
  },

  metaDescription: {
    _type: "localeText",
    et: "Valamu paigaldus ja vahetus Tallinnas — professionaalsed torumehad, 2-aastane garantii. Reageerimine 30–60 min. -30% soodustus 08–19h.",
    en: "Sink installation & replacement in Tallinn — licensed plumbers, 2-year warranty. 30–60 min response. -30% discount 08–19h. Call +372 56 89 79 29.",
    ru: "Установка и замена раковины в Таллинне — лицензированные сантехники, гарантия 2 года. Выезд 30–60 мин. Скидка -30% с 08 до 19ч.",
  },

  faq: [
    {
      _type: "object",
      _key: "faq1",
      question: {
        _type: "localeString",
        et: "Kui kaua valamu paigaldamine aega võtab?",
        en: "How long does sink installation take?",
        ru: "Сколько времени занимает установка раковины?",
      },
      answer: {
        _type: "localeText",
        et: "Standardne valamu paigaldamine võtab 1–2 tundi. Kui vana valamu tuleb esmalt eemaldada ja toruühendused ümber teha, võib töö kesta kuni 3 tundi. Keerulisematel juhtudel — näiteks vannitoa uue torustiku paigaldamisel — hindame ajakulu kohapeal.",
        en: "Standard sink installation takes 1–2 hours. If an old sink must be removed and pipework rerouted, the job may take up to 3 hours. For more complex scenarios, such as installing new bathroom pipework, we assess the time on-site.",
        ru: "Стандартная установка раковины занимает 1–2 часа. Если нужно демонтировать старую раковину и переделать подводку, работа может занять до 3 часов. При сложных случаях — например, при прокладке нового трубопровода — оцениваем время на месте.",
      },
    },
    {
      _type: "object",
      _key: "faq2",
      question: {
        _type: "localeString",
        et: "Mis maksab valamu paigaldus Tallinnas?",
        en: "How much does sink installation cost in Tallinn?",
        ru: "Сколько стоит установка раковины в Таллине?",
      },
      answer: {
        _type: "localeText",
        et: "Valamu paigalduse töötund algab €35-st. Tööpäevadel ja nädalavahetusel kella 08:00–19:00 kehtib -30% soodustus (€24,50/h). Öine töö (19:00–08:00) sisaldab €10 lisatasu. Lõplik hind sõltub valamu tüübist, seina- või mööblikinnituse vajadusest ja sifoni valikust. Hinnapakkumine on tasuta.",
        en: "Sink installation labour starts from €35/hour. A -30% discount applies between 08:00 and 19:00 on all days (€24.50/h). Night work (19:00–08:00) includes a €10 surcharge. The final price depends on the sink type, wall or vanity unit fixing, and trap choice. A quote is always free.",
        ru: "Час работы по установке раковины от €35. Скидка -30% действует с 08:00 до 19:00 (€24,50/ч). Ночные работы (19:00–08:00) — доплата €10. Итоговая цена зависит от типа раковины, способа крепления и выбора сифона. Смета бесплатна.",
      },
    },
    {
      _type: "object",
      _key: "faq3",
      question: {
        _type: "localeString",
        et: "Milliseid valamuid te Tallinnas paigaldate?",
        en: "What types of sinks do you install in Tallinn?",
        ru: "Какие типы раковин вы устанавливаете в Таллине?",
      },
      answer: {
        _type: "localeText",
        et: "Paigaldame kõiki populaarseid valamutüüpe: seinale kinnituvad valamud, mööblile paigutavad valamud (ülalt- ja altpaigaldus), aluseta (pedestal) valamud, küünarnuki all- ja pealtpaigaldusega köögivaalmud ning erilahendustega ühekord- ja kahekordse valamutega variant. Töötame Geberit, Villeroy & Boch, Roca, Duravit, Hansgrohe jt populaarsete kaubamärkidega.",
        en: "We install all popular sink types: wall-hung basins, vanity unit basins (top-mount and undermount), pedestal basins, single- and double-bowl kitchen sinks, and custom countertop sinks. We work with Geberit, Villeroy & Boch, Roca, Duravit, Hansgrohe, and other leading brands.",
        ru: "Устанавливаем все популярные типы раковин: подвесные, накладные и встроенные в тумбу, на пьедестале, одинарные и двойные кухонные мойки, а также раковины в столешницу. Работаем с Geberit, Villeroy & Boch, Roca, Duravit, Hansgrohe и другими ведущими брендами.",
      },
    },
    {
      _type: "object",
      _key: "faq4",
      question: {
        _type: "localeString",
        et: "Kas annate valamu paigaldusele garantii?",
        en: "Do you provide a warranty on sink installation?",
        ru: "Предоставляете ли вы гарантию на установку раковины?",
      },
      answer: {
        _type: "localeText",
        et: "Jah, kõigile meie paigaldustöödele kehtib 2-aastane garantii. See hõlmab toruühendusi, sifoni tihedust, kraani kinnitust ja kõiki muid teostatavaid osi. Valamut ennast katab tootja garantii eraldi.",
        en: "Yes, all our installation work carries a 2-year warranty. This covers pipe connections, trap sealing, tap fixings, and all other installed components. The sink itself is covered separately by the manufacturer's warranty.",
        ru: "Да, на все наши монтажные работы действует 2-летняя гарантия. Она распространяется на трубные соединения, герметичность сифона, крепление смесителя и все остальные установленные элементы. Гарантия на саму раковину — отдельная, от производителя.",
      },
    },
    {
      _type: "object",
      _key: "faq5",
      question: {
        _type: "localeString",
        et: "Kas teete ka valamu vahetust koos vana eemaldamisega?",
        en: "Do you also replace an old sink including removal?",
        ru: "Делаете ли вы замену старой раковины вместе с демонтажом?",
      },
      answer: {
        _type: "localeText",
        et: "Jah, eemaldame vana valamu, viime selle ära ning paigaldame uue koos kõigi vajalike ühenduste ja sifoni reguleerimisega. Ühe külastusega tehakse täielik vahetus ilma lisatasuta lammutustöö eest.",
        en: "Yes, we remove the old sink and take it away, then install the new one with all required connections and trap adjustment — all in a single visit, with no extra charge for the removal work.",
        ru: "Да, демонтируем старую раковину, вывозим её и устанавливаем новую со всеми необходимыми подключениями и настройкой сифона — за один визит, без доплаты за демонтаж.",
      },
    },
  ],

  order: 8,
};

function buildBody() {
  const et = [
    "Valamu paigaldus on üks sagedasemaid torumehe väljakutseid Tallinnas — olgu tegemist vannitoa uuendusega, köögivalamu vahetusega, vana roestunud valamukraani asendamisega või täiesti uue torustikuühenduse rajamisega. TorudeAbi24 sertifitseeritud torumehad paigaldavad valamuid professionaalselt, kiiresti ja puhtalt kõigis Tallinna linnaosades — Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, Haabersti — ning kogu Harjumaal.",
    "Meie litsentseeritud spetsialistid töötavad kõigi populaarsete valamutüüpidega: seinale kinnituvad ehk ripptüüpi valamud, vannitoamöbli peale ja alla paigaldatavad valamud (top-mount ja undermount), jalaga alusega (pedestal) valamud, köögivaalmud nii ühe- kui kahekordse valamuvõimalusega ning eritellimusel toodetud plaadile või tööpinnale integreeritavad valamud. Pakume täislahendust — alates vanast valamust vabanemisest ja kinnitusjälgede taastamisest kuni uue seadme töövalmiduseni.",
    "Valamu paigaldusprotsess koosneb mitmest olulisest etapist. Esmalt vaatame üle olemasoleva torustiku seisukorra: kuuma- ja külmaveetorud, sulgeventilid, äravoolusifonid ning tihendid. Vajadusel vahetame kulunud või lekkivad osad enne uue valamu paigaldamist välja, et vältida hilisemaid probleeme. Seejärel kinnitame valamu vastavalt tootja juhistele ja ruumi eripärale — kas seina külge konsoolidega, mööblitüki külge kinnitusvõtetega või põrandale alusjalaga. Kraanid (segisti) ja sifon paigaldatakse paralleelselt, et säästa aega ja tagada ühtselt töötavad ühendused.",
    "Tallinna vanemad kortermajad — eriti 1960.–1980. aastate paneelmajad ja kiviseinadega vanemad hooned — vajavad sageli spetsiaalset kinnitussüsteemi, kuna standardsed düüblid ei pruugi olla piisavalt tugevad keraamilise või komposiitvalamu jaoks. Meie meeskond hindab alati seina materjali enne tööde algust ning valib sobivad ekspansioondüüblid, metalltoestikud, seinaplangud või peidetud raamkonstruktsiooni, mis tagavad valamu pikaajalise stabiilsuse ilma pragude ja niiskuskahjustuseta.",
    "Köögivaalmude puhul on meie lisaoskused: mitmeaugu kraanide ühendamine, sahhariini (vedelseep) ja käterätipaberi hoidiku paigaldamine, olmejäätmete purustaja (food waste disposer) ühendamine ning nõudepesumasina tühjendusvooliku liitmine valamu­sifooniga. Töötame graniitkompositsioonist, roostevabast terasest, šamuottestsavi (fireclay) ja keraamilistest valamutest — iga materjal nõuab täpselt sobivaid tihendeid ja kinnitusvõtteid, mida meie torumehad asjatundjatena teavad.",
    "Pärast paigaldust teostame kohustusliku lekkekontrolli: avame veesulgurid täispingele, laseme vee läbi sifoni ja äravoolu, kontrollime visuaalselt kõiki liitmikke, survekruvisid ja tihendsõrmuseid ning kinnitame, et äravool töötab takistamatult. Klient jälgib kontrolli käiku silmaga ja allkirjastab tööde vastuvõtuakti — see dokument on ka 2-aastase garantii aluseks.",
    "Valamu paigalduse ja vahetuse töötund algab €35-st. Tööpäevadel ja nädalavahetustel kella 08:00–19:00 kehtib -30% soodustus kõigile tööjõukuludele. Öösel ja varases hommikul (19:00–08:00) lisandub €10 väljakutsulisa. Ettemaksu ei nõuta — maksate alles pärast töö lõpetamist ja kontrolli. Meile toob 2-aastane paigaldusgarantii teile meelerahu. Helistage +372 56 89 79 29 — meie dispetšer saadab lähima torumehe kohale 30–60 minuti jooksul kõikjal Tallinnas ja Harjumaal.",
    "Valamu vahetamisel peame sageli ka sifoni, veetorude haakede, paindlike liidetute ja sulgemisventilide täielikku komplekti uuendama, kuna vanad komponendid võivad olla kulunud, roostetanud või enam kauplustes saadaval olevate standardosadega ühildumatud. Sel juhul teavitame klienti enne töö alustamist kõigist materjalikuludest ning soetame vajalikud varuosad ise — hulgihindadega, ilma lisatasuta. Meie partnerid hulgiladudes tagavad, et enamik standardosasid on laos olemas ning töö ei veniks osade ootamisel. Lisaks kontrollime alati, kas veeõhuti (aeraator) kraaniotsas on puhas ja et kraani vooluhulk vastab normaalsele tarbimisele.",
    "Kas soovite saada tasuta hinnapakkumist valamu paigalduse kohta? Täitke meie kontaktivorm või helistage +372 56 89 79 29. Meie meeskond vastab kiiresti ja lepib kokku teile sobiva aja — nii argipäeviti, nädalavahetusel kui ka riigipühade ajal. Usaldage valamu paigaldus Tallinnas professionaalidele, kelle töö on kaetud garantiiga.",
  ];

  const en = [
    "Sink installation is one of the most common plumbing calls in Tallinn — whether you are upgrading a bathroom, replacing a worn kitchen sink, swapping out a corroded tap, or creating an entirely new pipework connection for a newly renovated space. TorudeAbi24 certified plumbers install all types of sinks quickly, cleanly, and professionally across every district in Tallinn — Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, Haabersti — and throughout Harjumaa county.",
    "Our licensed specialists work with every popular sink type: wall-hung basins with concealed or semi-concealed brackets, vanity top-mount and undermount basins, pedestal basins, single- and double-bowl kitchen sinks with or without drainer boards, and bespoke countertop-integrated basins in stone, concrete, or composite materials. We provide the complete solution — from safely removing the existing fixture and making good the wall surface to leaving the new sink fully connected, tested, and ready for immediate use.",
    "The sink installation process has several key stages. We begin with a thorough inspection of the existing pipework: hot and cold supply pipes, isolation valves, waste traps, and the structural integrity of wall fixings. Any worn, corroded, or undersized components are replaced before the new sink is fitted — this prevents future leaks and ensures code-compliant connections. The sink is then secured according to the manufacturer's instructions and the room's structural characteristics: wall-hung with steel brackets, set onto a vanity unit, or anchored through the floor on a pedestal. Tap mixer and trap installation runs in parallel to save time and produce coherent, watertight connections in one visit.",
    "Tallinn's older apartment buildings — particularly the concrete panel blocks built between 1960 and 1985, and the load-bearing brick structures found across Kesklinn and Kalamaja — often demand specialist fixing systems. Standard wall plugs may not provide adequate strength for a heavy ceramic or granite composite basin. Our team always assesses the wall substrate before drilling: we select the right expansion anchors, steel spreader plates, or hidden frame supports to guarantee long-term stability without cracking the render or allowing moisture to track behind the fixture and into the wall structure.",
    "For kitchen sink installations, our additional capabilities include: multi-tap-hole configuration for separate hot/cold taps and spray hoses, soap and lotion dispenser ports, food waste disposer (chopper unit) connections, and routing the dishwasher drain hose correctly into the sink waste via an anti-siphon air gap. We work with granite composite, stainless steel, fireclay, and vitreous china sinks — each material has specific requirements for sealant type, clip spacing, and weight distribution that our plumbers handle as a matter of course.",
    "After every installation we perform a mandatory leak check: isolation valves are opened to full mains pressure, water is run through the trap and waste, and every compression joint, push-fit connector, and flexible tail is visually inspected under flow. We confirm the waste drains freely without gurgling or slow-draining, and that there is no seepage at the wall, under the basin, or at the siphon connections. You watch the check alongside us and sign a completion certificate — this document is the basis for your 2-year installation warranty.",
    "Sink installation and replacement labour starts from €35 per hour. A -30% discount applies between 08:00 and 19:00 on every day of the week — weekdays and weekends alike. Night and early morning work between 19:00 and 08:00 carries a €10 surcharge per call-out. There is no upfront payment: you pay only after the work is completed and you are satisfied. The 2-year warranty covers all installed connections, the trap seal, and tap fixings. Call +372 56 89 79 29 now and our dispatcher will send the nearest available plumber to your door within 30–60 minutes anywhere in Tallinn.",
    "For a free, no-obligation sink installation quote in Tallinn, fill in our contact form below or call +372 56 89 79 29. Our team is available every day of the year — including weekends and public holidays — and will confirm a convenient appointment time that suits your schedule. Trust your sink installation to the licensed professionals who stand behind their work with a written guarantee.",
  ];

  const ru = [
    "Установка раковины — одна из наиболее частых сантехнических заявок в Таллинне: будь то обновление ванной комнаты, замена изношенной кухонной мойки, демонтаж заржавевшего смесителя или прокладка нового трубопровода в отремонтированном помещении. Сертифицированные сантехники TorudeAbi24 устанавливают раковины любых типов быстро, аккуратно и профессионально во всех районах Таллина — Кесклинн, Ласнамяэ, Мустамяэ, Кристийне, Пыхья-Таллинн, Нымме, Пирита, Хааберсти — и по всему Харьюмаа.",
    "Наши лицензированные специалисты работают со всеми популярными типами раковин: подвесные (настенные) раковины на скрытых кронштейнах, накладные и встроенные в тумбу (top-mount и undermount), на пьедестале, одинарные и двойные кухонные мойки с крылом или без, а также раковины, интегрированные в столешницу из натурального камня, бетона или композита. Предоставляем полное решение — от безопасного демонтажа старого прибора и восстановления поверхности стены до полной готовности новой раковины к использованию.",
    "Процесс установки раковины включает несколько ключевых этапов. Начинаем с тщательного осмотра существующего трубопровода: подача горячей и холодной воды, запорные клапаны, сифон и надёжность настенных анкеров. Изношенные, заржавевшие или нестандартные детали заменяются до монтажа новой раковины — это исключает протечки в будущем и обеспечивает соответствие нормам. Раковина крепится в соответствии с инструкцией производителя и конструктивными особенностями помещения: подвесным способом на стальных кронштейнах, установкой на тумбу или анкеровкой через пол на пьедестале. Смеситель и сифон монтируются параллельно, что экономит время и гарантирует единую герметичную систему за один визит.",
    "Старые таллинские многоквартирные дома — особенно панельные блоки 1960–1985 годов постройки и несущие кирпичные конструкции в Кесклинне и Каламайя — нередко требуют специальных крепёжных решений. Стандартные дюбели могут не выдержать нагрузку тяжёлой керамической или гранитно-композитной раковины. Наша команда всегда оценивает материал стены перед сверлением: подбираем анкерные болты нужного диаметра, стальные распределительные пластины или скрытые рамные конструкции, гарантирующие долгосрочную устойчивость без растрескивания штукатурки и проникновения влаги за облицовку.",
    "При установке кухонных моек мы дополнительно специализируемся на: подключении нескольких отверстий под смеситель горячей/холодной воды и выдвижной лейки, монтаже диспенсеров для мыла и лосьона, подключении измельчителя пищевых отходов, а также правильной разводке сливного шланга посудомоечной машины через воздушный разрыв к сифону мойки. Работаем с раковинами из гранитного композита, нержавеющей стали, шамота и фаянса — каждый материал требует специфического герметика, шага установки клипс и распределения нагрузки, что наши сантехники знают досконально.",
    "После каждой установки обязательно проводим проверку на протечки: запорные клапаны открываются на полное давление магистрали, вода прогоняется через сифон и канализацию, каждое компрессионное соединение, пресс-фитинг и гибкая подводка визуально осматриваются под потоком. Проверяем свободный отток воды без бульканья и медленного слива, а также отсутствие малейших следов влаги у стены, под раковиной и в местах подключения к канализации. Клиент наблюдает за проверкой рядом с нами и подписывает акт выполненных работ — этот документ является основанием для 2-летней гарантии.",
    "Установка и замена раковины — от €35 в час. Скидка -30% действует с 08:00 до 19:00 ежедневно, включая выходные. Ночные и утренние работы (19:00–08:00) — доплата €10 за вызов. Предоплата не требуется: оплачиваете только после завершения и проверки. Гарантия 2 года распространяется на все установленные соединения, герметичность сифона и крепление смесителя. Звоните +372 56 89 79 29 — диспетчер направит ближайшего свободного сантехника к вам в течение 30–60 минут по всему Таллину.",
    "Для получения бесплатной предварительной сметы на установку раковины в Таллине — заполните контактную форму ниже или позвоните по номеру +372 56 89 79 29. Принимаем заявки ежедневно, включая праздники и выходные. Специалист свяжется с вами в течение нескольких минут и согласует удобное время визита. Доверьте установку раковины лицензированным профессионалам, которые дают письменную гарантию на свою работу.",
  ];

  return {
    et: toBlocks("et", et),
    en: toBlocks("en", en),
    ru: toBlocks("ru", ru),
  };
}

function validateLengths() {
  const { metaTitle, metaDescription } = SERVICE;
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
  console.log("🚿  Valamu paigaldus — seed script");
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
    console.log("\n🔍  DRY RUN — document that would be created:");
    console.log(JSON.stringify({ ...SERVICE, body: { et: `[${body.et.length} blocks]`, en: `[${body.en.length} blocks]`, ru: `[${body.ru.length} blocks]` } }, null, 2));
    console.log("\n✨  Dry run complete — no changes written.");
    return;
  }

  console.log("\n🚀  Checking if document already exists…");
  const existing = await client.fetch(
    `*[_type == "service" && slug.current == "sink-installation"][0]{ _id }`,
  );

  const doc = {
    ...SERVICE,
    body: { _type: "localeBlock", ...body },
  };

  if (existing?._id) {
    console.log(`   Found existing document ${existing._id} — patching…`);
    await client.patch(existing._id).set(doc).commit();
    console.log(`   ✅  Patched ${existing._id}`);
  } else {
    console.log("   No existing document — creating new…");
    const created = await client.createOrReplace(doc);
    console.log(`   ✅  Created ${created._id}`);
  }

  console.log("\n✨  Done!");
  console.log("   📌  Next step: open Sanity Studio → Service → 'Sink Installation'");
  console.log("   📌  Upload 2 photos: hero image + gallery image");
  console.log("   📌  Confirm category = Plumbing Works");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
