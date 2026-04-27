/**
 * scripts/seed-plumbing-b3.mjs
 * Creates / patches 3 home-services documents in Sanity:
 *   1. riser-pipe-replacement   (Plumbing Works)
 *   2. sewer-jetting            (High-Pressure Washing & Special Equipment)
 *   3. sewage-removal           (High-Pressure Washing & Special Equipment)
 *
 * Run: node --env-file=.env.local scripts/seed-plumbing-b3.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

// ── helpers ──────────────────────────────────────────────────────────────────
function toPortableText(text) {
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((para, i) => ({
      _key:     `b${i}`,
      _type:    "block",
      style:    "normal",
      markDefs: [],
      children: [{ _key: `c${i}`, _type: "span", text: para.trim(), marks: [] }],
    }));
}

const ls  = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt  = (et, en, ru) => ({ _type: "localeText",   et, en, ru });
const lb  = (et, en, ru) => ({
  _type: "localeBlock",
  et: toPortableText(et),
  en: toPortableText(en),
  ru: toPortableText(ru),
});
const ref  = (id)         => ({ _type: "reference", _ref: id });
const slug = (s)          => ({ _type: "slug", current: s });

async function uploadImg(kw, filename) {
  const url = `https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

/** Upsert: patch if exists, create if not. */
async function upsert(doc) {
  const existing = await client.fetch(
    `*[_type=="service" && slug.current==$s][0]{_id}`,
    { s: doc.slug.current }
  );
  if (existing) {
    await client.patch(existing._id).set(doc).commit();
    console.log(`  ✏️  Patched  → ${existing._id}  (${doc.slug.current})`);
  } else {
    const created = await client.create(doc);
    console.log(`  ✅  Created → ${created._id}  (${doc.slug.current})`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 1 — riser-pipe-replacement
// ══════════════════════════════════════════════════════════════════════════════
const RISER_ET = `Stiaaktoru vahetus korterelamus — Tallinnas ja Harjumaal

Stiaakatorude (riserite) vahetus on üks mahukamaid ja vastutusrikkamaid torustikutöid, mida korterelamutes teostatakse. Need vertikaalsed torud — nii kuum- kui ka külmveesuunalised — läbivad kogu hoonet algusest lõpuni ning nende seisukord mõjutab otseselt kõikide korteriomanike veevarustuse kvaliteeti ja ohutust. TorudeAbi24 meeskond on läbi viinud stiaakatorude vahetust paljudes Tallinna ja Harjumaa korterelamutes ning teame täpselt, millised väljakutsed selle töö juures esile kerkivad.

Miks on stiaakatorude vahetus vajalik?

Enamik nõukogude ajal ehitatud korterelamutest kasutab endiselt galvaniseeritud terästorusid, mille projekteeritud kasutusiga on 25–40 aastat. Tänapäeval on paljud neist torudest kümneid aastaid vanemad — rooste, lupjumine ja muu kulumine on teinud oma töö. Tüüpilised tunnused, mis viitavad vajadusele stiaakatorud vahetada: pruun või roostene vesi kraanis, madal veepaine ülakorruse kortereis, korduv leke stiaakude juures, torust tulenev müra (paugud, kolin), nähtav rooste ja korrosioon pööningutel ja keldrites.

Kuidas töö käib?

Enne töö alustamist kooskõlastame kõik tööd korteriühistu (KÜ) juhatusega ning teavitame kõiki elanikke kirjalikult. Koostame detailse tööplaani, mis tagab minimaalse häirimise igale korterile. Igal päeval katkestatakse vesi ainult töödeks vajaliku aja jooksul ning korterites on vesi taastatud enne õhtut. Tüüpiliselt toimub stiaakude vahetus ühes hoonesektsioonis 3–7 päevaga, sõltuvalt korruste arvust ja ligipääsetavusest.

Kaasaegsed materjalid: PP ja PE torustikud

Kasutame tänapäevaseid polüpropüleen (PP-R) ja ristsidestatud polüetüleen (PE-X) torusid, mis on teraskonstruktsioonidega võrreldes märkimisväärselt paremad: ei rooste ega lupju, madalam veekäresistentsus (parem surveering), 50+ aasta kasutusiga, kergem materjal — lihtsam paigaldada, väga hea korrosioonikindlus. Kõik materjalid vastavad Eesti ja Euroopa Liidu standarditele ning on sertifitseeritud kasutamiseks nii kuum- kui ka külmveesüsteemides.

Surveproov ja garantii

Pärast iga stiaagu vahetamist teostame kohustusliku surveproovi, mille käigus kontrollime kõiki ühendusnurki, liitmikke ja torustiku sektsioone. Anname kirjaliku garantii 5 aastat tööde kvaliteedile. Lisaks dokumenteerime kogu teostuse teostusjoonistega, mis jäävad korteriühistu arhiivi.

Koostöö korteriühistuga

Mõistame, et stiaakude vahetus on keeruline organisatsiooniliselt: tuleb arvestada kümnete korteriomanikega, nende töögraafikutega ja elukorraldusliku mugavusega. Meie koordinaator hoolitseb kogu suhtlemise eest — alates koosolekute korraldamisest kuni lõppdokumentatsiooni üleandmiseni. Oleme teinud koostööd paljude Tallinna korteriühistutega ja teame, kuidas niisuguseid projekte sujuvalt juhtida.

Teenindame Tallinna, Viimsi, Maardu, Saue, Keila ja kogu Harjumaa piirkonda. Tasuta konsultatsiooni ja hinnapakkumise saamiseks helistage meile juba täna.`;

const RISER_EN = `Riser Pipe Replacement in Apartment Buildings — Tallinn and Harjumaa

Replacing riser pipes is one of the most complex and consequential plumbing projects carried out in multi-storey residential buildings. These vertical pipes — carrying both hot and cold water — run the full height of the building, and their condition directly affects the water supply quality and safety for every flat owner. The TorudeAbi24 team has completed riser replacements in numerous apartment buildings across Tallinn and Harjumaa, and we understand the unique challenges this work presents.

Why is riser pipe replacement necessary?

Most apartment buildings constructed during the Soviet era still contain the original galvanised steel pipes, which were designed for a service life of 25–40 years. Many of these pipes are now decades past that point — rust, limescale and general wear have taken their toll. Typical warning signs that risers need replacing: brown or rusty water from the tap, low water pressure on upper floors, recurring leaks at riser junctions, noise from the pipes (banging, clanking), visible rust and corrosion in the loft or basement.

How the work is carried out

Before starting, we coordinate all works with the housing association (HOA) board and notify all residents in writing. We prepare a detailed work schedule designed to minimise disruption to every flat. Water is shut off only for the time strictly required for each day's work, with supply restored before evening. A typical riser replacement in one building section takes 3–7 days, depending on the number of floors and access conditions.

Modern materials: PP and PE pipework

We use modern polypropylene (PP-R) and cross-linked polyethylene (PE-X) pipes, which offer significant advantages over steel: no rust or limescale build-up, lower flow resistance (better pressure performance), service life of 50+ years, lighter weight — easier to install, excellent corrosion resistance. All materials comply with Estonian and EU standards and are certified for use in both hot and cold water systems.

Pressure testing and warranty

After each riser replacement we carry out a mandatory pressure test, checking all joints, fittings and pipe sections. We provide a written 5-year workmanship warranty. We also document everything with as-built drawings, which are kept in the HOA's records.

Working with the housing association

We understand that riser replacement is organisationally complex: dozens of flat owners with varying schedules and comfort requirements must all be considered. Our project coordinator handles all communication — from organising residents' meetings to handing over the final documentation package. We have worked with many HOAs across Tallinn and know how to run these projects smoothly.

We serve Tallinn, Viimsi, Maardu, Saue, Keila and the entire Harjumaa region. Call us today for a free consultation and quote.`;

const RISER_RU = `Замена стояков в многоквартирном доме — Таллин и Харьюмаа

Замена стояков — одна из наиболее трудоёмких и ответственных сантехнических работ в многоквартирных домах. Эти вертикальные трубы — как горячего, так и холодного водоснабжения — проходят через всё здание снизу доверху, и их техническое состояние напрямую влияет на качество и безопасность водоснабжения каждого жильца. Команда TorudeAbi24 выполнила замену стояков во многих многоквартирных домах Таллина и уезда Харьюмаа и прекрасно понимает все специфические трудности этого вида работ.

Почему необходима замена стояков?

Большинство многоквартирных домов советской постройки до сих пор имеют оригинальные оцинкованные стальные трубы, рассчитанные на срок службы 25–40 лет. Многие из этих труб давно выработали ресурс — ржавчина, известковые отложения и общий износ сделали своё дело. Типичные признаки того, что стояки требуют замены: ржавая или коричневая вода из крана, низкое давление воды на верхних этажах, повторяющиеся течи в местах соединений стояков, шум в трубах (стуки, бульканье), видимая ржавчина и коррозия на чердаке или в подвале.

Как организованы работы

До начала работ мы согласовываем весь объём с правлением товарищества собственников жилья (ТСЖ) и письменно уведомляем всех жильцов. Составляем детальный график работ, призванный минимизировать неудобства для каждой квартиры. Вода отключается только на время, строго необходимое для выполнения работ, и восстанавливается до конца рабочего дня. Типичная замена стояков в одной секции здания занимает 3–7 дней в зависимости от количества этажей и условий доступа.

Современные материалы: трубы из PP и PE

Используем современные трубы из полипропилена (PP-R) и сшитого полиэтилена (PE-X), которые существенно превосходят стальные аналоги: не ржавеют и не покрываются известковым налётом, меньшее гидравлическое сопротивление (лучший напор), срок службы 50+ лет, лёгкий вес — удобнее монтировать, отличная коррозионная стойкость. Все материалы соответствуют эстонским и европейским стандартам и сертифицированы для применения в системах горячего и холодного водоснабжения.

Опрессовка и гарантия

После замены каждого стояка проводим обязательную опрессовку — проверяем все стыки, фитинги и участки трубопровода. Предоставляем письменную гарантию на качество работ сроком 5 лет. Всю выполненную работу документируем исполнительными чертежами, которые хранятся в архиве ТСЖ.

Взаимодействие с ТСЖ

Понимаем, что замена стояков — организационно сложный процесс: необходимо учитывать интересы десятков собственников квартир с разными графиками и бытовыми потребностями. Наш координатор проекта берёт на себя всё общение — от организации собраний жильцов до передачи финального пакета документации. Мы работали с многими ТСЖ Таллина и знаем, как вести такие проекты без лишних трений.

Работаем по Таллину, Виймси, Маарду, Сауэ, Кейла и всему уезду Харьюмаа. Звоните сегодня для бесплатной консультации и сметы.`;

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 2 — sewer-jetting
// ══════════════════════════════════════════════════════════════════════════════
const JETTING_ET = `Kanalisatsiooni kõrgsurveloputus (survepesu) — Tallinn ja Harjumaa

Kanalisatsioonitoru kõrgsurveloputus on tõhusaim meetod ummistuste eemaldamiseks, torustiku puhastamiseks ja selle tööea pikendamiseks. Erinevalt mehaanilistest lahtistusvahenditest eemaldab survepesu mitte ainult ummistuse enda, vaid puhastab kogu toru seestpoolt ning taastab selle algse läbilaskevõime. TorudeAbi24 kasutab professionaalset veoautomonteeritud kõrgsurveloputustehnikat, mis sobib nii elamutele kui ka äri- ja tootmiskinnisvara jaoks kogu Tallinnas ja Harjumaal.

Mida eemaldab kõrgsurveloputus?

Kanalisatsioonitoru ummistused tekivad sageli mitme teguri koosmõjul, mis kogunevad toru seintele aastate jooksul. Kõrgsurveloputus eemaldab tõhusalt: rasva ja õliladestused (köökide kanalisatsioon), juureläbikasvu (puu- ja põõsajuured, mis tungivad liitmike vahelt), lubja- ja mineraalide sadestused (eriti külmaveetorudes), tahkestunud mudakihi (pikaajaline settimine toruseintele), toalette ummistanud mittelahustuvat prügi (salvrätid, mänguasjad, jne) ja muud orgaanilised ladestused. Survepesuga saab tõhusalt puhastada suure läbimõõduga torustikku, mida mehhaaniline lahtistamine ei suuda kätte ulatuda.

Kuidas töö käib?

Tööprotsess algab kanalisatsioonisüsteemi eelkontrolliga, milleks kasutame CCTV-kaameraseadet (toru videosisekontroll). See võimaldab täpselt tuvastada ummistuse asukoha, ulatuse ja iseloomu ning valida sobiva surve ja düüsi tüübi. Kõrgsurveloputuses kasutame spetsiaalseid kõrgsurvedüüse (kuni 200–400 bar), mille vesijoad puhastavad toru seestpoolt mitmelt suunalt samaaegselt. Pärast survepesut teostame korduvkontrolli CCTV-kaameraga, mille abil kinnitame töö tulemuse kliendile visuaalselt.

Veoautomonteeritud seadmed

Meie teenuse eeliseks on veoautomonteeritud kõrgsurveloputussüsteemid, mis mahutavad suures veemahutis (500–2000 l) ja võimaldavad pikaajalisi puhastussessioone ilma katkestusteta. Selline tehnika sobib suurte läbimõõduga peakollektoritele, ärikinnisvara pikematele torustikele ja sademevee äravooluvõrkudele — valdkondadele, kus tavalised seadmed ei suuda vajaliku survega töötada.

Ärikiinnistu ja elamukinnistu

Kõrgsurveloputuse teenus on kasulik nii eramajadele ja kortermajadele (köögitorud, WC-torud, drenaaž) kui ka äri- ja tootmiskinnisvara jaoks (restoran- ja toiduainetetööstuse rasvatõkked, tootmishoonete tööstusdrenaaž, kaubanduskeskuste peakollektor). Ärikiinnistu klientidele pakume ka lepingupõhist regulaarset hooldust, mis ennetab ummistusi ja pikendab torustiku eluiga.

CCTV-kontroll enne ja pärast

Kõikidele töödele pakume CCTV-videokontrolli nii enne kui ka pärast kõrgsurveloputust. Salvestis antakse kliendile üle digitaalsel kujul ja võib olla vajalik kindlustushüvitiste taotlemisel või tulevaste tööde planeerimisel.

Kiire reageerimine hädaolukordades

Kanalisatsiooniummistus võib olla hädaolukord — eriti ärikinnisvara puhul, kus iga tööseisakuminut toob kaasa majandusliku kahju. Meie meeskond on valmis reageerima kiireloomulistele väljakutsetele ka väljaspool tavalahtiolekuaega. Teenindame Tallinna, Viimsi, Maardu, Saue, Keila ja kogu Harjumaa piirkonda.`;

const JETTING_EN = `High-Pressure Sewer Jetting — Tallinn and Harjumaa

High-pressure sewer jetting is the most effective method of clearing blockages, cleaning pipework and extending its service life. Unlike mechanical drain rods or snaking, jetting does not simply punch through a blockage — it thoroughly cleans the entire inner wall of the pipe and restores its original flow capacity. TorudeAbi24 operates professional truck-mounted high-pressure jetting equipment suited to residential, commercial and industrial properties across Tallinn and Harjumaa.

What does high-pressure jetting remove?

Sewer blockages typically result from a combination of factors that accumulate on pipe walls over years. High-pressure jetting effectively removes: grease and fat deposits (kitchen drainage systems), root ingress (tree and shrub roots penetrating at joints), limescale and mineral deposits (particularly in cold water pipes), hardened sludge (long-term sediment on pipe walls), non-dispersible waste flushed down toilets (wipes, foreign objects), and other organic build-up. Jetting can clean large-diameter pipes that are completely inaccessible to mechanical methods.

How the work is carried out

The process begins with a pre-inspection using a CCTV camera unit inside the pipe. This pinpoints the exact location, extent and nature of the blockage and allows us to select the correct pressure setting and nozzle type. During jetting, specialist high-pressure nozzles (up to 200–400 bar) propel powerful water jets that clean the pipe wall simultaneously from multiple angles. After jetting we carry out a repeat CCTV inspection and show the client a before-and-after visual confirmation of the result.

Truck-mounted equipment

Our service uses truck-mounted high-pressure jetting systems with large onboard water tanks (500–2000 litres), enabling extended cleaning sessions without interruption. This equipment is specifically suited to large-diameter main sewers, long commercial pipework runs and surface water drainage networks — applications where standard equipment cannot achieve the necessary pressure or reach.

Commercial and residential applications

High-pressure jetting is valuable for private houses and apartment buildings (kitchen drains, soil pipes, drainage) as well as commercial and industrial properties (grease traps in restaurants and food production, industrial drainage in manufacturing buildings, main sewers in retail centres). For commercial clients we offer contract-based scheduled maintenance to prevent blockages and maximise pipe service life.

CCTV inspection before and after

We offer CCTV video inspection both before and after every jetting job. The recording is provided to the client in digital form and may be required for insurance claims or future maintenance planning.

Emergency response

A sewer blockage can be an emergency — particularly for commercial properties where every minute of downtime has a financial cost. Our team is ready to respond to urgent callouts outside normal business hours. We serve Tallinn, Viimsi, Maardu, Saue, Keila and the entire Harjumaa region.`;

const JETTING_RU = `Гидродинамическая прочистка (промывка) канализации — Таллин и Харьюмаа

Гидродинамическая промывка канализации — наиболее эффективный метод устранения засоров, очистки трубопроводов и продления срока их службы. В отличие от механических тросов и спиралей, промывка высоким давлением не просто пробивает засор, а тщательно очищает всю внутреннюю поверхность трубы и восстанавливает её первоначальную пропускную способность. TorudeAbi24 использует профессиональное навесное на грузовик оборудование для гидропромывки, подходящее для жилых, коммерческих и промышленных объектов по всему Таллину и уезду Харьюмаа.

Что удаляет гидропромывка?

Засоры в канализационных трубах, как правило, формируются при участии нескольких факторов, накапливающихся на стенках труб годами. Гидродинамическая промывка эффективно удаляет: жировые и масляные отложения (кухонные системы канализации), прорастание корней (корни деревьев и кустарников, проникающие в местах соединений), известковые и минеральные отложения (особенно в трубах холодного водоснабжения), затвердевший ил (долгосрочный осадок на стенках труб), неразлагаемые отходы, смытые в унитаз (влажные салфетки, посторонние предметы), а также прочие органические отложения. Промывка позволяет прочистить трубы большого диаметра, недоступные для механических методов.

Как выполняются работы

Процесс начинается с предварительной инспекции с помощью CCTV-камеры внутри трубы. Это позволяет точно определить место, масштаб и характер засора, а также выбрать нужное давление и тип насадки. При промывке специализированные насадки высокого давления (до 200–400 бар) направляют мощные струи воды, одновременно очищающие стенки трубы с нескольких сторон. После промывки мы проводим повторную CCTV-инспекцию и визуально подтверждаем результат клиенту в формате «до и после».

Навесное оборудование на грузовике

Наш сервис использует навесные на грузовик системы гидропромывки с большими бортовыми ёмкостями для воды (500–2000 литров), что позволяет проводить длительные сессии очистки без перерывов. Такое оборудование специально предназначено для канализационных коллекторов большого диаметра, протяжённых трубопроводных систем коммерческих объектов и ливневых канализационных сетей — там, где стандартное оборудование не обеспечивает необходимого давления или досягаемости.

Коммерческая и жилая недвижимость

Гидропромывка полезна как для частных домов и многоквартирных зданий (кухонные стоки, стояки, дренаж), так и для коммерческой и промышленной недвижимости (жироуловители в ресторанах и пищевых производствах, промышленные дренажные системы производственных зданий, главные коллекторы торговых центров). Коммерческим клиентам предлагаем регулярное плановое обслуживание по договору — для предотвращения засоров и максимального продления срока службы трубопроводов.

Видеоинспекция до и после

По всем работам мы предлагаем CCTV-видеоинспекцию как до, так и после гидропромывки. Запись передаётся клиенту в цифровом формате и может потребоваться для страховых случаев или планирования будущего обслуживания.

Аварийный выезд

Засор канализации может стать чрезвычайной ситуацией — особенно для коммерческих объектов, где каждая минута простоя несёт финансовые потери. Наша команда готова реагировать на срочные вызовы в нерабочее время. Работаем по Таллину, Виймси, Маарду, Сауэ, Кейла и всему уезду Харьюмаа.`;

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 3 — sewage-removal
// ══════════════════════════════════════════════════════════════════════════════
const SEWAGE_ET = `Reovee eemaldamine ja septiku tühjendus — Tallinn ja Harjumaa

Reovee eemaldamine, septiku tühjendus ja kogumiskaevude puhastamine on hädavajalikud teenused kinnistutele, mis ei ole ühendatud avaliku kanalisatsioonivõrguga, samuti hädaolukordades pärast üleujutusi ja kanalisatsiooniavariisid. TorudeAbi24 pakub professionaalset reovee eemaldamise teenust vaakumauto (fekaaliauto) abil kogu Tallinna piirkonnas ja Harjumaal, reageerides kiiresti nii planeeritud tühendustele kui ka avariiolukordadele.

Millal on reovee eemaldamine vajalik?

Reovee eemaldamise vajadus tekib mitmesugustes olukordades: septiku korrapärane tühjendamine (tüüpiliselt iga 1–3 aasta tagant, sõltuvalt mahust ja kasutusintensiivsusest), kogumiskaevude ja fekaalikaevu tühjendamine, hädaolukord — kanalisatsiooni ülevoolumine üleujutuse või torustiku rikke tõttu, ehitus- ja renoveerimistööde käigus tekkiva mustveepumbutuse vajadus, tööstusliku reovee eemaldamine tootmisprotsessidest ja toiduainetööstuse jäätmevete käitlemine.

Vaakumauto — tõhus ja hügieeniline

Meie vaakumautod on varustatud suure mahuga paakidega (6 000–12 000 liitrit) ja võimsa vaakumpumbaga, mis võimaldab reovee tõhusat ja hügieenilist eemaldamist. Vaakumimpordi hea imivõime võimaldab tühjendada isegi raskesti ligipääsetavaid kaeve ja mahuteid. Kõik kogutud jäätmed transporditakse litsentseeritud käitlusettevõttesse, kus toimub nõuetekohane töötlemine vastavalt Eesti keskkonnaseadusandlusele.

Septiku tühjendamine — kuidas see toimub?

Septiku tühjendamine on lihtne ja kiire protsess meie spetsiaalse seadmestiku abil. Vaakumauto parkib kinnistule (või selle lähedusse), paak ühendatakse septiku luugiga väljalasetorustiku kaudu ja reovesi imendatakse tõhusalt välja. Tühjendusaeg sõltub septiku mahust ja ligipääsetavusest — tavaliselt 30–90 minutit. Pärast tühjendamist soovitame septiku seisukorra visuaalset kontrollimist, mille käigus saame anda soovitused hoolduse ja remondivajaduse osas.

Hädaolukordade reageerimine — kiire abi

Kanalisatsiooniavarii, üleujutus või septiku ülevoolumine on hädaolukorrad, mis vajavad viivitamatut reageerimist. Meie meeskond on saadaval hädaabi kõnedeks ööpäevaringselt ja suudab sageli kohale jõuda 1–2 tunni jooksul. Kiire reageerimine on eriti oluline elamute ja ärikinnisvara puhul, kus reoveekahjustused võivad olla ulatuslikud.

Litsentseeritud käitlemine ja keskkonnakaitsenõuded

Kõik TorudeAbi24 kogutud reoveed käideldakse litsentseeritud ettevõtete kaudu, kellel on kehtiv jäätmekäitleja luba. Väljastame kliendile vastuvõtuakti (keskkonnajäätmete üleandmise dokument), mida võib vaja minna keskkonnainspektsiooni kontrolli puhul või kindlustushüvitiste taotlemisel. Meie teenus vastab täielikult Eesti keskkonnaseadustiku ja jäätmeseaduse nõuetele.

Tallinn ja Harjumaa — kiire tarne

Teenindame kogu Tallinna linna, Viimsi, Maardu, Saue, Keila, Saku, Kiili ja lähiümbrust. Planeeritud tühjenduste puhul leppime aja kokku paindlikult — ka nädalavahetustel. Hädaolukordade puhul sõidame välja esimesel võimalusel. Küsige tasuta hinnapakkumist — helistage meile juba täna.`;

const SEWAGE_EN = `Sewage Removal and Septic Tank Pumping — Tallinn and Harjumaa

Sewage removal, septic tank pumping and cesspit emptying are essential services for properties not connected to the public sewer network, as well as for emergency cleanup after flooding and drainage failures. TorudeAbi24 provides professional sewage removal using vacuum tanker trucks across the Tallinn region and Harjumaa, responding promptly to both scheduled emptying and emergency call-outs.

When is sewage removal needed?

Sewage removal requirements arise in a variety of situations: routine septic tank emptying (typically every 1–3 years depending on tank volume and usage), cesspit and collection chamber emptying, emergencies — sewer overflow due to flooding or a drainage failure, removal of waste water accumulated during construction or renovation works, removal of industrial effluent from production processes, and handling of food-industry waste water.

Vacuum tanker trucks — efficient and hygienic

Our vacuum tanker trucks are equipped with large-capacity tanks (6,000–12,000 litres) and a powerful vacuum pump, enabling efficient and hygienic removal of waste water. The strong suction achievable with vacuum tanker equipment allows emptying of even difficult-to-access tanks and chambers. All collected waste is transported to a licensed treatment facility where it is processed in accordance with Estonian environmental legislation.

How septic tank pumping works

Septic tank pumping is a straightforward and fast process with our specialist equipment. The tanker parks on or near the property, the tank is connected to the septic access point via the suction hose, and the waste is efficiently drawn out. Pumping time depends on tank capacity and access — typically 30–90 minutes. After emptying we recommend a visual condition check of the septic tank, and can advise on maintenance needs or any repair requirements observed.

Emergency response — fast assistance

A drainage emergency, flooding incident or septic tank overflow all require immediate action. Our team is available for emergency calls around the clock and can typically arrive within 1–2 hours. Rapid response is especially important for residential and commercial properties where sewage damage can be extensive and costly.

Licensed disposal and environmental compliance

All waste water collected by TorudeAbi24 is processed through licensed treatment operators holding a valid waste handling permit. We issue the client with a waste transfer note, which may be required during environmental inspections or insurance claims. Our service is fully compliant with the Estonian Environmental Code and Waste Act.

Tallinn and Harjumaa — fast service area

We serve the entire city of Tallinn, Viimsi, Maardu, Saue, Keila, Saku, Kiili and the surrounding area. For scheduled emptying we arrange a time flexibly — including weekends. For emergencies we dispatch as soon as possible. Request a free quote — call us today.`;

const SEWAGE_RU = `Откачка сточных вод и откачка септика — Таллин и Харьюмаа

Откачка сточных вод, откачка септиков и очистка выгребных ям — это необходимые услуги для объектов, не подключённых к общей канализационной сети, а также в чрезвычайных ситуациях после затопления и аварий канализации. TorudeAbi24 предоставляет профессиональную услугу откачки сточных вод с помощью ассенизаторских машин (вакуумных автомобилей) по всей зоне Таллина и уезда Харьюмаа, оперативно реагируя как на плановые откачки, так и на аварийные вызовы.

Когда требуется откачка сточных вод?

Необходимость в откачке сточных вод возникает в различных ситуациях: плановая очистка септика (как правило, каждые 1–3 года в зависимости от объёма и интенсивности использования), очистка выгребных ям и накопительных колодцев, чрезвычайные ситуации — переполнение канализации из-за затопления или аварии трубопровода, удаление сточных вод, накопившихся в ходе строительных или ремонтных работ, откачка промышленных стоков из производственных процессов и обращение с отходами предприятий пищевой промышленности.

Ассенизаторские машины — эффективно и гигиенично

Наши ассенизаторские автомобили оснащены ёмкостями большого объёма (6 000–12 000 литров) и мощным вакуумным насосом, что обеспечивает эффективное и гигиеничное удаление сточных вод. Высокое разрежение, создаваемое вакуумной установкой, позволяет опустошать даже труднодоступные ёмкости и колодцы. Все собранные отходы транспортируются на лицензированное предприятие по переработке, где они обрабатываются в соответствии с эстонским природоохранным законодательством.

Как выполняется откачка септика

Откачка септика — простой и быстрый процесс с использованием нашего специализированного оборудования. Ассенизатор паркуется на участке или вблизи него, цистерна подключается к люку септика через шланг, и сточные воды эффективно откачиваются. Время откачки зависит от объёма септика и условий доступа — как правило, 30–90 минут. После откачки рекомендуем визуальный осмотр состояния септика, по результатам которого можем дать рекомендации по техническому обслуживанию или необходимому ремонту.

Аварийное реагирование — быстрая помощь

Аварийная ситуация с канализацией, затопление или переполнение септика требуют немедленного реагирования. Наша команда доступна для аварийных вызовов круглосуточно и, как правило, прибывает в течение 1–2 часов. Быстрое реагирование особенно важно для жилых и коммерческих объектов, где ущерб от сточных вод может быть значительным.

Лицензированная утилизация и соответствие экологическим нормам

Все сточные воды, собранные TorudeAbi24, перерабатываются через лицензированных операторов, имеющих действующее разрешение на обращение с отходами. Выдаём клиенту акт приёма-передачи отходов, который может потребоваться при экологической проверке или страховых случаях. Наш сервис полностью соответствует требованиям Экологического кодекса Эстонии и Закона об отходах.

Таллин и Харьюмаа — быстрое обслуживание

Работаем по всему Таллину, Виймси, Маарду, Сауэ, Кейла, Саку, Кийли и прилегающим районам. Для плановых откачек назначаем время гибко — включая выходные дни. В аварийных ситуациях выезжаем при первой возможности. Запросите бесплатную смету — звоните нам сегодня.`;

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
async function main() {
  const SERVICES = [
    // ── 1. riser-pipe-replacement ─────────────────────────────────────────────
    {
      slugStr:    "riser-pipe-replacement",
      imgKw1:     "building pipe riser replacement plumbing",
      imgKw2:     "vertical pipe apartment building",
      categoryId: "serviceCategory-plumbing-works",
      icon:       "Pipette",
      order:      15,
      pathSegment: { et: "stiaakotoru-vahetus", ru: "замена-стояка" },
      title: ls(
        "Stiaakotoru vahetus korterelamus",
        "Riser Pipe Replacement",
        "Замена стояков в многоквартирном доме"
      ),
      shortDescription: lt(
        "Kuum- ja külmveestiaakude professionaalne vahetus korterelamutes. Koordineerime korteriühistuga, minimaalne häiring elanikele. PP/PE materjalid, surveproov, 5-aastane garantii.",
        "Professional hot and cold water riser pipe replacement in apartment buildings. HOA coordination, minimal disruption to residents. PP/PE materials, pressure-tested, 5-year warranty.",
        "Профессиональная замена стояков горячего и холодного водоснабжения в многоквартирных домах. Координация с ТСЖ, минимальные неудобства для жильцов. Трубы PP/PE, опрессовка, гарантия 5 лет."
      ),
      body: lb(RISER_ET, RISER_EN, RISER_RU),
      metaTitle: ls(
        "Stiaakotoru vahetus Tallinnas | PP/PE, garantii 5a",
        "Riser Pipe Replacement Tallinn | HOA, PP/PE, Warranty",
        "Замена стояков Таллин | ТСЖ, PP/PE трубы, гарантия"
      ),
      metaDescription: lt(
        "Kuum- ja külmveestiaakude vahetus korterelamus Tallinnas. PP/PE torustik, surveproov, korteriühistu kooskõlastus, minimaalne häiring. 5a garantii. Küsige hinnapakkumist!",
        "Hot and cold water riser pipe replacement in Tallinn apartment buildings. PP/PE pipework, pressure test, HOA coordination, minimal disruption. 5-year warranty. Request a quote!",
        "Замена стояков горячего и холодного водоснабжения в Таллине. Трубы PP/PE, опрессовка, согласование с ТСЖ, минимальные неудобства. Гарантия 5 лет. Запросите смету!"
      ),
      imageAlt: ls(
        "Stiaakotoru vahetus korterelamus — vertikaalne torustik Tallinnas",
        "Riser pipe replacement in apartment building — vertical plumbing Tallinn",
        "Замена стояка в многоквартирном доме — вертикальный трубопровод Таллин"
      ),
      galleryAlt: ls(
        "Uus PP-toruvertikaaltoru paigaldamine kortermaja stiaagus",
        "New PP vertical pipe installed in apartment building riser shaft",
        "Монтаж новой вертикальной трубы PP в шахте стояка многоквартирного дома"
      ),
    },

    // ── 2. sewer-jetting ──────────────────────────────────────────────────────
    {
      slugStr:    "sewer-jetting",
      imgKw1:     "sewer jetting high pressure cleaning",
      imgKw2:     "drain jetting water pressure pipe",
      categoryId: "serviceCategory-high-pressure-washing",
      icon:       "Waves",
      order:      21,
      pathSegment: { et: "kanalisatsiooni-survepesu", ru: "гидропромывка-канализации" },
      title: ls(
        "Kanalisatsiooni kõrgsurveloputus",
        "High-Pressure Sewer Jetting",
        "Гидродинамическая промывка канализации"
      ),
      shortDescription: lt(
        "Kanalisatsioonitoru kõrgsurveloputus eemaldab rasva, juured, lupja ja muid ummistusi. Suur- ja väikeläbimõõdulised torud, ärikiinnistu ja elamukinnistu, CCTV enne/pärast. Tallinn, Harjumaa.",
        "High-pressure sewer jetting removes grease, roots, scale and blockages. Large and small diameter pipes, commercial and residential, CCTV before/after inspection. Tallinn, Harjumaa.",
        "Гидродинамическая промывка канализации удаляет жир, корни, известковый налёт и засоры. Трубы большого и малого диаметра, коммерческая и жилая недвижимость, CCTV до/после. Таллин, Харьюмаа."
      ),
      body: lb(JETTING_ET, JETTING_EN, JETTING_RU),
      metaTitle: ls(
        "Kanalisatsiooni survepesu Tallinnas | CCTV, ärikiinnistu",
        "Sewer Jetting Tallinn Estonia | CCTV, Commercial & Residential",
        "Гидропромывка канализации Таллин | CCTV, коммерческая"
      ),
      metaDescription: lt(
        "Kõrgsurveloputus kanalisatsioonitorudes Tallinnas ja Harjumaal. Rasv, juured, lubi — eemaldame kõik. CCTV enne ja pärast. Ärikiinnistu ja elamukinnistu. Kiire reageerimine, tasuta hinnapakkumine!",
        "High-pressure sewer jetting in Tallinn and Harjumaa. Grease, roots, scale removed. CCTV before and after. Commercial and residential. Fast response, free quote!",
        "Гидродинамическая прочистка канализации в Таллине и Харьюмаа. Удаляем жир, корни, известь. CCTV до и после. Коммерческая и жилая недвижимость. Быстрый выезд, бесплатная смета!"
      ),
      imageAlt: ls(
        "Kõrgsurveloputus kanalisatsioonitorus — professionaalne puhastus Tallinnas",
        "High-pressure sewer jetting — professional drain cleaning Tallinn Estonia",
        "Гидродинамическая промывка канализации — профессиональная прочистка Таллин"
      ),
      galleryAlt: ls(
        "Veejoa düüs kõrgsurveloputuses kanalisatsioonitorus",
        "Water jet nozzle during high-pressure drain cleaning in pipe",
        "Насадка водяной струи при гидропромывке канализационной трубы"
      ),
    },

    // ── 3. sewage-removal ─────────────────────────────────────────────────────
    {
      slugStr:    "sewage-removal",
      imgKw1:     "sewage pumping truck tanker",
      imgKw2:     "septic tank emptying service",
      categoryId: "serviceCategory-high-pressure-washing",
      icon:       "Truck",
      order:      22,
      pathSegment: { et: "reovee-eemaldamine", ru: "откачка-сточных-вод" },
      title: ls(
        "Reovee eemaldamine ja septiku tühjendus",
        "Sewage Removal & Septic Tank Pumping",
        "Откачка сточных вод и откачка септика"
      ),
      shortDescription: lt(
        "Reovee eemaldamine vaakumautoga, septiku tühjendus, kogumiskaevude puhastus ja hädaolukordade reoveekahjustuste likvideerimine. Litsentseeritud käitlemine, kiire reageerimine. Tallinn ja lähiümbrus.",
        "Sewage removal with vacuum trucks, septic tank pumping, cesspit emptying and emergency sewage cleanup after flooding. Licensed disposal, fast response. Tallinn region.",
        "Откачка сточных вод ассенизатором, откачка септика, очистка выгребных ям и аварийная ликвидация стоков после затопления. Лицензированная утилизация, быстрый выезд. Таллин и округа."
      ),
      body: lb(SEWAGE_ET, SEWAGE_EN, SEWAGE_RU),
      metaTitle: ls(
        "Reovee eemaldamine Tallinnas | Septik, vaakumauto",
        "Sewage Removal Tallinn Estonia | Septic, Vacuum Truck",
        "Откачка сточных вод Таллин | Септик, ассенизатор"
      ),
      metaDescription: lt(
        "Reovee eemaldamine vaakumautoga Tallinnas. Septiku tühjendus, kogumiskaevud, hädaolukorra kanalisatsioon. Litsentseeritud käitlemine, ööpäevaringne reageerimine. Tasuta hinnapakkumine!",
        "Sewage removal by vacuum truck in Tallinn. Septic tank pumping, cesspits, emergency drainage. Licensed disposal, 24/7 emergency response. Free quote — call now!",
        "Откачка сточных вод ассенизатором в Таллине. Откачка септика, выгребные ямы, аварийная канализация. Лицензированная утилизация, круглосуточный аварийный выезд. Бесплатная смета!"
      ),
      imageAlt: ls(
        "Vaakumauto reovee eemaldamisel — septiku tühjendus Tallinnas",
        "Vacuum tanker truck pumping sewage — septic tank emptying Tallinn",
        "Ассенизаторская машина откачивает стоки — опустошение септика Таллин"
      ),
      galleryAlt: ls(
        "Fekaaliauto septiku juures Harjumaal",
        "Sewage tanker at septic tank location in Harjumaa Estonia",
        "Ассенизатор у септика в Харьюмаа"
      ),
    },
  ];

  for (const svc of SERVICES) {
    console.log(`\n── Processing: ${svc.slugStr}`);

    let heroAsset, galleryAsset;

    console.log("  Uploading hero image…");
    try {
      heroAsset = await uploadImg(svc.imgKw1, `${svc.slugStr}-hero.jpg`);
      console.log(`  Hero asset: ${heroAsset._id}`);
    } catch (e) {
      console.error(`  Hero upload failed: ${e.message}`);
    }

    console.log("  Uploading gallery image…");
    try {
      galleryAsset = await uploadImg(svc.imgKw2, `${svc.slugStr}-gallery-1.jpg`);
      console.log(`  Gallery asset: ${galleryAsset._id}`);
    } catch (e) {
      console.error(`  Gallery upload failed: ${e.message}`);
    }

    const doc = {
      _type: "service",
      slug:  slug(svc.slugStr),
      pathSegment: svc.pathSegment,
      category:    { _type: "reference", _ref: svc.categoryId },
      icon:        svc.icon,
      order:       svc.order,
      title:              svc.title,
      shortDescription:   svc.shortDescription,
      body:               svc.body,
      metaTitle:          svc.metaTitle,
      metaDescription:    svc.metaDescription,
      ...(heroAsset ? {
        image: {
          _type:  "image",
          asset:  { _type: "reference", _ref: heroAsset._id },
          alt:    svc.imageAlt,
        },
      } : {}),
      ...(galleryAsset ? {
        gallery: [{
          _type:  "image",
          _key:   "g1",
          asset:  { _type: "reference", _ref: galleryAsset._id },
          alt:    svc.galleryAlt,
        }],
      } : {}),
    };

    try {
      await upsert(doc);
    } catch (e) {
      console.error(`  UPSERT FAILED for ${svc.slugStr}:`, e.message);
    }
  }

  console.log("\n✨  Done! All 3 services are live in Sanity.");
  console.log("   riser-pipe-replacement  → /en/services/riser-pipe-replacement");
  console.log("   sewer-jetting           → /en/services/sewer-jetting");
  console.log("   sewage-removal          → /en/services/sewage-removal");
}

main().catch((err) => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
