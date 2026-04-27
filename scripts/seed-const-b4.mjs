/**
 * scripts/seed-const-b4.mjs
 * Seeds 4 home-services documents in Sanity with trilingual content + images.
 * Run: node --env-file=.env.local scripts/seed-const-b4.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion= process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

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
const lt = (et, en, ru) => ({ _type: "localeText",   et, en, ru });
const lb = (et, en, ru) => ({
  _type: "localeBlock",
  et: toPortableText(et),
  en: toPortableText(en),
  ru: toPortableText(ru),
});

async function uploadImg(kw, filename) {
  console.log(`  Uploading image: ${filename} (kw: ${kw})`);
  const res = await fetch(
    `https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`,
    { redirect: "follow" }
  );
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} for ${kw}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patch(slug, data) {
  const doc = await client.fetch(
    `*[_type=="service" && slug.current==$s][0]{_id}`,
    { s: slug }
  );
  if (!doc) { console.error(`NOT FOUND: ${slug}`); return false; }
  await client.patch(doc._id).set(data).commit();
  console.log(`  Patched: ${slug}`);
  return true;
}

// ── SERVICE 1: stairwell-balcony-renovation ───────────────────────────────────

const S1_ET = `Trepikoja ja rõdu remont Tallinnas – professionaalne ja häiretevaba

Trepikoda ja rõdu on kortermaja esimene mulje – nii elanikele kui külalistele. Kulunud seinad, katkised rõdupiiarded, rikki läinud valgustus või vana postkastisein ei ole pelgalt esteetiline probleem, vaid mõjutavad ka kinnisvara väärtust ja elanike igapäevast mugavust. Meie meeskond pakub korteriühistutele ja eramutele terviklikku trepikoja ning rõdu renoveerimislahendust Tallinnas ja Harjumaal.

Mida me pakume?

Maalimine ja krohvimine: Eemaldame vana katte, parandame praod ja ebatasasused ning kanname peale kvaliteetse põhikrundi ja lõppkatte. Kasutame niiskuskindlaid ja kergesti puhastatavaid värve, mis sobivad treppide kõrge läbiliikumisega keskkonda.

Põrandakatted: Paigaldame epoxykatted, betooni värvimise ja kulumiskindlad põrandamaterjalid, mis taluvad tugevat kasutust ja on lihtne hooldada. Iga materjal valitakse vastavalt hoone iseloomule ja eelarvele.

Valgustuse uuendamine: Paigaldame LED-valgustuse liikumisanduritega, mis tagavad nii energiasäästu kui ka ohutuse. Uuendame ka vananenud elektrijuhtmestikku vastavalt kehtivatele normidele.

Postkastide paigaldus: Paigaldame uued metallpostkastid nimesiltidega – kena, turvaline ja korrektne lahendus igale kortermajale.

Piirdeaedade remont ja vahetus: Parandame või vahetame trepikoja ja rõdu raudpiirded, tagades nii ohutuse kui ka kaasaegse välimuse. Kasutame kvaliteetset galvaniseeritud või roostevabast terasest materjali.

Interkomsüsteemide paigaldus: Integreerime kaasaegsed videointerkomi lahendused, mis suurendavad hoone turvalisust ja mugavust.

Rõdu remont ja veepidavuse tagamine: Taastame rõdu isolatsiooni, remontime karkassi ja kanname peale veepidava katte, mis kaitseb hoonet sademevee eest.

Korteriühistute jaoks

Teame, et trepikoja remont tähendab töid elanike igapäevase liikumisruumi sees. Seetõttu planeerime tööd hoolikalt, teavitame elanikke ette, töötame etapiviisiliselt ja tagame, et prügi ja ehitusmaterjalid ei takista treppide kasutamist. Eelistame töötada nädalavahetustel või varahommikul, kui liikumine on minimaalne.

Pakume korteriühistutele grupiostuhinda – mida rohkem kortereid osalevad, seda soodsam on ühiku hind. Samuti koordineerime kõiki töid ühe lepingu all, mis tähendab vähem peavalu ühistu juhatusele.

Tallinn ja Harjumaa – täielik katvus

Teenindame kõiki Tallinna linnaosasid ning Harjumaa valdasid. Tasuta ülevaatus ja hinnapakkumine on saadaval kõikidele projektidele. Kirjalik garantii materjalidele ja töödele – see on meie standard iga projekti juures.

Helistage meile juba täna ning lepime kokku tasuta ülevaatuse aja!`;

const S1_EN = `Stairwell and Balcony Renovation in Tallinn – Professional, Minimal Disruption

The stairwell and balcony are the first impression of any apartment building – for residents and visitors alike. Worn walls, damaged railings, broken lighting, or an ageing mailbox panel are not just aesthetic problems; they affect property value and residents' daily comfort. Our team provides comprehensive stairwell and balcony renovation solutions for homeowner associations (HOAs) and residential buildings across Tallinn and Harjumaa county.

What we offer

Painting and plastering: We remove old coatings, repair cracks and uneven surfaces, and apply a quality primer and finish coat. We use moisture-resistant, easy-to-clean paints designed for the high-traffic environment of staircases.

Floor coatings: We install epoxy coatings, concrete paint, and durable flooring materials that withstand heavy use and are easy to maintain. Each material is selected according to the building's character and budget.

Lighting upgrade: We install LED lighting with motion sensors, providing both energy savings and improved safety. We also update outdated electrical wiring in compliance with current regulations.

Mailbox installation: We fit new metal mailboxes with name plates – a neat, secure, and practical solution for every apartment building.

Railing repair and replacement: We repair or replace stairwell and balcony railings, ensuring both safety and a modern appearance. We use high-quality galvanised or stainless steel materials.

Intercom system installation: We integrate modern video intercom solutions that increase building security and convenience for residents.

Balcony repair and waterproofing: We restore balcony insulation, repair the frame, and apply a waterproof coating to protect the structure from rainwater and moisture.

Working with HOAs

We understand that stairwell renovation takes place inside residents' everyday living space. We plan work carefully, notify residents in advance, work in stages, and ensure that debris and building materials never obstruct the stairway. We prefer to work during weekends or early mornings when foot traffic is minimal.

We offer HOAs group-purchase pricing – the more apartments participating, the lower the per-unit cost. We also coordinate all work under a single contract, reducing administrative burden on the HOA board.

Tallinn and Harjumaa – full coverage

We serve all Tallinn districts and Harjumaa municipalities. A free inspection and quote are available for every project. Written warranty on both materials and workmanship – our standard for every project.

Call us today to arrange your free initial inspection!`;

const S1_RU = `Ремонт лестничной клетки и балкона в Таллине – профессионально, без неудобств для жильцов

Лестничная клетка и балкон – это первое впечатление о доме для жильцов и гостей. Обветшалые стены, повреждённые перила, неработающее освещение или старая секция почтовых ящиков – это не только эстетическая проблема, но и фактор, влияющий на стоимость недвижимости и ежедневный комфорт жильцов. Наша команда предлагает ТСЖ и жилым домам комплексные решения по ремонту лестничных клеток и балконов в Таллине и уезде Харьюмаа.

Что мы предлагаем?

Покраска и оштукатуривание: Снимаем старое покрытие, устраняем трещины и неровности, наносим качественную грунтовку и финишное покрытие. Используем влагостойкие, легкочистящиеся краски, рассчитанные на интенсивный трафик лестничных клеток.

Напольные покрытия: Укладываем эпоксидные покрытия, окрашиваем бетонные полы и монтируем износостойкие напольные материалы, выдерживающие высокую нагрузку и простые в уходе. Материал подбирается с учётом характера здания и бюджета.

Модернизация освещения: Устанавливаем светодиодное освещение с датчиками движения, обеспечивая экономию энергии и безопасность. При необходимости заменяем устаревшую электропроводку в соответствии с действующими нормами.

Установка почтовых ящиков: Монтируем новые металлические почтовые ящики с именными табличками – аккуратное, безопасное и практичное решение для любого многоквартирного дома.

Ремонт и замена перил: Ремонтируем или заменяем перила лестничных клеток и балконов, обеспечивая безопасность и современный облик. Используем качественную оцинкованную сталь или нержавейку.

Установка систем домофона: Интегрируем современные видеодомофонные решения для повышения безопасности здания и удобства жильцов.

Ремонт балкона и гидроизоляция: Восстанавливаем утепление балкона, ремонтируем каркас и наносим гидроизоляционное покрытие для защиты конструкции от осадков и влаги.

Работа с ТСЖ

Мы понимаем, что ремонт лестничной клетки проходит в пространстве, которым жильцы пользуются ежедневно. Поэтому мы тщательно планируем работы, заблаговременно информируем жильцов, работаем поэтапно и следим за тем, чтобы мусор и строительные материалы не загораживали лестницу. Предпочитаем работать в выходные дни или ранним утром, когда трафик минимален.

ТСЖ предлагаем групповую цену – чем больше квартир участвует, тем ниже стоимость на единицу. Все работы координируются в рамках одного договора, снижая административную нагрузку на правление ТСЖ.

Таллин и уезд Харьюмаа – полное покрытие

Мы обслуживаем все районы Таллина и муниципалитеты Харьюмаа. Бесплатный осмотр и смета – для каждого проекта. Письменная гарантия на материалы и работы – наш стандарт для каждого проекта.

Позвоните нам сегодня, чтобы договориться о бесплатном первичном осмотре!`;

// ── SERVICE 2: interior-design ────────────────────────────────────────────────

const S2_ET = `Sisekujundus Tallinnas – kontseptsioonist valmis ruumini ühe meeskonnaga

Hea sisekujundus ei ole luksus – see on investeering, mis muudab iga päeva mugavamaks, ilusamaks ja funktsionaalsemaks. Meie sisekujunduse meeskond Tallinnas töötab nii eluruumide kui äripindadega, pakkudes terviklikku teenust: alates esmasest konsultatsioonist kuni valmis lahenduse üleandmiseni. Disain ja ehitus kuuluvad meil samasse kätte – see tähendab vähem koordineerimist teie jaoks ja paremat lõpptulemust.

Protsess algab teie soovidest

Esimene konsultatsioon on tasuta. Kohtume teie ruumis, kuulame teie ootusi, eelistusi ja eelarvet ning hakkame kujundama teie isikupärast kontseptsiooni. Meie kujundajad esitavad teile selge visuaalse ettekujutuse tuleviku ruumist juba enne, kui ükski sein on maali saanud.

Kontseptsiooni arendus

Töötame välja ruumi kontseptsiooni, mis arvestab teie elustiili, hoone arhitektuuri ja päevavalguse tingimusi. Kontseptsioon hõlmab mööbli paigutuse plaani, värvide ja materjalide paleti ning valgustuse lahenduse. Kõik elemendid on omavahel seotud tervikliku stiiliotsusega.

Ruumiplaneerimine

Optimaalse ruumikasutuse tagamiseks kasutame kaasaegseid planeerimistööriistu. Olgu tegu väikese korteri, suurema maja, kontori või poeruumiga – meie planeerimine tagab, et iga ruutmeeter on kasutusel efektiivselt.

Materjalide ja värvide valik

Abistame teid materjalide valikul: põrandakatted, seinakatted, tekstiilid, köögipinnad, valgustusarmatuurid jm. Meie materjalide kogu hõlmab laias hinnavahemikus lahendusi nii eelarveteadlikele kui kõrgema lisandväärtusega projektidele.

3D visualiseerimine

Iga projekt sisaldab 3D visualiseerimist – näete oma ruumi foto-realistlikult enne, kui ehitustööd algavad. See võimaldab teha muudatusi ilma kuluka ümberehitamiseta ja annab kindlustunde, et lõpptulemus vastab ootustele.

Valgustuse disain

Valgustus on ruumi tunnetuse alus. Planeerime nii üldvalgustuse, töövalgustuse kui ka atmosfääri loova dekoratiivvalgustuse – LED-lahendused, peitvalgustus, reguleeritavad skeemid.

Disain ja ehitus ühe lepinguga

Meie lisaväärtus on see, et disainimeeskond töötab tihedas koostöös meie ehitusmeeskonnaga. See tähendab, et kujundaja valikud arvestavad ehitustehnilisi reaalsusi, muudatused saab kiiresti ellu viia ning ühtne vastutus tagab parema kvaliteeditaseme.

Elamud ja äripinnad

Renoveerime ja kujundame kortereid, eramuid, bürooruume, restorane, kauplusi ja avalikke ruume. Iga projekt on ainulaadne – meie lahendused on alati kohandatud teie konkreetse ruumi ja eesmärkide järgi.

Tallinn – tasuta konsultatsioon

Helistage meile või täitke veebivorm. Esimene kohtumine ja konsultatsioon on alati tasuta. Saame kokku, räägime teie unistustest ja alustame teie uue ruumi loomist.`;

const S2_EN = `Interior Design in Tallinn – From Concept to Completed Space, One Team

Good interior design is not a luxury – it is an investment that makes every day more comfortable, beautiful, and functional. Our interior design team in Tallinn works with both residential and commercial spaces, offering a full-service experience from the initial consultation to the handover of the finished result. Design and construction belong to the same team here – less coordination for you, better outcome for everyone.

The process starts with your ideas

The first consultation is free. We meet in your space, listen to your expectations, preferences, and budget, and begin shaping your personalised concept. Our designers give you a clear visual picture of your future space before a single wall has been painted.

Concept development

We develop a spatial concept that accounts for your lifestyle, the building's architecture, and natural light conditions. The concept encompasses a furniture layout plan, a colour and materials palette, and a lighting solution. Every element is connected by a coherent stylistic vision.

Space planning

We use modern planning tools to ensure optimal use of every square metre. Whether the project is a compact apartment, a larger house, an office, or a retail space – our planning ensures every area works efficiently.

Material and colour selection

We guide you through the selection of materials: floor finishes, wall coverings, textiles, kitchen surfaces, lighting fixtures, and more. Our materials library covers a wide price range, from budget-conscious choices to high-end finishes.

3D visualisation

Every project includes 3D visualisation – you see your space in photorealistic detail before construction begins. This allows changes to be made without costly rework and gives you confidence that the final result will match your expectations.

Lighting design

Lighting defines how a space feels. We plan general lighting, task lighting, and atmospheric decorative lighting – LED solutions, concealed strips, and dimmable schemes tailored to each room.

Design and build under one contract

Our key advantage is that the design team works in close collaboration with our construction crew. This means designer decisions account for construction realities, changes can be implemented quickly, and unified responsibility ensures a higher quality standard throughout.

Residential and commercial

We design and renovate apartments, private houses, offices, restaurants, shops, and public spaces. Every project is unique – our solutions are always tailored to your specific space and objectives.

Tallinn – free initial consultation

Call us or submit the online form. The first meeting and consultation are always free. Let's meet, talk about your vision, and start creating your new space.`;

const S2_RU = `Дизайн интерьера в Таллине – от концепции до готового пространства, одна команда

Хороший дизайн интерьера – это не роскошь, а инвестиция, которая делает каждый день более комфортным, красивым и функциональным. Наша команда дизайнеров интерьера в Таллине работает как с жилыми, так и с коммерческими помещениями, предоставляя полный спектр услуг – от первичной консультации до сдачи готового результата. Дизайн и строительство – в одних руках: меньше координации для вас, лучший результат для всех.

Процесс начинается с ваших идей

Первая консультация бесплатна. Мы встречаемся в вашем пространстве, выслушиваем ваши ожидания, предпочтения и бюджет и начинаем формировать персональную концепцию. Наши дизайнеры дают вам чёткое визуальное представление о будущем пространстве ещё до того, как будет покрашена хоть одна стена.

Разработка концепции

Мы разрабатываем пространственную концепцию с учётом вашего образа жизни, архитектуры здания и условий естественного освещения. Концепция включает план расстановки мебели, палитру цветов и материалов, а также решение по освещению. Все элементы объединены единым стилистическим видением.

Планировка пространства

Мы используем современные инструменты планирования для оптимального использования каждого квадратного метра. Будь то компактная квартира, просторный дом, офис или торговое помещение – наша планировка обеспечивает эффективную работу каждой зоны.

Подбор материалов и цветов

Мы помогаем вам выбрать материалы: напольные покрытия, отделку стен, текстиль, кухонные поверхности, осветительную арматуру и многое другое. Наша библиотека материалов охватывает широкий ценовой диапазон – от бюджетных решений до элитных отделок.

3D визуализация

Каждый проект включает 3D визуализацию – вы видите своё пространство в фотореалистичных деталях ещё до начала строительства. Это позволяет вносить изменения без дорогостоящих переделок и даёт уверенность в том, что конечный результат соответствует ожиданиям.

Дизайн освещения

Освещение определяет восприятие пространства. Мы проектируем общее освещение, рабочее освещение и атмосферное декоративное освещение – светодиодные решения, скрытые ленты и диммируемые схемы для каждого помещения.

Дизайн и ремонт по одному договору

Наше ключевое преимущество – дизайнерская команда работает в тесном сотрудничестве со строительной бригадой. Это означает, что решения дизайнера учитывают строительные реалии, изменения внедряются быстро, а единая ответственность обеспечивает более высокий стандарт качества.

Жилые и коммерческие объекты

Мы проектируем и ремонтируем квартиры, частные дома, офисы, рестораны, магазины и общественные пространства. Каждый проект уникален – наши решения всегда адаптированы под ваше конкретное пространство и цели.

Таллин – бесплатная первичная консультация

Позвоните нам или заполните форму на сайте. Первая встреча и консультация всегда бесплатны. Давайте встретимся, поговорим о вашем видении и начнём создавать ваше новое пространство.`;

// ── SERVICE 3: 3d-visualization ───────────────────────────────────────────────

const S3_ET = `3D visualiseerimine Tallinnas – foto-realistlikud renderid enne ehitust

Kujutage ette, et näete oma uut kodu, bürood või pinda täpselt sellisena nagu see saab olema – enne kui ükski töö on alanud. Just seda pakub meie 3D visualiseerimisteenus Tallinnas. Foto-realistlikud renderid võimaldavad teil teha teadlikke otsuseid, vältida kulukaid muudatusi ehituse keskel ning olla kindel lõpptulemuses.

Mida me teeme?

Visualiseerime kortereid, eramuid, bürooruume, kaubanduspindasid, restorane, hotelle ja muid äri- ning elamispindu. Iga render on täpselt modelleeritud – materjalid, värvid, tekstuurid, valgustus (nii loomulik kui kunstlik) ning mööbel on esitatud sellisena nagu nad ehitusjärgselt välja näevad.

Protsess

Esitame teile küsimustiku või kohtume projekteerimisfaasis. Saadate meile plaanid, kujunduse kirjelduse ja materjaliloendi (või kasutame meie soovitusi). Meie 3D-kunstnikud modelleerivad ruumi täpselt ja toodavad kõrgresolutsioonis renderid. Tavapärane tähtaeg on 3–7 tööpäeva sõltuvalt projekti mahust.

Milleks on 3D visualiseerimine kasulik?

Otsustusprotsessi kiirendamine: Näete tulemust enne ehituse algust – seda nii ehitaja kui tellija seisukohalt. Kulude kokkuhoid: Muudatused, mis tehakse arvutis, maksavad murdosa sellest, mida need maksaksid ehitusjärgselt. Klientide veenmine: Arhitektid, kujundajad ja arendajad kasutavad meie rendereid klientidele esitluste tegemiseks. Turundusmaterjalid: Korterite eelmüük, veebisaidi visuaalid, sotsiaalmeedia sisu – kõik saab alguse foto-realistlikust renderist.

Kõik materjalid ja valgustus täpselt modelleeritud

Meie meeskond modellib iga detaili: põrandamaterjali sõmera tekstuuri, akendest sisenevat päevavalgust, LED-riba ülalt laest ja mööbli varje. Tulemuseks on render, mida on raske eristada tegelikust fotost.

Kiire tähtaeg – 3 kuni 7 päeva

Mõistame, et projektides on tähtajad. Seetõttu pakume ühe toa renderi jaoks 3-päevast tähtaega ja suuremamahulistele projektidele (5–10 ruumi) 7-päevast tähtaega. Kiirtellimused on võimalikud lisatasu eest.

Koos sisekujundusega

Meie 3D visualiseerimisteenus on tihedalt seotud meie sisekujunduse teenusega. Kui teete meiega kujunduse, on 3D renderid enamasti kaasas. Samuti teeme visualiseerimist iseseisvalt – olenemata sellest, kes ruumi kujundab.

Tallinn – võtke meiega ühendust

Küsige hinnapakkumist, kirjeldades lühidalt oma projekti. Esimene hindav konsultatsioon on tasuta. Teeme teie ruumist foto-realistliku pildi – kiiresti, täpselt ja professionaalselt.`;

const S3_EN = `3D Visualisation in Tallinn – Photorealistic Renders Before Work Begins

Imagine seeing your new home, office, or commercial space exactly as it will look – before a single wall has been touched. That is what our 3D visualisation service in Tallinn delivers. Photorealistic renders let you make informed decisions, avoid costly mid-build changes, and feel confident in the outcome before committing to construction.

What we visualise

We produce renders for apartments, private houses, offices, retail spaces, restaurants, hotels, and other residential and commercial environments. Every render is accurately modelled – materials, colours, textures, lighting (both natural and artificial), and furniture are presented precisely as they will appear after completion.

The process

We send you a brief questionnaire or meet during the design phase. You share floor plans, a description of the design intent, and a material list (or we work from our own recommendations). Our 3D artists model the space accurately and produce high-resolution renders. Standard turnaround is 3–7 working days depending on project scale.

Why is 3D visualisation valuable?

Faster decision-making: You see the outcome before work starts – useful for both contractor and client. Cost savings: Changes made on screen cost a fraction of what they would after construction. Client presentation: Architects, designers, and developers use our renders to present projects to clients and investors. Marketing material: Pre-sales for apartments, website visuals, social media content – all benefit from a photorealistic render.

All materials and lighting accurately modelled

Our team models every detail: the grain of a floor finish, the daylight entering through windows, the glow of an LED strip from a recessed ceiling, and the shadows cast by furniture. The result is a render that is difficult to distinguish from a real photograph.

Fast turnaround – 3 to 7 days

We understand that projects run to deadlines. We offer a 3-day turnaround for single-room renders and a 7-day turnaround for larger projects (5–10 rooms). Rush orders are available for an additional fee.

Combined with interior design

Our 3D visualisation service is closely linked to our interior design offering. When you commission a design from us, 3D renders are typically included. We also produce visualisations independently – regardless of who is designing the space.

Tallinn – contact us today

Request a quote by briefly describing your project. The initial assessment call is free. We will produce a photorealistic image of your space – fast, accurate, and professional.`;

const S3_RU = `3D визуализация в Таллине – фотореалистичные рендеры до начала работ

Представьте, что вы видите свою новую квартиру, офис или коммерческое помещение в точности таким, каким оно будет выглядеть – ещё до того, как тронута хоть одна стена. Именно это предлагает наш сервис 3D визуализации в Таллине. Фотореалистичные рендеры позволяют принимать взвешенные решения, избегать дорогостоящих изменений в процессе строительства и быть уверенным в результате ещё до начала работ.

Что мы визуализируем?

Мы создаём рендеры квартир, частных домов, офисов, торговых площадей, ресторанов, гостиниц и других жилых и коммерческих объектов. Каждый рендер точно смоделирован – материалы, цвета, текстуры, освещение (как естественное, так и искусственное) и мебель представлены именно так, как они будут выглядеть после завершения работ.

Процесс

Мы отправляем вам краткий опросник или встречаемся на этапе проектирования. Вы передаёте нам планы, описание дизайн-концепции и перечень материалов (или мы работаем по нашим собственным рекомендациям). Наши 3D-художники точно моделируют пространство и создают рендеры в высоком разрешении. Стандартный срок выполнения – 3–7 рабочих дней в зависимости от масштаба проекта.

Почему 3D визуализация ценна?

Ускорение принятия решений: Вы видите результат до начала работ – удобно как для подрядчика, так и для заказчика. Экономия средств: Изменения на экране обходятся в разы дешевле, чем после завершения строительства. Презентация клиентам: Архитекторы, дизайнеры и застройщики используют наши рендеры для презентаций проектов клиентам и инвесторам. Маркетинговые материалы: Предпродажа квартир, визуалы для сайта, контент для социальных сетей – всё выигрывает от фотореалистичного рендера.

Все материалы и освещение точно смоделированы

Наша команда моделирует каждую деталь: фактуру напольного покрытия, дневной свет, проникающий через окна, свечение светодиодной ленты в нише потолка и тени от мебели. Результат – рендер, который сложно отличить от реальной фотографии.

Быстрые сроки – 3–7 дней

Мы понимаем, что проекты требуют соблюдения сроков. Для рендера одного помещения – 3 дня, для крупных проектов (5–10 комнат) – 7 дней. Срочные заказы возможны за дополнительную плату.

В сочетании с дизайном интерьера

Наш сервис 3D визуализации тесно связан с услугой дизайна интерьера. При заказе дизайна у нас 3D рендеры, как правило, включены в пакет. Мы также создаём визуализации независимо – вне зависимости от того, кто проектирует пространство.

Таллин – свяжитесь с нами сегодня

Запросите смету, кратко описав ваш проект. Первичная оценочная консультация бесплатна. Мы создадим фотореалистичный образ вашего пространства – быстро, точно и профессионально.`;

// ── SERVICE 4: property-maintenance ──────────────────────────────────────────

const S4_ET = `Kinnisvara hooldus Tallinnas – korrapidamine, ülevaatused ja ennetusremont lepinguga

Kinnisvara väärtuse säilitamine nõuab järjepidevat hooldust. Olgu tegu üürikorterite portfelli, korteriühistu, ärihoone või tootmisruumiga – üks usaldusväärne partner kõigi hooldusvajaduste katmiseks lihtsustab elu ja hoiab kokku kulusid pikas perspektiivis. Meie kinnisvara hoolduslepingud Tallinnas ja Harjumaal pakuvad just seda: terviklikku, ennustatavat ja dokumenteeritud halduslahendust.

Mida meie hoolduslepingud hõlmavad?

Regulaarsed tehnilised ülevaatused: Teostame plaanipärased ülevaatused, mille käigus kontrollime hoone tehnosüsteeme (küte, ventilatsioon, veevarustus, kanalisatsioon), konstruktsioone, katus, fassaadi ja ühiskasutatavaid ruume. Iga ülevaatuse kohta koostatakse kirjalik protokoll fotodega.

Ennetusremonditööd: Väikesed probleemid lahendatakse enne, kui nad muutuvad suureks. Meie tehnikud tegelevad lekkivate kraanidega, halveneva isolatsiooniga, kulunud tihenditega, rippuvate plaatidega ja muude selliste probleemidega enne nende eskaleerumist.

Avariireageerimine: Isegi parima ennetuse korral juhtub ootamatuid rikkeid. Meie hooldusleping hõlmab prioriteetset avariireageerimist – saabume viivitamatult ja lahendame olukorra.

Puhastuse koordineerimine: Korraldame üldkasutatavate ruumide regulaarset koristust, sh trepikodade, garaažide, keldrirruumide ja välisvaldade puhastust.

Haljastus ja lumenäitamine: Koordineerime hooajalisi töid – muruplatsid, hekid, aiaprahi koristus sügisel ning lumekühveldamine, liiva ja soola laotamine talvel.

Läbipaistev aruandlus

Iga kuu esitame teile kokkuvõtte tehtud töödest, planeeritud ülesannetest ja mis tahes tähelepanekutest. Teil on alati selge ülevaade, mida teie kinnisvaraga tehtakse ja mida on lähiajal oodata. Kõik tööd on dokumenteeritud fotodega enne ja pärast.

Üks kontaktisik, üks leping

Meie hooldusleping tähendab üht lihtsustatud suhtluspunkti. Ei pea helistama eri töövõtjatele, otsima erinevaid hinnapakkumisi iga pisema probleemi jaoks ega muretsema, kes mida koordineerib. Meie vastutame kogu teenuse eest.

Kellele meie hoolduslepingud sobivad?

Üürileandjad ja kinnisvaraportfelli omanikud, kes soovivad oma vara korras hoida ilma igapäevase sekkumiseta. Korteriühistud, kes otsivad usaldusväärset partnerit haldustöödeks. Ärikinnisvara omanikud, kellel on kontorid, laod või tootmisruumid. Ettevõtted, kes vajavad oma äripinna regulaarset hooldust.

Paindlikud lepinguvormid

Pakume kuulepinguid, poolaasta ja aastapakette. Mida pikem leping, seda soodsam kuuarve. Lepingusisune töö hõlmab kindlaks kokku lepitud hooldustöid, lisatöid teostame eraldi vastavalt vajadusele selge hinnapakkumise alusel.

Tallinn ja Harjumaa – alusta juba täna

Võtke meiega ühendust kinnisvara hoolduslepingu sõlmimiseks. Esimene ülevaatus ja hinnapakkumine on tasuta. Saab alguse kinnisvarapartnerlusega, mis teeb teie elu lihtsamaks ja hoiab teie vara väärtuse kõrgena.`;

const S4_EN = `Property Maintenance in Tallinn – Inspections, Preventive Repairs, and Contract-Based Care

Preserving property value requires consistent maintenance. Whether you manage a portfolio of rental apartments, an HOA building, a commercial property, or an industrial facility – one reliable partner covering all maintenance needs simplifies operations and reduces long-term costs. Our property maintenance contracts in Tallinn and Harjumaa county deliver exactly that: a comprehensive, predictable, and fully documented management solution.

What our maintenance contracts cover

Regular technical inspections: We carry out scheduled inspections covering the building's technical systems (heating, ventilation, water supply, drainage), structural elements, roof, facade, and common areas. Every inspection produces a written report with photographs.

Preventive maintenance: Small problems are resolved before they become large ones. Our technicians address dripping taps, deteriorating insulation, worn seals, loose tiles, and similar issues before they escalate into costly repairs.

Emergency response: Even with the best preventive programme, unexpected failures occur. Our maintenance contract includes priority emergency response – we arrive promptly and resolve the situation.

Cleaning coordination: We organise regular cleaning of common areas, including stairwells, garages, basement rooms, and outdoor areas.

Landscaping and snow clearing: We coordinate seasonal work – lawn mowing, hedge trimming, leaf clearance in autumn, and snow shovelling, gritting, and salting in winter.

Transparent reporting

Every month we provide you with a summary of completed work, planned tasks, and any observations. You always have a clear picture of what is happening with your property and what to expect in the coming period. All work is documented with before-and-after photographs.

One point of contact, one contract

Our maintenance contract means a single, simplified communication channel. No need to call different contractors, seek separate quotes for every minor issue, or worry about who coordinates what. We take full responsibility for the entire service.

Who are our maintenance contracts suited for?

Landlords and property portfolio owners who want to keep their assets in excellent condition without daily involvement. HOAs seeking a reliable partner for building management tasks. Commercial property owners with offices, warehouses, or production facilities. Businesses requiring regular maintenance of their premises.

Flexible contract options

We offer monthly, half-yearly, and annual packages. The longer the contract term, the lower the monthly rate. Work specified in the contract covers agreed maintenance tasks; additional work is carried out separately based on a clear quote.

Tallinn and Harjumaa – get started today

Contact us to arrange a property maintenance contract. The first inspection and quote are free. Begin a property partnership that makes your life easier and keeps your asset value high.`;

const S4_RU = `Обслуживание недвижимости в Таллине – осмотры, профилактический ремонт и договорное обслуживание

Сохранение стоимости недвижимости требует постоянного обслуживания. Независимо от того, управляете ли вы портфелем арендных квартир, домом ТСЖ, коммерческой или промышленной недвижимостью – один надёжный партнёр, покрывающий все потребности в обслуживании, упрощает управление и снижает долгосрочные расходы. Наши договоры на обслуживание недвижимости в Таллине и уезде Харьюмаа предлагают именно это: комплексное, предсказуемое и полностью документированное решение.

Что включают наши договоры на обслуживание?

Регулярные технические осмотры: Мы проводим плановые осмотры инженерных систем здания (отопление, вентиляция, водоснабжение, канализация), конструктивных элементов, кровли, фасада и общих помещений. По каждому осмотру составляется письменный акт с фотографиями.

Профилактический ремонт: Небольшие проблемы устраняются до того, как они становятся крупными. Наши техники занимаются капающими кранами, ухудшающейся изоляцией, изношенными уплотнителями, отслаивающейся плиткой и подобными проблемами до их эскалации.

Аварийное реагирование: Даже при наилучшей профилактике случаются непредвиденные поломки. Наш договор на обслуживание включает приоритетное аварийное реагирование – мы прибываем незамедлительно и устраняем ситуацию.

Координация уборки: Мы организуем регулярную уборку общих помещений, включая лестничные клетки, гаражи, подвальные помещения и придомовую территорию.

Озеленение и уборка снега: Координируем сезонные работы – кошение газонов, стрижку живой изгороди, уборку листьев осенью, а также уборку снега, посыпку песком и солью зимой.

Прозрачная отчётность

Каждый месяц предоставляем сводку выполненных работ, запланированных задач и наблюдений. Вы всегда имеете чёткое представление о том, что происходит с вашей недвижимостью и что ожидать в ближайший период. Все работы документируются фотографиями до и после.

Один контакт, один договор

Наш договор на обслуживание – это единый упрощённый канал взаимодействия. Не нужно звонить разным подрядчикам, запрашивать отдельные сметы на каждую мелкую проблему или беспокоиться о том, кто что координирует. Мы несём полную ответственность за весь комплекс услуг.

Кому подходят наши договоры?

Арендодателям и владельцам портфелей недвижимости, желающим поддерживать активы в отличном состоянии без ежедневного вмешательства. ТСЖ, ищущим надёжного партнёра для управления зданием. Владельцам коммерческой недвижимости – офисов, складов, производственных помещений. Компаниям, нуждающимся в регулярном обслуживании своих помещений.

Гибкие варианты договоров

Предлагаем ежемесячные, полугодовые и годовые пакеты. Чем длиннее срок договора, тем ниже ежемесячная ставка. Работы по договору охватывают согласованные задачи технического обслуживания; дополнительные работы выполняются отдельно на основании прозрачной сметы.

Таллин и уезд Харьюмаа – начните уже сегодня

Свяжитесь с нами для заключения договора на обслуживание недвижимости. Первый осмотр и смета бесплатны. Начните партнёрство в сфере недвижимости, которое упростит вашу жизнь и сохранит высокую стоимость вашего актива.`;

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const services = [
    {
      slug:      "stairwell-balcony-renovation",
      heroKw:    "stairwell renovation apartment building interior",
      galleryKw: "balcony repair renovation building exterior",
      heroFn:    "stairwell-balcony-renovation-hero.jpg",
      galleryFn: "stairwell-balcony-renovation-g1.jpg",
      shortDesc: lt(
        "Trepikoja ja rõdu remont kortermajadele Tallinnas – maalimine, põrandakatted, valgustus, piirdeaed ja interkom. Korteriühistutele grupiostuhind, minimaalne häiring elanikele.",
        "Stairwell and balcony renovation for apartment buildings in Tallinn – painting, floor coatings, lighting, railings, and intercom. HOA group pricing, minimal disruption to residents.",
        "Ремонт лестничной клетки и балкона для многоквартирных домов в Таллине – покраска, полы, освещение, перила, домофон. Групповые цены для ТСЖ, минимальные неудобства для жильцов."
      ),
      metaTitle: ls(
        "Trepikoja remont Tallinn – KÜ, garantii, grupp",
        "Stairwell Renovation Tallinn – HOA, Group Price",
        "Ремонт лестничной клетки Таллин – ТСЖ, группа"
      ),
      metaDesc: ls(
        "Trepikoja ja rõdu remont Tallinnas – maalimine, epoxy, valgustus, piirdeaed, interkom. Korteriühistutele grupiostuhind, minimaalne häiring elanikele. Tasuta hinnapakkumine.",
        "Stairwell and balcony renovation Tallinn – painting, epoxy floors, lighting, railings, intercom. HOA group pricing, minimal disruption. Free quote for your building.",
        "Ремонт лестничной клетки и балкона Таллин – покраска, эпоксид, освещение, перила, домофон. Групповые цены для ТСЖ, без неудобств для жильцов. Бесплатная смета."
      ),
      heroAlt: ls(
        "Renoveeritud trepikoda kortermaja Tallinnas",
        "Renovated stairwell in an apartment building in Tallinn",
        "Отремонтированная лестничная клетка в многоквартирном доме в Таллине"
      ),
      galleryAlt: ls(
        "Rõdu remont kortermaja fassaadil Tallinnas",
        "Balcony renovation on an apartment building facade in Tallinn",
        "Ремонт балкона на фасаде многоквартирного дома в Таллине"
      ),
      body: lb(S1_ET, S1_EN, S1_RU),
    },
    {
      slug:      "interior-design",
      heroKw:    "interior design modern home living room",
      galleryKw: "interior designer planning consultation",
      heroFn:    "interior-design-hero.jpg",
      galleryFn: "interior-design-g1.jpg",
      shortDesc: lt(
        "Sisekujundus Tallinnas – kontseptsioon, ruumiplaneerimine, materjalid, 3D visualiseerimine ja ehitus ühe meeskonnaga. Elamu- ja äripinnad. Tasuta esimene konsultatsioon.",
        "Interior design in Tallinn – concept, space planning, materials, 3D visualisation, and build by one team. Residential and commercial. Free initial consultation.",
        "Дизайн интерьера в Таллине – концепция, планировка, материалы, 3D визуализация и ремонт одной командой. Жилые и коммерческие объекты. Бесплатная первичная консультация."
      ),
      metaTitle: ls(
        "Sisekujundus Tallinn – 3D, disain+ehitus, tasuta",
        "Interior Design Tallinn – 3D, Design & Build",
        "Дизайн интерьера Таллин – 3D, дизайн и ремонт"
      ),
      metaDesc: ls(
        "Sisekujundus Tallinnas – kontseptsioon, värvid, materjalid, mööblipaigutus, 3D visualiseerimine. Disain ja ehitus ühe lepinguga. Elamu- ja äripinnad. Tasuta konsultatsioon.",
        "Interior design in Tallinn – concept, colours, materials, furniture layout, 3D visualisation. Design and build under one contract. Residential and commercial. Free consultation.",
        "Дизайн интерьера в Таллине – концепция, цвета, материалы, расстановка мебели, 3D визуализация. Дизайн и ремонт по одному договору. Жилые и коммерческие. Бесплатная консультация."
      ),
      heroAlt: ls(
        "Kaasaegne disainitud elutuba Tallinnas – sisekujunduse projekt",
        "Modern designed living room in Tallinn – interior design project",
        "Современная гостиная в Таллине – проект дизайна интерьера"
      ),
      galleryAlt: ls(
        "Sisekujundaja planeerib ruumi kliendiga Tallinnas",
        "Interior designer planning a space with a client in Tallinn",
        "Дизайнер интерьера планирует пространство с клиентом в Таллине"
      ),
      body: lb(S2_ET, S2_EN, S2_RU),
    },
    {
      slug:      "3d-visualization",
      heroKw:    "3d interior visualization architectural render",
      galleryKw: "photorealistic rendering interior design",
      heroFn:    "3d-visualization-hero.jpg",
      galleryFn: "3d-visualization-g1.jpg",
      shortDesc: lt(
        "3D visualiseerimine Tallinnas – foto-realistlikud renderid korteritele, majadele ja büroodele. Näe oma ruumi enne ehitust. Kiire tähtaeg 3–7 tööpäeva.",
        "3D visualisation in Tallinn – photorealistic renders for apartments, houses, and offices. See your space before work starts. Fast turnaround 3–7 working days.",
        "3D визуализация в Таллине – фотореалистичные рендеры для квартир, домов и офисов. Увидьте ваше пространство до начала работ. Быстрые сроки 3–7 рабочих дней."
      ),
      metaTitle: ls(
        "3D visualiseerimine Tallinn – 3–7 päeva, realistlik",
        "3D Visualisation Tallinn – 3–7 Days, Photorealistic",
        "3D визуализация Таллин – 3–7 дней, фотореализм"
      ),
      metaDesc: ls(
        "3D visualiseerimine Tallinnas – foto-realistlikud renderid korteritele, majadele, büroodele. Kõik materjalid ja valgustus täpselt modelleeritud. Tähtaeg 3–7 päeva. Tasuta hinnapakkumine.",
        "3D visualisation Tallinn – photorealistic renders for apartments, houses, offices, retail. All materials and lighting accurately modelled. Turnaround 3–7 days. Free quote.",
        "3D визуализация Таллин – фотореалистичные рендеры для квартир, домов, офисов. Все материалы и освещение точно смоделированы. Срок 3–7 дней. Бесплатная смета."
      ),
      heroAlt: ls(
        "Foto-realistlik 3D render kaasaegsest elamust Tallinnas",
        "Photorealistic 3D render of a modern interior in Tallinn",
        "Фотореалистичный 3D рендер современного интерьера в Таллине"
      ),
      galleryAlt: ls(
        "Arhitektuurne render bürooruumist – 3D visualiseerimine Tallinn",
        "Architectural render of an office space – 3D visualisation Tallinn",
        "Архитектурный рендер офисного помещения – 3D визуализация Таллин"
      ),
      body: lb(S3_ET, S3_EN, S3_RU),
    },
    {
      slug:      "property-maintenance",
      heroKw:    "property building maintenance facility management",
      galleryKw: "building maintenance inspection repair",
      heroFn:    "property-maintenance-hero.jpg",
      galleryFn: "property-maintenance-g1.jpg",
      shortDesc: lt(
        "Kinnisvara hooldus Tallinnas – regulaarsed ülevaatused, ennetusremont, avariiabi, puhastuse ja haljastuse koordineerimine. Üürileandjatele, korteriühistutele ja ärikinnisvara omanikele. Kuu- ja aastlepingud.",
        "Property maintenance in Tallinn – regular inspections, preventive repairs, emergency response, cleaning and landscaping coordination. For landlords, HOAs, and commercial owners. Monthly and annual contracts.",
        "Обслуживание недвижимости в Таллине – регулярные осмотры, профилактический ремонт, аварийное реагирование, уборка и озеленение. Для арендодателей, ТСЖ и коммерческих объектов. Ежемесячные и годовые договоры."
      ),
      metaTitle: ls(
        "Kinnisvara hooldus Tallinn – leping, ülevaatused",
        "Property Maintenance Tallinn – Contracts, Inspections",
        "Обслуживание недвижимости Таллин – договор, осмотры"
      ),
      metaDesc: ls(
        "Kinnisvara hoolduslepingud Tallinnas – ülevaatused, preventiivremonditööd, avariiabi, puhastus, haljastus. Üürileandjatele, KÜ-dele, ärikinnisvara omanikele. Läbipaistev aruandlus, tasuta hinnapakkumine.",
        "Property maintenance contracts Tallinn – inspections, preventive repairs, emergency response, cleaning, landscaping. Landlords, HOAs, commercial property owners. Transparent reporting, free quote.",
        "Договоры на обслуживание недвижимости Таллин – осмотры, профилактический ремонт, аварийная служба, уборка, озеленение. Арендодатели, ТСЖ, коммерческая недвижимость. Прозрачная отчётность, бесплатная смета."
      ),
      heroAlt: ls(
        "Kinnisvarahoolduse tehnik kontrollimas hoone süsteeme Tallinnas",
        "Property maintenance technician inspecting building systems in Tallinn",
        "Техник по обслуживанию недвижимости проверяет инженерные системы здания в Таллине"
      ),
      galleryAlt: ls(
        "Hoone ülevaatus ja hooldus – kinnisvara korrashoid Tallinnas",
        "Building inspection and maintenance – property upkeep in Tallinn",
        "Осмотр и техническое обслуживание здания – управление недвижимостью в Таллине"
      ),
      body: lb(S4_ET, S4_EN, S4_RU),
    },
  ];

  for (const svc of services) {
    console.log(`\nProcessing: ${svc.slug}`);
    try {
      console.log("  Uploading hero image...");
      const heroAsset = await uploadImg(svc.heroKw, svc.heroFn);
      console.log("  Uploading gallery image...");
      const galleryAsset = await uploadImg(svc.galleryKw, svc.galleryFn);

      const data = {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: heroAsset._id },
          alt: svc.heroAlt,
        },
        gallery: [
          {
            _key: "g0",
            _type: "image",
            asset: { _type: "reference", _ref: galleryAsset._id },
            alt: svc.galleryAlt,
          },
        ],
        shortDescription: svc.shortDesc,
        body: svc.body,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDesc,
      };

      const ok = await patch(svc.slug, data);
      if (ok) console.log(`SUCCESS: ${svc.slug}`);
    } catch (err) {
      console.error(`FAILED: ${svc.slug}`, err.message);
    }
  }

  console.log("\nDone.");
}

main();
