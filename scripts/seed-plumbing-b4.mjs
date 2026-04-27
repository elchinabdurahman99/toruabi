/**
 * scripts/seed-plumbing-b4.mjs
 * Patches three plumbing-category services with full trilingual content + images:
 *   1. pipe-cctv-inspection
 *   2. pem-pipe-welding
 *   3. jetting-truck-services
 *
 * Run: node --env-file=.env.local scripts/seed-plumbing-b4.mjs
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET      (default: production)
 *   SANITY_API_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

// ── helpers ────────────────────────────────────────────────────────────────────
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

const ls = (et, en, ru) => ({ _type: "localeString", et, en, ru });
const lt = (et, en, ru) => ({ _type: "localeText",   et, en, ru });
const lb = (et, en, ru) => ({
  _type: "localeBlock",
  et: toPortableText(et),
  en: toPortableText(en),
  ru: toPortableText(ru),
});

async function uploadImg(kw, filename) {
  console.log(`  📷  Fetching image: "${kw}"…`);
  const res = await fetch(
    `https://loremflickr.com/1200/800/${encodeURIComponent(kw.split(' ').slice(0,3).join(','))}/all`,
    { redirect: "follow" }
  );
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} for "${kw}"`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename, contentType: "image/jpeg" });
}

async function patch(slug, data) {
  const doc = await client.fetch(
    `*[_type == "service" && slug.current == $s][0]{_id}`,
    { s: slug }
  );
  if (!doc) {
    console.error(`  ❌  NOT FOUND: ${slug}`);
    return false;
  }
  await client.patch(doc._id).set(data).commit();
  console.log(`  ✓  Patched: ${slug} (${doc._id})`);
  return true;
}

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 1 — pipe-cctv-inspection
// ══════════════════════════════════════════════════════════════════════════════

const CCTV_ET = `Torustike CCTV kaamerauuring — täpne diagnoos ilma kaevamiseta

Kaasaegne torustike kaamerauuring (CCTV-uuring) on kõige tõhusam viis torustike seisukorra hindamiseks ilma ehitustöödeta. Meie professionaalne kaamerarobot läbib torusüsteemi sisemusest, edastades reaalajas kõrgeresolutsioonilise videopildi, mis salvestatakse täieliku raporti jaoks. See meetod võimaldab tuvastada ummistusi, praode, juuretungi ja muid defekte kiiremini ja täpsemini kui ükski teine mittekahjustav diagnostikameetod.

Miks valida CCTV torustikuuuring?

Traditsioonilised torustike kontrollimeetodid nõuavad sageli kaevamist, lagede või põrandate lõhkumist, mis toob kaasa märkimisväärsed lisakulud ja ebamugavused. CCTV-kaamerauuring lahendab selle probleemi täielikult — robotkaamera sisestatakse torusse läbi olemasoleva avause, nagu kaev, äravool või inspektsioonilukk. Kogu protseduur võtab aega mõnest tunnist poole päevani, olenevalt torustiku mahust ja seisukorrast.

Mida kaamerarobot tuvastab?

Meie CCTV seadmed suudavad täpselt kaardistada mitut liiki probleeme: mehaanilised ummistused nagu rasv, katlakivi, prügi ja muud sadenemised; praod ja murtud segmendid, mis põhjustavad lekkeid pinnasesse; juuretung, kus puude ja põõsaste juured on tunginud ühenduskohtadest sisse; torude nihked ja vajumised, mis häirivad voolamist; korrosiooni kahjustused ja torude sisemine seisukord üldiselt.

Videoraport ajatemplitega

Pärast iga uuringut koostame üksikasjaliku videoaruande, milles on iga probleempiirkond varustatud täpse asukohamärgi ja sügavusnäitajaga. Raport sisaldab kõrglahutusega videomaterjali koos kommentaaridega ning soovitusi edasisteks parandustöödeks. See dokumentatsioon on kasulik nii kindlustusjuhtumite lahendamiseks kui ka korteriühistute edasiste ehitusotsuste planeerimisel.

Survepesu kombineeritud teenusena

CCTV-uuringuga kombineerituna pakume ka kõrgsurve torustiku pesemist. Pärast probleempiirkondade kaardistamist saame kohe teostada professionaalse survepesu, mis eemaldab rasva, katlakivi ja muud sadenemised. Selline kombineeritud lähenemine on kuluefektiivsem kui iga teenuse eraldi tellimine ning tagab paremad pikaajalised tulemused.

Klientide ringi kuuluvad korteriühistud, tootmisettevõtted, kaubanduskeskused ja eramud üle kogu Tallinna ja Harjumaa. Meie uuringud vastavad Eesti ehitusnormidele ja kõigi tööde kohta väljastatakse nõuetekohane dokumentatsioon. Kaamerarobotid on varustatud LED-valgustuse ja kõrglahutuskaameratega, mis tagavad selgete piltide saamise ka väga halbades tingimustes.

Võtke meiega ühendust juba täna, et leppida kokku torustiku uuring. Pakume paindlikku ajakava ning kiireid reageerimisaegu kogu Tallinna ja Harjumaa piirkonnas. Esialgne konsultatsioon on tasuta.`;

const CCTV_EN = `CCTV Pipe Camera Inspection — Accurate Diagnosis Without Excavation

Modern CCTV pipe inspection is the most effective method for assessing the condition of underground and concealed pipework without any excavation or structural disruption. Our professional camera robot travels through the interior of the pipe system, transmitting real-time high-resolution video that is recorded and compiled into a comprehensive timestamped report. This approach detects blockages, cracks, root intrusions and other defects faster and more accurately than any other non-destructive diagnostic technique.

Why Choose CCTV Pipe Inspection?

Traditional pipe investigation methods often require excavation, breaking open ceilings or floors — adding significant costs and major inconvenience. A CCTV camera survey eliminates these problems entirely. The robotic camera is inserted through an existing access point such as a manhole, drain, or inspection chamber. The entire procedure takes between a few hours and half a day, depending on the extent and complexity of the pipe network.

What the Camera Robot Detects

Our CCTV equipment accurately maps multiple categories of defects: mechanical blockages caused by grease, scale, debris and accumulated sediment; cracks and broken pipe segments that allow water to leak into the surrounding soil; root intrusion where tree and shrub roots have penetrated through pipe joints; pipe misalignments and subsidence that restrict flow and cause standing water; corrosion damage and general assessment of the pipe's internal structural condition.

Video Report with Timestamp Markers

After every inspection we produce a detailed video report in which each defect zone is tagged with its precise location reference and depth measurement. The report includes full high-resolution footage with commentary and specific remediation recommendations. This documentation is valuable for insurance claims, housing association planning and regulatory compliance purposes.

Jetting Combined Service

Combined with the CCTV survey, we also offer high-pressure pipe jetting. Once problem areas are mapped, our team can immediately carry out professional jetting to remove grease, scale and accumulated deposits. This combined approach is more cost-effective than ordering each service separately and delivers better long-term results.

Our clients include housing associations, manufacturing facilities, retail centres and private homeowners throughout Tallinn and Harjumaa County. All inspections comply with Estonian construction standards and full documentation is issued for every job. Our camera robots are equipped with LED illumination and high-resolution optics, ensuring clear imagery even in the most challenging conditions.

Contact us today to schedule your pipe inspection. We offer flexible scheduling and fast response times across the greater Tallinn and Harjumaa region. Initial consultation is free of charge.`;

const CCTV_RU = `Видеодиагностика трубопроводов — точная диагностика без раскопок

Современная видеодиагностика трубопроводов (CCTV-обследование) — наиболее эффективный способ оценки состояния подземных и скрытых трубопроводов без каких-либо раскопок и разрушений. Наш профессиональный робот-камера перемещается по внутренней поверхности трубы, передавая в режиме реального времени высококачественное видеоизображение, которое записывается и оформляется в детальный отчёт с временными метками. Этот метод позволяет обнаруживать засоры, трещины, проникновение корней и другие дефекты быстрее и точнее любого другого неразрушающего метода диагностики.

Почему стоит выбрать видеодиагностику?

Традиционные методы обследования трубопроводов нередко требуют вскрытия грунта, разбивания потолков или полов — что влечёт значительные дополнительные расходы и серьёзные неудобства. CCTV-видеообследование полностью устраняет эту проблему. Камера-робот вводится через существующие точки доступа: колодец, канализационный стояк или ревизионный люк. Вся процедура занимает от нескольких часов до полдня в зависимости от объёма и сложности трубопроводной сети.

Что обнаруживает камера-робот?

Наше оборудование CCTV точно картирует дефекты нескольких видов: механические засоры (жир, накипь, мусор и осадочные отложения); трещины и разрушенные участки трубы, через которые вода уходит в грунт; проникновение корней деревьев и кустарников через стыки труб; смещения и просадки трубопровода, нарушающие нормальный проток; коррозионные повреждения и общая оценка внутреннего состояния трубы.

Видеоотчёт с временными метками

По итогам каждого обследования мы составляем подробный видеоотчёт, в котором каждая дефектная зона отмечена точными координатами местоположения и глубиной. Отчёт включает полную видеозапись высокого разрешения с комментариями специалиста и конкретными рекомендациями по устранению дефектов. Эта документация пригодится при страховых случаях, планировании ремонтных работ ТСЖ и соблюдении нормативных требований.

Промывка в комплекте с диагностикой

В дополнение к CCTV-обследованию мы предлагаем гидродинамическую промывку трубопроводов высоким давлением. После составления карты проблемных участков наша бригада может немедленно выполнить профессиональную промывку для удаления жира, накипи и осадочных отложений. Такой комплексный подход экономически эффективнее раздельного заказа каждой услуги и обеспечивает лучший долгосрочный результат.

Наши клиенты — товарищества собственников жилья, производственные предприятия, торговые центры и частные домовладельцы по всему Таллину и уезду Харьюмаа. Все обследования соответствуют строительным нормам Эстонии, и по каждому объекту выдаётся полная документация. Камеры-роботы оснащены светодиодным освещением и высококачественной оптикой, что обеспечивает чёткое изображение даже в самых сложных условиях.

Свяжитесь с нами сегодня, чтобы записаться на видеодиагностику трубопровода. Мы предлагаем гибкий график работы и быстрое реагирование по всему Таллину и Харьюмаа. Первичная консультация бесплатна.`;

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 2 — pem-pipe-welding
// ══════════════════════════════════════════════════════════════════════════════

const PEM_ET = `PE/PEM torude keevitus — sertifitseeritud otsa- ja elektrokuples keevitus

Polüetüleenist (PE/PEM) torude keevitus on spetsialiseeritud töölõik, mis nõuab sertifitseeritud keevitajaid, täpset temperatuurikontrolli ja asjakohast varustust. Meie meeskond teostab nii otsa-keevitust (butt fusion) kui ka elektrokupleskeevitust (electrofusion) vastavalt Euroopa standarditele EN 12201 ja EN 13244, tagades torujuhtmete kõrgeima töökindluse ja pikaealisuse.

Mis on PE-torude keevitus?

Polüetüleenist torud on kaasaegse veevärgi- ja kanalisatsiooniehituse alus, kuna need on kerged, korrosioonikindlad ja painduvad. PE 100 ja PE 80 kvaliteediklassi torusid kasutatakse survestatud veevõrkudes, kaugküttetorustikes, maavarustusliinides ja tööstusettevõtete protsessitorudes. Korrektne keevitus tagab lekkekindlad ühendused, mis kestavad aastakümneid ilma hoolduseta.

Otsa-keevitus (butt fusion)

Otsa-keevitusel sulatatakse mõlema toruosa otsad soojendusplaadi abil, seejärel surutakse need kokku ja lastakse jahtuda kontrollitud tingimustes. See meetod sobib suurema läbimõõduga torudele (alates DN 63) ning tagab mehaaniliselt tugeva ja homogeense ühenduse. Meie seadmed võimaldavad täpset temperatuuri- ja surveprofiili juhtimist vastavalt sertifitseeritud keevitusprotokollile.

Elektrokupleskeevitus (electrofusion)

Elektrokupleskeevitusel kasutatakse elektrikeevitusmuffe, mille siseküljele on integreeritud vastnikkeldraad. Pingestamisel soojeneb draad ja sulatab liidese ümbrusesse jääva polüetüleeni, moodustades kompaktse ühenduse. See meetod sobib eriti hästi rasketele montaažitingimustele ja väiksematele torumõõtudele (DN 20 kuni DN 160), samuti remonditöödeks olemasoleval torustikul.

Surveproov vastavalt EN standarditele

Pärast keevitamist teostatakse kõigile ühendustele surveproov, et kontrollida tihendust ja töökindlust vastavalt projekti- ja standardinõuetele. Katseprotokollid dokumenteeritakse ja antakse kliendile üle. Kõik meie keevitajad on läbinud asjakohase koolituse ja omavad kehtivaid sertifikaate.

Rakendused ja tööpiirkond

PE-torude keevitust rakendame järgmistes valdkondades: joogivesi- ja tehniline veevõrk, kanalisatsioonisüsteemid, kaugküttevõrk, gaasitorustikud, maavarustusliinid tootmisettevõtetele. Töid teostame üle kogu Tallinna ja Harjumaa, sealhulgas tiheasustusega linnapiirkondades ja suuremates tootmiskompleksides. Meie meeskond on harjunud töötama nii ehitusobjektidel kui ka olemasolevate rajatiste rekonstrueerimisel.`;

const PEM_EN = `PE/PEM Pipe Welding — Certified Butt Fusion and Electrofusion

Polyethylene (PE/PEM) pipe welding is a specialised discipline requiring certified welders, precise temperature control and appropriate equipment. Our team performs both butt fusion and electrofusion welding in accordance with European standards EN 12201 and EN 13244, ensuring the highest reliability and longevity for all pipeline joints.

What Is PE Pipe Welding?

Polyethylene pipes form the backbone of modern water supply and drainage construction — lightweight, corrosion-resistant and flexible. PE 100 and PE 80 grade pipes are used in pressurised water mains, district heating networks, underground supply lines and industrial process pipework. Correct welding produces leak-free joints that last for decades without maintenance intervention.

Butt Fusion Welding

In butt fusion welding, the pipe ends are heated against a temperature-controlled plate, then pressed together and allowed to cool under controlled conditions. This method is suited to larger diameter pipes (from DN 63 upwards) and produces a mechanically strong, homogeneous joint. Our equipment allows precise temperature and pressure profiling in accordance with certified welding protocols, and all parameters are logged automatically.

Electrofusion Welding

Electrofusion welding uses electrically activated fittings with an embedded resistance wire on the inner surface. When current is applied, the wire heats up and melts the surrounding polyethylene, forming a compact, sealed connection. This method is particularly suited to confined installation spaces and smaller pipe diameters (DN 20 to DN 160), as well as repair work on existing pipework where access is restricted.

Pressure Testing to EN Standards

After welding, all joints are subjected to a pressure test to verify integrity and load-bearing performance in accordance with project specifications and applicable standards. Test protocols are fully documented and issued to the client on completion. All our welders hold current certifications and undergo regular re-qualification.

Applications and Service Area

We apply PE pipe welding expertise across: potable water and utility water networks; drainage and sewer systems; district heating pipelines; gas distribution networks; industrial process and supply lines for manufacturing facilities. We work throughout Tallinn and Harjumaa County, including dense urban areas and large industrial complexes. Our teams are experienced in both new-build construction sites and the reconstruction of existing infrastructure.`;

const PEM_RU = `Сварка труб из ПЭ — сертифицированная стыковая сварка и электромуфтовая сварка

Сварка труб из полиэтилена (ПЭ/ПНД) — это специализированный вид работ, требующий сертифицированных сварщиков, точного контроля температуры и соответствующего оборудования. Наша бригада выполняет как стыковую сварку (butt fusion), так и электромуфтовую сварку (electrofusion) в соответствии с европейскими стандартами EN 12201 и EN 13244, обеспечивая максимальную надёжность и долговечность всех соединений трубопровода.

Что такое сварка полиэтиленовых труб?

Трубы из полиэтилена составляют основу современного строительства водопроводов и канализации: они лёгкие, коррозионностойкие и гибкие. Трубы класса ПЭ 100 и ПЭ 80 применяются в напорных водопроводных сетях, системах централизованного теплоснабжения, подземных линиях снабжения и промышленных технологических трубопроводах. Правильная сварка обеспечивает герметичные соединения, которые служат десятилетиями без технического обслуживания.

Стыковая сварка

При стыковой сварке торцы труб нагревают с помощью нагревательного инструмента, а затем прижимают друг к другу и дают остыть в контролируемых условиях. Этот метод подходит для труб большего диаметра (от DN 63) и обеспечивает механически прочное однородное соединение. Наше оборудование позволяет точно задавать температурный и силовой профиль в соответствии с сертифицированными протоколами сварки, а все параметры автоматически регистрируются.

Электромуфтовая сварка

При электромуфтовой сварке используются специальные соединительные муфты со встроенной нихромовой проволокой на внутренней поверхности. При подаче тока проволока нагревается и расплавляет прилегающий полиэтилен, образуя компактное герметичное соединение. Этот метод особенно хорошо подходит для стеснённых монтажных условий и труб меньших диаметров (DN 20 — DN 160), а также для ремонтных работ на действующем трубопроводе.

Испытание давлением по стандартам EN

После сварки все соединения подвергаются испытанию давлением для проверки герметичности и несущей способности в соответствии с проектной документацией и применимыми стандартами. Протоколы испытаний полностью документируются и передаются заказчику по завершении работ. Все наши сварщики имеют действующие сертификаты и проходят регулярную переаттестацию.

Области применения и зона обслуживания

Сварку труб из ПЭ мы применяем в следующих областях: сети питьевого водоснабжения и технического водоснабжения; системы водоотведения и канализации; трубопроводы централизованного теплоснабжения; распределительные газопроводы; промышленные технологические линии снабжения. Работаем по всему Таллину и уезду Харьюмаа, включая плотно застроенные городские территории и крупные промышленные комплексы. Наши бригады имеют опыт работы как на новых строительных объектах, так и при реконструкции действующей инфраструктуры.`;

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE 3 — jetting-truck-services
// ══════════════════════════════════════════════════════════════════════════════

const JET_ET = `Survepesuauto teenused — kombineeritud auto suurte kanalisatsioonide hoolduseks

Meie kombineeritud survepesu- ja vaakumauto on mõeldud raskete torustiku- ja kanalisatsioonitööde teostamiseks, millega tavapärased väiksemad seadmed toime ei tule. Suurte kollektorite, kaevude, rasvapüüdurite, tööstuslike äravoolude ja munitsipaalvõrkude puhastamisel on kombineeritud auto kõige tõhusam ja kiirem lahendus. Meie sõidukid on varustatud nii kõrgsurvepesusüsteemi kui ka vaakumimisseadmestikuga, mis võimaldab teostada mõlemat operatsiooni korraga ja ilma täiendavate seadmete tellimiseteta.

Mida kombineeritud auto suudab?

Survepesuauto ühendab kõrgsurvepumba (kuni 300 bar) ja suure mahutavusega vaakumtanki. Kõrgsurvevesi loostub düüsist torusse ja murrab lahti isegi kõvad ladestused, rasvakorgid, juuretungi jäljed ja katlakivistunud pindade kihid. Samaaegselt töötav vaakumsüsteem imeb lahtistunud materjali, vee ja setted autosse, tagades puhta töökoha ja piiramatu kestusega töörežiimi. Tankide tühjendamine toimub vastavalt jäätmekäitlusnõuetele sertifitseeritud vastuvõtupunktides.

Suurte kanalisatsioonikollektorite puhastamine

Ümarläbimõõduga kollektorid DN 300 kuni DN 1200 vajavad spetsiaalset lähenemist, kuna nendes koguneb aastakümnetega märkimisväärne sete ja bioloogiline materjal. Meie survepesuauto suudab töötada nii tavakaevude kaudu kui ka rohkem piiratud juurdepääsupunktides. Pärast puhastamist saame vajadusel teostada kohese CCTV kaamerauuringu, et hinnata korraga nii puhastuse kvaliteeti kui kollektori seisukorda.

Kaevud ja inspektsioonikambrid

Äravoolude kaevud, revisjonikaevud ja muu maa-alune infrastruktuur vajab regulaarset puhastamist. Sete, rasv ja tahked jäätmed kogunevad kaevude põhja ja segavad nende korrektseks tööks vajalikku veetaset ning voolukiirust. Meie vaakumseade eemaldab ka viskoossed materjalid, raske settemuda ja orgaanilise jäätme tõhusalt ning ilma käsitsitöö vajaduseta.

Rasvapüüdurite tühjendamine ja hooldus

Toitlustusettevõtete, kaubanduskeskuste ja tootmiskomplekside rasvapüüdurid vajavad seaduse nõuete kohaselt regulaarset tühjendamist. Meie teenus hõlmab rasvapüüduri täielikku tühjendamist, pesemist ja seisukorra hindamist. Pakume regulaarseid hooldusleppeid, mis tagavad vastavuse nõuetele ja väldivad trahve.

Tallinna linna heakskiidetud töövõtja

Meime kuulume Tallinna linna poolt heakskiidetud töövõtjate hulka ja oleme teostanud töid nii Tallinna Vee kui ka Tallinna Kommunaalameti tellimisel. Lisaks munitsipaalvõrkudele teenindame tööstusettevõtteid, korteriühistuid, kaubanduskeskusi ja erasektori kliente. Reageerimisaeg on kuni 4 tundi tavapärase tööaja sees ja lepinguliste klientide jaoks ka väljaspool tavapärast tööaega.`;

const JET_EN = `Jetting Truck Services — Combination Vacuum Unit for Large Sewers and Industrial Drainage

Our combination jetting and vacuum truck is purpose-built for heavy-duty pipeline and drainage operations that smaller conventional equipment simply cannot handle. For large sewer collectors, manholes, grease traps, industrial drainage systems and municipal network maintenance, the combination unit is the most efficient and fastest solution available. Our vehicles carry both a high-pressure jetting system and a vacuum extraction unit on the same chassis, allowing both operations to proceed simultaneously without needing additional equipment on site.

What Can a Combination Jetting Truck Do?

The jetting truck combines a high-pressure pump (up to 300 bar) with a large-capacity vacuum tank. The high-pressure water jet is directed through the nozzle into the pipe, breaking up even the hardest deposits, grease plugs, root intrusion remnants and scale-encrusted surfaces. At the same time, the vacuum system draws the loosened material, water and sediment into the tank, keeping the work area clean and enabling extended uninterrupted operation. Tank discharge takes place at certified waste reception facilities in compliance with all waste management regulations.

Large Sewer Collector Cleaning

Round-section collectors from DN 300 to DN 1200 require a specialist approach, as they accumulate decades of sediment, biological material and encrusted deposits. Our jetting truck can operate through standard manholes as well as more restricted access points. After cleaning, we can immediately carry out a CCTV camera inspection to assess both the quality of the cleaning and the structural condition of the collector.

Manholes and Inspection Chambers

Drainage manholes, inspection chambers and other underground infrastructure require regular cleaning. Sediment, grease and solid waste accumulate in the sump and impede the water level and flow velocity necessary for correct operation. Our vacuum unit removes even highly viscous materials, heavy sediment sludge and organic waste efficiently and without requiring manual labour.

Grease Trap Emptying and Maintenance

Grease traps in food service establishments, retail centres and production facilities require regular emptying as mandated by regulation. Our service covers full emptying, internal washing and condition assessment of each grease trap. We offer regular maintenance contracts that ensure ongoing regulatory compliance and avoid penalties.

Tallinn City Approved Contractor

We are registered among Tallinn city approved contractors and have completed work on commission from Tallinn Vesi and Tallinn City Municipal Office. In addition to municipal networks, we serve industrial enterprises, housing associations, retail centres and private sector clients. Response time is within 4 hours during standard working hours, and within agreed windows for contract clients outside standard hours.`;

const JET_RU = `Услуги илососа — комбинированная машина для крупных коллекторов и промышленных стоков

Наш комбинированный илосос предназначен для тяжёлых работ по трубопроводам и канализации, с которыми небольшое стандартное оборудование попросту не справляется. Для прочистки крупных канализационных коллекторов, колодцев, жироуловителей, промышленных стоков и технического обслуживания муниципальных сетей комбинированная машина является наиболее эффективным и быстрым решением. Наши автомобили оснащены и системой гидродинамической промывки высоким давлением, и вакуумным оборудованием на одном шасси, что позволяет выполнять обе операции одновременно без привлечения дополнительной техники.

Что умеет комбинированный илосос?

Илосос сочетает насос высокого давления (до 300 бар) и вакуумную ёмкость большой вместимости. Струя воды высокого давления подаётся через насадку в трубу и разрушает даже самые твёрдые отложения, жировые пробки, остатки проникших корней и слои накипи. Одновременно работающая вакуумная система всасывает разрыхлённый материал, воду и осадок в цистерну, обеспечивая чистоту рабочего места и непрерывный режим работы без ограничений по времени. Слив цистерны производится на сертифицированных приёмных пунктах в соответствии со всеми требованиями к обращению с отходами.

Прочистка крупных канализационных коллекторов

Коллекторы круглого сечения от DN 300 до DN 1200 требуют специализированного подхода, поскольку в них за десятилетия накапливаются значительный осадок, биологические материалы и инкрустированные отложения. Наш илосос может работать как через стандартные смотровые колодцы, так и через более стеснённые точки доступа. После прочистки мы можем немедленно выполнить CCTV-видеообследование для оценки качества промывки и технического состояния коллектора.

Колодцы и ревизионные камеры

Дренажные колодцы, ревизионные камеры и другие объекты подземной инфраструктуры нуждаются в регулярной прочистке. Осадок, жир и твёрдые отходы накапливаются в приямке и нарушают необходимые уровень воды и скорость потока. Наша вакуумная установка эффективно удаляет даже высоковязкие материалы, тяжёлый осадочный ил и органические отходы без применения ручного труда.

Откачка и обслуживание жироуловителей

Жироуловители предприятий общественного питания, торговых центров и производственных объектов требуют регулярной откачки в соответствии с нормативными требованиями. Наша услуга включает полную откачку, внутреннюю промывку и оценку состояния каждого жироуловителя. Мы предлагаем регулярные договоры на техническое обслуживание, обеспечивающие постоянное соответствие нормативам и исключающие штрафные санкции.

Городской подрядчик Таллина

Мы входим в реестр подрядчиков, одобренных городом Таллин, и выполняли работы по заказам Tallinn Vesi и Таллинского муниципального управления. Помимо муниципальных сетей, мы обслуживаем промышленные предприятия, товарищества собственников жилья, торговые центры и клиентов частного сектора. Время реагирования — до 4 часов в стандартное рабочее время, а для договорных клиентов — также в согласованные окна за пределами стандартного расписания.`;

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log("\n🚀  seed-plumbing-b4: patching 3 plumbing services with full content + images…\n");

  // ── SERVICE 1: pipe-cctv-inspection ────────────────────────────────────────
  console.log("📂  [1/3] pipe-cctv-inspection");
  let heroAsset1, galleryAsset1;
  try {
    heroAsset1    = await uploadImg("pipe camera inspection robot cctv", "cctv-pipe-inspection-hero.jpg");
    galleryAsset1 = await uploadImg("drain inspection camera sewer",     "cctv-drain-camera-gallery.jpg");
  } catch (e) {
    console.warn("  ⚠️  Image upload failed:", e.message, "— continuing without images");
  }

  const cctvData = {
    title: ls(
      "Torustike videouuring (CCTV)",
      "Pipe CCTV Inspection",
      "Видеодиагностика трубопроводов"
    ),
    pathSegment: { et: "torustike-videouuring", ru: "видеодиагностика-труб" },
    icon: "Camera",
    shortDescription: lt(
      "Kaamerarobotiga torustikuuuring — ummistused, praod ja juuretung tuvastatakse ilma kaevamiseta. Videoraport ajatemplitega. Tallinn ja Harjumaa.",
      "CCTV robot camera pipe survey — blockages, cracks and root intrusions located without digging. Timestamped video report. Tallinn and Harjumaa.",
      "Обследование трубопровода камерой-роботом — засоры, трещины и корни без раскопок. Видеоотчёт с временными метками. Таллин и Харьюмаа."
    ),
    body: lb(CCTV_ET, CCTV_EN, CCTV_RU),
    metaTitle: ls(
      "Torustike CCTV kaamerauuring Tallinnas | Toruabi",
      "CCTV Pipe Camera Inspection Tallinn | Toruabi",
      "Видеодиагностика труб в Таллине | Toruabi"
    ),
    metaDescription: lt(
      "Torustike CCTV-uuring kaamerarobotiga ilma kaevamiseta. Ummistused, praod, juuretung. Videoraport. Tallinn ja Harjumaa — kiire reageerimine.",
      "CCTV pipe camera inspection without excavation. Blockages, cracks, root intrusion detected. Timestamped video report. Tallinn and Harjumaa, fast response.",
      "Видеодиагностика трубопроводов без раскопок. Засоры, трещины, корни. Видеоотчёт с метками. Таллин и Харьюмаа — быстрый выезд."
    ),
    order: 12,
    ...(heroAsset1 && {
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset1._id },
        alt: ls(
          "Kaamerarobot torustiku CCTV uuringuks",
          "CCTV camera robot for pipe inspection",
          "Камера-робот для видеодиагностики трубопровода"
        ),
      },
    }),
    ...(galleryAsset1 && {
      gallery: [
        {
          _key: "g1",
          _type: "image",
          asset: { _type: "reference", _ref: galleryAsset1._id },
          alt: ls(
            "Kanalisatsiooni CCTV drainikaamera uuring",
            "Drain CCTV camera sewer inspection",
            "CCTV-камера для видеообследования канализации"
          ),
        },
      ],
    }),
  };

  await patch("pipe-cctv-inspection", cctvData);

  // ── SERVICE 2: pem-pipe-welding ────────────────────────────────────────────
  console.log("\n📂  [2/3] pem-pipe-welding");
  let heroAsset2, galleryAsset2;
  try {
    heroAsset2    = await uploadImg("polyethylene pipe welding PE fusion", "pem-welding-hero.jpg");
    galleryAsset2 = await uploadImg("plastic pipe butt fusion welding",   "pem-butt-fusion-gallery.jpg");
  } catch (e) {
    console.warn("  ⚠️  Image upload failed:", e.message, "— continuing without images");
  }

  const pemData = {
    title: ls(
      "PEM/PE torude keevitus",
      "PE/PEM Pipe Welding",
      "Сварка труб ПЭ/ПНД"
    ),
    pathSegment: { et: "pem-torude-keevitus", ru: "сварка-полиэтиленовых-труб" },
    icon: "Flame",
    shortDescription: lt(
      "PE ja PEM torude otsa- ja elektrokuples keevitus — veevõrkudele, maa-alustele võrkudele ja kaugküttele. Sertifitseeritud keevitajad, surveproov EN standardite järgi. Tallinn ja Harjumaa.",
      "PE/PEM pipe butt fusion and electrofusion welding — water mains, underground networks and district heating. Certified welders, pressure tested to EN standards. Tallinn and Harjumaa.",
      "Стыковая и электромуфтовая сварка труб ПЭ/ПНД — водопроводы, подземные сети и теплоснабжение. Сертифицированные сварщики, испытание давлением по EN. Таллин и Харьюмаа."
    ),
    body: lb(PEM_ET, PEM_EN, PEM_RU),
    metaTitle: ls(
      "PE/PEM torude keevitus Tallinnas | Toruabi",
      "PE/PEM Pipe Welding Tallinn | Toruabi",
      "Сварка ПЭ труб в Таллине | Toruabi"
    ),
    metaDescription: lt(
      "Polüetüleenist torude keevitus Tallinnas. Otsa- ja elektrokuples keevitus sertifitseeritud spetsialistidega. Surveproov EN standardite alusel. Harjumaa.",
      "Polyethylene PE pipe welding in Tallinn. Butt fusion and electrofusion by certified welders. Pressure tested to EN standards. Harjumaa county.",
      "Сварка полиэтиленовых труб в Таллине. Стыковая и электромуфтовая сварка сертифицированными сварщиками. Испытание давлением по EN. Харьюмаа."
    ),
    order: 13,
    ...(heroAsset2 && {
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset2._id },
        alt: ls(
          "Polüetüleentoru keevitus butt fusion meetodil",
          "Polyethylene pipe butt fusion welding",
          "Стыковая сварка полиэтиленовой трубы"
        ),
      },
    }),
    ...(galleryAsset2 && {
      gallery: [
        {
          _key: "g1",
          _type: "image",
          asset: { _type: "reference", _ref: galleryAsset2._id },
          alt: ls(
            "Plasttoru otsa-keevitus tootmisel",
            "Plastic pipe butt fusion welding process",
            "Процесс стыковой сварки пластиковых труб"
          ),
        },
      ],
    }),
  };

  await patch("pem-pipe-welding", pemData);

  // ── SERVICE 3: jetting-truck-services ─────────────────────────────────────
  console.log("\n📂  [3/3] jetting-truck-services");
  let heroAsset3, galleryAsset3;
  try {
    heroAsset3    = await uploadImg("jetting truck sewer cleaning vehicle", "jetting-truck-hero.jpg");
    galleryAsset3 = await uploadImg("vacuum combination truck sewer",       "vacuum-truck-gallery.jpg");
  } catch (e) {
    console.warn("  ⚠️  Image upload failed:", e.message, "— continuing without images");
  }

  const jetData = {
    title: ls(
      "Survepesuauto (kombineeritud) teenused",
      "Jetting Truck Services",
      "Услуги комбинированного илососа"
    ),
    pathSegment: { et: "survepesuauto-teenused", ru: "машина-высокого-давления" },
    icon: "Truck",
    shortDescription: lt(
      "Kombineeritud survepesu- ja vaakumauto suurte kanalisatsioonide, kaevude, rasvapüüdurite ja tööstuslike äravoolude puhastamiseks. Tallinna linna heakskiidetud töövõtja, kiire reageerimine.",
      "Combination jetting and vacuum truck for large sewers, manholes, grease traps and industrial drainage. Tallinn city approved contractor, fast response.",
      "Комбинированный илосос для крупных коллекторов, колодцев, жироуловителей и промышленных стоков. Городской подрядчик Таллина, быстрый выезд."
    ),
    body: lb(JET_ET, JET_EN, JET_RU),
    metaTitle: ls(
      "Survepesuauto teenused Tallinnas | Toruabi",
      "Jetting Truck Services Tallinn | Toruabi",
      "Илосос в Таллине — комбинированная машина | Toruabi"
    ),
    metaDescription: lt(
      "Kombineeritud survepesuauto Tallinnas: suurte kollektorite, kaevude ja rasvapüüdurite puhastamine. Tallinna linna heakskiidetud töövõtja. Kiire reageerimine Harjumaal.",
      "Combination jetting truck in Tallinn: large sewer collectors, manholes and grease traps cleaned fast. Tallinn city approved contractor serving all of Harjumaa county.",
      "Комбинированный илосос в Таллине: прочистка крупных коллекторов, колодцев и жироуловителей. Городской подрядчик Таллина, быстрый выезд по Харьюмаа."
    ),
    order: 3,
    ...(heroAsset3 && {
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAsset3._id },
        alt: ls(
          "Kombineeritud survepesu- ja vaakumauto kanalisatsioonitöödel",
          "Combination jetting and vacuum truck for sewer cleaning",
          "Комбинированный илосос на работах по прочистке канализации"
        ),
      },
    }),
    ...(galleryAsset3 && {
      gallery: [
        {
          _key: "g1",
          _type: "image",
          asset: { _type: "reference", _ref: galleryAsset3._id },
          alt: ls(
            "Vaakumauto kanalisatsioonikaevude puhastamisel",
            "Vacuum truck cleaning sewer manholes",
            "Вакуумная машина при прочистке канализационных колодцев"
          ),
        },
      ],
    }),
  };

  await patch("jetting-truck-services", jetData);

  console.log("\n✨  Done! All 3 services are now live in Sanity.");
  console.log("   ET → /et/teenused/torustike-videouuring");
  console.log("   ET → /et/teenused/pem-torude-keevitus");
  console.log("   ET → /et/teenused/survepesuauto-teenused\n");
}

main().catch((err) => {
  console.error("❌  Script failed:", err.message);
  process.exit(1);
});
