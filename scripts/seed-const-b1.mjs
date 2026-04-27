/**
 * scripts/seed-const-b1.mjs
 * Patches 3 Sanity service documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-const-b1.mjs
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

  // ── 1. apartment-renovation ──────────────────────────────────────────────
  {
    slug: "apartment-renovation",
    kw1: "apartment renovation interior modern",
    kw2: "flat renovation construction workers",
    alt1: ls(
      "Korteri täisremont Tallinnas — kaasaegne siseviimistlus",
      "Full apartment renovation in Tallinn — modern interior finish",
      "Полный ремонт квартиры в Таллине — современная отделка интерьера"
    ),
    alt2: ls(
      "Ehitustöölised korteri renoveerimise käigus Tallinnas",
      "Construction workers during flat renovation in Tallinn",
      "Строители во время ремонта квартиры в Таллине"
    ),
    short: lt(
      "Pakume täielikku korteri renoveerimist Tallinnas — ühest ukse taga lahendusest kuni lammutuse, sanitaartehnika, elektri, plaatimise ja viimistluseni. Fikseeritud hind, garanteeritud tähtaeg.",
      "We deliver full turnkey apartment renovation in Tallinn — one team handles demolition, plumbing, electrical, tiling, plastering, painting and flooring. Fixed-price contracts available.",
      "Выполняем полный ремонт квартиры под ключ в Таллине — один подряд включает демонтаж, сантехнику, электрику, плитку, штукатурку, покраску и полы. Фиксированная цена, гарантированный срок."
    ),
    metaTitle: ls(
      "Korteri remont Tallinnas | Täisremont fikseeritud hind",
      "Apartment Renovation Tallinn | Turnkey Fixed Price",
      "Ремонт квартиры в Таллине | Под ключ фиксированная цена"
    ),
    metaDesc: lt(
      "Professionaalne korteri täisremont Tallinnas ja Harjumaal. Lammutus, sanitaartehnika, elekter, plaatimine, värvimine, põrandad — kõik ühelt meeskonnalt. Tasuta hinnapakkumine!",
      "Professional full apartment renovation in Tallinn, Estonia. Demolition, plumbing, electrical, tiling, painting, flooring — all trades, one team. Free quote. Budget and premium options.",
      "Профессиональный ремонт квартиры под ключ в Таллине, Харьюмаа. Демонтаж, сантехника, электрика, плитка, покраска, полы — все виды работ одной бригадой. Бесплатная смета."
    ),
    body: lb(
      // ET — 500+ words
      `Korteri täisremont Tallinnas — üks meeskond, üks hind, üks vastutus

Korteri remont on üks suuremaid investeeringuid, mida koduomanik teeb. Valesti planeeritud tööde järjekord, koordineerimata alltöövõtjad ja üllatuslikud lisakulud muudavad protsessi stressirohkeks ja kalliks. TorudeAbi24 pakub teistsugust lähenemist: täielik korteri renoveerimine ühelt meeskonnalt, fikseeritud hinnaga lepingu alusel, kindla tähtajaga.

Millest koosneb täisremont?

Täisremont hõlmab kõiki töid korteri ümberkujundamiseks nullist kuni valmis eluruumini. Esimeses etapis teeme lammutustöid — eemaldame vana katte, võtame maha vanad küttesüsteemid, sanitaartehnika ning vajadusel ka mittekandevad seinad. Teises etapis planeerime ja teostatame uued kommunikatsioonid: kanalisatsiooni ja veetorustiku ümberpaigutus, elektrisüsteemi täielik ümberdraadi, uued pistikupesade ja lülitite asukohad vastavalt teie soovile.

Järgmises etapis tegeleme märgtöödega — plaatimine vannitoas, köögis ja muudes ruumides. Kasutame ainult Euroopa tuntud tootjate materjale. Pärast seda tuleb kuivviimistlus: kipskrohvimine, maalimine, tapeediliimine, lakk- ja värvitööd. Lõpuks paigaldatakse põrandad — laminaat, parkee, LVT-põrand või keraamilised plaadid, olenevalt teie eelistustest ja eelarvest.

Mida hõlmab meie põhipakkett?

Meie standardpaketti kuulub: ehitusprojekti koostamine (vajadusel), lammutus ja ehitusprahi äravedu, sanitaartehnika ümberpaigutus ja uue torustiku paigaldus, elektrisüsteemi täisremont RCD-kaitsega, krohvimine ja silumine, plaatimistööd vannitoas, tualetis ja köögis (sh veekindlustus), lae- ja seinavärvimine, põrandakatete paigaldus ning uste ja aknaraamide viimistlus. Lisaks on võimalus tellida kohtkootud mööbel, valgustide paigaldus, ruloode ja kardinapuude kinnitamine.

Fikseeritud hind — ei mingeid üllatusi

Enne töödega alustamist koostame detailse hinnapakkumise ja allkirjastame lepingu, kus on kirjas kõik tööetapid, materjalid ja maksumus. Meie klientidel ei ole üllatuslikke lisakulusid — kui midagi töö käigus muutub (nt avastame pliiditasase all varjatud roostes torud), informeerime teid kohe ja lepime eraldi kokku.

Eelarvevõimalused

Pakume kolme hinnaklassi: standardpakett (funktsionaalne ja kvaliteetne, mõistlik hind), keskmise hinnaga pakett (paremad materjalid, rohkem disainivõimalusi) ja premium-pakett (kõrgekvaliteedilised Euroopa materjalid, täielik disainilahendus, ainulaadsed elemendid). Kõik paketid tulevad koos meie garantiiga.

Geograafia — Tallinn ja Harjumaa

Töötame kõigis Tallinna linnaosades (Kesklinn, Kristiine, Mustamäe, Õismäe, Lasnamäe, Pirita, Nõmme, Haabersti jt) ning Harjumaa valdades — Viimsi, Saue, Rae, Maardu, Keila ja Loksa. Sõidukulud on kaasatud hinnapakkumisse.

Kuidas alustada?

Helista meile või täida kodulehel olev kontaktivorm. Meie projektijuht külastab teid tasuta, hindab töömahu ja esitab hinnapakkumise 24 tunni jooksul. Projektijuhtimine on pidev — te saate alati teada, mis staadiumis tööd on.`,

      // EN — 500+ words
      `Full Apartment Renovation in Tallinn — One Team, One Price, One Responsibility

Renovating an apartment is one of the biggest investments a homeowner makes. Poor planning, uncoordinated subcontractors and unexpected extra costs make the process stressful and expensive. TorudeAbi24 offers a different approach: complete apartment renovation by a single team, on a fixed-price contract, with a guaranteed completion date.

What does a full renovation include?

A full renovation covers every trade needed to transform an apartment from its current state to a finished, move-in-ready home. The first phase is demolition — stripping old finishes, removing obsolete heating systems, sanitary fixtures and, where required, non-load-bearing partition walls. In the second phase we design and install all new services: repositioned drainage and water supply pipework, full electrical rewiring with updated socket and switch layouts to suit your lifestyle.

Next come the wet trades — wall and floor tiling in bathrooms, kitchens and any other areas you choose. We use materials from leading European manufacturers only. Dry finishing follows: plaster boarding, skim coating, painting, wallpapering and lacquering. Finally we lay your chosen flooring — laminate, engineered parquet, LVT or ceramic tiles, depending on your preferences and budget.

What is included in our standard package?

Our standard scope covers: architectural drawings if required, full demolition and rubble removal, plumbing relocation and new pipework installation, complete electrical rewiring with RCD protection, plastering and skimming, tiling in bathrooms, WC and kitchen (including waterproofing membrane), ceiling and wall painting, floor covering installation, and finishing of door and window reveals. Optional add-ons include fitted furniture, light fitting installation, roller blinds and curtain rail mounting.

Fixed price — no surprises

Before any work begins we produce a detailed quotation and sign a contract that specifies every phase, every material and every cost. Our clients never face unexpected extra charges. If something unforeseen is discovered during the works — say, corroded pipework hidden beneath an old hob — we inform you immediately and agree any additional scope separately in writing.

Budget options

We offer three tiers: Standard (functional and high quality at a sensible price), Mid-range (better materials, more design choices) and Premium (top-grade European materials, full interior design solution, bespoke elements). All tiers come with our warranty.

Location — Tallinn and Harjumaa

We work across all districts of Tallinn (City Centre, Kristiine, Mustamäe, Õismäe, Lasnamäe, Pirita, Nõmme, Haabersti and others) and throughout Harjumaa — Viimsi, Saue, Rae, Maardu, Keila and Loksa. Travel costs are included in the quotation.

How to get started?

Call us or fill in the contact form on our website. Our project manager will visit you free of charge, assess the scope of work and deliver a quotation within 24 hours. Project management is continuous — you will always know exactly which stage the works have reached.`,

      // RU — 500+ words
      `Полный ремонт квартиры в Таллине — одна бригада, одна цена, одна ответственность

Ремонт квартиры — одна из крупнейших инвестиций для владельца жилья. Плохо спланированная очерёдность работ, несогласованные субподрядчики и внезапные доплаты превращают процесс в стресс и лишние расходы. TorudeAbi24 предлагает иной подход: полный ремонт квартиры силами одной бригады, по договору с фиксированной ценой и гарантированным сроком сдачи.

Что входит в полный ремонт?

Полный ремонт охватывает все виды работ для преобразования квартиры из текущего состояния в готовое для проживания жильё. Первый этап — демонтаж: снятие старых покрытий, удаление устаревших систем отопления, сантехники, а при необходимости — ненесущих перегородок. На втором этапе проектируем и прокладываем все новые коммуникации: перенос канализационных и водопроводных труб, полная замена электропроводки с новыми точками установки розеток и выключателей под ваши нужды.

Далее — мокрые работы: укладка плитки на стены и полы в ванных комнатах, на кухне и в других помещениях. Мы используем только материалы ведущих европейских производителей. После этого — сухая отделка: гипсокартонные работы, шпатлёвка, покраска, оклейка обоями, лакировка. Завершающий этап — укладка напольных покрытий: ламинат, паркетная доска, LVT или керамическая плитка в зависимости от ваших предпочтений и бюджета.

Что включает наш стандартный пакет?

В стандартный пакет входит: составление проектной документации (при необходимости), полный демонтаж и вывоз строительного мусора, перенос сантехники и монтаж новых трубопроводов, полная замена электропроводки с УЗО-защитой, штукатурные и шпатлёвочные работы, укладка плитки в ванной, туалете и на кухне (включая гидроизоляцию), покраска потолков и стен, укладка напольных покрытий, отделка откосов дверей и окон. Дополнительно можно заказать встроенную мебель, монтаж светильников, рулонных штор и карнизов.

Фиксированная цена — никаких сюрпризов

До начала работ мы составляем детальную смету и подписываем договор, в котором прописаны все этапы, материалы и стоимость. Наши клиенты не сталкиваются с неожиданными доплатами. Если в ходе работ обнаруживается нечто непредвиденное — например, ржавые трубы под старой плитой — мы немедленно информируем вас и согласовываем изменения письменно.

Варианты бюджета

Мы предлагаем три ценовых уровня: стандарт (функциональный и качественный, разумная цена), средний (материалы лучше, больше дизайнерских решений) и премиум (материалы высшего класса европейских брендов, полное дизайн-решение интерьера, уникальные элементы). Все уровни включают гарантию.

География — Таллин и Харьюмаа

Работаем во всех районах Таллина (Центр, Кристийне, Мустамяэ, Ыйсмяэ, Ласнамяэ, Пирита, Нымме, Хааберсти и других) и по всему Харьюмаа — Виймси, Сауэ, Рае, Маарду, Кейла и Локса. Стоимость выезда включена в смету.

Как начать?

Позвоните нам или заполните контактную форму на сайте. Наш руководитель проекта приедет к вам бесплатно, оценит объём работ и предоставит смету в течение 24 часов. Управление проектом ведётся непрерывно — вы всегда будете знать, на каком этапе находятся работы.`
    ),
  },

  // ── 2. bathroom-renovation ────────────────────────────────────────────────
  {
    slug: "bathroom-renovation",
    kw1: "bathroom renovation modern tiles shower",
    kw2: "bathroom remodel renovation design",
    alt1: ls(
      "Vannitoa täisremont — kaasaegsed plaadid, dušš, Tallinn",
      "Complete bathroom renovation — modern tiles and shower, Tallinn",
      "Полный ремонт ванной комнаты — современная плитка, душ, Таллин"
    ),
    alt2: ls(
      "Vannitoa rekonstrueerimine — uus disain ja sanitaartehnika Tallinnas",
      "Bathroom remodel — new design and sanitary fixtures in Tallinn",
      "Редизайн ванной комнаты — новый дизайн и сантехника в Таллине"
    ),
    short: lt(
      "Teeme vannitoa täisremonti Tallinnas — veekindlustusest ja plaatimisest kuni sanitaartehnika, põrandakütte ja ventilatsioonini. Kõik suurused, kõik eelarved, garantii.",
      "We deliver complete bathroom renovation in Tallinn — from waterproofing and tiling to sanitary fixtures, underfloor heating and ventilation. All sizes, all budgets, warranty included.",
      "Выполняем полный ремонт ванной комнаты в Таллине — от гидроизоляции и укладки плитки до сантехники, тёплого пола и вентиляции. Любой размер, любой бюджет, гарантия."
    ),
    metaTitle: ls(
      "Vannitoa remont Tallinnas | Veekindlustus ja plaatimine",
      "Bathroom Renovation Tallinn | Waterproofing & Tiling",
      "Ремонт ванной в Таллине | Гидроизоляция и плитка"
    ),
    metaDesc: lt(
      "Professionaalne vannitoa remont Tallinnas. Veekindlustus, plaatimine, dušš, vann, WC, boiler, põrandaküte, ventilatsioon. Kõik eelarved, 2-aastane garantii. Tasuta hinnapakkumine!",
      "Professional bathroom renovation in Tallinn, Estonia. Waterproofing, tiling, shower, bath, WC, basin, underfloor heating, ventilation. All budgets, 2-year warranty. Free quote now.",
      "Профессиональный ремонт ванной комнаты в Таллине. Гидроизоляция, плитка, душ, ванна, унитаз, раковина, тёплый пол, вентиляция. Любой бюджет, гарантия 2 года. Бесплатная смета."
    ),
    body: lb(
      // ET — 500+ words
      `Vannitoa täisremont Tallinnas — veekindlustusest viimistluseni

Vannituba on üks kõige intensiivsemalt kasutatavaid ruume kodus ja ühtlasi üks keerulisemaid renoveerida. Niiskus, aurud ja pidev veekokkupuude nõuavad erilist tähelepanu materjalide valikul ja töömeetoditel. TorudeAbi24 meeskond on spetsialiseerunud vannitoade täisrenoveerimisele Tallinnas ja Harjumaal — alates disainist ja veekindlustusest kuni viimase kruvini sanitaartehnikas.

Miks on veekindlustus alustala?

Iga vannitoa renoveerimise aluspõhi on korralikult teostatud veekindlustus. Ebapiisav veekindlustus põhjustab pikemas perspektiivis niiskuse tungimist konstruktsioonidesse, hallituse teket ja kallist kahjustusremonti. Kasutame ainult sertifitseeritud veekindlustusmaterjale — polümeerbitumeen- ja tsementpõhiseid membraane, mis vastavad Eesti ehitusnormidele. Iga nurk, liitekoht ja läbiviigu koht saab täiendava kaitse.

Plaatimistööd — täpsus ja esteetika käsikäes

Pärast veekindlustust alustame plaatimisega. Paigaldame seina- ja põrandaplaate kõikides formaatides — alates klassikalistest 20×20 cm metroplaatidest kuni suureformaadilisteni (60×120 cm ja enam). Meie plaatijatel on pikaajaline kogemus nii diagonaalmustrite, kalasabamustri (herringbone) kui ka muude disainilahenduste teostamisel. Plaatide ühesuunalisele paigaldamisele lisaks teeme ka keerukamaid kompositsioone dekoratiivribade ja niššidega.

Sanitaartehnika — igale maitsele ja eelarvele

Paigaldame kõiki vannitoa sanitaartehnikat: dušikabiinid ja dušinurgad (sh klaasseinad), vannid (akriül, email, kivimass), WC-potid (seinale riputatavad ja põrandal seisvad), bidetid ja bidee-istmed, valamuid ja vannitoa meublit, segisteid kõikidelt tuntud tootjatelt (Hansgrohe, Grohe, Oras, Villeroy & Boch jt). Ühendame kõik seadmed olemasoleva või uue torustikuga ning kontrollime lekkeid enne lõpliku plaatimise sulgemist.

Põrandaküte — mugavus külmade kuude jaoks

Üha enam tellivad meie kliendid vannitoale ka põrandakütesüsteemi. Pakume nii elektripõrandaküttet (termostaadiga kaabelküte) kui ka hüdraulilist põrandaküttet (ühendatuna maja küttesüsteemiga). Mõlemad variandid on energiatõhusad ja tagavad soe põrand isegi kõige külmemal talvepäeval.

Ventilatsioon — õige õhuvahetus hoiab niiskuse kontrolli all

Hästi töötav ventilatsioon on vannitoas hädavajalik. Parandame ja optimeerime olemasolevat ventilatsioonisüsteemi või paigaldame uue ekstraktori koos tagasilöögiklapiga. Tugevama õhuvahetuse soovijatele pakume programmeeritavaid ventilatsiooniseadmeid, mis käivituvad automaatselt niiskuseandurite signaalil.

Valgustus ja viimistlusdetailid

Hea vannituba vajab head valgustust. Paigaldame vannituppa sobivaid valgusteid — LAE- ja peeglipaneele, veekindlaid LED-siilusid, seinavalgusteid ning nutikaid dimmereid. Lisame ka toakultuuri — rätikurestid ja soojendusrestid, soklilauad, silikoonivuugid neutraalsetes või dekoratiivsetes värvides.

Garantii ja järelteenindus

Kõikidele vannitoa renoveerimistöödele anname kirjaliku 2-aastase garantii. Lisaks oleme bereidt abistama lekkide, plaatide lagunemise või seadmete tõrgete korral ka pärast garantiitähtaega, mõistliku hinnaga.

Broneeri tasuta ülevaatus juba täna — meie vannitoa spetsialist hindab teie ruumi, arutab disainivõimalused läbi ja esitab hinnapakkumise 24 tunni jooksul.`,

      // EN — 500+ words
      `Complete Bathroom Renovation in Tallinn — From Waterproofing to Final Finish

The bathroom is one of the most intensively used rooms in any home and one of the most complex to renovate correctly. Constant moisture, steam and water contact demand meticulous attention to material selection and installation methods. The TorudeAbi24 team specialises in full bathroom renovation across Tallinn and Harjumaa — from design and waterproofing right through to the last fitting on the sanitaryware.

Why is waterproofing the foundation of everything?

Every bathroom renovation starts with a properly executed waterproofing layer. Inadequate waterproofing leads to moisture penetration into the building structure, mould growth and costly remedial repairs down the line. We use only certified waterproofing products — polymer-bitumen and cement-based membranes that comply with Estonian building regulations. Every corner, joint and pipe penetration receives additional reinforcement tape and sealant.

Tiling — precision and aesthetics working together

Once waterproofing has cured we begin tiling. We lay wall and floor tiles in all formats — from classic 20×20 cm metro tiles to large-format slabs (60×120 cm and beyond). Our tilers have extensive experience with diagonal patterns, herringbone layouts and bespoke design compositions featuring decorative borders and recessed niches. No job is too detailed.

Sanitaryware — every taste, every budget

We install all bathroom sanitaryware: shower enclosures and walk-in shower areas (including glass screens), baths (acrylic, enamelled steel, stone resin), WC suites (wall-hung and floor-standing), bidets and bidet seats, wash basins and vanity units, and taps and mixers from leading brands (Hansgrohe, Grohe, Oras, Villeroy & Boch and others). All fittings are connected to new or existing pipework and leak-tested before any final tiling conceals the services.

Underfloor heating — warmth on the coldest mornings

More and more of our clients are adding underfloor heating to their bathroom renovation. We offer both electric underfloor heating (thermostatic cable or mat systems) and hydronic underfloor heating (connected to the home's central heating circuit). Both options are energy-efficient and ensure a warm floor even on the coldest winter mornings.

Ventilation — keeping moisture under control

Effective ventilation is essential in any bathroom. We service and optimise existing ventilation, or install a new extractor fan with anti-backdraft valve. For clients who want stronger air exchange we fit programmable ventilation units that activate automatically via humidity sensors.

Lighting and finishing details

A beautiful bathroom deserves beautiful lighting. We install ceiling panels, mirror-fronted LED strips, waterproof downlights and smart dimmer switches. We also add the finishing touches — heated towel rails, skirting boards and grout lines in neutral or decorative colours sealed with quality silicone.

Warranty and after-care

We provide a written 2-year warranty on all bathroom renovation works. Beyond the warranty period we remain available to assist with any leaks, tile issues or fitting faults at a fair and transparent rate.

Book a free survey today — our bathroom specialist will assess your space, discuss design options and deliver a detailed quotation within 24 hours.`,

      // RU — 500+ words
      `Полный ремонт ванной комнаты в Таллине — от гидроизоляции до финальной отделки

Ванная комната — одно из самых интенсивно используемых помещений в доме и одно из самых сложных для правильного ремонта. Постоянная влага, пар и контакт с водой требуют особого внимания к выбору материалов и методам монтажа. Команда TorudeAbi24 специализируется на полном ремонте ванных комнат в Таллине и Харьюмаа — от проектирования и гидроизоляции до последнего элемента сантехники.

Почему гидроизоляция — это основа всего?

Каждый ремонт ванной комнаты начинается с правильно выполненной гидроизоляции. Недостаточная гидроизоляция со временем приводит к проникновению влаги в конструкции, образованию плесени и дорогостоящему ремонту ущерба. Мы используем только сертифицированные материалы — полимерно-битумные и цементные мембраны, соответствующие эстонским строительным нормам. Каждый угол, шов и место прохода трубы получают дополнительную защиту с армирующей лентой и герметиком.

Укладка плитки — точность и эстетика в одном

После высыхания гидроизоляции приступаем к укладке плитки. Укладываем настенную и напольную плитку всех форматов — от классической 20×20 см метро-плитки до крупноформатных плит (60×120 см и более). Наши плиточники имеют большой опыт в диагональной укладке, паттерне «ёлочка» (herringbone) и более сложных дизайнерских композициях с декоративными бордюрами и нишами.

Сантехника — на любой вкус и бюджет

Устанавливаем всю сантехнику для ванной комнаты: душевые кабины и открытые зоны (включая стеклянные перегородки), ванны (акриловые, эмалированные, из искусственного камня), унитазы (подвесные и напольные), биде и биде-сиденья, раковины и тумбы, смесители ведущих брендов (Hansgrohe, Grohe, Oras, Villeroy & Boch и других). Все устройства подключаются к новым или существующим трубопроводам и проверяются на течь до того, как финальная плитка скроет коммуникации.

Тёплый пол — комфорт в самые холодные утра

Всё больше наших клиентов дополняют ремонт ванной комнаты системой тёплого пола. Мы предлагаем как электрический тёплый пол (термостатные кабельные или матовые системы), так и водяной тёплый пол (подключаемый к системе центрального отопления дома). Оба варианта энергоэффективны и обеспечивают тёплый пол даже в самые холодные зимние утра.

Вентиляция — контроль влажности

Эффективная вентиляция в ванной комнате абсолютно необходима. Мы обслуживаем и оптимизируем существующую вентиляцию или устанавливаем новый вытяжной вентилятор с обратным клапаном. Для клиентов, желающих более мощный воздухообмен, устанавливаем программируемые вентиляционные устройства, автоматически активирующиеся от датчиков влажности.

Освещение и финишные детали

Прекрасная ванная заслуживает прекрасного освещения. Устанавливаем потолочные панели, светодиодные полосы для зеркал, влагозащищённые встраиваемые светильники и умные диммеры. Добавляем финишные штрихи — полотенцесушители, плинтусы, затирку швов в нейтральных или декоративных цветах с герметиком высокого качества.

Гарантия и послепродажное обслуживание

На все виды работ по ремонту ванной комнаты мы предоставляем письменную гарантию на 2 года. После истечения гарантийного срока готовы помочь с любыми протечками, проблемами с плиткой или неисправностями сантехники по честным и прозрачным расценкам.

Запишитесь на бесплатный осмотр уже сегодня — наш специалист по ванным комнатам оценит ваше пространство, обсудит варианты дизайна и предоставит детальную смету в течение 24 часов.`
    ),
  },

  // ── 3. construction-projects ─────────────────────────────────────────────
  {
    slug: "construction-projects",
    kw1: "construction project building site management",
    kw2: "construction contractor architect building",
    alt1: ls(
      "Ehitusprojekti juhtimine ja uusehitis Tallinnas",
      "Construction project management and new build in Tallinn",
      "Управление строительным проектом и новое строительство в Таллине"
    ),
    alt2: ls(
      "Peatöövõtja ja arhitekt ehitusplatsil Tallinnas",
      "General contractor and architect on construction site in Tallinn",
      "Генподрядчик и архитектор на строительной площадке в Таллине"
    ),
    short: lt(
      "Ehitusprojektide täisteenust Tallinnas — uusehitised, laiendused, kandekonstruktsioonid ja pööningukorterid. Projekteerimine, ehitusluba, ehitus, järelevalve ja üleandmine. Litsentseeritud peatöövõtja.",
      "Full construction project service in Tallinn — new builds, extensions, structural works and loft conversions. Design, permits, construction, inspections, handover. Licensed general contractor.",
      "Полный цикл строительных проектов в Таллине — новое строительство, пристройки, несущие конструкции, мансарды. Проектирование, разрешение, строительство, надзор, сдача. Лицензированный генподрядчик."
    ),
    metaTitle: ls(
      "Ehitusprojektid Tallinnas | Litsentseeritud peatöövõtja",
      "Construction Projects Tallinn | Licensed General Contractor",
      "Строительные проекты Таллин | Лицензированный генподрядчик"
    ),
    metaDesc: lt(
      "Litsentseeritud peatöövõtja Tallinnas — uusehitised, laiendused, ehitusluba, projekteerimine, järelevalve ja üleandmine. Eesti ehitusnormidele vastav. Tasuta konsultatsioon!",
      "Licensed general contractor in Tallinn — new builds, extensions, design, permits, construction, inspections, handover. Estonian building code compliant. Free consultation today.",
      "Лицензированный генподрядчик в Таллине — новое строительство, пристройки, проектирование, разрешения, строительство, надзор, сдача. Соответствие эстонским строительным нормам. Бесплатная консультация."
    ),
    body: lb(
      // ET — 500+ words
      `Ehitusprojektid Tallinnas — litsentseeritud peatöövõtja täisteenusega

Ehitusprojekt on keerukas protsess, mis nõuab tihedat koostööd arhitektide, inseneride, järelevalveorganite ja alltöövõtjate vahel. Ilma kogenud peatöövõtjata võivad tähtajad venida, kulud kasvada ning ehitusnormidele mittevastavuse tõttu tekkida tõsised õiguslikud probleemid. TorudeAbi24 pakub täielikku ehitusprojektide teenust Tallinnas ja Harjumaal — alates esmasest ideest ja projektdokumentatsioonist kuni valmis objekti üleandmiseni.

Milliseid projekte me teeme?

Meie peatöövõtja meeskond tegeleb järgmiste projektidega: uusehitised (ühe- ja kahepereelamud, ridaelamud, väiksemad ärihooned), olemasolevate hoonete laiendused ja juurdeehitused, kandekonstruktsioonide muutmine (seinte lammutamine, talade vahetamine, uute avade tegemine), pööningukorterite ehitamine (loftid ja mansardkorterid), keldrite ja soklikorte rekonstrueerimine ning tehnosüsteemide (küte, ventilatsioon, elekter, vesi-kanal) täisrekonstrueerimine.

Projekteerimine ja ehitusluba

Iga ehitusprojekt algab korralikust projektdokumentatsioonist. Meie partnerarhitektide ja inseneride meeskond koostab vajalikud tööjoonised, konstruktsiooniprojektid, tehnosüsteemide skeemid ja muud dokumendid. Seejärel esitame ehitusloa taotluse pädevale kohalikule omavalitsusele (Tallinn, Viimsi vald, Rae vald jt). Jälgime taotluse menetlemist ja suhtleme vajaduse korral ametiasutustega teie nimel.

Ehituse juhtimine ja järelevalve

Pärast ehitusloa saamist alustame ehitustöödega. Meie projektijuhid koordineerivad kõiki alltöövõtjaid, jälgivad tööde vastavust projektile ja ehitusnormidele ning haldavad ajakava ja eelarvet. Ehituse käigus teostame regulaarset omanikujärelevalvet, mis tagab, et kõik tööd vastavad projekti nõuetele ja Eesti ehitusseadustikule (EhS).

Litsents ja vastavus ehitusnormidele

Meil on kehtiv ehituslitsents, mis lubab teostada üldehitustöid. Kõik meie tööd vastavad Eesti ehitusseadustikule, Eurokoodeksitele ja kohalike omavalitsuste planeeringutele. Pärast ehituse lõppu aitame esitada kasutusloa taotluse ja korraldame lõpliku üleandmise-vastuvõtmise.

Uusehitise protsess samm-sammult

Protsess algab konsultatsioonist, kus arutame teie vajadused, soovid ja eelarve läbi. Järgneb eelprojekti koostamine ja kooskõlastamine naabritega. Seejärel valmib põhiprojekt koos kõigi vajalike lisadega ning esitatakse ehitusloa taotlus. Ehitusetapis teostatakse kõik konstruktsioonilised tööd alates vundamendist kuni katuseni, järgneb tehnosüsteemide paigaldus, sise- ja väliviimistlus. Lõpetuseks esitatakse kasutusloataotlus ja antakse objekt üle koos täielike garantiidokumentidega.

Laiendused ja rekonstrueerimine

Olemasolevale hoonele laienduse ehitamine on keerulisem kui uusehitis, sest tuleb arvestada olemasoleva konstruktsiooniga, insenerlahendustega ja naabrustingimusega. Meil on kogemus mitmesuguste laienduste ehitamisel — külgmised juurdeehitused, lisakorpused, veranda- ja terrassilaiendused ning pööningu väljaehitamine eluruumiks.

Helista meile juba täna, et saada tasuta konsultatsiooni oma ehitusprojekti kohta. Meie ekspertide meeskond hindab teie projekti teostatavust, selgitab vajalikke lubasid ja koostab esialgsed kuluhinnangud.`,

      // EN — 500+ words
      `Construction Projects in Tallinn — Licensed General Contractor, Full Service

A construction project is a complex process requiring close collaboration between architects, engineers, regulatory bodies and subcontractors. Without an experienced general contractor, deadlines slip, costs escalate and non-compliance with building regulations can create serious legal problems. TorudeAbi24 provides a comprehensive construction project service across Tallinn and Harjumaa — from the initial concept and design documentation right through to handover of the completed structure.

What types of project do we undertake?

Our general contracting team handles: new builds (detached houses, semi-detached houses, terraced housing, small commercial buildings), extensions and additions to existing buildings, structural alterations (removing walls, replacing beams, creating new openings), loft conversions (loft apartments and mansard conversions), basement and ground-floor reconstruction, and full replacement of building services (heating, ventilation, electrical, water and drainage).

Design and building permits

Every construction project begins with proper design documentation. Our partner architects and structural engineers produce the required working drawings, structural calculations, building services schematics and all other documents needed for a permit application. We then submit the application to the appropriate local authority (Tallinn City Government, Viimsi Parish, Rae Parish, etc.), track its progress and liaise with officials on your behalf.

Construction management and supervision

Once the building permit is granted we mobilise on site. Our project managers coordinate all subcontractors, monitor compliance with the design and building regulations, and manage the schedule and budget. Throughout the build we carry out regular owner's supervision (omanikujärelevalve), ensuring that every element conforms to the design requirements and the Estonian Building Code (EhS).

Licence and regulatory compliance

We hold a valid general construction licence that authorises us to carry out all categories of building work. All our projects comply with the Estonian Building Code, the applicable Eurocodes and local authority planning conditions. On completion we assist with submitting the occupancy permit (kasutusluba) application and manage the formal handover inspection.

New build — step by step

The process begins with a consultation to discuss your requirements, aspirations and budget. We then produce a concept design and obtain neighbour notifications where required. The detailed design package follows, covering all required specialist annexes, after which the building permit application is submitted. During construction all structural works are carried out from foundations to roof, followed by installation of building services and internal and external finishes. Finally we submit the occupancy permit application and formally hand over the completed building with full warranty documentation.

Extensions and reconstruction

Adding an extension to an existing building is more complex than a new build because the existing structure, engineering solutions and neighbouring properties must all be accommodated. We have experience across a wide range of extension types — side extensions, rear additions, covered verandas and terraces, and full loft conversions creating new habitable rooms.

Call us today for a free consultation on your construction project. Our expert team will assess feasibility, explain the permits required and provide an initial cost estimate.`,

      // RU — 500+ words
      `Строительные проекты в Таллине — лицензированный генподрядчик, полный цикл услуг

Строительный проект — сложный процесс, требующий тесного взаимодействия между архитекторами, инженерами, надзорными органами и субподрядчиками. Без опытного генерального подрядчика сроки затягиваются, расходы растут, а несоответствие строительным нормам может повлечь серьёзные правовые последствия. TorudeAbi24 предоставляет полный цикл услуг по строительным проектам в Таллине и Харьюмаа — от первоначальной идеи и проектной документации до сдачи готового объекта.

Какие проекты мы выполняем?

Наша команда генподрядчика берётся за: новое строительство (одно- и двухквартирные жилые дома, рядная застройка, небольшие коммерческие здания), пристройки и надстройки к существующим зданиям, конструктивные изменения (снос стен, замена балок, устройство новых проёмов), переоборудование чердаков (мансарды и лофт-апартаменты), реконструкцию подвалов и цокольных этажей, полную замену инженерных систем (отопление, вентиляция, электрика, водоснабжение и канализация).

Проектирование и разрешение на строительство

Каждый строительный проект начинается с надлежащей проектной документации. Наши партнёры-архитекторы и инженеры-конструкторы разрабатывают необходимые рабочие чертежи, конструктивные расчёты, схемы инженерных систем и все прочие документы, необходимые для получения разрешения. Затем мы подаём заявку в соответствующий местный орган власти (самоуправление Таллина, волость Виймси, волость Рае и др.), контролируем её рассмотрение и при необходимости взаимодействуем с чиновниками от вашего имени.

Управление строительством и надзор

После получения разрешения на строительство мы выходим на объект. Наши руководители проектов координируют всех субподрядчиков, следят за соответствием работ проекту и строительным нормам, управляют графиком и бюджетом. В ходе строительства мы осуществляем регулярный авторский надзор (omanikujärelevalve), обеспечивая соответствие каждого элемента проектным требованиям и Эстонскому строительному кодексу (EhS).

Лицензия и соответствие нормам

У нас есть действующая лицензия генерального подрядчика, разрешающая проведение всех видов строительных работ. Все наши проекты соответствуют Эстонскому строительному кодексу, применимым Еврокодам и условиям местного планирования. По завершении строительства мы помогаем подать заявку на разрешение на эксплуатацию (kasutusluba) и организуем официальную приёмочную инспекцию.

Новое строительство — шаг за шагом

Процесс начинается с консультации, на которой обсуждаются ваши требования, пожелания и бюджет. Затем разрабатывается концептуальный проект и при необходимости проводится согласование с соседями. Следует разработка детального проекта со всеми необходимыми разделами, после чего подаётся заявка на разрешение на строительство. В ходе строительства выполняются все конструктивные работы от фундамента до кровли, затем монтируются инженерные системы и выполняются внутренняя и внешняя отделка. Завершается процесс подачей заявки на разрешение на эксплуатацию и официальной сдачей объекта с полным пакетом гарантийной документации.

Пристройки и реконструкция

Пристройка к существующему зданию сложнее нового строительства, поскольку необходимо учитывать существующие конструкции, инженерные решения и условия соседней застройки. У нас есть опыт строительства различных типов пристроек — боковые и задние пристройки, закрытые веранды и террасы, полное переоборудование чердаков в жилые помещения.

Позвоните нам сегодня для бесплатной консультации по вашему строительному проекту. Наша команда экспертов оценит осуществимость проекта, разъяснит необходимые разрешения и предоставит предварительную оценку стоимости.`
    ),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  for (const svc of services) {
    try {
      console.log(`\nProcessing: ${svc.slug}`);
      const hero = await uploadImg(svc.kw1, `${svc.slug}-hero.jpg`);
      console.log(`  ✓ hero image uploaded: ${hero._id}`);
      const gal = await uploadImg(svc.kw2, `${svc.slug}-g1.jpg`);
      console.log(`  ✓ gallery image uploaded: ${gal._id}`);

      await patch(svc.slug, {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: hero._id },
          alt: svc.alt1,
        },
        gallery: [
          {
            _type: "image",
            _key: "g1",
            asset: { _type: "reference", _ref: gal._id },
            alt: svc.alt2,
          },
        ],
        shortDescription: svc.short,
        body: svc.body,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDesc,
      });
    } catch (e) {
      console.error("FAIL:", svc.slug, e.message);
    }
  }
  console.log("\nDone.");
}

main();
