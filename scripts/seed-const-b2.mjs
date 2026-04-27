/**
 * scripts/seed-const-b2.mjs
 * Patches 3 Sanity service documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-const-b2.mjs
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

  // ── 1. drywall-works ──────────────────────────────────────────────────────
  {
    slug: "drywall-works",
    imgKeyword: "drywall plasterboard installation partition wall",
    imgKeyword2: "gypsum board interior wall construction",
    imageAlt: ls(
      "Kipskartongist vaheseinaste ja ripplae paigaldus Tallinnas",
      "Drywall plasterboard partition and suspended ceiling installation in Tallinn",
      "Монтаж перегородок и подвесного потолка из гипсокартона в Таллине"
    ),
    galleryAlt: ls(
      "Knauf kipskartong ripplae paigaldus — valmis tulemus",
      "Knauf plasterboard suspended ceiling installation — finished result",
      "Монтаж подвесного потолка Knauf из гипсокартона — готовый результат"
    ),
    shortDesc: lt(
      "Paigaldame kipskartongist vaheseinu, ripplaesid ja kujundlagesid. Sertifitseeritud Knauf ja Gyproc paigaldajad Tallinnas ja Harjumaal. Kiire, puhas töö, tolmuvaene protsess ja garantii.",
      "We install drywall partitions, suspended ceilings and shaped walls using Knauf and Gyproc certified systems. Fast, clean, dust-minimised work with full warranty. Tallinn and Harjumaa.",
      "Монтируем перегородки, подвесные потолки и фигурные стены из гипсокартона. Сертифицированные системы Knauf и Gyproc. Быстрая, чистая работа с минимумом пыли. Гарантия."
    ),
    metaTitle: ls(
      "Kipskartong Tallinnas | Knauf Gyproc sertifitseeritud",
      "Drywall Works Tallinn | Knauf Gyproc Certified Installers",
      "Гипсокартон Таллин | Сертифицированный монтаж Knauf Gyproc"
    ),
    metaDesc: lt(
      "Kipskartongist vaheseinad, ripplaed, kujundlaed Tallinnas. Knauf ja Gyproc sertifitseeritud paigaldajad. Helisolatsioon, soojustus, niiskuskindel plaat. Tasuta pakkumine — helista!",
      "Drywall partitions, suspended ceilings, shaped walls in Tallinn. Knauf & Gyproc certified. Soundproofing, insulation, moisture-resistant boards. Free quote — call now!",
      "Перегородки, подвесные потолки, фигурные стены из гипсокартона в Таллине. Knauf и Gyproc. Звукоизоляция, утепление, влагостойкие плиты. Бесплатная смета — звоните!"
    ),
    body: lb(
      // ET — 500+ words
      `Kipskartongitööd Tallinnas — vaheseinad, ripplaed ja kujundlahendused

Kipskartong on kaasaegse sisekujunduse üks mitmekülgsemaid ehitusmaterjale. Sellest saab luua vaheseinu, ripplaesid, kaarjaid konstruktsioone, niše, lambriverd ja isegi keerukaid kujundeid. TorudeAbi24 meeskond on aastaid spetsialiseerunud professionaalsetele kipskartongitöödele Tallinnas, Harjumaal ja lähiümbruses. Meie sertifitseeritud Knauf ja Gyproc paigaldajad tagavad töö kvaliteedi, puhtuse ja kestlikkuse.

Mida me pakume?

Kipskartongitööde valik on lai: mittekandvad vaheseinad ruumide jaotamiseks, keerukatele kujunditele sobivad kaarjad ja astmelised laed, ripplaed süvistatud valgustite ja sisseehitatud elementide paigaldamiseks, dekoratiivsed nišid, sambad ja raamid, lambriverd ja sein-laed ühenduslahendused (wall-to-ceiling coves), kokkupandavad koorikud tehnosüsteemide varjamiseks. Töötame nii elamu- kui ka äriruumides — korteritest kontorite, restoranide ja hotellideni.

Knauf ja Gyproc — Euroopa tippkvaliteet

Kasutame ainult Knauf ja Gyproc süsteeme, mis on Eestis ja kogu Euroopa Liidus tunnustatud tippkvaliteedi etalon. Mõlemad tootjad pakuvad laia plaatide valikut: standardplaat (GKB), niiskuskindel plaat (GKBi/GKBI, roheline) vannitubadele ja märgaladele, tulekindel plaat (GKF, punane) köökidele ja tehnoruumidele, kõrgtugevusega plaat tihedate konstruktsioonide jaoks. Sertifitseeritud süsteemide kasutamine tagab, et teie hoone vastelab tuleohutusnormidele ja ehituseeskirjadele.

Helisolatsioon ja soojustus

Kipskartongist vaheseinad on ideaalne lahendus korterisisese mürasaaste vähendamiseks. Seinakonstruktsiooni sisse paigaldame mineraalvilla või spetsiaalse helisolaatori, mis vähendab astmismüra ja õhulist müra kuni 50 dB võrra. Helisolatsioonikihti soovitame eriti magamistubade, kabinettide, kohtumisruumide ja beebitoalaste vaheseinale. Välisseinte ette paigaldatav kipskartong koos soojustuskihiga parandab lisaks seinasisest soojuslikku mugavust ja võimaldab ka fassaadisoojustust asendada sisemiselt.

Tolmuvaba ja kiire paigaldusprotsess

Kipskartongitööde üks suurimaid eeliseid on see, et need ei tekita märjakonstruktsioonide tavapärast tolmu- ja lõhnareostust. Meie meeskond kasutab tõhusaid tolmukaitsetehnikaid: liiklus- ja töötsooni eraldamine kaitsekilega, tolmuimeja kasutamine lõikamisel, tühi- ja transpordiaegne kaitsmine. Tüüpiline vahesein kuni 20 m² valmib 1–2 tööpäevaga, ripplagi kuni 30 m² valmib 2–3 päevaga.

Viimistlus ja värvimiseks ettevalmistus

Pärast plaatide kinnitamist pahteldame liitekohad, nurgad ja kruvi pead tasaseks (mitu kihti, lihvimine), tagades sujuva aluspinna värvimiseks või tapeetimiseks. Soovi korral teostame ka värvi- ja tapeetimistööd. Kõikidele töödele anname 2-aastase töögarantii. Kipskartongikonstruktsioon, mis on õigesti paigaldatud, kestab sama kaua kui maja ise.

Tallinn, Harjumaa ja lähiümbrus

Meie meeskond teenindab Tallinna, Viimsi, Maardu, Saue, Keila, Rapla ja lähiümbrust. Pakume ka paindlikku tööaega — töötame vajadusel ka nädalavahetusel, et minimeerida häireid teie igapäevaelus. Hinnapakkumine on tasuta ja mittesiduv. Helistage meile täna ja leppige kokku tasuta kohtvaatlus.`,

      // EN — 500+ words
      `Drywall and Plasterboard Works in Tallinn — Partitions, Ceilings and Shaped Walls

Plasterboard is one of the most versatile materials in modern interior construction. It can be used to create partitions, suspended ceilings, curved and shaped structures, niches, wall panelling and even complex bespoke designs. The TorudeAbi24 team has been specialising in professional drywall works across Tallinn and Harjumaa for many years. Our Knauf and Gyproc certified installers guarantee quality, cleanliness and lasting durability.

What we offer

Our drywall services cover a wide scope: non-load-bearing partitions for room division, curved and stepped ceilings for complex design shapes, suspended ceilings for recessed lighting and built-in elements, decorative niches, columns and frames, wall-to-ceiling cove junctions, and boxing enclosures to conceal building services. We work in both residential and commercial spaces — from apartments to offices, restaurants and hotels.

Knauf and Gyproc — European top quality

We use only Knauf and Gyproc systems, the recognised benchmark of top quality across Estonia and the European Union. Both manufacturers offer a wide board selection: standard board (GKB), moisture-resistant board (GKBI, green) for bathrooms and wet areas, fire-resistant board (GKF, red) for kitchens and plant rooms, and high-density board for robust constructions. Using certified systems ensures your building complies with fire safety regulations and building codes.

Soundproofing and thermal insulation

Plasterboard partitions are an ideal solution for reducing noise between rooms in an apartment or office. We install mineral wool or specialist acoustic insulation within the wall structure, reducing both impact and airborne noise by up to 50 dB. Acoustic insulation layers are particularly recommended for bedroom, study, meeting room and nursery partitions. Plasterboard lined against external walls with an insulation layer also improves internal thermal comfort and can serve as an alternative to external facade insulation.

Dust-minimised and fast installation process

One of the greatest advantages of drywall construction is the near absence of the dust and odour pollution associated with wet trades. Our team uses effective dust-control techniques: segregating traffic and work zones with protective sheeting, using vacuum-attached cutting tools, and protecting finishes during transport and work. A typical partition of up to 20 m² is completed within 1–2 working days; a suspended ceiling of up to 30 m² takes 2–3 days.

Finishing and decoration-ready surface

After fixing the boards we apply jointing compound to all joints, corners and screw heads in multiple coats with sanding between each, producing a smooth, paint-ready surface. We can also carry out painting and wallpapering upon request. All works carry a 2-year workmanship warranty. A correctly installed plasterboard construction will last as long as the building itself.

Tallinn, Harjumaa and surrounding areas

Our team serves Tallinn, Viimsi, Maardu, Saue, Keila, Rapla and the wider region. We also offer flexible scheduling — including weekends — to minimise disruption to your daily life. Free, no-obligation quote available. Call us today to arrange a site visit.`,

      // RU — 500+ words
      `Работы по гипсокартону в Таллине — перегородки, потолки и фигурные стены

Гипсокартон — один из наиболее универсальных материалов в современном интерьерном строительстве. Из него можно создавать перегородки, подвесные потолки, арочные и фигурные конструкции, ниши, облицовку стен и даже сложные дизайнерские решения. Команда TorudeAbi24 уже много лет специализируется на профессиональных работах по гипсокартону по всему Таллину и уезду Харьюмаа. Наши сертифицированные монтажники систем Knauf и Gyproc гарантируют качество, чистоту и долговечность результата.

Что мы предлагаем?

Наши услуги по гипсокартону охватывают широкий спектр работ: ненесущие перегородки для разделения пространства, изогнутые и ступенчатые потолки для сложных дизайнерских форм, подвесные потолки для встроенного освещения и встраиваемых элементов, декоративные ниши, колонны и обрамления, сопряжения стена–потолок (карнизные галтели), короба для скрытия инженерных коммуникаций. Работаем как в жилых, так и в коммерческих помещениях — от квартир до офисов, ресторанов и отелей.

Knauf и Gyproc — европейское качество

Используем исключительно системы Knauf и Gyproc — признанный эталон высшего качества в Эстонии и Европейском союзе. Оба производителя предлагают широкий ассортимент плит: стандартный лист (GKB), влагостойкий лист (GKBI, зелёный) для ванных комнат и влажных зон, огнестойкий лист (GKF, красный) для кухонь и технических помещений, высокопрочный лист для нагруженных конструкций. Использование сертифицированных систем гарантирует соответствие вашего здания требованиям пожарной безопасности и строительным нормам.

Звукоизоляция и теплоизоляция

Перегородки из гипсокартона — идеальное решение для снижения шума между комнатами в квартире или офисе. Внутрь стеновой конструкции укладываем минеральную вату или специальный акустический изолятор, который снижает ударный и воздушный шум до 50 дБ. Акустическую прослойку особенно рекомендуем для перегородок спален, кабинетов, переговорных комнат и детских. Облицовка внешних стен гипсокартоном с теплоизоляционным слоем также повышает тепловой комфорт внутри и может служить альтернативой наружному утеплению фасада.

Минимум пыли и быстрый монтаж

Одно из главных преимуществ конструкций из гипсокартона — практически полное отсутствие пыли и запахов, характерных для «мокрых» строительных процессов. Наша команда применяет эффективные методы пылезащиты: разделение рабочих и проходных зон защитной плёнкой, резку с пылесосом, защиту отделки при транспортировке и работе. Типичная перегородка площадью до 20 м² выполняется за 1–2 рабочих дня, подвесной потолок площадью до 30 м² — за 2–3 дня.

Шпаклёвка и подготовка под окраску

После фиксации листов шпаклюем все стыки, углы и шляпки саморезов в несколько слоев с промежуточной шлифовкой, получая ровную поверхность, готовую к покраске или поклейке обоев. По желанию выполняем также малярные и обойные работы. На все работы предоставляем гарантию 2 года. Правильно смонтированная конструкция из гипсокартона служит столько же, сколько само здание.

Таллин, Харьюмаа и прилегающие районы

Наша команда обслуживает Таллин, Виймси, Маарду, Сауэ, Кейла, Рапла и прилегающие районы. Работаем в гибком графике, включая выходные дни, чтобы минимизировать неудобства. Бесплатная смета без обязательств. Позвоните нам сегодня и договоритесь о бесплатном выезде.`
    ),
  },

  // ── 2. facade-works ───────────────────────────────────────────────────────
  {
    slug: "facade-works",
    imgKeyword: "building facade insulation renovation exterior",
    imgKeyword2: "exterior wall render cladding insulation",
    imageAlt: ls(
      "Fassaadisoojustus ja krohvitud fassaad Tallinnas — renoveeritud hoone",
      "Facade insulation and rendered exterior in Tallinn — renovated building",
      "Утепление фасада и штукатурка в Таллине — отремонтированное здание"
    ),
    galleryAlt: ls(
      "Ventilatsioonifassaad ja EPS soojustus ehitusplatsil Tallinnas",
      "Ventilated cladding and EPS insulation on building site in Tallinn",
      "Вентилируемый фасад и утепление EPS на стройплощадке в Таллине"
    ),
    shortDesc: lt(
      "Fassaaditööd Tallinnas — välissoojustus (EPS, mineraalvill), krohvfassaad, ventilatsioonifassaad ja värvimine. Parandab energiatõhusust, vähendab küttekulusid ja vastab Eesti ehitusnormidele.",
      "Facade works Tallinn — external insulation (EPS, mineral wool), render finishes, ventilated cladding and painting. Dramatically improves energy rating, reduces heating costs, Estonian building regulations compliant.",
      "Фасадные работы в Таллине — наружное утепление (EPS, минвата), штукатурный фасад, вентилируемый фасад и покраска. Повышает энергоэффективность, снижает расходы на отопление."
    ),
    metaTitle: ls(
      "Fassaaditööd Tallinnas | EPS, mineraalvill, krohv",
      "Facade Works Tallinn | EPS Mineral Wool Render Cladding",
      "Фасадные работы Таллин | EPS минвата штукатурка фасад"
    ),
    metaDesc: lt(
      "Professionaalsed fassaaditööd Tallinnas. EPS ja mineraalvilla soojustus, krohv, ventilatsioonifassaad. Energiasääst, ilmakaitsmine, Eesti ehitusnormid. Tasuta hinnapakkumine!",
      "Professional facade works in Tallinn. EPS & mineral wool insulation, render, ventilated cladding. Energy saving, weather protection, building regulations. Free quote now!",
      "Профессиональные фасадные работы в Таллине. EPS и минвата, штукатурка, вентфасад. Энергосбережение, защита от погоды, строительные нормы. Бесплатная смета!"
    ),
    body: lb(
      // ET — 500+ words
      `Fassaaditööd Tallinnas — energiasääst, ilmakaitsmine ja hoone väärtuse tõus

Fassaad on hoone esimene kaitsekiht välismõjude vastu ja samal ajal selle esteetiline visiitkaart. Hästi renoveeritud fassaad ei säilita mitte ainult hoone konstruktsioone, vaid vähendab ka oluliselt kütte- ja jahutuskulusid ning tõstab kinnisvara turuväärtust. TorudeAbi24 pakub terviklikke fassaaditöid Tallinnas ja Harjumaal — alates projekti koostamisest kuni viimistletud tulemuse üleandmiseni.

Välissoojustuse süsteemid (ETICS)

Kõige populaarsem fassaaditöö on välissoojustuse komposiitsüsteem (ETICS — External Thermal Insulation Composite System), tuntud ka kui "sooja fassaadi" süsteem. See koosneb soojustusplaatidest (EPS ehk vahtpolüstüreen või mineraalvill), alustugevduskihist (armeerkangaga), krohvikihist ja viimistlusmassist (silikaatkrohv, silikonkrohv, mineraalkrohv). EPS sobib suurepäraselt standardsetele majadele, kus peamine eesmärk on soojapidavus ja madalad kulud. Mineraalvill on veidi kallim, kuid parim valik siis, kui on vajalik täiendav tulekindlus, helisolatsioon või auruläbilaskvus (eriti vanemate kivimajadega).

Ventilatsioonifassaad — kestlik alternatiiv

Ventilatsioonifassaad (tuntud ka kui "tuulutusvaheruumiga fassaad") on kaasaegne alternatiiv krohvfassaadile. Selle ehituslik printsiip: soojustuslkiht kinnitatakse seinale, seejärel paigaldatakse tuulutusvaheruumiga kandekonstruktsioon ja sellele fassaadiklaadimine — laud, tsementkiudplaat, komposiitpaneel või keraamika. Tuulutusvaheruum võimaldab niiskusel vabalt aurustuda, mis pikendab soojustuse ja seina eluiga. Sobib eriti hästi kõrgematele hoonetele ja renoveerimistele, kus fassaadimaterjali vahetus on soovitav.

Fassaadimaalimine ja -hooldus

Fassaadivärvi uuendamine on ökonoomne viis hoone väljanägemise värskendamiseks ilma täismahus renoveerimiseta. Töötleme betoon-, krohv- ja silikaattellistest fassaade. Enne värvimist teeme aluspinna põhjaliku ettevalmistuse: puhastame survepesuriga, töötleme pragunenud kohti, kanname kruntvärvikihti ja kasutame ilmastikukindlaid värvitooteid (Caparol, Tikkurila, Fassa Bortolo jt). Soovime, et tulemus kestaks 10–15 aastat ilma uuesti värvimata.

Energiatõhusus ja ehitusnormid

Eesti energiatõhususe nõuded hoonetele on aastatega karmistunud. 2013. aasta liginullenergiahoone nõuded tähendavad, et paljud vanemad hooned vajavad seinte soojustegurite (U-väärtus) parandamist. Meie meeskond arvutab teie hoone seinte praeguse U-väärtuse, soovitab optimaalseid soojustuspakke ning koostab energiatõhususe sertifikaadi nõuetele vastava lahenduse. Kõik tööd vastavad EVS-EN ja Eesti ehituseeskirjadele.

Fassaaditöö protsess

Alustame alati tasuta kohtvaatlusega ja fassaadi seisukorra hindamisega. Seejärel koostame detailse töökava ja hinnapakkumise. Paigaldame tellingud (vajadusel), seejärel alustame soojustuse kinnitamist nurgast, teeme vuukimise, kanname alustugevduskihi, laseme kuivada, kanname viimistluskrohvi ja lõpuks värvime. Täielik fassaadirenovatsioon keskmisele kortermajale võtab 3–6 nädalat.

Garantii ja järelhooldus

Kõikidele töödele anname vähemalt 5-aastase garantii materjalide ja töö suhtes. Kasutame ainult tootjate poolt heakskiidetud süsteeme, mis võimaldavad meil anda pikaajalist garantiid. Soovitame ka iga 5 aasta järel viia läbi fassaadi seisukorra kontrolli.

Helista meile ja broneeri tasuta fassaadiülevaatus täna. Meie spetsialistid hindavad praegust seisukorda ja soovitavad parima lahenduse just teie hoone jaoks.`,

      // EN — 500+ words
      `Facade Works in Tallinn — Energy Saving, Weather Protection and Property Value

The facade is a building's first line of defence against the elements and its aesthetic calling card. A well-renovated facade not only protects the structural fabric of the building but also significantly reduces heating and cooling costs and raises the market value of the property. TorudeAbi24 provides comprehensive facade works across Tallinn and Harjumaa — from project design to finished handover.

External insulation composite systems (ETICS)

The most popular facade solution is the External Thermal Insulation Composite System (ETICS), also known as a "warm facade" system. It consists of insulation boards (EPS expanded polystyrene or mineral wool), a reinforcement base coat (fibreglass mesh embedded), a render coat, and a decorative finish (silicate render, silicone render or mineral render). EPS is excellent for standard buildings where the primary goal is thermal performance at competitive cost. Mineral wool costs a little more but is the best choice where enhanced fire resistance, acoustic attenuation or vapour permeability is required — especially with older masonry buildings.

Ventilated cladding facade — a durable alternative

Ventilated cladding (also known as a "rainscreen" or "drained and ventilated" facade) is a modern alternative to render finishes. The construction principle: an insulation layer is fixed to the wall, a structural sub-frame is installed leaving an air cavity, and facade cladding is fixed to the sub-frame — timber, fibre cement board, composite panel or ceramic tiles. The ventilated cavity allows moisture to evaporate freely, extending the service life of both the insulation and the wall structure. Particularly suited to taller buildings and refurbishments where a change of facade material is desirable.

Facade painting and maintenance

Repainting the facade is an economical way to refresh the building's appearance without full-scale renovation. We treat concrete, render and silicate brick facades. Before painting we carry out thorough surface preparation: pressure washing, crack treatment, priming coat and application of weather-resistant paints (Caparol, Tikkurila, Fassa Bortolo, etc.). Our aim is a result that lasts 10–15 years without repainting.

Energy efficiency and building regulations

Estonia's energy performance requirements for buildings have tightened significantly over the years. The nearly zero-energy building requirements introduced in 2013 mean that many older buildings need to improve wall U-values. Our team calculates your building's current wall U-value, recommends optimal insulation packages, and designs a solution that meets energy performance certificate requirements. All works comply with EVS-EN standards and Estonian building regulations.

The facade renovation process

We always start with a free site visit and facade condition assessment. We then produce a detailed work plan and written quote. We erect scaffolding (where required), fix insulation starting from corners, apply joint filler, apply the base reinforcement coat, allow to cure, apply the decorative render finish, and finally paint. A complete facade renovation on an average apartment block takes 3–6 weeks.

Warranty and aftercare

We provide at least a 5-year workmanship and materials warranty on all facade works. We use only manufacturer-approved systems, which allows us to offer extended guarantees. We also recommend a facade condition inspection every 5 years.

Call us today to book a free facade survey. Our specialists will assess the current condition and recommend the best solution for your building.`,

      // RU — 500+ words
      `Фасадные работы в Таллине — энергосбережение, защита от погоды и рост стоимости недвижимости

Фасад — это первый защитный рубеж здания от внешних воздействий и его эстетическая визитная карточка. Хорошо отремонтированный фасад не только сохраняет строительные конструкции, но и значительно снижает затраты на отопление и охлаждение, а также повышает рыночную стоимость недвижимости. TorudeAbi24 предоставляет комплексные фасадные работы по всему Таллину и уезду Харьюмаа — от проектирования до передачи готового результата.

Системы наружного утепления (ETICS)

Наиболее популярное фасадное решение — система наружного теплоизоляционного компоновки (ETICS — External Thermal Insulation Composite System), известная также как «тёплый фасад». Она состоит из теплоизоляционных плит (EPS — пенополистирол или минеральная вата), армированного базового слоя (с сеткой из стекловолокна), штукатурного слоя и декоративной отделки (силикатная, силиконовая или минеральная штукатурка). EPS отлично подходит для стандартных зданий, где главная цель — тепловые характеристики при конкурентной стоимости. Минеральная вата несколько дороже, но является лучшим выбором там, где требуется повышенная огнестойкость, акустическое ослабление или паропроницаемость — особенно для старых каменных зданий.

Вентилируемый фасад — долговечная альтернатива

Вентилируемый фасад (также известный как «навесной вентилируемый фасад») — современная альтернатива штукатурным отделкам. Принцип конструкции: теплоизоляционный слой крепится к стене, монтируется несущий каркас с воздушным зазором, на который фиксируется облицовка — доска, фиброцементная плита, композитная панель или керамика. Воздушный зазор позволяет влаге свободно испаряться, продлевая срок службы как утеплителя, так и стеновой конструкции. Особенно подходит для более высоких зданий и реконструкций, где желательна смена фасадного материала.

Покраска и обслуживание фасада

Перекраска фасада — экономичный способ обновить внешний вид здания без полноценной реновации. Работаем с бетонными, штукатурными и силикатно-кирпичными фасадами. Перед покраской проводим тщательную подготовку поверхности: мойку под давлением, обработку трещин, грунтовочный слой и нанесение атмосферостойких красок (Caparol, Tikkurila, Fassa Bortolo и др.). Наша цель — результат, служащий 10–15 лет без повторной окраски.

Энергоэффективность и строительные нормы

Требования Эстонии к энергетическим характеристикам зданий за последние годы значительно ужесточились. Требования к почти нулевым зданиям, введённые в 2013 году, означают, что многим старым зданиям необходимо улучшить коэффициент теплопередачи стен (U-значение). Наша команда рассчитывает текущее U-значение стен вашего здания, рекомендует оптимальные пакеты утепления и разрабатывает решение, соответствующее требованиям сертификата энергоэффективности. Все работы соответствуют стандартам EVS-EN и эстонским строительным нормам.

Процесс реновации фасада

Всегда начинаем с бесплатного выезда на объект и оценки состояния фасада. Затем составляем подробный план работ и письменную смету. Монтируем строительные леса (при необходимости), фиксируем утеплитель, начиная с углов, наносим шпаклёвку швов, армированный базовый слой, даём высохнуть, наносим декоративный штукатурный слой и в завершение красим. Полная реновация фасада среднего многоквартирного дома занимает 3–6 недель.

Гарантия и техническое обслуживание

На все фасадные работы предоставляем гарантию не менее 5 лет на работы и материалы. Используем только одобренные производителями системы, что позволяет нам предлагать расширенные гарантии. Также рекомендуем осмотр состояния фасада каждые 5 лет.

Позвоните нам сегодня, чтобы записаться на бесплатный осмотр фасада. Наши специалисты оценят текущее состояние и порекомендуют оптимальное решение именно для вашего здания.`
    ),
  },

  // ── 3. flooring-works ─────────────────────────────────────────────────────
  {
    slug: "flooring-works",
    imgKeyword: "flooring installation parquet laminate",
    imgKeyword2: "floor fitting wood laminate vinyl",
    imageAlt: ls(
      "Parketi ja laminaadi paigaldus — valmis põrandapind Tallinnas",
      "Parquet and laminate flooring installation — finished floor in Tallinn",
      "Укладка паркета и ламината — готовое напольное покрытие в Таллине"
    ),
    galleryAlt: ls(
      "LVT vinüülpõranda paigaldus koos plintidega Tallinnas",
      "LVT luxury vinyl flooring installation with skirting in Tallinn",
      "Укладка LVT виниловых полов с плинтусами в Таллине"
    ),
    shortDesc: lt(
      "Paigaldame kõiki põrandakatteid — parkett, laminaat, luksusvinüül (LVT/SPC). Tasandamine, põrandaküttega ühilduvus, plindid ja üleminekud. Garanteeritud tasane tulemus Tallinnas.",
      "We install all flooring types — parquet (solid & engineered), laminate, luxury vinyl (LVT/SPC). Screed levelling, underfloor heating compatible, skirting and transitions. Guaranteed flat result, Tallinn.",
      "Укладываем все виды напольных покрытий — паркет (массив и инженерный), ламинат, LVT/SPC. Нивелирование, совместимость с тёплым полом, плинтусы и переходы. Гарантия ровного результата."
    ),
    metaTitle: ls(
      "Põrandakatted Tallinnas | Parkett, laminaat, LVT vinüül",
      "Flooring Installation Tallinn | Parquet Laminate LVT Vinyl",
      "Напольные покрытия Таллин | Паркет ламинат LVT винил"
    ),
    metaDesc: lt(
      "Põrandakatete paigaldus Tallinnas. Parkett, laminaat, LVT, SPC vinüül. Tasandamine, põrandaküte, plindid. Garanteeritud tasane tulemus, kõik brändid laos. Tasuta pakkumine!",
      "Flooring installation in Tallinn. Parquet, laminate, LVT, SPC vinyl. Levelling, underfloor heating, skirting. Guaranteed flat result, all brands stocked. Free quote now!",
      "Укладка напольных покрытий в Таллине. Паркет, ламинат, LVT, SPC. Нивелирование, тёплый пол, плинтусы. Гарантированный ровный результат. Все бренды в наличии. Смета бесплатно!"
    ),
    body: lb(
      // ET — 500+ words
      `Põrandakatete paigaldus Tallinnas — parkett, laminaat, vinüülpõrand ja palju muud

Uus põrandakate muudab ruumi täielikult — see on esimene asi, mis silma hakkab, ja see mõjutab nii kodu esteetikat kui ka mugavust igapäevaselt. TorudeAbi24 meeskond on spetsialiseerunud kõikvõimalike põrandakatete professionaalsele paigaldusele Tallinnas ja Harjumaal. Meie paigaldajad tunnevad kõiki materjale, tehnikaid ja tootjate nõudeid, tagades garanteeritud tasase ja vastupidava tulemuse.

Milliseid põrandakatteid paigaldame?

Meie valik hõlmab kõiki populaarsemaid põrandakatteid: tahke parkett (solid wood) — looduslik puit täispaketis, kõige prestiižsem lahendus, mida saab korduvalt lihvida ja lakkida, spoonparkett (engineered parquet) — puidupealmisega mitmekihiline konstruktsioon, sobib ka niiskemate ruumide kõrvale ja põrandaküttele, laminaatpõrand — kulumiskindel kihtpõrand, mis jäljendab puitpõrandat, kivi või betooni ning on hooldusele väga ökonoomne, luksusvinüül (LVT — Luxury Vinyl Tile/Plank) — paindlik veekindel kate, ideaalne vannitubadesse, köökidesse ja lastekambritesse, SPC (Stone Polymer Composite) vinüül — jäigem ja tihedam kui LVT, väga hea dimensionaalne stabiilsus, korkpõrand — looduslik, pehme ja helisoleeriv kate.

Aluspinna ettevalmistus — võti edule

Isegi parim põrandakate ei pea kaua vastu, kui aluspind on ebaühtlane, niiske või ebastabiilne. Meie paigaldusprotsess algab alati põranda seisukorra hindamisega: niiskusmõõtmine (eriti oluline enne puitpõrandate paigaldamist), tasasuse kontroll lati ja nivelliirriga, vajadusel tasandusmörtide (isenivelleervad massid) kandmine, vana kate eemaldamine ja aluspinna puhastamine. Korrektselt ettevalmistatud aluspind tagab, et põrandakate istub tihedalt, ei korise ja ei deformeeru.

Põrandaküte ja ühilduvus

Põrandaküte (elektriarüstus või vesisüsteem) on Eestis üha populaarsem. Mitte kõik põrandakatted ei sobi põrandakütte peale — soojusel on oluline roll materjali valikul. Spoonparkett ja korkparkett sobivad enamiku põrandaküttesüsteemidega, kui temperatuur ei ületa 27°C. Laminaat — paljud tootjad lubavad kombineerimist, kuid soovitame kontrollida konkreetse toote spetsifikatsiooni. LVT ja SPC vinüül — sobivad suurepäraselt põrandaküttega ja on soodsaima soojusjuhtivusega. Tahke parkett — enamasti EI sobi põrandaküttega, kuna paisumine ja kuivamine lõhuvad põrandapinna. Meie meeskond aitab teil valida õige katte just teie põrandaküttesüsteemile.

Plindid, üleminekud ja viimistlus

Professionaalne paigaldus ei lõpe põrandakatega — sama oluline on viimistlus. Paigaldame MDF, PVC ja puidust plintte kõigile põrandatüüpidele. Üleminekuribad erinevate põrandate vahel (nt köök-elutuba) tagavad esteetilise ja turvalise ülemineku. Samuti saame paigaldada künnised ja ukovärvi aluseid, mis täiendavad põranda väljanägemist.

Kõik brändid laos ja kiire tarneaeg

Meie lattu on kogunenud laia valiku populaarsemaid põrandakatteid: Quick-Step, Pergo, Berry Alloc, Balterio, Kahrs, Boen, Tarkett, Gerflor, Forbo, Armstrong jt. Standardsetel juhtudel on materjal saadaval järgmisel tööpäeval, eritellimused saabuvad 5–10 tööpäeva jooksul.

Garantii — tasane põrand on meie lubadus

Kõikidele töödele anname 2-aastase töögarantii. Kui paigaldusjärgse kuue kuu jooksul tekib probleeme (pragud, kohisemine, deformatsioon), tuleme ja kõrvaldame vea tasuta. Enne iga paigaldust täidame töölehe, kus fikseerime aluspinna niiskustaseme ja tasasuse — see kaitseb nii klienti kui ka meid.

Helista meile ja broneeri tasuta ülevaatus põrandale!`,

      // EN — 500+ words
      `Flooring Installation in Tallinn — Parquet, Laminate, Luxury Vinyl and More

A new floor covering completely transforms a room — it is the first thing the eye is drawn to and it influences both the aesthetics and the everyday comfort of a home. The TorudeAbi24 team specialises in the professional installation of all types of flooring across Tallinn and Harjumaa. Our installers know every material, technique and manufacturer requirement, guaranteeing a flat and durable finished result.

Types of flooring we install

Our offering covers all popular floor coverings: solid wood parquet — natural wood through-and-through, the most prestigious solution that can be sanded and lacquered multiple times; engineered parquet — a multi-layer construction with a real wood face layer, suitable for use near slightly damp rooms and over underfloor heating; laminate flooring — highly wear-resistant layered flooring that replicates wood, stone or concrete and is very economical to maintain; luxury vinyl (LVT — Luxury Vinyl Tile/Plank) — a flexible waterproof covering, ideal for bathrooms, kitchens and children's rooms; SPC (Stone Polymer Composite) vinyl — stiffer and denser than LVT with excellent dimensional stability; cork flooring — a natural, soft and acoustically insulating option.

Sub-floor preparation — the key to success

Even the finest floor covering will not last if the sub-floor is uneven, damp or unstable. Our installation process always begins with a sub-floor condition assessment: moisture measurement (critical before any timber floor installation), flatness check with a straight edge and level, application of self-levelling compounds where required, removal of the old covering and sub-floor cleaning. A correctly prepared sub-floor ensures the covering sits tight, does not creak and does not deform.

Underfloor heating and compatibility

Underfloor heating (electric mat or hydronic system) is increasingly popular in Estonia. Not all floor coverings are compatible with underfloor heating — heat plays a key role in material selection. Engineered parquet and cork parquet are compatible with most underfloor heating systems when the temperature does not exceed 27°C. Laminate — many manufacturers permit use with underfloor heating; check the specific product specification. LVT and SPC vinyl — excellent underfloor heating compatibility and the best thermal conductivity values. Solid parquet — generally NOT compatible with underfloor heating because expansion and contraction cycles damage the floor surface. Our team will help you select the right covering for your specific heating system.

Skirting boards, transitions and finishing

Professional installation does not end with the floor covering — finishing is equally important. We fit MDF, PVC and timber skirting boards for all floor types. Transition strips between different floor surfaces (e.g. kitchen to living room) provide an attractive and safe changeover. We can also install thresholds and door bar profiles that complement the finished floor appearance.

All brands stocked, fast delivery

Our warehouse holds a wide selection of the most popular floor coverings: Quick-Step, Pergo, Berry Alloc, Balterio, Kahrs, Boen, Tarkett, Gerflor, Forbo, Armstrong and many more. For standard orders material is available next working day; special orders arrive within 5–10 working days.

Guaranteed flat result — our promise

All works carry a 2-year workmanship guarantee. If any issues arise within six months of installation (cracking, creaking, deformation) we will return and rectify the fault at no charge. Before every installation we complete a site record sheet documenting sub-floor moisture level and flatness — protecting both you and us.

Call us today to book a free flooring survey!`,

      // RU — 500+ words
      `Укладка напольных покрытий в Таллине — паркет, ламинат, виниловые полы и многое другое

Новое напольное покрытие полностью преображает помещение — это первое, что притягивает взгляд, и то, что влияет на эстетику и ежедневный комфорт жилья. Команда TorudeAbi24 специализируется на профессиональной укладке всех видов напольных покрытий по всему Таллину и уезду Харьюмаа. Наши монтажники знают каждый материал, технику и требования производителей, гарантируя ровный и долговечный результат.

Виды напольных покрытий, которые мы укладываем

Наше предложение охватывает все популярные виды напольных покрытий: паркет из массива древесины — натуральное дерево по всей толщине, наиболее престижное решение, которое можно неоднократно шлифовать и лакировать; инженерный паркет — многослойная конструкция с лицевым слоем из натурального дерева, подходит для использования рядом с немного влажными помещениями и под тёплый пол; ламинатное покрытие — высокоизносостойкое слоистое покрытие, имитирующее дерево, камень или бетон, очень экономично в обслуживании; люксовый винил (LVT — Luxury Vinyl Tile/Plank) — гибкое водонепроницаемое покрытие, идеальное для ванных комнат, кухонь и детских; SPC (Stone Polymer Composite) — жёстче и плотнее LVT, с отличной размерной стабильностью; пробковые полы — натуральный, мягкий и звукоизолирующий вариант.

Подготовка основания — ключ к успеху

Даже лучшее напольное покрытие не прослужит долго, если основание неровное, влажное или нестабильное. Наш процесс укладки всегда начинается с оценки состояния основания: измерение влажности (критически важно перед укладкой любого деревянного пола), проверка ровности рейкой и нивелиром, нанесение самовыравнивающихся смесей при необходимости, демонтаж старого покрытия и очистка основания. Правильно подготовленное основание обеспечивает плотное прилегание покрытия, отсутствие скрипа и деформации.

Тёплый пол и совместимость

Тёплый пол (электрический или водяной) становится всё более популярным в Эстонии. Не все напольные покрытия совместимы с системой тёплого пола — тепло играет ключевую роль при выборе материала. Инженерный паркет и пробковый паркет совместимы с большинством систем тёплого пола, если температура не превышает 27°C. Ламинат — многие производители разрешают использование с тёплым полом; рекомендуем проверить характеристики конкретного продукта. LVT и SPC — отличная совместимость с тёплым полом и наилучшие показатели теплопроводности. Паркет из массива — как правило, НЕ совместим с тёплым полом, так как циклы расширения и сжатия повреждают поверхность пола. Наша команда поможет выбрать правильное покрытие именно для вашей системы отопления.

Плинтусы, переходы и отделка

Профессиональная укладка не заканчивается на напольном покрытии — отделка не менее важна. Монтируем плинтусы из МДФ, ПВХ и дерева для всех типов полов. Переходные полосы между различными напольными покрытиями (например, кухня — гостиная) обеспечивают эстетичный и безопасный переход. Также можем установить пороги и профили под двери, дополняющие внешний вид готового пола.

Все бренды в наличии, быстрая доставка

На нашем складе широкий выбор наиболее популярных напольных покрытий: Quick-Step, Pergo, Berry Alloc, Balterio, Kahrs, Boen, Tarkett, Gerflor, Forbo, Armstrong и многие другие. Для стандартных заказов материал доступен на следующий рабочий день; специальные заказы поступают в течение 5–10 рабочих дней.

Гарантия ровного результата — наше обещание

На все работы предоставляем гарантию 2 года. Если в течение шести месяцев после укладки возникнут проблемы (растрескивание, скрип, деформация) — приедем и устраним неисправность бесплатно. Перед каждой укладкой заполняем акт обследования объекта с фиксацией уровня влажности и ровности основания — это защищает и вас, и нас.

Позвоните нам сегодня и запишитесь на бесплатный осмотр пола!`
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
