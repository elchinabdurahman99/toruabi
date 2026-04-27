/**
 * scripts/seed-const-b3.mjs
 * Patches 3 Sanity service documents with full trilingual content (ET/EN/RU),
 * SEO meta, hero image, and gallery image.
 * Run: node --env-file=.env.local scripts/seed-const-b3.mjs
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

  // ── 1. painting-works ─────────────────────────────────────────────────────
  {
    slug: "painting-works",
    kw1: "interior painting walls professional",
    kw2: "painter decorator walls ceiling",
    imageAlt: ls(
      "Professionaalne siseviimistlus — seinadvärvimine Tallinnas",
      "Professional interior painting — walls and ceilings in Tallinn",
      "Профессиональная окраска стен и потолков в Таллине"
    ),
    galleryAlt: ls(
      "Maaler viimistleb seinu ja lakke Tallinna korteris",
      "Painter finishing walls and ceiling in a Tallinn apartment",
      "Маляр отделывает стены и потолок в квартире в Таллине"
    ),
    shortDesc: lt(
      "Teostame sise- ja välisvärvimistöid Tallinnas — seinad, laed, puitpinnad, fassaadid. Kvaliteetsed värvid (Tikkurila, Caparol, Dulux), hoolikas ettevalmistus ja värvikonsultatsioon. Garanteeritud tulemus.",
      "We carry out interior and exterior painting in Tallinn — walls, ceilings, woodwork, facades. Top-quality paints (Tikkurila, Caparol, Dulux), careful preparation and colour consultation. Guaranteed results.",
      "Выполняем внутренние и наружные малярные работы в Таллине — стены, потолки, деревянные поверхности, фасады. Качественные краски (Tikkurila, Caparol, Dulux), тщательная подготовка, цветовая консультация. Гарантия."
    ),
    metaTitle: ls(
      "Värvimistööd Tallinnas | Tikkurila, Caparol, garantii",
      "Painting Works Tallinn | Tikkurila Caparol Dulux Guaranteed",
      "Малярные работы Таллин | Tikkurila Caparol гарантия"
    ),
    metaDesc: lt(
      "Professionaalsed värvimistööd Tallinnas ja Harjumaal. Seinad, laed, puitpinnad, fassaad. Tikkurila, Caparol, Dulux. Ettevalmistus, värvimine, garantii. Tasuta hinnapakkumine!",
      "Professional painting works in Tallinn and Harjumaa. Walls, ceilings, woodwork, facades. Tikkurila, Caparol, Dulux paints. Surface prep, painting, guarantee. Free quote today!",
      "Профессиональные малярные работы в Таллине и Харьюмаа. Стены, потолки, дерево, фасад. Tikkurila, Caparol, Dulux. Подготовка, покраска, гарантия. Бесплатная смета!"
    ),
    body: lb(
      // ET — 500+ words
      `Värvimistööd Tallinnas — sise- ja välisviimistlus professionaalselt

Kvaliteetne värvimine on üks olulisimaid viimistlustöid, mis mõjutab nii ruumi välimust kui ka kinnisvara väärtust. TorudeAbi24 meeskond on tegelenud professionaalsete värvimistöödega aastaid, teenindades eramuid, kortereid, äriruume ja tootmishooneid kogu Tallinnas ja Harjumaal. Meie eesmärk on tagada, et iga pinnameetri värvimine vastaks kõrgeimatele standarditele — alates ettevalmistusest kuni viimase pintslihoobini.

Milliseid pindu värvime?

Meie kompetents hõlmab laia valikut viimistluspindu: siseruumide seinad ja laed (korterid, eramud, kontorid, koolid, haiglad), puitpinnad siseruumides (uksed, aknaraamid, põrandapiirded, trepisammud), metallist pinnad (trepikäsipuud, konstruktsioonid, torustik), fassaadid ja välisseinad (krohv, tsemendikiud, puit, metall, betoon), trepikojad, keldriruum ja kõrvalruumid. Töötame nii uute ehitiste viimistlemisel kui ka olemasolevate pindade renoveerimiseks.

Kasutatavad värvid ja materjalid

Kasutame ainult kõrgeima kvaliteediga värvimissüsteeme tuntud tootjatelt: Tikkurila (Soome — üks Euroopa juhtivaid värvitootjaid), Caparol (Saksa kõrgkvaliteediga fassaadi- ja sisetöövärvid), Dulux (rahvusvaheline bränd professionaalsele kasutusele). Igale tööle valime sobiva värvitüübi — akrüülalusel, lateksi- või emailipõhised tooted — lähtudes pinna materjalist, kasutusintensiivsusest ja kliendi eelistustest. Fassaaditöödel kasutame ilmastikukindlaid, UV-stabiilseid ja veekindlaid värvikatteid.

Pinna ettevalmistus — alus hea tulemusele

Pinna ettevalmistus on värvimise juures sama oluline kui värvimine ise. Meie protsess hõlmab: vana värvi- või tapeedijäänuste eemaldamist, pragude ja aukude pahteldamist (Tikkurila, Knauf või samaväärne toode), lihvimist ja pühkimist, kruntimist (primer) parema nakkuvuse tagamiseks. Töötame tolmuvabalt — kasutame lihvimisel tolmuimejaga seotud masinaid, mis hoiab tööpinna puhta ja kaitseb mööblit ning põrandaid.

Värvikonsultatsioon — leiame teie maja stiilile sobiva lahenduse

Paljud kliendid ei tea, milline värv või toon sobib nende kodule kõige paremini. Meie meeskond pakub värvikonsultatsiooni, mille käigus uurime teie ruumi valgustust, stiili ja olemasolevat mööblit ning soovitame sobivaid toone. Kasutame Tikkurila ja Caparol värvikaarte ning saame tellida peaaegu iga tooni vastavalt kliendi soovile.

Trepikojad, fassaadid ja eriülesanded

Trepikodade värvimine nõuab erilist lähenemist — töötame kitsastes tingimustes, sageli ajal, mil hoone elanikud on sees. Kasutame professionaalseid kaitsekatteid põrandatele ja akendele, töötame kiiresti ja minimaalsete häiringutega. Fassaadivärvimisel kasutame vajadusel tellinguid, kõrguste tõsteseadmeid või gondleid ning järgime rangelt tööohutuse nõudeid.

Garantii ja järelhooldus

Kõikidele värvimistöödele anname vähemalt 2-aastase töögarantii. Kasutame tooteid, mille garantii ulatub 5–10 aastani (sõltuvalt värvitüübist ja pinna töötlusest). Töö lõpus anname kliendile ülevaate kasutatud materjalidest, et tulevased remonditööd oleksid lihtsad.

Tallinn, Harjumaa, paindlik ajakava — helista meile juba täna

Töötame kogu Tallinnas, Viimsis, Maardus, Saues, Keilas ja mujal Harjumaal. Pakume paindlikku töögraafikut, sealhulgas nädalavahetustel. Esmane konsultatsioon ja hinnapakkumine on kõikidele klientidele täiesti tasuta. Värvimistööd Tallinnas — usaldusväärne tulemus, soodne hind.`,

      // EN — 500+ words
      `Painting Works in Tallinn — Interior and Exterior Finishing Done Right

High-quality painting is one of the most important finishing tasks that directly affects both the look of a space and the value of a property. The TorudeAbi24 team has been delivering professional painting services for years, working in private homes, apartments, office spaces and industrial buildings across Tallinn and Harjumaa. Our goal is to ensure that every square metre we paint meets the highest standards — from preparation through to the very last brushstroke.

What surfaces do we paint?

Our expertise covers a wide range of surfaces: interior walls and ceilings (apartments, houses, offices, schools, healthcare facilities), interior woodwork (doors, window frames, skirting boards, staircase treads), metal surfaces (stair railings, structural elements, pipework), facades and external walls (render, fibre cement, timber, metal, concrete), stairwells, basement rooms and utility spaces. We work on both new-build finishing and renovation of existing surfaces.

Paints and materials we use

We use only the highest quality paint systems from leading manufacturers: Tikkurila (Finland — one of Europe's leading paint producers), Caparol (German high-quality facade and interior paints), Dulux (international brand for professional use). For each project we select the appropriate paint type — acrylic, latex or enamel-based — based on the surface material, intensity of use and the client's preferences. For facade work we use weather-resistant, UV-stable and waterproof coating systems.

Surface preparation — the foundation of a good result

Surface preparation is just as important as the painting itself. Our process includes: stripping old paint or wallpaper residues, filling cracks and holes with professional filler (Tikkurila, Knauf or equivalent), sanding and cleaning, and priming for improved adhesion. We work dust-free — our sanding machines are connected to dust extractors, keeping the work area clean and protecting furniture and floors.

Colour consultation — finding the perfect palette for your home

Many clients are unsure which colour or shade suits their home best. Our team offers a colour consultation service where we analyse the lighting conditions, style and existing furnishings of your space and recommend suitable tones. We use Tikkurila and Caparol colour cards and can mix almost any shade to the client's specification.

Stairwells, facades and special projects

Stairwell painting requires a particular approach — we work in confined conditions, often while residents are still in the building. We use professional protective coverings on floors and windows, work efficiently and cause minimal disruption. For facade work we use scaffolding, access platforms or gondolas as required, and strictly follow all working-at-height safety regulations.

Guarantee and aftercare

We provide a minimum 2-year workmanship guarantee on all painting work. The products we use carry manufacturer guarantees of 5–10 years depending on paint type and surface treatment. At the end of the job we give the client a summary of all materials used so that any future touch-up work is straightforward.

Tallinn and Harjumaa — flexible schedule, free quote

We serve all of Tallinn, Viimsi, Maardu, Saue, Keila and surrounding Harjumaa communities. We offer a flexible work schedule including weekends. Initial consultation and a written quote are completely free for all clients. Painting works in Tallinn — reliable results, competitive pricing.`,

      // RU — 500+ words
      `Малярные работы в Таллине — внутренняя и внешняя отделка профессионально

Качественная покраска — одна из важнейших отделочных работ, которая напрямую влияет как на внешний вид помещения, так и на стоимость недвижимости. Команда TorudeAbi24 занимается профессиональными малярными работами уже много лет, работая в частных домах, квартирах, офисных и производственных помещениях по всему Таллину и уезду Харьюмаа. Наша цель — обеспечить, чтобы каждый квадратный метр, который мы красим, соответствовал высочайшим стандартам — от подготовки до последнего мазка кисти.

Какие поверхности мы красим?

Наша компетенция охватывает широкий спектр поверхностей: внутренние стены и потолки (квартиры, дома, офисы, школы, медицинские учреждения), деревянные поверхности в интерьере (двери, оконные рамы, плинтусы, ступени), металлические поверхности (перила лестниц, конструкции, трубопроводы), фасады и наружные стены (штукатурка, фиброцемент, дерево, металл, бетон), лестничные клетки, подвалы и подсобные помещения. Работаем как при отделке новостроек, так и при реновации существующих поверхностей.

Краски и материалы, которые мы используем

Применяем только высококачественные лакокрасочные системы ведущих производителей: Tikkurila (Финляндия — один из ведущих производителей красок в Европе), Caparol (немецкие высококачественные краски для фасадов и интерьеров), Dulux (международный бренд для профессионального использования). Для каждого проекта выбираем подходящий тип краски — на акриловой, латексной или эмалевой основе — исходя из материала поверхности, интенсивности эксплуатации и предпочтений клиента. При фасадных работах используем атмосферостойкие, УФ-стабильные и водостойкие покрытия.

Подготовка поверхности — основа хорошего результата

Подготовка поверхности не менее важна, чем сама покраска. Наш процесс включает: удаление старой краски или остатков обоев, шпаклёвку трещин и отверстий профессиональными составами (Tikkurila, Knauf или аналог), шлифовку и очистку, грунтование для улучшения адгезии. Работаем без пыли — наши шлифовальные машины подключены к пылесосам, что позволяет поддерживать чистоту рабочей зоны и защищать мебель и полы.

Цветовая консультация — найдём идеальную палитру для вашего дома

Многие клиенты не знают, какой цвет или оттенок лучше всего подойдёт их дому. Наша команда предлагает услугу цветовой консультации: анализируем освещение, стиль и существующую обстановку вашего помещения и рекомендуем подходящие тона. Используем карты цветов Tikkurila и Caparol и можем смешать практически любой оттенок по желанию клиента.

Лестничные клетки, фасады и специальные проекты

Покраска лестничных клеток требует особого подхода — работаем в стеснённых условиях, нередко пока жильцы здания находятся внутри. Используем профессиональные защитные покрытия для полов и окон, работаем быстро и с минимальными помехами. При фасадных работах применяем леса, подъёмные платформы или люльки, строго соблюдая все требования техники безопасности при работе на высоте.

Гарантия и послепродажное обслуживание

На все малярные работы предоставляем гарантию не менее 2 лет. Используемые материалы имеют гарантию производителя 5–10 лет в зависимости от типа краски и обработки поверхности. По завершении работ передаём клиенту перечень использованных материалов, чтобы любой будущий ремонт был простым.

Таллин и Харьюмаа — гибкий график, бесплатная смета

Обслуживаем весь Таллин, Виймси, Маарду, Сауэ, Кейла и окружающие районы Харьюмаа. Предлагаем гибкий рабочий график, включая выходные дни. Первичная консультация и письменная смета — бесплатно для всех клиентов. Малярные работы в Таллине — надёжный результат, конкурентная цена.`
    ),
  },

  // ── 2. tiling-works ───────────────────────────────────────────────────────
  {
    slug: "tiling-works",
    kw1: "tiling ceramic tiles bathroom floor",
    kw2: "tile laying professional tiler",
    imageAlt: ls(
      "Professionaalne plaatimine — vannituba ja põrand Tallinnas",
      "Professional tiling — bathroom and floor tiles in Tallinn",
      "Профессиональная укладка плитки — ванная и пол в Таллине"
    ),
    galleryAlt: ls(
      "Plaatija paigaldab keraamilisi plaate vannituppa",
      "Tiler laying ceramic tiles in a bathroom Tallinn",
      "Плиточник укладывает керамическую плитку в ванной, Таллин"
    ),
    shortDesc: lt(
      "Plaatimistööd Tallinnas — vannitoad, köögid, koridorid, põrandad, seinad, fassaadid. Kõik formaadid mosaiigist 120×120 cm plaatideni, keerukad mustrid, veekindel liim ja epoksüüdivuuk. Garanteeritud joondus.",
      "Tiling works in Tallinn — bathrooms, kitchens, hallways, floors, walls, facades. All formats from small mosaic to 120×120 cm slabs, complex patterns, waterproof adhesive, epoxy grout, perfect alignment guaranteed.",
      "Плиточные работы в Таллине — ванные, кухни, коридоры, полы, стены, фасады. Все форматы от мозаики до плит 120×120 см, сложные узоры, водостойкий клей, эпоксидная затирка, идеальная выравнивание гарантировано."
    ),
    metaTitle: ls(
      "Plaatimistööd Tallinnas | Kõik formaadid, garantii",
      "Tiling Works Tallinn | All Formats Epoxy Grout Guaranteed",
      "Плиточные работы Таллин | Все форматы, эпоксидная затирка"
    ),
    metaDesc: ls(
      "Professionaalsed plaatimistööd Tallinnas. Vannituba, köök, põrand, sein. Mosaiigist suure formaadini. Veekindel liim, epoksüüdivuuk, täpne joondus. Tasuta hinnapakkumine!",
      "Professional tiling works in Tallinn. Bathroom kitchen floor wall. Mosaic to large format. Waterproof adhesive, epoxy grout, perfect alignment. Free quote today!",
      "Профессиональная укладка плитки в Таллине. Ванная, кухня, пол, стена. От мозаики до крупного формата. Водостойкий клей, эпоксидная затирка, точность. Бесплатная смета!"
    ),
    body: lb(
      // ET — 500+ words
      `Plaatimistööd Tallinnas — täpne, veekindel ja kestev tulemus

Plaatimine on üks kõrgeima kvaliteedinõudega viimistlustöödest, kus väikseim viga aluspinna ettevalmistuses või plaadi joonduses võib tulevikus põhjustada tõsiseid probleeme — niiskuskahjustusi, plaatide lahtimuljumist või vuukide hallitust. TorudeAbi24 plaatijad on töötanud erinevate formaatide, materjalide ja keerukate mustritega aastaid ning tagavad, et iga plaaditud pind on täpne, veekindel ja kestev.

Kus me plaatime?

Meie meeskond teostab plaatimistöid järgmistes objektides ja piirkondades: vannitoad (seina- ja põrandaplaadid, dušikabiin, vann, pesemisala), köögid (põrandaplaadid, põrandaliistud, tagasein ehk splashback), koridorid ja esikud, elutoade ja magamistubade põrandad (suureformaadilised plaadid), äri- ja bürooruumide põrandad, välisfassaadid ja terrassid. Töötame nii uute ehitiste viimistlemisel kui ka olemasolevate pindade renoveerimiseks.

Milliseid materjale kasutame?

Meie professionaalid kasutavad plaadiliimisid ja vuukimismasse tuntud tootjatelt nagu Mapei, Kerakoll, Weber ja Knauf. Iga pinna ja plaadiformaadi jaoks valime õige liimi: elastse liimi deformatsioonile vastuvõtlike alusvõrreldes (küttepõrand, puitkarkass), veekindla liimi niiskusega kokkupuutuvatele aladele (vannituba, saun, köök), cementliimi suureformaadiliste plaatide jaoks (120×60 cm, 120×120 cm), epoksüüdiliimi eriti nõudlike tingimuste jaoks.

Kõik plaadiformaadid ja mustrid

Töötame kõigi tuntud plaadiformaatidega: väikesed mosaiikplaadid (2×2 cm, 5×5 cm), traditsioonilised formaadid (20×20, 30×30, 30×60 cm), keskmised formaadid (60×60, 60×120 cm), suured plaadid (80×80, 120×60, 120×120 cm), looduski (kivi, marmor, travertin, klinker). Lisaks teostame keerukaid mustreid: kahurpaigutus (herringbone / v-kuju), ristpaigutus, diagonaalpaigutus, 3D-muster, mosaiikpaneelid.

Veekindlus ja vuukimine

Niiskusega kokkupuutuvatel aladel (vannituba, saun, välisterrass) teostame kõigepealt märgala hüdroisolatsiooni vastavalt standardile EVS-EN 14891 — see on kohustuslik samm, mis tagab, et niiskus ei tungi plaadialuse konstruktsiooni. Vuukimiseks kasutame vastavalt objektile tsemendibaasil vuukimismassi (kerge hooldus, suur valik toone) või epoksüüdivuuki (kõrge kemikaali- ja niiskuskindlus, hügieenitöödele ideaalne — restoranid, haiglad, vannitoad).

Täpne joondus ja tasasuse kontroll

Iga meie plaatija kasutab lasernivelliirist juhtjoone, millel põhinedes tagame ideaalse joonduse nii horisontaal- kui ka vertikaalsuunas. Suureformaadiliste plaatide paigaldamisel kasutame avamistarkvara nivelleerimissüsteeme (plaadikiilud + klamber), mis välistavad plaatide servade erinevad kõrgused (nn lipendamine). Töö tulemus on pind, mis ei vaja pärast remontimist tasandustöid.

Põrandakütte integreerimine

Juhul kui klient soovib elektrilist põrandakütet, paigaldame küttematritsid enne plaatide paigaldamist ja tagame, et liim ja plaadid sobivad küttepõrandaga. Oleme tuttavad Devi, Nuheat ja Warmup süsteemidega.

Garantii ja hooldus

Kõikidele plaatimistöödele anname 2-aastase garantii. Kvaliteetsed plaadid ja korrektselt paigaldatuna kestavad 20–30 aastat ja rohkemgi. Soovi korral nõustame, kuidas plaate pesta ja hooldada, et vuugid püsiksid pikalt puhtad.

Tallinn, Harjumaa — tasuta ülevaatus ja hinnapakkumine. Helista meile juba täna.`,

      // EN — 500+ words
      `Tiling Works in Tallinn — Precise, Waterproof and Lasting Results

Tiling is one of the most quality-demanding finishing trades, where even the smallest flaw in substrate preparation or tile alignment can cause serious problems later — moisture damage, tiles popping off or mould in grout joints. The TorudeAbi24 tilers have been working with a wide range of formats, materials and complex patterns for many years, and they guarantee that every tiled surface is precise, waterproof and built to last.

Where do we tile?

Our team carries out tiling in the following locations and areas: bathrooms (wall and floor tiles, shower enclosures, baths, wet rooms), kitchens (floor tiles, plinths, splashbacks), hallways and entrance areas, living room and bedroom floors (large-format tiles), commercial and office floors, exterior facades and terraces. We work on both new-build finishing and renovation of existing surfaces.

Materials and adhesives we use

Our professionals use tile adhesives and grouts from leading manufacturers including Mapei, Kerakoll, Weber and Knauf. For every surface and tile format we select the right product: flexible adhesive for substrates subject to movement (underfloor heating, timber subframes), waterproof adhesive for areas in contact with moisture (bathroom, sauna, kitchen), heavy-duty cement adhesive for large-format tiles (120×60 cm, 120×120 cm), and epoxy adhesive for particularly demanding conditions.

All formats and patterns

We work with all common tile formats: small mosaic tiles (2×2 cm, 5×5 cm), traditional formats (20×20, 30×30, 30×60 cm), medium formats (60×60, 60×120 cm), large slabs (80×80, 120×60, 120×120 cm), and natural stone (stone, marble, travertine, clinker). We also execute complex patterns: herringbone (V-shape), stretcher bond, diagonal lay, 3D effects, and mosaic panels.

Waterproofing and grouting

In areas exposed to moisture (bathrooms, saunas, outdoor terraces) we first apply a tanking membrane to the wet area in accordance with EVS-EN 14891 — this is a mandatory step that ensures moisture cannot penetrate the substrate behind the tiles. For grouting we select either cement-based grout (easy maintenance, wide colour range) or epoxy grout (high chemical and moisture resistance, ideal for hygienic environments such as restaurants, hospitals and wet rooms), depending on the project requirements.

Precise alignment and levelness control

Every tiler on our team uses a laser level baseline to ensure perfect alignment both horizontally and vertically. For large-format tiles we use open-edge levelling systems (tile clips and wedges), which eliminate lippage between tile edges. The finished surface requires no levelling work after completion.

Underfloor heating integration

If the client requires electric underfloor heating, we install the heating mats before laying tiles and ensure the adhesive and tiles are compatible with the heating system. We are familiar with Devi, Nuheat and Warmup systems.

Guarantee and maintenance advice

We provide a 2-year workmanship guarantee on all tiling work. Quality tiles that are correctly installed will last 20–30 years or more. On request we advise on cleaning and maintenance to keep grout joints looking clean for years.

Tallinn and Harjumaa — free inspection and quote. Call us today.`,

      // RU — 500+ words
      `Плиточные работы в Таллине — точный, водостойкий и долговечный результат

Укладка плитки — одна из наиболее требовательных к качеству отделочных работ, где малейший дефект в подготовке основания или выравнивании плитки может в будущем привести к серьёзным проблемам: повреждениям от влаги, отставанию плитки или появлению плесени в швах. Плиточники TorudeAbi24 работают с различными форматами, материалами и сложными узорами уже много лет и гарантируют, что каждая облицованная поверхность будет точной, водостойкой и долговечной.

Где мы выполняем плиточные работы?

Наша команда выполняет плиточные работы в следующих объектах: ванные комнаты (настенная и напольная плитка, душевые кабины, ванны, мокрые зоны), кухни (напольная плитка, плинтусы, фартук), коридоры и прихожие, полы в гостиных и спальнях (крупноформатная плитка), коммерческие и офисные полы, наружные фасады и террасы. Работаем как при отделке новостроек, так и при реновации существующих поверхностей.

Материалы и клеи, которые мы используем

Наши специалисты применяют клеи и затирочные смеси ведущих производителей: Mapei, Kerakoll, Weber, Knauf. Для каждой поверхности и формата плитки подбираем правильный состав: эластичный клей для оснований, подверженных деформациям (тёплый пол, деревянный каркас), водостойкий клей для зон, контактирующих с влагой (ванная, сауна, кухня), усиленный цементный клей для крупноформатной плитки (120×60 см, 120×120 см), эпоксидный клей для особо требовательных условий.

Все форматы и рисунки

Работаем со всеми распространёнными форматами плитки: мелкая мозаика (2×2 см, 5×5 см), традиционные форматы (20×20, 30×30, 30×60 см), средние форматы (60×60, 60×120 см), крупные плиты (80×80, 120×60, 120×120 см), натуральный камень (камень, мрамор, травертин, клинкер). Также выполняем сложные узоры: «ёлочка» (herringbone), кирпичная кладка, диагональная укладка, 3D-эффекты, мозаичные панно.

Гидроизоляция и затирка

В зонах, подвергающихся воздействию влаги (ванные комнаты, сауны, открытые террасы), сначала выполняем гидроизоляцию мокрой зоны в соответствии со стандартом EVS-EN 14891 — это обязательный этап, обеспечивающий защиту конструкции от проникновения влаги под плитку. Для затирки швов выбираем цементную затирку (лёгкий уход, большой выбор оттенков) или эпоксидную затирку (высокая химическая и влагостойкость, идеальна для гигиенических объектов — ресторанов, больниц, ванных комнат) в зависимости от требований проекта.

Точное выравнивание и контроль горизонтальности

Каждый наш плиточник использует лазерный нивелир для создания базовой линии, обеспечивая идеальное выравнивание как по горизонтали, так и по вертикали. При укладке крупноформатной плитки применяем открытые нивелирующие системы (клипсы и клинья), которые исключают разнобой краёв плитки (так называемый «порог»). Готовая поверхность не требует дополнительных выравнивающих работ.

Интеграция с тёплым полом

Если клиент желает установить электрический тёплый пол, монтируем нагревательные маты до укладки плитки и обеспечиваем совместимость клея и плитки с системой обогрева. Знакомы с системами Devi, Nuheat и Warmup.

Гарантия и советы по уходу

На все плиточные работы предоставляем гарантию 2 года. Качественная плитка при правильной укладке служит 20–30 лет и дольше. По запросу даём рекомендации по уходу и чистке, чтобы швы оставались чистыми долгие годы.

Таллин и Харьюмаа — бесплатный осмотр и смета. Звоните нам сегодня.`
    ),
  },

  // ── 3. roofing-works ──────────────────────────────────────────────────────
  {
    slug: "roofing-works",
    kw1: "roofing repair renovation roof",
    kw2: "roof installation tiles metal flat",
    imageAlt: ls(
      "Katustetööd Tallinnas — lame- ja kaldkatuse paigaldus",
      "Roofing works in Tallinn — flat and pitched roof installation",
      "Кровельные работы в Таллине — монтаж плоской и скатной кровли"
    ),
    galleryAlt: ls(
      "Metallkatus ja vihmaveerennid Tallinna eramajas",
      "Metal roof and guttering on a private house in Tallinn",
      "Металлическая кровля и водосточная система на частном доме в Таллине"
    ),
    shortDesc: lt(
      "Katustetööd Tallinnas — lamekatused (bituumen, TPO membraan, EPDM), kaldkatused (metallplaat, kivi, ardees), katuse remont, soojustuse uuendus, vihmaveerennid ja luugid. Eesti ilmastikule vastupidav, garanteeritud.",
      "Roofing works in Tallinn — flat roofs (bitumen, TPO membrane, EPDM), pitched roofs (metal sheet, tile, slate), roof repairs, insulation upgrade, guttering and downpipes, dormer windows. Estonian weather-proof, guaranteed.",
      "Кровельные работы в Таллине — плоские кровли (битум, ТПО мембрана, EPDM), скатные кровли (металлолист, черепица, сланец), ремонт кровли, утепление, водостоки и слуховые окна. Выдерживает эстонский климат, гарантия."
    ),
    metaTitle: ls(
      "Katustetööd Tallinnas | Lame- ja kaldkatus, garantii",
      "Roofing Works Tallinn | Flat Pitched Roof Repair Warranty",
      "Кровельные работы Таллин | Плоская скатная кровля гарантия"
    ),
    metaDesc: lt(
      "Professionaalsed katustetööd Tallinnas. Lamekatused (bituumen, TPO, EPDM), kaldkatused (metall, kivi), remont, soojustus, vihmaveerennid. Eesti ilmastikukindel, garantii. Tasuta hinnapakkumine!",
      "Professional roofing works in Tallinn. Flat roofs (bitumen TPO EPDM), pitched roofs (metal tile slate), repair, insulation, guttering. Wind and snow rated. Guarantee. Free quote!",
      "Профессиональные кровельные работы в Таллине. Плоские кровли (битум ТПО ЭПДМ), скатные (металл черепица сланец), ремонт, утепление, водостоки. Устойчивость к ветру и снегу. Гарантия. Смета бесплатно!"
    ),
    body: lb(
      // ET — 500+ words
      `Katustetööd Tallinnas — professionaalne, ilmastikukindel ja garanteeritud

Tallinna ja Harjumaa ilmastik seab katusele kõrged nõudmised — lumi, tugev tuul, vihm, sulamine ja külmumine vahelduvad aasta läbi. Vale katusekate või puudulik paigaldus toob kaasa niiskuskahjustusi, soojuskaotust ja ehituskonstruktsiooni lagunemist. TorudeAbi24 meeskond on spetsialiseerunud professionaalsetele katustetöödele, pakkudes lamekatuste, kaldkatuste, katuse remontide ja vihmaveesüsteemide paigaldust Tallinnas, Harjumaal ja lähikonnas.

Lamekatused — bituumen, TPO membraan, EPDM

Lamekatuse ehitamisel pakume järgmisi katmislahendusi: bituumenmembraanid (kahekihiline kuumhegeldatud süsteem, klassikaline ja usaldusväärne, vähemalt 25-aastane eluiga), TPO termoplastiline polyolefiin-membraan (valge pinnavärviga, suurepärane UV-kiirguskindlus, keskkonnasõbralik, kuni 30-aastane eluiga), EPDM kummimembraan (elastne, ideaalne keeruliste geomeetriliste katusevormide jaoks, külmakindel kuni -45°C). Kõikide lamekatussüsteemide puhul teostame eelnevalt soojustuse (PIR/EPS plaadid), aurutõkke ja kallaku planeerimise (minimaalne 2-kraadine kallak veenõristamiseks).

Kaldkatused — metallplaat, kivi, ardees

Kaldkatuste puhul töötame järgmiste materjalidega: profileeritud metallplaat (terasest kuumtsingitud, erinevad profiilid, laia värvivalikuga, soe ja kestev lahendus), betoon- ja savikatusekivid (klassikaline ilme, pikk eluiga, väike hooldus), ardees (looduslik kivimaterjal, kõrgklassi lahendus, suurepärane ilmastikukindlus), bituumenšinglid (paindlik materjal, sobib erinevatele katusekujudele, soodne hind). Kaldkatuse paigaldamisel pöörame erilist tähelepanu roovitusele, tuulutusele ja räästasõlmedele, mis on Eesti kliimas kriitilised.

Katuse remont ja vurkimine

Palju paremini on lahendada probleemid varakult, mitte oodata täielikku lagunemisel. Meie meeskond teostab: üksikute membraanide lappimist ja ketaste kinnitamist, katuseplaatide vahetamist, räästade ja vihmaveerenni parandamist, räästade ventilatsiooni taastamist, katuselapi vurkimist ja hüdroisolatsiooni taastamist.

Soojustuse uuendus

Vana katuse soojustus on sageli vananenud, märgunud või ebapiisava paksusega. Soojustuse uuendamise käigus eemaldame vana materjali, paigaldame uue soojustuse (PIR, EPS, mineraalvill), aurutõkke ja katmissüsteemi. Uus soojustus vähendab oluliselt kütte- ja jahutuskulusid.

Vihmaveerennid ja äravoolud

Korralik vihmaveesüsteem on katuselahenduse lahutamatu osa. Paigaldame alumiiniumist, terasest ja plastikust renne ning äravoolutorustikke. Töötame Ruukki, Lindab, Ventin ja teiste tunnustatud tootjate vihmaveesüsteemidega.

Luugid ja katuseaknad

Paigaldame ja remontime katuseluuke (hooldus- ja põgenemisluugid), katuseaknaid (Velux, Roto, Fakro) ning dormeraknaid. Jälgime, et kõik avad oleksid korralikult hüdroisoleeritud.

Tallinn, Harjumaa — garantii, tasuta ülevaatus

Kõikidele katustetöödele anname vähemalt 2-aastase töögarantii. Kasutatud materjalid on Eesti ilmastiku jaoks sertifitseeritud. Esmane ülevaatus ja hinnapakkumine on tasuta. Helista meile — kogenud katusemeister tuleb kohale ja hindab katuse seisukorda ning annab ausad soovitused.`,

      // EN — 500+ words
      `Roofing Works in Tallinn — Professional, Weather-Proof and Guaranteed

The climate in Tallinn and Harjumaa places high demands on roofing — snow loads, strong winds, rain, freeze-thaw cycles and UV radiation alternate throughout the year. A wrong roof covering or poor installation results in moisture damage, heat loss and deterioration of the building structure. The TorudeAbi24 team specialises in professional roofing works, offering flat roof systems, pitched roofs, roof repairs, insulation upgrades and guttering installation across Tallinn, Harjumaa and the surrounding area.

Flat roofs — bitumen, TPO membrane, EPDM

For flat roof construction we offer the following covering solutions: bitumen membranes (two-layer hot-welded system, proven and reliable, minimum 25-year service life), TPO thermoplastic polyolefin membrane (white reflective surface, excellent UV resistance, environmentally friendly, up to 30-year service life), EPDM rubber membrane (flexible, ideal for complex roof geometries, frost-resistant down to -45°C). All flat roof systems include preparatory work on insulation (PIR/EPS boards), vapour barrier and fall planning (minimum 2-degree fall for drainage).

Pitched roofs — metal sheet, tile, slate

For pitched roofs we work with the following materials: profiled steel sheet (hot-dip galvanised, various profiles, wide colour choice, durable long-life solution), concrete and clay roof tiles (classic appearance, long service life, minimal maintenance), natural slate (premium material, excellent weather resistance), bitumen shingles (flexible material suitable for various roof shapes, competitive price). In pitched roof installation we pay particular attention to battening, ventilation and eave details, which are critical in the Estonian climate.

Roof repairs and maintenance

It is far better to address problems early than to wait for full failure. Our team carries out: patching and re-securing single membrane sections, replacing broken or slipped tiles, repairing fascias and guttering, restoring eave ventilation, re-sealing and re-waterproofing roof sections.

Insulation upgrade

Old roof insulation is often aged, moisture-laden or insufficient in thickness. Our insulation upgrade service involves removing old material, installing new insulation (PIR, EPS, mineral wool), vapour barrier and the covering system. New insulation significantly reduces heating and cooling costs.

Guttering and drainage systems

A proper rainwater system is an integral part of any roofing solution. We install aluminium, steel and plastic gutters and downpipes. We work with Ruukki, Lindab, Ventin and other leading gutter system manufacturers.

Hatches and roof windows

We install and repair roof access hatches (maintenance and escape hatches), roof windows (Velux, Roto, Fakro) and dormer windows. We ensure that all openings are properly waterproofed.

Wind and snow load rated for Estonian conditions

All materials and systems we select are appropriate for the Estonian climate: rated for wind loads up to zone IV (270 km/h gust equivalent), tested for snow loads in accordance with Estonian standards, UV-stable and frost-resistant. We follow the requirements of EVS-EN 14783 (profiled metal sheet) and EVS-EN 13707 (bitumen membranes).

Tallinn and Harjumaa — guarantee, free inspection

We provide a minimum 2-year workmanship guarantee on all roofing work. Materials used are certified for the Estonian climate. Initial inspection and quotation are free of charge. Call us — an experienced roofer will visit your property, assess the condition of the roof and give you honest recommendations.`,

      // RU — 500+ words
      `Кровельные работы в Таллине — профессионально, устойчиво к климату, с гарантией

Климат Таллина и Харьюмаа предъявляет высокие требования к кровле — снеговые нагрузки, сильный ветер, дождь, циклы замерзания-оттаивания и ультрафиолетовое излучение чередуются круглый год. Неправильное кровельное покрытие или некачественный монтаж приводят к повреждениям от влаги, теплопотерям и разрушению строительных конструкций. Команда TorudeAbi24 специализируется на профессиональных кровельных работах: плоские кровельные системы, скатные кровли, ремонт кровли, обновление утепления, монтаж водостоков по всему Таллину, Харьюмаа и прилегающим районам.

Плоские кровли — битум, ТПО мембрана, EPDM

Для устройства плоской кровли предлагаем следующие решения: битумные мембраны (двухслойная система горячей сварки, проверенная и надёжная, минимальный срок службы 25 лет), ТПО термопластичная полиолефиновая мембрана (белая отражающая поверхность, отличная устойчивость к УФ-излучению, экологичность, срок службы до 30 лет), EPDM резиновая мембрана (эластичная, идеальна для кровель сложной геометрии, морозостойкость до -45°C). Все системы плоских кровель включают предварительную работу по утеплению (плиты PIR/EPS), пароизоляции и планированию уклонов (минимальный уклон 2 градуса для водоотведения).

Скатные кровли — металлолист, черепица, сланец

При устройстве скатных кровель работаем со следующими материалами: профилированный стальной лист (горячеоцинкованный, различные профили, широкий выбор цветов, долговечное решение), бетонная и керамическая черепица (классический внешний вид, большой срок службы, минимальное обслуживание), натуральный сланец (премиальный материал, отличная атмосферостойкость), битумная черепица (гибкий материал для кровель различной формы, конкурентная цена). При монтаже скатных кровель уделяем особое внимание обрешётке, вентиляции и узлам карнизов, которые критически важны в условиях эстонского климата.

Ремонт и техническое обслуживание кровли

Намного лучше решать проблемы заблаговременно, не дожидаясь полного разрушения. Наша команда выполняет: заплатку и повторное крепление отдельных участков мембраны, замену сломанной или сдвинувшейся черепицы, ремонт карнизных свесов и водостоков, восстановление вентиляции карнизов, повторную герметизацию и гидроизоляцию участков кровли.

Обновление утепления

Старая кровельная изоляция часто устарела, намокла или имеет недостаточную толщину. Наша услуга по обновлению утепления включает демонтаж старого материала, установку нового утеплителя (PIR, EPS, минеральная вата), пароизоляции и кровельного покрытия. Новое утепление значительно снижает расходы на отопление и охлаждение.

Водостоки и системы дренажа

Правильная система водоотведения — неотъемлемая часть любого кровельного решения. Монтируем алюминиевые, стальные и пластиковые желоба и водосточные трубы. Работаем с системами Ruukki, Lindab, Ventin и других ведущих производителей.

Люки и мансардные окна

Устанавливаем и ремонтируем кровельные люки (технические и аварийные), мансардные окна (Velux, Roto, Fakro) и слуховые окна. Обеспечиваем правильную гидроизоляцию всех проёмов.

Устойчивость к ветру и снегу по эстонским нормам

Все выбираемые нами материалы и системы соответствуют эстонскому климату: рассчитаны на ветровые нагрузки до зоны IV, испытаны на снеговые нагрузки в соответствии с эстонскими стандартами, УФ-стойкие и морозостойкие. Соблюдаем требования EVS-EN 14783 (профилированный металлический лист) и EVS-EN 13707 (битумные мембраны).

Таллин и Харьюмаа — гарантия, бесплатный осмотр

На все кровельные работы предоставляем гарантию не менее 2 лет. Используемые материалы сертифицированы для эстонского климата. Первичный осмотр и смета — бесплатно. Позвоните нам — опытный кровельщик выедет на объект, оценит состояние кровли и даст честные рекомендации.`
    ),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  for (const svc of services) {
    try {
      console.log("\nProcessing:", svc.slug);

      console.log("  Uploading hero image...");
      const heroAsset = await uploadImg(svc.kw1, `${svc.slug}-hero.jpg`);
      console.log("  Hero asset:", heroAsset._id);

      console.log("  Uploading gallery image...");
      const galleryAsset = await uploadImg(svc.kw2, `${svc.slug}-gallery-1.jpg`);
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
