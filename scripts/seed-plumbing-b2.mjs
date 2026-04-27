/**
 * scripts/seed-plumbing-b2.mjs
 * Creates or patches 3 plumbing/home-services documents in Sanity:
 *   1. drain-blockage-removal
 *   2. plumber-on-call
 *   3. radiator-installation
 *
 * Run: node --env-file=.env.local scripts/seed-plumbing-b2.mjs
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (default: production)
 *   SANITY_API_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

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

const ls = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt = (et, en, ru) => ({ _type: "localeText", et, en, ru });
const lb = (et, en, ru) => ({
  _type: "localeBlock",
  et: toPortableText(et),
  en: toPortableText(en),
  ru: toPortableText(ru),
});

async function uploadImg(kw, filename) {
  const url = `https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`;
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
  console.log("✓ patched:", slug);
}

async function upsert(doc) {
  const existing = await client.fetch(
    `*[_type=="service" && slug.current==$s][0]._id`,
    { s: doc.slug.current }
  );
  if (existing) {
    console.log(`ℹ️  Already exists (${existing}), patching: ${doc.slug.current}`);
    await client.patch(existing).set(doc).commit();
    console.log(`✓ patched: ${doc.slug.current}`);
    return existing;
  }
  const created = await client.create(doc);
  console.log(`✓ created: ${created._id} (${doc.slug.current})`);
  return created._id;
}

// ── CATEGORY REF ─────────────────────────────────────────────────────────────
// "serviceCategory-plumbing-works" is the deterministic _id set by seed-service-categories.mjs
const PLUMBING_CAT_REF = { _type: "reference", _ref: "serviceCategory-plumbing-works" };

// ════════════════════════════════════════════════════════════════════════════
// SERVICE 1 — drain-blockage-removal
// ════════════════════════════════════════════════════════════════════════════

const DRAIN_ET = `Ummistuse eemaldamine Tallinnas — kiire ja garanteeritud lahendus

Ummistunud äravoolutoru, kraanikauss, tualett või põrandakaevu äravool on üks levinumaid toruprobleeme, millega Tallinna ja Harjumaa leibkonnad igapäevaselt kokku puutuvad. Torudeabi24 meeskond on spetsialiseerunud kõikvõimalike ummistuste professionaalsele eemaldamisele — kiiresti, tõhusalt ja garantiiga.

Miks ummistused tekivad?

Kanalisatsiooniummistused tekivad tavaliselt rasva, toidujääkide, juuste, seebijääkide, tualettpaberit ylekasutamise või võõrkehade tõttu. Vanades Tallinna majades põhjustavad ummistusi sageli ka kaltsifitsieerunud torud, juurtega tungitud kanalisatsioon ja kulunud torustiku osad. Mida kauem ummistust ignoreerida, seda suuremaks kasvab probleem ja seda kõrgemaks kujuneb lõpparve.

Milliseid meetodeid kasutame?

Meie spetsialistid kasutavad olukorrast sõltuvalt mitut meetodit. Hüdrojeting ehk survepesur on kõige tõhusam meetod rasvaummistuste, katlakivi ja juurte eemaldamiseks — veesurvega kuni 300 baari puhastatakse toru täielikult. Mehaaniline spiraaltraadi puhastus sobib klassikaliste tahkete ummistuste eemaldamiseks köökides ja vannitubades. Vaakumimistehnika aitab kiiresti lokaliseerida ja eemaldada võõrkehad äravoolukaevudest ja sügavatest torudest. Kaameraülevaatus on kaasaegne videokaamera torustikus, mis aitab täpselt leida ummistuse asukoha ja põhjuse, ilma et peaks torustikku lõhkuma.

Kraanide, kraanikausside ja köökide äravoolud

Köögi äravoolud ummistuvad sageli rasva ja toidujääkide tõttu, mis kogunevad aja jooksul toru seintele. Seetõttu ei piisa ainult vahendite kasutamisest — rasvaummistuse puhul on vaja survepesuga puhastada terve torulõik. Meie meeskond puhastab kõiki köögi-, vannitoa- ja pesukapi äravoole professionaalselt.

Tualettide ja WC-de ummistused

Tualetid ummistuvad sageli tualettpaberit ylekasutamise, niiskete salvrätikute, mähkmete või muude võõrkehade tõttu. Meie spetsialistid kasutavad professionaalseid eemaldusriistu, mis ei kahjusta tualettisangat ega ühendustorustikku.

Põrandakaevude ja rõduäravolude puhastus

Põrandakaevud koguvad juukseid, seebijääke ja mustust. Meie regulaarne hoolduspuhastus hoiab teie vannitoa ja rõdu äravoolu lahtisena aastaringselt.

Teenuse territoorium — Tallinn ja Harjumaa

Teenindame Tallinna kõiki linnaosi ning Harjumaa omavalitsusi: Viimsi, Maardu, Saue, Keila, Raasiku, Jõelähtme ja teisi. Kiireloomuliste ummistuste puhul saabuvad meie meistrid tavaliselt 1–2 tunni jooksul. Töötame ka nädalavahetustel ja riiklikel pühadel.

Garantii ja tasuta konsultatsioon

Kõikidele ummistuseemalduse töödele anname 30-päevase garantii — kui ummistus kordub sama koha peal, tuleme tagasi tasuta. Esmane telefonikonsultatsioon ja hinnapakkumine on alati tasuta. Helista meile juba täna ja lahendame su ummistusprobleem sama päeva jooksul.`;

const DRAIN_EN = `Drain Blockage Removal in Tallinn — Fast, Effective, Guaranteed

A blocked drain, sink, toilet or floor gully is one of the most common plumbing problems faced by households and businesses across Tallinn and Harjumaa. The Torudeabi24 team specialises in the professional removal of all types of blockages — quickly, effectively and with a guarantee.

Why do blockages occur?

Drainage blockages are typically caused by grease, food debris, hair, soap scum, excessive toilet paper or foreign objects. In older Tallinn properties, calcified pipes, root intrusion into drainage systems and worn pipe sections are also frequent culprits. The longer a blockage is left untreated, the worse it becomes and the higher the final repair bill.

Methods we use

Our specialists deploy several methods depending on the situation. High-pressure water jetting is the most effective method for clearing grease deposits, limescale and root intrusion — water pressure of up to 300 bar cleans the pipe completely. Mechanical drain snake cleaning is ideal for clearing solid blockages in kitchen sinks and bathroom wastes. Vacuum extraction rapidly localises and removes foreign objects from inspection chambers and deep pipes. CCTV drain survey uses a modern video camera inside the pipework to pinpoint the exact location and cause of the blockage without any excavation.

Kitchen sinks and grease traps

Kitchen drains block frequently due to grease and food particles that accumulate on pipe walls over time. Simply using off-the-shelf products is not enough — a grease blockage requires high-pressure jetting of the entire pipe run. Our team cleans all kitchen, bathroom and utility room wastes professionally.

Toilet and WC blockages

Toilets block from excessive toilet paper, wet wipes, nappies or other foreign objects. Our specialists use professional extraction tools that do not damage the toilet pan or connecting pipework.

Floor gullies and balcony drains

Floor gullies collect hair, soap residue and grime. Our regular maintenance cleaning keeps your bathroom and balcony drain clear all year round.

Coverage — Tallinn and Harjumaa

We serve all districts of Tallinn and municipalities throughout Harjumaa: Viimsi, Maardu, Saue, Keila, Raasiku, Jõelähtme and others. For urgent blockages our technicians typically arrive within 1–2 hours. We work weekends and public holidays.

Warranty and free consultation

All blockage removal work carries a 30-day guarantee — if the same blockage recurs we return free of charge. Initial telephone consultation and quotation are always free. Call us today and we will resolve your blockage on the same day.`;

const DRAIN_RU = `Прочистка канализации в Таллине — быстро, эффективно, с гарантией

Засорившаяся канализация, раковина, унитаз или трап — одна из самых распространённых сантехнических проблем, с которой сталкиваются жители и предприятия Таллина и уезда Харьюмаа. Команда Torudeabi24 специализируется на профессиональном устранении любых засоров — быстро, эффективно и с гарантией.

Почему возникают засоры?

Засоры канализации, как правило, вызываются жиром, пищевыми остатками, волосами, мыльным осадком, чрезмерным использованием туалетной бумаги или посторонними предметами. В старых домах Таллина засоры часто обусловлены известковыми отложениями в трубах, проникновением корней деревьев в канализацию и износом трубопровода. Чем дольше откладывать устранение засора, тем серьёзнее становится проблема и тем дороже обойдётся ремонт.

Методы прочистки

Наши специалисты применяют несколько методов в зависимости от ситуации. Гидропромывка высоким давлением — наиболее эффективный метод удаления жировых пробок, известкового налёта и корней: давление воды до 300 бар полностью очищает трубу. Механическая прочистка тросом — идеальна для удаления твёрдых засоров в кухонных раковинах и ванных комнатах. Вакуумная откачка — быстро локализует и извлекает посторонние предметы из ревизионных колодцев и глубоких труб. Телеинспекция (видеодиагностика) — видеокамера внутри трубопровода точно определяет место и причину засора без вскрытия.

Раковины и кухонная канализация

Кухонные сливы часто засоряются жиром и пищевыми частицами, оседающими на стенках труб. Использования бытовых средств недостаточно — жировая пробка требует гидропромывки всего участка трубы. Наша команда профессионально прочищает все кухонные, ванные и хозяйственные сливы.

Засоры унитаза и туалета

Унитазы засоряются из-за чрезмерного количества туалетной бумаги, влажных салфеток, подгузников и других посторонних предметов. Наши специалисты применяют профессиональный инструмент, не повреждающий чашу унитаза и соединительный трубопровод.

Напольные трапы и балконные сливы

Напольные трапы накапливают волосы, мыльный осадок и грязь. Наша регулярная профилактическая прочистка обеспечивает свободный сток в вашей ванной и на балконе круглый год.

Зона обслуживания — Таллин и Харьюмаа

Обслуживаем все районы Таллина и муниципалитеты уезда Харьюмаа: Виймси, Маарду, Сауэ, Кейла, Раасику, Йыэляхтме и другие. При срочных засорах наши мастера, как правило, прибывают в течение 1–2 часов. Работаем в выходные и праздничные дни.

Гарантия и бесплатная консультация

На все работы по прочистке канализации — 30-дневная гарантия: если засор повторится на том же участке, мы вернёмся бесплатно. Первичная консультация по телефону и смета — всегда бесплатно. Звоните сегодня — устраним засор в день обращения.`;

// ════════════════════════════════════════════════════════════════════════════
// SERVICE 2 — plumber-on-call
// ════════════════════════════════════════════════════════════════════════════

const ONCALL_ET = `Torumeister väljakutsega Tallinnas — paindlik, kiirel ja taskukohane

Kas vajate torumeistrit, kes saabub teie juurde täpselt siis, kui vaja? Torudeabi24 pakub professionaalset väljakutsetorumeistri teenust kogu Tallinnas ja Harjumaal. Meie sertifitseeritud spetsialistid on valmis teenindama teid paindliku graafiku alusel — sama päeval, nädalavahetusel või õhtusel ajal.

Mida tähendab väljakutsega torumeistri teenus?

Väljakutsega torumeister tähendab, et te ei pea ootama pikki järjekordi ega kooskõlastama aega nädalate ette. Helistate meile, kirjeldate probleemi ja meie lepime teiega kokku sobiva kellaaja — sageli sama päeva jooksul. Meie meistrid saabuvad varustatud kõige vajaliku tööriistade ja varuosadega, et lahendada enamik probleeme esmakordse külastusega.

Millised tööd kuuluvad väljakutseteenuse alla?

Meie väljakutsemeistrid tegelevad laia valikuga sanitaartehnika- ja torutöödega: lekete kõrvaldamine veetorudes, liitmikutes ja ühenduskohtades, kraanide ja segistite vahetus või remont, WC-poti mehhanismi vahetus ja reguleerimine, dušikannu, vanni ja valamu äravoolu remont, sifoonide puhastamine ja vahetus, pesumasina ja nõudepesumasina ühendamine, veesurveprobleemide diagnoosimine ja lahendamine, väiksemad kanalisatsioonitööd ja ummistuste eemaldamine, boileri ja veesoojendi kontrollimine ning lihtsamad remonttööd. Nii väikesed kui suured tööd — kõike teeme professionaalselt ja tähtaja jooksul.

Paindlik graafik — ka nädalavahetustel ja õhtusel ajal

Me mõistame, et toruprobleemid ei arvesta tööpäevadega. Seetõttu pakume oma väljakutsetorumeistri teenust ka nädalavahetustel ja õhtusel ajal. Esmase konsultatsiooni järel lepime kokku aja, mis sobib teile, mitte meile.

Sama päeva teenus Tallinnas ja Harjumaal

Kiireloomuliste väikeremontide puhul võime sageli saabuda sama päeva jooksul. Teenindame Tallinna kõiki linnaosi ning Harjumaa omavalitsusi, sh Viimsi, Maardu, Saue, Keila ja Raasiku piirkondi. Meie meistrid tunnevad hästi kohalikke veetorustikke, tüüpilisi probleeme vanades kortermajades ja uusehitistes.

Sertifitseeritud ja kogenud spetsialistid

Kõik meie torumeistrid on läbinud erialase koolituse ja omavad kehtivat kutsetunnistust. Töötame läbipaistvalt — hinnapakkumine enne tööde algust, arve pärast tööde lõpetamist. Ei mingeid peidetud tasusid.

Taskukohased hinnad ja ausad arveldused

Torudeabi24 hinnad on Tallinna turu ühed mõistlikumad. Väljakutsetasu sisaldub kogu tööde hinnas — ei mingeid üllatusi arvel. Tasuta hinnapakkumiseks helistage meile juba täna. Ühe kõnega saate kogenud torumeistri juurde — paindlikult, kiiresti ja taskukohaselt.`;

const ONCALL_EN = `Plumber on Call in Tallinn — Flexible, Same-Day, Affordable

Need a plumber who comes to you exactly when you need them? Torudeabi24 offers a professional on-call plumbing service across all of Tallinn and Harjumaa. Our certified specialists are available on a flexible schedule — same day, evenings and weekends.

What does an on-call plumber service mean?

An on-call plumber means you do not have to join long waiting lists or book weeks in advance. You call us, describe the problem and we agree on a convenient time — often on the same day. Our technicians arrive fully equipped with tools and spare parts to resolve the majority of issues on the first visit.

What work is covered?

Our on-call plumbers handle a wide range of plumbing and sanitary work: fixing leaks in water pipes, fittings and joints, replacing or repairing taps and mixer taps, replacing and adjusting WC cistern mechanisms, repairing shower tray, bath and basin wastes, cleaning and replacing trap siphons, connecting washing machines and dishwashers, diagnosing and resolving low or high water pressure issues, minor drain clearing and blockage removal, inspecting and carrying out simple repairs on boilers and water heaters. Both small and large jobs handled professionally and on time.

Flexible schedule — evenings and weekends included

We understand that plumbing problems do not respect working hours. That is why we offer our on-call plumber service on evenings and weekends too. After a brief consultation we arrange a time that suits you, not just us.

Same-day service in Tallinn and Harjumaa

For urgent small repairs we can often arrive on the same day. We cover all districts of Tallinn and municipalities of Harjumaa including Viimsi, Maardu, Saue, Keila and Raasiku. Our technicians know the local pipework, the typical issues found in older apartment blocks and in new builds.

Licensed and experienced professionals

All our plumbers hold a professional qualification certificate. We operate transparently — a quote before work begins, an invoice once completed. No hidden charges.

Affordable pricing and honest billing

Torudeabi24 pricing is among the most competitive in the Tallinn market. The call-out fee is included in the total job price — no surprises on the invoice. Call us today for a free quote. One call gets you an experienced plumber — flexibly, quickly and affordably.`;

const ONCALL_RU = `Сантехник на вызов в Таллине — тот же день, гибкий график, доступные цены

Нужен сантехник, который приедет именно тогда, когда вам нужно? Torudeabi24 предлагает профессиональную услугу вызова сантехника по всему Таллину и уезду Харьюмаа. Наши сертифицированные специалисты работают по гибкому графику — в тот же день, по вечерам и в выходные.

Что означает услуга «сантехник на вызов»?

Сантехник на вызов означает, что вам не нужно стоять в очередях или записываться за недели вперёд. Вы звоните нам, описываете проблему — и мы договариваемся об удобном времени, зачастую в тот же день. Наши мастера приезжают с полным набором инструментов и запчастей, чтобы решить большинство проблем за один визит.

Какие работы входят в услугу?

Наши мастера выполняют широкий спектр сантехнических работ: устранение течей в трубах, фитингах и соединениях, замена или ремонт кранов и смесителей, замена и регулировка механизма сливного бачка унитаза, ремонт сливов душевого поддона, ванны и раковины, прочистка и замена сифонов, подключение стиральных и посудомоечных машин, диагностика и устранение проблем с давлением воды, мелкая прочистка канализации и устранение засоров, проверка и несложный ремонт бойлеров и водонагревателей. Как небольшие, так и крупные работы — всё профессионально и в срок.

Гибкий график — включая вечера и выходные

Мы понимаем, что сантехнические проблемы не считаются с рабочим днём. Поэтому предлагаем услугу вызова сантехника также по вечерам и в выходные. После краткой консультации назначаем время, удобное вам, а не только нам.

Выезд в тот же день по Таллину и Харьюмаа

При срочных небольших ремонтах мы часто можем приехать в тот же день. Обслуживаем все районы Таллина и муниципалитеты Харьюмаа, включая Виймси, Маарду, Сауэ, Кейла и Раасику. Наши мастера хорошо знают местные трубопроводные системы, типичные проблемы старых многоквартирных домов и новостроек.

Лицензированные и опытные специалисты

Все наши сантехники имеют действующие профессиональные квалификационные удостоверения. Работаем прозрачно: смета до начала работ, счёт после их завершения. Никаких скрытых платежей.

Доступные цены и честное выставление счётов

Цены Torudeabi24 — одни из самых конкурентных на рынке Таллина. Стоимость выезда включена в общую цену работ — никаких сюрпризов в счёте. Звоните сегодня для получения бесплатной сметы. Один звонок — и опытный сантехник уже едет к вам: гибко, быстро и по доступной цене.`;

// ════════════════════════════════════════════════════════════════════════════
// SERVICE 3 — radiator-installation
// ════════════════════════════════════════════════════════════════════════════

const RADIATOR_ET = `Radiaatori paigaldus Tallinnas — kõik tüübid, surveproov, energiasääst

Radiaatori paigaldus ja vahetus on üks levinumaid küttesüsteemi hooldus- ja uuendustöid Tallinna ja Harjumaa kodudes ning äripindadel. Torudeabi24 meeskond paigaldab kõiki radiaatorite tüüpe — terasplaatradiaatorid, alumiiniumradiaatorid, malm­radiaatorid — ning tagab korrektse ühenduse tsentraalse küttesüsteemiga, süsteemi tasakaalustamise ja survemõõtmise.

Millal on aeg radiaator vahetada?

Vana radiaator tuleks välja vahetada mitmel juhul: kui esineb nähtavaid roosteplekkide, lekete või deformatsioonide märke, kui radiaator ei soojenda ühtlaselt (ülemise osa on kuum, alumine aga külm), kui ventiilid on roostetanud või ei reguleeri korrektselt, renoveerimistöödel, kui vahetatakse sisekujundust, ning energiasäästuprojektides, kus vanad malmist radiaatorid asendatakse efektiivsematega.

Radiaatorite tüübid ja nende omadused

Meie meeskond paigaldab kõiki Eestis kasutatavaid radiaatorite tüüpe. Terasplaatradiaatorid on tänapäeva populaarseim valik — kerged, kompaktsed, kiirete soojendumisajaga. Saadaval eri paneeliarvuga (11, 21, 22, 33) ja mõõtudes. Alumiiniumradiaatorid soojenduvad veel kiiremini ja on kergematest materjalidest. Sobivad suurepäraselt uutesse ehitistesse ja renoveeritud korteritesse. Malmradiaatorid on vastupidavad klassikud, kuid vajavad rohkem aega soojendumiseks. Sobivad hästi majadele, kus soojusenergia tarbimine on stabiilselt kõrge. Designradiaatorid pakuvad esteetilist väärtust lisaks soojale — vertikaalsed, kaarjad ja dekoratiivsed mudelid.

Paigaldusprotsess — samm-sammult

Esmalt hindame teie küttesüsteemi tüüpi ja töörõhku, mõõdame ruumi soojusvajaduse ning soovitame sobivat radiaatorimõõtu ja tüüpi. Paigalduspäeval lülitame vana radiaatori välja ja tühjendame sektsioonid, paigaldame uued konsooli- või seinakinnitusvahendid, ühendame uue radiaatori, sealhulgas termostaatilised reguleerimisklapid, täidame süsteemi uuesti ja kontrollime lekkeid, tasakaalustame süsteemi ja reguleerime termostaatventiile optimaalseks soojusjaotuseks, teostame surveproovi lõplikuks kinnituseks.

Surveproov — ohutuse tagatis

Pärast iga paigaldust või olulisemat remonti teostame surveproovi vastavalt küttesüsteemi töörõhunõuetele. Surveproov tuvastab võimalikud lekked liitmikutes ja keermetes, annab kinnituse, et süsteem on hermeetiline ja valmis täielikuks kasutuseks. See on eriti oluline tsentraalsete küttesüsteemide puhul, kus leke võib mõjutada tervet hoonet.

Energiasääst ja aruka kütte lahendused

Uued terasplaatradiaatorid koos termostaatventiilidega võivad vähendada teie küttearveid kuni 15–20%, kuna need reageerivad kiiremini ruumitemperatuuriga. Pakume ka nutikaid termostaatlahendusi — programmeeritavad termostaadid, mida saab seadistada küttegraafikule vastavalt.

Teeninduspiirkond — Tallinn ja Harjumaa

Teostame radiaatori paigaldusi ja vahetusi kogu Tallinnas ja Harjumaal. Kiire kohaleilmumisaeg, paindlik graafik ka nädalavahetustel. Tasuta hinnapakkumine ja konsultatsioon — helistage meile juba täna.`;

const RADIATOR_EN = `Radiator Installation in Tallinn — All Types, Pressure Test, Energy Efficient

Radiator installation and replacement is one of the most common heating system maintenance and upgrade jobs in homes and commercial premises across Tallinn and Harjumaa. The Torudeabi24 team installs all types of radiators — steel panel, aluminium, cast iron — and ensures correct connection to the central heating system, system balancing and pressure testing.

When is it time to replace a radiator?

An old radiator should be replaced in several situations: visible rust patches, leaks or deformation, uneven heating where the top is hot but the bottom stays cold, corroded or non-functioning valves, during renovation when interior finishes are being updated, or as part of an energy efficiency upgrade replacing old cast iron radiators with modern equivalents.

Types of radiators and their characteristics

Our team installs all radiator types used in Estonia. Steel panel radiators are the most popular modern choice — lightweight, compact and with fast warm-up times. Available in various panel configurations (11, 21, 22, 33) and sizes. Aluminium radiators heat up even faster and are made from lighter materials. Ideal for new builds and refurbished flats. Cast iron radiators are durable classics that take longer to heat up but retain heat well. Well suited to properties with consistently high heat demand. Designer radiators add aesthetic value alongside warmth — vertical, curved and decorative models available.

Installation process — step by step

We begin by assessing your heating system type and working pressure, measuring the room's heat loss and recommending the appropriate radiator size and type. On installation day we isolate and drain the old radiator, fit new brackets or wall fixings, connect the new radiator including thermostatic radiator valves, refill and check for leaks, balance the system and adjust thermostatic valves for optimum heat distribution, then carry out a pressure test for final verification.

Pressure test — your safety guarantee

After every installation or significant repair we carry out a pressure test in line with the heating system's working pressure requirements. The pressure test detects any leaks at joints and threads and confirms the system is fully sealed and ready for operation. This is especially important for central heating systems where a leak can affect an entire building.

Energy savings and smart heating

New steel panel radiators with thermostatic valves can reduce your heating bills by up to 15–20% because they respond more quickly to room temperature changes. We also offer smart thermostat solutions — programmable thermostats that can be set to a heating schedule to avoid wasting energy.

Service area — Tallinn and Harjumaa

We carry out radiator installations and replacements throughout Tallinn and Harjumaa. Fast response times and flexible scheduling including weekends. Free quote and consultation — call us today.`;

const RADIATOR_RU = `Установка радиатора в Таллине — все виды, опрессовка, энергосбережение, гарантия

Установка и замена радиаторов — одна из наиболее востребованных услуг по обслуживанию и модернизации систем отопления в жилых и коммерческих объектах Таллина и уезда Харьюмаа. Команда Torudeabi24 устанавливает все типы радиаторов — стальные панельные, алюминиевые, чугунные — и обеспечивает правильное подключение к центральной системе отопления, её балансировку и опрессовку.

Когда пора менять радиатор?

Замена старого радиатора необходима в ряде случаев: видимые пятна ржавчины, течи или деформации; неравномерный нагрев, когда верхняя часть горячая, а нижняя остаётся холодной; заржавевшие или нефункционирующие клапаны; при ремонте с обновлением интерьера; в рамках проекта повышения энергоэффективности — замена старых чугунных радиаторов современными.

Виды радиаторов и их характеристики

Наша команда устанавливает все типы радиаторов, используемых в Эстонии. Стальные панельные радиаторы — наиболее популярный современный выбор: лёгкие, компактные, с быстрым временем нагрева. Доступны в различных конфигурациях панелей (11, 21, 22, 33) и размерах. Алюминиевые радиаторы нагреваются ещё быстрее и изготовлены из более лёгких материалов. Идеальны для новостроек и отремонтированных квартир. Чугунные радиаторы — долговечная классика с медленным нагревом, но хорошей теплоотдачей. Подходят для объектов с постоянно высокой потребностью в тепле. Дизайнерские радиаторы сочетают эстетику и тепло — вертикальные, изогнутые и декоративные модели.

Процесс установки — шаг за шагом

Начинаем с оценки типа вашей системы отопления и рабочего давления, расчёта теплопотерь помещения и подбора подходящего типа и размера радиатора. В день монтажа отключаем и сливаем старый радиатор, устанавливаем новые кронштейны или настенные крепления, подключаем новый радиатор включая термостатические клапаны, заполняем систему и проверяем на герметичность, балансируем систему и регулируем термостатические клапаны для оптимального распределения тепла, затем выполняем опрессовку для окончательной проверки.

Опрессовка — гарантия безопасности

После каждой установки или значительного ремонта проводим опрессовку в соответствии с требованиями рабочего давления системы отопления. Опрессовка обнаруживает утечки в соединениях и резьбовых соединениях и подтверждает полную герметичность системы и готовность к эксплуатации. Это особенно важно для центральных систем отопления, где утечка может затронуть всё здание.

Энергосбережение и умное отопление

Новые стальные панельные радиаторы с термостатическими клапанами могут снизить ваши расходы на отопление на 15–20%, поскольку быстрее реагируют на изменения температуры в помещении. Предлагаем также умные термостатные решения — программируемые термостаты с настройкой расписания отопления для экономии энергии.

Зона обслуживания — Таллин и Харьюмаа

Выполняем установку и замену радиаторов по всему Таллину и уезду Харьюмаа. Быстрый выезд, гибкий график включая выходные. Бесплатная смета и консультация — звоните сегодня. Гарантия на все работы.`;

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log("🔧  Seeding plumbing-b2 services…\n");

  // ── 1. drain-blockage-removal ─────────────────────────────────────────────
  console.log("── Service 1: drain-blockage-removal");
  try {
    console.log("  Uploading hero image…");
    const heroAsset1 = await uploadImg("drain cleaning blocked sink pipe", "drain-blockage-removal-hero.jpg");
    console.log("  Hero asset:", heroAsset1._id);

    console.log("  Uploading gallery image…");
    const galleryAsset1 = await uploadImg("plumber drain unblocking", "drain-blockage-removal-gallery-1.jpg");
    console.log("  Gallery asset:", galleryAsset1._id);

    const doc1 = {
      _type: "service",
      title: ls(
        "Ummistuse eemaldamine",
        "Drain Blockage Removal",
        "Прочистка канализации"
      ),
      slug: { _type: "slug", current: "drain-blockage-removal" },
      pathSegment: {
        et: "ummistuse-eemaldamine",
        ru: "прочистка-канализации",
      },
      category: PLUMBING_CAT_REF,
      icon: "Droplets",
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset1._id },
        alt: ls(
          "Torumeister eemaldab ummistust kanalisatsioonis Tallinnas",
          "Plumber removing drain blockage in Tallinn Estonia",
          "Сантехник прочищает засор канализации в Таллине"
        ),
      },
      gallery: [
        {
          _type: "image",
          _key: "g1",
          asset: { _type: "reference", _ref: galleryAsset1._id },
          alt: ls(
            "Kanalisatsiooni survepesu hüdrojeting Tallinnas",
            "High-pressure drain jetting service Tallinn Estonia",
            "Гидропромывка канализации высоким давлением в Таллине"
          ),
        },
      ],
      shortDescription: lt(
        "Ummistunud kanalisatsioon, kraanikauss või tualett — lahendame probleemi samal päeval. Hüdrojeting, mehaaniline puhastus ja kaameraülevaatus. 30-päevane garantii.",
        "Blocked drain, sink or toilet fixed the same day. High-pressure jetting, mechanical cleaning and CCTV survey. 30-day guarantee. Serving Tallinn and Harjumaa.",
        "Засорилась канализация, раковина или унитаз — устраним в день обращения. Гидропромывка, механическая прочистка, видеодиагностика. Гарантия 30 дней."
      ),
      body: lb(DRAIN_ET, DRAIN_EN, DRAIN_RU),
      metaTitle: ls(
        "Ummistuse eemaldamine Tallinnas | Kiire & garantii",
        "Drain Blockage Removal Tallinn | Same-Day & Guaranteed",
        "Прочистка канализации Таллин | Быстро и с гарантией"
      ),
      metaDescription: lt(
        "Professionaalne ummistuse eemaldamine Tallinnas ja Harjumaal. Kraanikauss, tualett, põrandakaevu äravool. Hüdrojeting, spiraal, kaameraülevaatus. Tasuta hinnapakkumine!",
        "Professional drain blockage removal in Tallinn & Harjumaa. Sinks, toilets, floor drains. Jetting, snake, CCTV. 30-day guarantee, fast response. Free quote — call now!",
        "Профессиональная прочистка канализации в Таллине и Харьюмаа. Раковины, унитазы, трапы. Гидропромывка, трос, видеодиагностика. Гарантия 30 дней. Бесплатная смета!"
      ),
      order: 30,
    };

    await upsert(doc1);
  } catch (e) {
    console.error("FAILED drain-blockage-removal:", e.message);
  }

  // ── 2. plumber-on-call ────────────────────────────────────────────────────
  console.log("\n── Service 2: plumber-on-call");
  try {
    console.log("  Uploading hero image…");
    const heroAsset2 = await uploadImg("plumber on call service professional", "plumber-on-call-hero.jpg");
    console.log("  Hero asset:", heroAsset2._id);

    console.log("  Uploading gallery image…");
    const galleryAsset2 = await uploadImg("plumbing service technician", "plumber-on-call-gallery-1.jpg");
    console.log("  Gallery asset:", galleryAsset2._id);

    const doc2 = {
      _type: "service",
      title: ls(
        "Torumeister väljakutsega",
        "Plumber on Call",
        "Сантехник на вызов"
      ),
      slug: { _type: "slug", current: "plumber-on-call" },
      pathSegment: {
        et: "torumeister-valjakutsega",
        ru: "сантехник-на-вызов",
      },
      category: PLUMBING_CAT_REF,
      icon: "PhoneCall",
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset2._id },
        alt: ls(
          "Sertifitseeritud torumeister väljakutseteenusel Tallinnas",
          "Certified plumber on-call service in Tallinn Estonia",
          "Сертифицированный сантехник на вызов в Таллине"
        ),
      },
      gallery: [
        {
          _type: "image",
          _key: "g1",
          asset: { _type: "reference", _ref: galleryAsset2._id },
          alt: ls(
            "Torumeister töötab kliendi kodus Tallinnas",
            "Plumber working at a client home in Tallinn Estonia",
            "Сантехник работает в доме клиента в Таллине"
          ),
        },
      ],
      shortDescription: lt(
        "Paindliku graafikuga torumeister Tallinnas ja Harjumaal. Sama päeva teenus, nii väikesed kui suured tööd. Sertifitseeritud spetsialistid, taskukohased hinnad.",
        "Flexible on-call plumber in Tallinn and Harjumaa Estonia. Same-day visits, small and large repairs. Licensed, affordable, quick. Free quote available.",
        "Гибкий сантехник на вызов по Таллину и Харьюмаа. Выезд в тот же день, мелкий и крупный ремонт. Лицензированные специалисты, доступные цены."
      ),
      body: lb(ONCALL_ET, ONCALL_EN, ONCALL_RU),
      metaTitle: ls(
        "Torumeister väljakutsega Tallinnas | Sama päev",
        "Plumber on Call Tallinn Estonia | Same-Day Service",
        "Сантехник на вызов Таллин | Выезд в тот же день"
      ),
      metaDescription: lt(
        "Sertifitseeritud torumeister väljakutsega Tallinnas ja Harjumaal. Paindlik graafik, sama päeva teenus. Lekkide kõrvaldamine, kraanid, WC, boiler. Tasuta hinnapakkumine!",
        "Licensed plumber on call in Tallinn & Harjumaa Estonia. Flexible schedule, same-day service. Leaks, taps, WC, boiler. Affordable rates. Free quote — call now!",
        "Лицензированный сантехник на вызов в Таллине и Харьюмаа. Гибкий график, выезд в тот же день. Утечки, краны, унитазы, бойлеры. Доступные цены. Бесплатная смета!"
      ),
      order: 31,
    };

    await upsert(doc2);
  } catch (e) {
    console.error("FAILED plumber-on-call:", e.message);
  }

  // ── 3. radiator-installation ──────────────────────────────────────────────
  console.log("\n── Service 3: radiator-installation");
  try {
    console.log("  Uploading hero image…");
    const heroAsset3 = await uploadImg("radiator heating installation room", "radiator-installation-hero.jpg");
    console.log("  Hero asset:", heroAsset3._id);

    console.log("  Uploading gallery image…");
    const galleryAsset3 = await uploadImg("central heating radiator modern", "radiator-installation-gallery-1.jpg");
    console.log("  Gallery asset:", galleryAsset3._id);

    const doc3 = {
      _type: "service",
      title: ls(
        "Radiaatori paigaldus",
        "Radiator Installation",
        "Установка радиатора"
      ),
      slug: { _type: "slug", current: "radiator-installation" },
      pathSegment: {
        et: "radiaatori-paigaldus",
        ru: "установка-радиатора",
      },
      category: PLUMBING_CAT_REF,
      icon: "Thermometer",
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset3._id },
        alt: ls(
          "Radiaatori paigaldus ja vahetus kütteruumis Tallinnas",
          "Radiator installation and replacement in a room in Tallinn Estonia",
          "Установка и замена радиатора отопления в Таллине"
        ),
      },
      gallery: [
        {
          _type: "image",
          _key: "g1",
          asset: { _type: "reference", _ref: galleryAsset3._id },
          alt: ls(
            "Kaasaegne tsentraalkütte radiaator koos termostaatventiiliga",
            "Modern central heating radiator with thermostatic valve installed",
            "Современный радиатор центрального отопления с термостатическим клапаном"
          ),
        },
      ],
      shortDescription: lt(
        "Radiaatori paigaldus ja vahetus Tallinnas — kõik tüübid (terasplaat, alumiinium, malm). Ühendus tsentraalse küttega, surveproov, tasakaalustamine. Energiasääst kuni 20%.",
        "Radiator installation and replacement in Tallinn — all types (steel panel, aluminium, cast iron). Central heating connection, pressure test, balancing. Energy-efficient, warranty.",
        "Установка и замена радиаторов в Таллине — все виды (стальные панельные, алюминиевые, чугунные). Подключение к центральному отоплению, опрессовка, балансировка. Гарантия."
      ),
      body: lb(RADIATOR_ET, RADIATOR_EN, RADIATOR_RU),
      metaTitle: ls(
        "Radiaatori paigaldus Tallinnas | Kõik tüübid, garantii",
        "Radiator Installation Tallinn Estonia | All Types, Warranty",
        "Установка радиатора Таллин | Все виды, опрессовка, гарантия"
      ),
      metaDescription: lt(
        "Professionaalne radiaatori paigaldus Tallinnas. Terasplaat, alumiinium, malmradiaator. Tsentraalkütte ühendus, surveproov, tasakaalustamine. Tasuta hinnapakkumine juba täna!",
        "Professional radiator installation in Tallinn Estonia. Steel panel, aluminium, cast iron. Central heating connection, pressure test, balancing. Free quote — call today!",
        "Профессиональная установка радиаторов в Таллине. Стальные панельные, алюминиевые, чугунные. Подключение к ЦО, опрессовка, балансировка. Энергосбережение. Бесплатная смета!"
      ),
      order: 32,
    };

    await upsert(doc3);
  } catch (e) {
    console.error("FAILED radiator-installation:", e.message);
  }

  console.log("\n✨  Done! All 3 services processed.");
  console.log("   URLs (ET / EN / RU):");
  console.log("   /et/teenused/ummistuse-eemaldamine   | /en/services/drain-blockage-removal   | /ru/услуги/прочистка-канализации");
  console.log("   /et/teenused/torumeister-valjakutsega | /en/services/plumber-on-call          | /ru/услуги/сантехник-на-вызов");
  console.log("   /et/teenused/radiaatori-paigaldus     | /en/services/radiator-installation    | /ru/услуги/установка-радиатора");
}

main().catch((err) => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
