import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "xbk57s09",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── Portable Text block helpers ───────────────────────────────────────────────
function p(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}
function h2(text) {
  return { ...p(text), style: "h2" };
}
function h3(text) {
  return { ...p(text), style: "h3" };
}
function ul(items) {
  return items.map((text) => ({
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  }));
}

// ── 3 SEO-perfect blog posts ──────────────────────────────────────────────────
const blogs = [
  // ── 1. Plumbing emergency guide ──────────────────────────────────────────
  {
    _id: "blog-emergency-plumber-tallinn",
    _type: "blogPost",
    title: {
      en: "5 Signs You Need an Emergency Plumber in Tallinn Right Now",
      et: "5 märki, et vajate Tallinnas koheselt avariisantehnikut",
      ru: "5 признаков того, что вам срочно нужен аварийный сантехник в Таллине",
    },
    slug: { _type: "slug", current: "emergency-plumber-tallinn-signs" },
    pathSegment: {
      et: "avariisantehnik-tallinnas-margid",
      ru: "аварийный-сантехник-таллин-признаки",
    },
    publishedAt: "2026-04-10T08:00:00.000Z",
    excerpt: {
      en: "Burst pipe at midnight? Water stain on the ceiling? Learn the 5 warning signs that mean you need a 24/7 emergency plumber in Tallinn immediately — and what to do while you wait.",
      et: "Lõhkenud toru südaöö? Veelaik laes? Tutvu 5 hoiatusmärgiga, mis tähendavad, et vajate Tallinnas kohe 24/7 avariisantehnikut — ja mida teha oodates.",
      ru: "Лопнула труба ночью? Пятно на потолке? Узнайте 5 предупреждающих признаков, которые говорят о том, что вам немедленно нужен аварийный сантехник в Таллине 24/7.",
    },
    metaTitle: {
      en: "Emergency Plumber Tallinn 24/7 — 5 Signs You Need Help Now",
      et: "Avariisantehnik Tallinn 24/7 — 5 märki, et abi on kohe vaja",
      ru: "Аварийный сантехник Таллин 24/7 — 5 признаков срочной помощи",
    },
    metaDescription: {
      en: "Burst pipes, no hot water, sewage smell? TorudeAbi24 emergency plumbers arrive in 30–60 min across Tallinn & Harjumaa. 24/7, -30% discount 8–19h. Call +372 56 89 79 29.",
      et: "Lõhkenud torud, kuum vesi puudub, kanalisatsioonilõhn? TorudeAbi24 avariimeistrid jõuavad kohale 30–60 min jooksul üle Tallinna ja Harjumaa. 24/7, -30% soodustus 8–19h.",
      ru: "Прорыв труб, нет горячей воды, запах канализации? Мастера TorudeAbi24 приедут за 30–60 мин по Таллину и Харьюмаа. Круглосуточно, скидка -30% с 8 до 19ч.",
    },
    body: {
      en: [
        p("A plumbing emergency can strike without warning. Knowing when to call a professional immediately can prevent thousands of euros in water damage. Here are the five most critical warning signs Tallinn homeowners should never ignore."),
        h2("1. Water Is Actively Spraying or Gushing"),
        p("If water is spraying from a burst pipe, fitting, or hose, every second counts. Turn off the main water valve immediately — usually found under the sink or in the basement — and call an emergency plumber. In Tallinn apartments, the main shutoff is typically in the hallway cupboard or basement. Do not attempt to repair pressurised pipes yourself."),
        h2("2. Complete Loss of Hot Water"),
        p("Sudden loss of hot water often signals a boiler failure, a burst expansion vessel, or a tripped safety valve. In Estonian winters this is a genuine emergency, especially for families with small children or elderly residents. A licensed TorudeAbi24 technician can diagnose and repair most boiler faults the same day."),
        h2("3. Sewage Smell or Drain Backflow"),
        p("A persistent sewage odour or waste water backing up into sinks, showers, or toilets indicates a blocked or collapsed drain. This is a health hazard. Prolonged exposure to sewer gases (hydrogen sulphide) can cause serious illness. Call a plumber immediately — do not use chemical drain cleaners on a collapsed pipe."),
        h2("4. Ceiling or Wall Water Stains Appearing Rapidly"),
        p("A stain that grows visibly within hours means an active leak above. In multi-storey Tallinn apartment blocks, this could be a burst pipe in the flat above or a failed roof drain. Identifying the source fast prevents structural damage and mould growth, which is expensive to remediate."),
        h2("5. No Water at All — No Pipe Freeze"),
        p("If taps run dry but it is not freezing weather, you may have a burst main, a failed pump, or a closed valve upstream. This requires immediate professional investigation. In Harjumaa rural properties with private wells, a pump failure can leave the household without water indefinitely."),
        h2("What to Do While You Wait for the Emergency Plumber"),
        ...ul([
          "Turn off the main water supply valve.",
          "Switch off the water heater and boiler to prevent overheating.",
          "Remove electronics and valuables from the affected area.",
          "Take photos for insurance documentation.",
          "Call TorudeAbi24 at +372 56 89 79 29 — we arrive within 30–60 minutes.",
        ]),
        h2("Why Choose TorudeAbi24 for Plumbing Emergencies in Tallinn?"),
        p("TorudeAbi24 operates 24 hours a day, 7 days a week including Estonian public holidays. All technicians hold current Estonian trade certifications. We provide a written quote before starting work, a 2-year warranty on all repairs, and a 30% discount on labour during daytime hours (08:00–19:00). Emergency night call-out is available with a transparent €10 surcharge."),
        p("Coverage: Kesklinn, Lasnamäe, Mustamäe, Kristiine, Põhja-Tallinn, Nõmme, Pirita, Haabersti, and all Harjumaa municipalities including Viimsi, Maardu, Saue, and Keila."),
      ],
      et: [
        p("Torustiku avarii võib tabada hoiatuseta. Teades, millal kohe professionaali poole pöörduda, saate vältida tuhandeid eurosid veekahju. Siin on viis kõige kriitilisemat hoiatusmärki, mida Tallinna kinnisvaraomanikud ei tohiks kunagi ignoreerida."),
        h2("1. Vesi pritsib või voolab aktiivselt"),
        p("Kui vesi pritsib lõhkenud torustikust, ühendusest või veevoolikust, on iga sekund tähtis. Sulgege kohe peakraan — tavaliselt asub see kraanikaussi all või keldris — ja helistage avariisantehnikule. Tallinna korterelamutes asub peakraan tavaliselt koridori kapis või keldris. Ärge proovige rõhu all olevaid torusid ise parandada."),
        h2("2. Kuum vesi kaob täielikult"),
        p("Kuum vee järsk kadumine viitab sageli kütteseadme rikke, purunenud paisupaagi või avariiklapile. Eesti talvel on see tegelik hädaolukord, eriti väikeste lastega või eakate elanikega perede puhul. TorudeAbi24 sertifitseeritud tehnik suudab enamiku kütteseadme rikete diagnoosida ja parandada samal päeval."),
        h2("3. Kanalisatsioonilõhn või drenaaži tagasivoolu"),
        p("Püsiv kanalisatsioonilõhn või reovee tagasivoolu valamutesse, duššidesse või tualettidesse näitab ummistunud või purunenud drenaaži. See on terviseoht. Helistage kohe santehnikule — ärge kasutage keemilisi drenaaži puhastajaid purunenud toru korral."),
        h2("4. Lae või seina veeplekid ilmuvad kiiresti"),
        p("Plekk, mis kasvab mõne tunniga nähtavalt, tähendab aktiivset lekkimist ülalpool. Tallinna korterelamutes võib see olla lõhkenud toru ülakorruse korteris või ebaõnnestunud katuse drenaaž. Allika kiire tuvastamine hoiab ära konstruktsioonikahjustused ja hallituse kasvu."),
        h2("5. Vett pole üldse — toru pole külmunud"),
        p("Kui kraanid on kuivad, kuid ilm pole külm, võib teil olla purunenud peamain, ebaõnnestunud pump või suletud klapp ülespool. See nõuab viivitamatut professionaalset uurimist."),
        h2("Mida teha, oodata avariisantehnikut?"),
        ...ul([
          "Sulgege peaveekraan.",
          "Lülitage veesoojendi ja katel välja.",
          "Eemaldage elektroonika ja väärisesemed kahjustatud alalt.",
          "Tehke kindlustuse dokumenteerimiseks fotod.",
          "Helistage TorudeAbi24: +372 56 89 79 29 — jõuame kohale 30–60 minutiga.",
        ]),
        h2("Miks valida TorudeAbi24 torustiku avariideks Tallinnas?"),
        p("TorudeAbi24 töötab ööpäevaringselt, 7 päeva nädalas, sealhulgas Eesti riigipühadel. Kõik tehnikud omavad kehtivaid Eesti kutsesertifikaate. Pakume kirjalikku hinnapakkumist enne töö alustamist, 2-aastast garantiid kõikidele parandustele ja 30% soodustust päevase tööaja jooksul (08:00–19:00)."),
      ],
      ru: [
        p("Аварийная ситуация с сантехникой может возникнуть без предупреждения. Знание того, когда немедленно вызвать специалиста, может предотвратить ущерб на тысячи евро. Вот пять наиболее критических предупреждающих признаков, которые жители Таллина никогда не должны игнорировать."),
        h2("1. Вода активно брызгает или хлещет"),
        p("Если вода брызгает из лопнувшей трубы или шланга, каждая секунда на счету. Немедленно перекройте главный кран подачи воды — обычно он находится под раковиной или в подвале — и вызовите аварийного сантехника. В таллинских квартирах главный кран обычно в шкафчике в коридоре или в подвале."),
        h2("2. Полное отсутствие горячей воды"),
        p("Внезапное исчезновение горячей воды часто сигнализирует о неисправности котла, лопнувшем расширительном баке или сработавшем предохранительном клапане. Зимой в Эстонии это настоящая аварийная ситуация, особенно для семей с маленькими детьми или пожилыми жильцами."),
        h2("3. Запах канализации или обратный ток"),
        p("Устойчивый запах канализации или обратный ток сточных вод в раковины, душевые или унитазы указывает на засорённый или разрушенный дренаж. Это угроза здоровью. Немедленно вызовите сантехника."),
        h2("4. Водяные пятна на потолке или стенах появляются быстро"),
        p("Пятно, которое заметно увеличивается в течение нескольких часов, означает активную течь выше. В многоэтажных таллинских домах это может быть лопнувшая труба в квартире выше или неисправный водосток крыши."),
        h2("5. Воды нет совсем — труба не замёрзла"),
        p("Если краны сухие, но погода не морозная, возможен прорыв магистрали, отказ насоса или закрытый кран выше по системе. Это требует немедленного профессионального осмотра."),
        h2("Почему выбирают TorudeAbi24 для аварийной сантехники в Таллине?"),
        p("TorudeAbi24 работает круглосуточно, 7 дней в неделю, включая эстонские праздники. Все техники имеют действующие эстонские профессиональные сертификаты. Мы предоставляем письменную смету перед началом работ, гарантию 2 года на все ремонты и скидку 30% на труд в дневное время (08:00–19:00). Звоните: +372 56 89 79 29."),
      ],
    },
  },

  // ── 2. Bathroom renovation guide ─────────────────────────────────────────
  {
    _id: "blog-bathroom-renovation-tallinn",
    _type: "blogPost",
    title: {
      en: "Bathroom Renovation in Tallinn 2026: Full Cost Guide & What to Expect",
      et: "Vannitoa remont Tallinnas 2026: täielik kuluteave ja mida oodata",
      ru: "Ремонт ванной в Таллине 2026: полный гид по стоимости и срокам",
    },
    slug: { _type: "slug", current: "bathroom-renovation-tallinn-cost-guide-2026" },
    pathSegment: {
      et: "vannitoa-remont-tallinn-kulud-2026",
      ru: "ремонт-ванной-таллин-стоимость-2026",
    },
    publishedAt: "2026-04-20T08:00:00.000Z",
    excerpt: {
      en: "Planning a bathroom renovation in Tallinn? Discover real 2026 costs, typical timelines, what's included, and how to avoid the most common — and expensive — mistakes.",
      et: "Planeerite vannitoa remonti Tallinnas? Tutke tegelike 2026 kulude, tüüpiliste ajakavade, kaasatavaga ja kuidas vältida kõige levinumaid — ja kallimaid — vigu.",
      ru: "Планируете ремонт ванной в Таллине? Узнайте реальные цены 2026 года, типичные сроки, что входит в работы и как избежать самых распространённых — и дорогостоящих — ошибок.",
    },
    metaTitle: {
      en: "Bathroom Renovation Tallinn 2026: Costs, Timeline & Tips",
      et: "Vannitoa remont Tallinn 2026: kulud, ajakava ja nõuanded",
      ru: "Ремонт ванной Таллин 2026: стоимость, сроки и советы",
    },
    metaDescription: {
      en: "Complete 2026 guide to bathroom renovation costs in Tallinn. Budget €2 500–€12 000 depending on scope. Free quote, 3-year waterproofing warranty. TorudeAbi24 — certified plumbers & renovators.",
      et: "Täielik 2026 vannitoa remondi kuluteave Tallinnas. Eelarve €2 500–€12 000 sõltuvalt mahust. Tasuta pakkumine, 3-aastane veekindluse garantii. TorudeAbi24 — sertifitseeritud meistrid.",
      ru: "Полный гид 2026 по стоимости ремонта ванной в Таллине. Бюджет €2 500–€12 000 в зависимости от объёма. Бесплатная смета, гарантия гидроизоляции 3 года. TorudeAbi24.",
    },
    body: {
      en: [
        p("Renovating a bathroom is one of the highest-return investments a Tallinn homeowner can make. A well-executed bathroom refit adds direct value to your property and significantly improves daily comfort. This guide breaks down real 2026 costs, timelines, and what you should insist on from any contractor."),
        h2("Typical Bathroom Renovation Costs in Tallinn 2026"),
        p("Prices vary widely based on room size, materials, and scope of work. As a general guide:"),
        ...ul([
          "Basic refresh (retile, new fixtures, paint): €2 500–€4 500",
          "Mid-range full refit (new plumbing, quality tiles, walk-in shower): €5 000–€8 000",
          "Premium renovation (designer tiles, underfloor heating, rain shower, custom joinery): €9 000–€14 000+",
        ]),
        p("These figures include materials and labour. VAT (22%) is included. Permit fees (if required for structural changes) are additional."),
        h2("What's Included in a Full Bathroom Renovation?"),
        ...ul([
          "Demolition and disposal of old fixtures and tiles",
          "Waterproofing (mandatory — a 3-year warranty is standard)",
          "New floor and wall tiling",
          "Plumbing rough-in and fixture installation (toilet, basin, shower or bath)",
          "Electrical work (lighting, extraction fan, heated towel rail connection)",
          "Painting or plastering",
          "Final clean and handover",
        ]),
        h2("How Long Does a Bathroom Renovation Take?"),
        p("A typical 4–6 m² Estonian bathroom takes 7–14 working days for a full renovation. Larger bathrooms or complex layouts with custom tiling or underfloor heating may take 3–4 weeks. The biggest delay factor is waterproofing cure time — a minimum of 48 hours is required before tiling can begin."),
        h2("5 Mistakes That Make Bathroom Renovations Expensive"),
        h3("1. Skipping proper waterproofing"),
        p("The single most common — and costly — mistake. Inadequate waterproofing causes water ingress into walls and floors, leading to mould, structural damage, and a full redo within 3–5 years. Insist on certified waterproofing membrane with a written warranty."),
        h3("2. Buying cheap tiles"),
        p("Floor tiles in a bathroom require a slip-resistance rating (R10 minimum for wet areas). Cheap tiles chip, fade, and are impossible to match for repairs. Budget at least €25–€45/m² for floor tiles from a reputable Estonian supplier."),
        h3("3. Not replacing old copper or PVC waste pipes"),
        p("If the building is pre-2000, the waste pipes inside the walls may be old galvanised steel or thin PVC. Renovating around them without replacement means a second demolition within 5–10 years."),
        h3("4. Ignoring ventilation"),
        p("Estonian buildings require mechanical extraction in bathrooms (at least 54 m³/h). Inadequate ventilation causes rapid mould growth on grout and ceiling. A proper extract fan costs €80–€150 installed — a small investment against mould remediation."),
        h3("5. Hiring unlicensed tradespeople"),
        p("In Estonia, plumbing and electrical work in bathrooms must be carried out by licensed professionals. Unlicensed work voids building insurance and creates liability issues when selling the property."),
        h2("Get a Free Quote from TorudeAbi24"),
        p("TorudeAbi24 provides full bathroom renovation services across Tallinn and Harjumaa. All work is carried out by certified plumbers and electricians. We offer a free on-site quote, a 3-year waterproofing warranty, and a 30% discount on labour (08:00–19:00). Call +372 56 89 79 29 or use our contact form."),
      ],
      et: [
        p("Vannitoa renoveerimine on üks kõrgeima tootlusega investeeringuid, mida Tallinna kinnisvaraomanik saab teha. Hästi teostatud vannitoa remont lisab teie kinnisvarale otsest väärtust ja parandab oluliselt igapäevast mugavust."),
        h2("Vannitoa remondi tüüpilised kulud Tallinnas 2026"),
        ...ul([
          "Lihtne värskendus (uued plaadid, armatuur, värv): €2 500–€4 500",
          "Kesktaseme täisremont (uus torustik, kvaliteetsed plaadid, dušinurk): €5 000–€8 000",
          "Premium renoveerimine (disainerplaadid, põrandaküte, vihmadušš): €9 000–€14 000+",
        ]),
        h2("Mida sisaldab täielik vannitoa remont?"),
        ...ul([
          "Vana sisustuse ja plaatide lammutamine ja kõrvaldamine",
          "Hüdroisolatsioon (kohustuslik — 3-aastane garantii on standard)",
          "Uued põranda- ja seinaplaadid",
          "Torustiku paigaldus (WC, kraanikaussid, dušš või vann)",
          "Elektritööd (valgustus, ventilatsioon, käterätikuivati ühendus)",
          "Värvimine või krohvimine",
        ]),
        h2("Kui kaua vannitoa remont aega võtab?"),
        p("Tüüpiline 4–6 m² Eesti vannituba võtab täisrenoveerimiseks 7–14 tööpäeva. Suurimaks viivitusfaktoriks on hüdroisolatsiooni kuivamisaeg — enne plaatimise alustamist on nõutav vähemalt 48 tundi."),
        h2("5 viga, mis muudavad vannitoa remondi kalliks"),
        ...ul([
          "Nõuetekohase hüdroisolatsiooni vahelejätmine",
          "Odavate plaatide ostmine (nõutav libisemisvastane R10 reiting)",
          "Vanade torustike asendamata jätmine",
          "Ventilatsiooni ignoreerimine (nõutav vähemalt 54 m³/h)",
          "Litsentseerimata töötajate palkamine",
        ]),
        h2("Küsige tasuta pakkumist TorudeAbi24-lt"),
        p("TorudeAbi24 pakub täielikke vannitoa renoveerimise teenuseid üle Tallinna ja Harjumaa. Kõik tööd teostavad sertifitseeritud santehnikud ja elektrikud. Pakume tasuta kohapealset hinnapakkumist, 3-aastast hüdroisolatsiooni garantiid ja 30% soodustust tööjõumaksumuse osas (08:00–19:00). Helistage +372 56 89 79 29."),
      ],
      ru: [
        p("Ремонт ванной — одна из инвестиций с самой высокой отдачей для владельца недвижимости в Таллине. Качественно выполненный ремонт ванной напрямую увеличивает стоимость вашей недвижимости и существенно улучшает ежедневный комфорт."),
        h2("Типичные затраты на ремонт ванной в Таллине в 2026 году"),
        ...ul([
          "Базовое обновление (перекладка плитки, новая сантехника, покраска): €2 500–€4 500",
          "Средний полный ремонт (новая сантехника, качественная плитка, душевая): €5 000–€8 000",
          "Премиум-ремонт (дизайнерская плитка, тёплый пол, дождевой душ): €9 000–€14 000+",
        ]),
        h2("Что включает полный ремонт ванной?"),
        ...ul([
          "Демонтаж и вывоз старой сантехники и плитки",
          "Гидроизоляция (обязательна — стандартная гарантия 3 года)",
          "Укладка новой напольной и настенной плитки",
          "Монтаж сантехники (унитаз, раковина, душевая или ванна)",
          "Электромонтажные работы (освещение, вентиляция, полотенцесушитель)",
        ]),
        h2("Сколько времени занимает ремонт ванной?"),
        p("Типичная ванная комната площадью 4–6 м² в Эстонии требует 7–14 рабочих дней для полного ремонта. Наибольшей задержкой является время отверждения гидроизоляции — перед укладкой плитки требуется не менее 48 часов."),
        h2("5 ошибок, которые делают ремонт ванной дорогим"),
        ...ul([
          "Пропуск надлежащей гидроизоляции",
          "Покупка дешёвой плитки (необходим рейтинг R10)",
          "Игнорирование вентиляции (минимум 54 м³/ч)",
          "Наём нелицензированных мастеров",
          "Отказ от замены старых труб",
        ]),
        h2("Получите бесплатную смету от TorudeAbi24"),
        p("TorudeAbi24 предоставляет полный спектр услуг по ремонту ванных комнат по всему Таллину и Харьюмаа. Все работы выполняются сертифицированными сантехниками и электриками. Бесплатная выездная смета, гарантия гидроизоляции 3 года, скидка 30% на работу (08:00–19:00). Звоните: +372 56 89 79 29."),
      ],
    },
  },

  // ── 3. Electrical safety guide ───────────────────────────────────────────
  {
    _id: "blog-electrical-safety-tallinn",
    _type: "blogPost",
    title: {
      en: "Electrical Safety at Home in Tallinn: 7 Warning Signs & When to Call an Electrician",
      et: "Elektriohutus kodus Tallinnas: 7 hoiatusmärki ja millal kutsuda elektrik",
      ru: "Электробезопасность дома в Таллине: 7 предупреждающих признаков и когда вызывать электрика",
    },
    slug: { _type: "slug", current: "electrical-safety-home-tallinn-warning-signs" },
    pathSegment: {
      et: "elektriohutus-kodus-tallinn-hoiatusmargid",
      ru: "электробезопасность-дома-таллин-признаки",
    },
    publishedAt: "2026-05-01T08:00:00.000Z",
    excerpt: {
      en: "Flickering lights, tripping breakers, burning smell from outlets — these are not minor annoyances. They are fire hazards. Learn 7 electrical warning signs every Tallinn homeowner must know.",
      et: "Vilkuvad tuled, katkevad kaitselülitid, põlemislõhn pistikupesadest — need pole väikesed tüütused. Need on tuleohtlikud. Tutke 7 elektrihoiatusmärgiga, mida iga Tallinna kinnisvaraomanik peab teadma.",
      ru: "Мигающий свет, срабатывающие автоматы, запах гари из розеток — это не мелкие неудобства. Это пожарная опасность. Узнайте 7 электрических предупреждающих признаков, которые должен знать каждый житель Таллина.",
    },
    metaTitle: {
      en: "Electrical Safety Tallinn: 7 Warning Signs — Certified Electricians 24/7",
      et: "Elektriohutus Tallinn: 7 hoiatusmärki — sertifitseeritud elektrikud 24/7",
      ru: "Электробезопасность Таллин: 7 признаков — сертифицированные электрики 24/7",
    },
    metaDescription: {
      en: "Burning smell, flickering lights, or breakers that keep tripping? These are fire warning signs. TorudeAbi24 certified electricians diagnose and fix electrical faults across Tallinn 24/7. Call now.",
      et: "Põlemislõhn, vilkuvad tuled või korduvalt katkevad kaitselülitid? Need on tuleohusignaalid. TorudeAbi24 sertifitseeritud elektrikud diagnoosivad ja parandavad elektririkked üle Tallinna 24/7.",
      ru: "Запах гари, мигающий свет или постоянно выбивающие автоматы? Это пожарные сигналы. Сертифицированные электрики TorudeAbi24 диагностируют и устраняют неисправности по всему Таллину 24/7.",
    },
    body: {
      en: [
        p("Estonia's housing stock contains a significant proportion of Soviet-era wiring — aluminium conductors, outdated fuse boxes, and undersized circuits. Combined with modern high-draw appliances, this creates genuine fire risk. These seven signs mean you need a certified electrician — not a YouTube tutorial."),
        h2("1. Circuit Breakers or Fuses That Trip Repeatedly"),
        p("A breaker that trips once when you plug in a large appliance may indicate an overloaded circuit. A breaker that trips regularly without explanation signals a short circuit, ground fault, or an overloaded panel. Resetting repeatedly without finding the cause is dangerous — call a licensed electrician."),
        h2("2. Flickering or Dimming Lights"),
        p("Occasional dimming when a major appliance starts is normal. Persistent flickering — especially in multiple rooms or when nothing changes — indicates loose wiring, a failing connection, or an overloaded neutral. Loose connections arc and cause house fires. This is urgent."),
        h2("3. Burning Smell from Outlets or Switch Plates"),
        p("A burning smell from any electrical fitting is an immediate emergency. Stop using that outlet or switch. The smell indicates arcing, melting insulation, or a smouldering connection inside the wall. Turn off the breaker for that circuit and call an electrician today — do not wait."),
        h2("4. Outlets or Switches That Are Warm or Hot to Touch"),
        p("Outlets and switches should never be warm. Heat indicates excessive resistance from a poor connection or overloaded wiring. In Tallinn's older apartment blocks, aluminium wiring from the 1970s–1980s is particularly prone to this problem as aluminium expands and contracts, loosening connections over time."),
        h2("5. Sparks When Plugging In"),
        p("A tiny blue spark when plugging in a high-draw device is sometimes normal (capacitors charging). A large, yellow, or recurring spark is not normal. It indicates a loose wire, a failing outlet, or a short circuit. Replace the outlet immediately."),
        h2("6. Electrical Shocks from Outlets or Appliances"),
        p("Even a mild tingle from touching an appliance or outlet indicates a ground fault — electricity flowing through an unintended path, potentially through you. This is both a shock hazard and a fire hazard. The circuit needs immediate inspection."),
        h2("7. Fuse Box or Consumer Unit Over 25 Years Old"),
        p("In Estonia, consumer units from the Soviet period (up to 1991) and even early 1990s units often lack RCD (residual current device) protection — the device that prevents fatal electric shock. Modern Estonian building code (EVS 812) requires RCD protection in all new and renovated installations. Upgrading an old panel is a safety investment, not an optional upgrade."),
        h2("Electrical Work in Estonia: Legal Requirements"),
        p("Under Elektriohutusseadus (Electrical Safety Act), electrical installation work in Estonian dwellings must be carried out by a licensed Competent Person (pädev isik). Work performed without a licence voids building insurance, creates liability when selling the property, and is a criminal offence if it causes injury."),
        h2("TorudeAbi24 Certified Electricians in Tallinn"),
        p("All TorudeAbi24 electricians hold current Estonian Pädev Isik certification. We handle fault diagnosis, full rewiring, consumer unit upgrades, RCD installation, and 24/7 emergency electrical call-outs across Tallinn and Harjumaa. Free quote, 2-year warranty, -30% on day rates. Call +372 56 89 79 29."),
      ],
      et: [
        p("Eesti elamufondi hulgas on märkimisväärne osa nõukogudeaegset juhtmestikku — alumiiniumjuhid, vananenud kaitsekastid ja alakoormatud ahelad. Koos kaasaegsete suure energiatarbega seadmetega tekitab see tõelise tuleohu."),
        h2("1. Korduvalt katkevad kaitselülitid"),
        p("Kaitselüliti, mis katkeb regulaarselt ilma selgituseta, annab märku lühiühendusest, maandusrikest või ülekoormatud paneelist. Korduvalt lähtestamine ilma põhjust leidmata on ohtlik — kutsuge litsentseeritud elektrik."),
        h2("2. Vilkuvad või hämarduvad tuled"),
        p("Püsiv vilkumine — eriti mitmes toas — näitab lahtist juhtmestikku, ebaõnnestuvat ühendust või ülekoormatud nulljuhet. Lahtised ühendused põhjustavad kaarelahendusi ja tulekahjusid. See on kiireloomuline."),
        h2("3. Põlemislõhn pistikupesadest"),
        p("Põlemislõhn mis tahes elektriühendusest on vahetu hädaolukord. Lõhin näitab kaarelahendust, sulavat isolatsiooni või smouldering ühendust seina sees. Lülitage kaitselüliti välja ja helistage täna elektrikule."),
        h2("4. Soojad või kuumad pistikupesad"),
        p("Pistikupesad ei tohiks kunagi soojad olla. Kuumus näitab liigset takistust halvast ühendusest. Tallinna vanemates kortermajades on 1970.–1980. aastate alumiiniumjuhtmestik selle probleemi suhtes eriti tundlik."),
        h2("5. Sähvatused ühendamisel"),
        p("Suur, kollane või korduv sähvatus pole normaalne. See näitab lahtist juhet, ebaõnnestuvat pistikupesa või lühiühendust. Asendage pistikupesa kohe."),
        h2("6. Elektrilöögid pistikupesadest"),
        p("Isegi kerge surin seadme puudutamisel näitab maandusrikket — elektrit, mis voolab kavandamata teed. See on nii löögioht kui ka tulekahjuoht."),
        h2("7. Kaitsekast üle 25 aasta vana"),
        p("Nõukogudeaegsed kaitsekastid ei ole sageli varustatud RCD (rikkevoolukaitselüliti) kaitsega — seadmega, mis takistab surmavat elektrilööki. Kaasaegne Eesti ehitusnormistik (EVS 812) nõuab RCD kaitset kõikides renoveeritud paigaldistes."),
        h2("TorudeAbi24 sertifitseeritud elektrikud Tallinnas"),
        p("Kõik TorudeAbi24 elektrikud omavad kehtivat Eesti Pädeva Isiku sertifikaati. Käsitleme rikkediagnostikat, täielikku ümberjuhtmestamist, kaitsekastide uuendust ja 24/7 avariielektrilisi väljasõite üle Tallinna ja Harjumaa. Tasuta pakkumine, 2-aastane garantii, -30% päevamääradel. Helistage +372 56 89 79 29."),
      ],
      ru: [
        p("В жилом фонде Эстонии значительная часть домов имеет советскую проводку — алюминиевые провода, устаревшие щитки и недостаточные цепи. В сочетании с современными мощными приборами это создаёт реальный риск пожара."),
        h2("1. Автоматы или предохранители, которые регулярно выбивают"),
        p("Автомат, который выбивает регулярно без объяснения, сигнализирует о коротком замыкании, замыкании на землю или перегруженном щите. Неоднократный сброс без выяснения причины опасен — вызовите лицензированного электрика."),
        h2("2. Мигающий или тускнеющий свет"),
        p("Постоянное мигание — особенно в нескольких комнатах — указывает на плохой контакт, неисправное соединение или перегруженный нулевой провод. Плохие контакты вызывают искрение и пожары."),
        h2("3. Запах гари из розеток"),
        p("Запах гари из любого электроустановочного изделия — это немедленная чрезвычайная ситуация. Запах указывает на искрение, расплавленную изоляцию или тлеющее соединение внутри стены. Отключите автомат и немедленно вызовите электрика."),
        h2("4. Тёплые или горячие розетки"),
        p("Розетки никогда не должны быть тёплыми. В старых таллинских домах алюминиевая проводка 1970–1980-х годов особенно склонна к этой проблеме, поскольку алюминий расширяется и сжимается, ослабляя контакты со временем."),
        h2("5. Искры при подключении"),
        p("Большая, жёлтая или повторяющаяся искра — это ненормально. Это указывает на плохой контакт, неисправную розетку или короткое замыкание."),
        h2("6. Удары током от розеток"),
        p("Даже слабое покалывание при прикосновении к прибору указывает на замыкание на землю — электричество течёт через непредназначенный путь. Это одновременно угроза поражения и пожарная опасность."),
        h2("7. Щиток старше 25 лет"),
        p("Советские электрощиты часто не оснащены защитой УЗО (устройством защитного отключения), которое предотвращает смертельный удар током. Современные нормы Эстонии (EVS 812) требуют защиты УЗО во всех renovated installations."),
        h2("Сертифицированные электрики TorudeAbi24 в Таллине"),
        p("Все электрики TorudeAbi24 имеют действующий эстонский сертификат Pädev Isik. Мы выполняем диагностику неисправностей, полную замену проводки, замену щитков, установку УЗО и аварийные вызовы 24/7 по Таллину и Харьюмаа. Бесплатная смета, гарантия 2 года, скидка -30% в дневное время. Звоните: +372 56 89 79 29."),
      ],
    },
  },
];

async function main() {
  // 1. Delete all existing blogPost documents
  console.log("🗑  Deleting existing blog posts...");
  const existing = await client.fetch('*[_type == "blogPost"]._id');
  console.log(`   Found ${existing.length} existing posts.`);
  if (existing.length > 0) {
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
    console.log("   Deleted.\n");
  }

  // 2. Create 3 new SEO-perfect blog posts
  console.log("✍️  Creating 3 new SEO-perfect blog posts...\n");
  for (const blog of blogs) {
    await client.createOrReplace(blog);
    console.log(`   ✅ Created: ${blog.title.en}`);
  }

  console.log("\n🎉 Done! 3 blog posts created with full SEO fields, no author dependency.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
