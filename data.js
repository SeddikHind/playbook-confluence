/* Données partagées par la simulation Confluence (index.html) et la simulation Jira (jira.html). */
const BOARD = "https://miro.com/app/board/uXjVESgx69w=/";
const W = {
  f00:"3458764689125498822", f01:"3458764689125498823", f02:"3458764689186883782",
  f03:"3458764689124497867", f04:"3458764689124497868", f05:"3458764689124497869",
  f06:"3458764689124497870", f07:"3458764689124497871",
  la:"3458764689201069752", lb:"3458764689201069753", lc:"3458764689201069754",
  A01:"3458764689254837890", A02:"3458764689254837891", A03:"3458764689254837892", A04:"3458764689254837893",
  A05:"3458764689255102196", A06:"3458764689255102197", A07:"3458764689255102198",
  T02:"3458764689124849393", T03:"3458764689124849394", T04:"3458764689124849395", T07:"3458764689125046318",
  T08:"3458764689125046319", T09:"3458764689125046320", T15:"3458764689125140703", T20:"3458764689202293767",
  T21:"3458764689202494054", T23:"3458764689202494056"
};
const FRAME_NAMES = {
  f00:"00 · Start Here", f01:"01 · Project Setup", f02:"02 bis · Roadmap · Démarche client",
  f03:"03 · Étape 01 · Diagnostic", f04:"04 · Étape 02 · Design base zéro", f05:"05 · Étape 03 · Design détaillé du MVP",
  f06:"06 · Étape 04 · Dev Agile, test et déploiement", f07:"07 · Étape 05 · Post-MVP",
  la:"Les 7 ateliers", lb:"Boîte à outils · fiches méthode", lc:"Archives · anciens ateliers"
};
/* Les 7 ateliers du playbook (Ax) et les fiches méthode, travaux d'expert (Tx). */
const A_NAMES = {
  A01:"Kick-off", A02:"Diagnostic partagé", A03:"Idéation et priorisation", A04:"Parcours cible et blueprint",
  A05:"Architecture cible", A06:"MVP et roadmap", A07:"Restitution et REX"
};
const T_NAMES = {
  T02:"Stakeholder Mapping", T03:"UX Audit", T04:"User Interviews", T07:"Technical Architecture Assessment",
  T08:"Application Mapping", T09:"API & Integration Mapping", T15:"User Testing", T20:"Value at Stake",
  T21:"Data et Tracking Audit", T23:"Plan de mesure"
};
const CODE_NAMES = Object.assign({}, A_NAMES, T_NAMES);
const CODE_RE = /\b(A0[1-7]|T(?:0[2-4]|0[7-9]|15|2[013]))\b/g;
const codeLabel = k => k[0]==="A" ? "Atelier "+k.slice(1) : "Fiche "+k;
const url = k => BOARD + "?moveToWidget=" + W[k];
const PH = [
  {n:"00", name:"Pré-projet", tree:"Pré-projet", sub:"Cadrer", f:"f01", obj:"Cadrer le besoin, constituer l'équipe et lancer la gouvernance jusqu'au Kick-off."},
  {n:"01", name:"Diagnostic", tree:"Diagnostic", sub:"Comprendre", f:"f03", obj:"Comprendre le contexte, les usages, les données et les contraintes afin d'identifier les leviers de valeur."},
  {n:"02", name:"Design base zéro", tree:"Design Base 0", sub:"Imaginer et expérimenter", f:"f04", obj:"Définir la vision cible, la solution, l'architecture, les impacts et la trajectoire."},
  {n:"03", name:"Design détaillé du MVP", tree:"Design détaillé", sub:"Concrétiser", f:"f05", obj:"Traduire la vision cible en un MVP priorisé, prêt à être développé, avec un backlog clair et une planification maîtrisée."},
  {n:"04", name:"Dev Agile, test & déploiement", tree:"Dev Agile, test & déploiement", sub:"Déployer", f:"f06", obj:"Développer, tester, déployer et améliorer la solution de manière itérative jusqu'à la mise en production."},
  {n:"05", name:"Post-MVP", tree:"Post MEP", sub:"Améliorer", f:"f07", obj:"Restituer, évaluer la valeur créée, capitaliser et décider de la suite de la trajectoire."}
];
const PR = "[Responsable] · [Date]";

/* ---------- Streams : sous-blocs de la démarche client (1-0 à 5-3) rangés par stream ---------- */
const STREAMS = {
 "stream-a": {lane:"a", name:"A · Product et Business",
  role:"Objectifs business, stratégie produit, alignement des parties prenantes, exigences métier, proposition de valeur, priorisation, roadmap produit, métriques de succès.",
  phases:[
   {act:["1-0 · Définition de la problématique (note d'opportunité) et Product Vision V1","1-0 · Confrontation de la compréhension avec le sponsor","1-0 · Clarification de l'approche, formalisation de l'équipe et sécurisation des ressources","1-0 · Planning des étapes et des parties prenantes","Cartographie des acteurs T02","1-0 · Kick-off global et mise en place de la gouvernance A01","1-0 · Création du backlog Jira avec les jalons"],
    con:["Document de Kick-off","Note d'opportunité","Product Vision V1","Projet Jira"],
    syn:["Utilisateurs et experts à impliquer identifiés avec le stream B","Dépendances avec les autres squads et core systems identifiées avec le stream C"]},
   {act:["1-1 · Analyse et synthèse des tendances en messages clés, idées et hypothèses","1-2 · Diagnostic des processus existants et du modèle opérationnel actuel","1-3 · Estimation initiale de la Value at Stake T20","Identification des risques et dépendances","1-2 · Product Vision V2"],
    con:["Diagnostic externe (volet business)","Product Vision V2"],
    syn:["Messages clés partagés avec le Design et la Tech pour la synthèse des pain points"]},
   {act:["2-1 · Idéation et priorisation des idées A03","2-3 · Revue de l'impact de la transformation (Value at Stake), valeur par user story T20","2-3 · Évaluation des impacts processus et du coût d'implémentation des processus","2-3 · Mise en place du modèle opérationnel potentiel","2-3 · Mise à jour de la feuille de route","2-3 · Product Vision V4 (Business Goals)"],
    con:["Deck d'évaluation des impacts","Product Vision V4"],
    syn:["Vision cible transmise à l'Architecture pour le GAP IT (2-2, stream C)","Business goals traduits en KPIs de valeur et d'adoption avec le stream D"]},
   {act:["3-1 · Priorisation des sous-parcours, des Epics et US, et scope du MVP A06","3-1 · Feuille de route de développement et de déploiement A06","3-1 · Mise à jour de la Value at Stake et Definition of Ready","3-2 · User stories des 3 premiers sprints (Definition of Ready)","3-2 · Revue avec les parties prenantes et comités de suivi","3-4 · Feuille de route détaillée des sprints, release planning inter-squads","3-4 · Plan de change management"],
    con:["Deck MVP","Roadmap complète (3 sprints détaillés)"],
    syn:["Estimations des US reçues du stream C","Readiness validée avec la Tech au jalon Démarrage des sprints"]},
   {act:["4-1 · Rituels : sprint planning, daily, sprint review, comité de suivi, rétrospective","4-1 · Backlog refinement (5 à 10 % de la capacité)","4-2 · Recette métier (sprint de consolidation)","4-3 · Feuille de route de déploiement, pilote et Go / No-Go","4-3 · Communication, formation et supports clés","4-3 · Déploiement du modèle opérationnel et accompagnement au changement","4-4 · Planification des releases subséquentes"],
    con:["MVP validé par les métiers","Supports de formation","Stratégie de déploiement","Roadmap produit à jour"],
    syn:["Feedbacks utilisateurs (stream B) et indicateurs (stream D) intégrés aux arbitrages de backlog"]},
   {act:["5-1 · Restitution du MVP A07","5-1 · Partage du REX et capitalisation des bonnes pratiques A07","5-3 · Remontée et arbitrage des feedbacks utilisateurs","5-3 · Intégration au backlog et à la feuille de route produit","5-3 · Décision sur la suite : nouvelle release, extension ou arrêt (Program Director, Sponsors)"],
    con:["Document de REX","Décision Go / No-Go documentée"],
    syn:["Bilan des KPIs (stream D) présenté à la restitution"]}
  ]},
 "stream-b": {lane:"b", name:"B · UX Research et Design",
  role:"UX research, entretiens utilisateurs, benchmark, journey mapping, idéation, design UX/UI, prototypage interactif, tests utilisateurs, validation de l'expérience.",
  phases:[
   {act:["1-0 · Identification des utilisateurs et experts à impliquer","Préparation du plan de recherche et du recrutement"],
    con:["Document de Kick-off (volet recherche utilisateurs)"],
    syn:["Plan de recherche intégré au planning des étapes (stream A)"]},
   {act:["1-2 · Identification et formalisation des personas et usages métiers","1-2 · Entretiens experts et utilisateurs T04","Audit UX de l'existant T03","1-2 · Cartographie des parcours, usages et dispositifs A02","1-2 · Identification et priorisation des pain points A02","1-2 · Questions « How might we » A03","1-3 · UX bench, benchmarks national et international"],
    con:["Diagnostic parcours & fiches personas","Deck benchmark","Support : synthèse des irritants (Friction Hunt)"],
    syn:["Parcours mis en regard de la capability map (1-4, stream C)","Pain points croisés avec les volumétries et KPIs (1-1, stream D)"]},
   {act:["2-1 · Idéation et priorisation des idées A03","Ateliers « Kill the Website », « [Entreprise] 2030 », Design base zéro, Digital Design Day","2-1 · Vision cible à partir des personas et experts","2-1 · Mapping des étapes clés (full flow diagram), validation expert et itérations A04","2-1 · Persona business needs mapping","2-1 · Prototypes interactifs AI generated (parcours) ou scénarios de référence","2-1 · Test auprès des utilisateurs et experts, collecte des retours T15","Atelier « The Customer Jury »","2-1 · Product Vision V3","Experience Blueprint A04"],
    con:["Deck vision cible + full flow diagram","Product Vision V3","Support : Experience Blueprint"],
    syn:["Full flow diagram transmis au GAP IT (2-2, stream C)","Prototypes soumis à l'évaluation de faisabilité (stream C)"]},
   {act:["3-5 · Prototypes et maquettes dev oriented (Figma)","3-5 · Scénario de référence et résultats attendus","3-5 · Hand-off document (UX, processus métier, Data et IA)","Documentation des composants et du Design System"],
    con:["Prototype & UX Hand-off Deck"],
    syn:["Hand-off revu avec le Tech lead avant le démarrage des sprints (stream C)"]},
   {act:["4-1 · Design de l'interface, hand-off dev et specs","Accompagnement des développeurs","Design QA des incréments","4-1 · Tests avec les utilisateurs finaux et amélioration itérative T15"],
    con:["Incréments de valeur (volet UX)","Support : Design System actualisé"],
    syn:["Design QA intégrée à la définition du « done » de chaque sprint (stream C)","Feedbacks utilisateurs transmis au PO (stream A)"]},
   {act:["5-3 · Remontée des feedbacks utilisateurs","Optimisation continue de l'expérience"],
    con:["Document de REX (volet expérience)"],
    syn:["Retours d'usage croisés avec les KPIs post-lancement (stream D)"]}
  ]},
 "stream-c": {lane:"c", name:"C · Architecture et Technology",
  role:"Architecture existante, cartographie applicative et infrastructure, architecture data, API et intégrations, contraintes techniques, sécurité et conformité, architecture cible, faisabilité, backlog technique, développement et intégration.",
  phases:[
   {act:["1-0 · Identification des dépendances avec d'autres squads et core systems","Identification des interlocuteurs Archi, IT Ops et sécurité"],
    con:["Projet Jira (dépendances et jalons techniques)"],
    syn:["Dépendances intégrées au planning des étapes (stream A)"]},
   {act:["1-4 · Transparence sur les outils et systèmes : architecture actuelle, capability map T07 T08","1-4 · Transparence data","Analyse des API et intégrations T09","Identification de la dette technique et des contraintes de sécurité","1-4 · Synthèse des pain points et forces à capitaliser"],
    con:["Transparence IT"],
    syn:["Capability map reliée aux parcours actuels (stream B)"]},
   {act:["2-2 · Conception de l'architecture cible IT et Data : sources, APIs, modèles et agents IA A05","2-2 · Évaluation des écarts actuel vs cible, première estimation des US","2-2 · Prérequis technologiques (IT, Data, IA) et choix de solutions","2-2 · Feuille de route de migration","2-2 · Identification des croisements et impacts avec d'autres parcours","2-2 · Validation en comité architecture et comité SI"],
    con:["Solution technique cible validée"],
    syn:["Faisabilité des prototypes rendue au Design (2-1, stream B)","Premières estimations transmises pour l'évaluation des impacts (2-3, stream A)"]},
   {act:["3-3 · Finalisation des spikes techniques","3-3 · Plan de développement IT, formation technico-fonctionnelle","3-3 · Intégration continue, environnements, repo, stratégie de test","3-2 · Critères de priorisation des tickets techniques","3-2 · Intégration des dépendances dans les backlogs et feuilles de route des autres squads et core systems","Delivery Readiness Review au jalon Démarrage des sprints"],
    con:["Code, environnements, CI initialisés"],
    syn:["Hand-off Design reçu et validé (3-5, stream B)","Estimations des US transmises au PO (stream A)"]},
   {act:["4-1 · Développement et test quotidien des US (TDD, code review) : applicatif, pipelines Data, modèles et agents IA","4-2 · Dette technique et couverture de tests automatiques","4-2 · Correction des anomalies remontées par le métier","4-2 · Release notes avant chaque MEPP et MEP","Tests de sécurité et de performance","Déploiement, supervision et maintenance"],
    con:["Incréments de valeur"],
    syn:["Tracking implémenté selon le plan de mesure (stream D)"]},
   {act:["5-3 · Backlog refinement : tâches techniques, spikes","5-3 · Release planning intersquad pour la suite"],
    con:["Document de REX (volet technique)"],
    syn:["Capacité et prérequis techniques intégrés à la décision de trajectoire (stream A)"]}
  ]},
 "stream-d": {lane:"d", name:"D · Data, Analytics et Performance",
  role:"Analyse des données existantes, audit du tracking et des analytics, définition des KPI, qualité des données, plan de mesure, suivi de la performance, analytics post-lancement.",
  phases:[
   {act:["Identification des données et des accès nécessaires","Demandes d'accès aux sources de données"],
    con:["Document de Kick-off (volet data)"],
    syn:["Accès data inscrits au planning des étapes (stream A)"]},
   {act:["1-1 · Définition des sources de données pertinentes","1-1 · Collecte des données quantitatives (volumétrie, KPIs)","1-2 · Analyse des données mobilisées et de leur qualité T21","Audit du tracking existant et des lacunes de mesure T21"],
    con:["Diagnostic externe (volet data)"],
    syn:["Volumétries et KPIs partagés pour prioriser les pain points (stream B)"]},
   {act:["2-3 · Traduction en KPIs de valeur et d'adoption, mise en place du suivi A03","Exploration des opportunités Data et IA"],
    con:["Deck d'évaluation des impacts (volet KPIs)"],
    syn:["Besoins data intégrés à l'architecture cible (2-2, stream C)"]},
   {act:["3-4 · KPIs de suivi de la solution T23","Plan de marquage et événements de tracking T23","Préparation des dashboards de suivi"],
    con:["Support : plan de mesure (annexe du Deck MVP)"],
    syn:["Tracking intégré aux US des premiers sprints (stream C)"]},
   {act:["4-1 · Indicateurs de suivi","4-3 · Mise à jour des indicateurs","Implémentation et contrôle qualité du tracking"],
    con:["Support : dashboard de suivi"],
    syn:["Indicateurs partagés en sprint review (streams A et B)"]},
   {act:["5-2 · KPIs et valeur créée vs Value at Stake initiale","Analyse des usages et opportunités d'amélioration"],
    con:["Bilan des KPIs post-lancement"],
    syn:["Bilan présenté à la restitution (stream A)"]}
  ]}
};

/* Livrables : intitulés exacts de la démarche client. Les « supports » viennent de notre méthode. */
const LIVRABLES = [
 ["Document de Kick-off","Note d'opportunité","Product Vision V1","Projet Jira"],
 ["Diagnostic externe","Diagnostic parcours & fiches personas","Deck benchmark","Transparence IT","Product Vision V2","Support : synthèse des irritants"],
 ["Deck vision cible + full flow diagram","Solution technique cible validée","Deck d'évaluation des impacts","Product Vision V4","Support : Experience Blueprint"],
 ["Deck MVP","Roadmap complète (3 sprints détaillés)","Code, environnements, CI initialisés","Prototype & UX Hand-off Deck","Support : plan de mesure"],
 ["Incréments de valeur","MVP validé par les métiers","Supports de formation","Stratégie de déploiement","Roadmap produit à jour","Support : Design System actualisé"],
 ["Document de REX","Bilan des KPIs post-lancement","Décision Go/No-Go documentée"]
];

/* Jalons : 4 jalons de la démarche client + 2 revues internes (non présentées comme jalons client). */
const GATES = [
 {type:"client", t:"Kick-off", d:"Le projet démarre avec un besoin cadré, une équipe constituée et une gouvernance en place.",
  c:["Note d'opportunité et Product Vision V1 partagées avec le sponsor","Équipe formalisée et ressources sécurisées","Utilisateurs, experts et dépendances identifiés","Gouvernance en place et projet Jira créé avec les jalons"]},
 {type:"interne", t:"Diagnostic partagé", d:"Business, Design, Tech et Data s'alignent sur les pain points et les leviers de valeur prioritaires.",
  c:["Pain points priorisés et partagés par les 4 streams","Personas et parcours actuels validés","Transparence IT réalisée (architecture actuelle, capability map)","Données mobilisées et leur qualité analysées","Value at Stake initiale estimée","Product Vision V2 formalisée"]},
 {type:"interne", t:"Vision cible validée", d:"La vision cible est désirable pour les utilisateurs et faisable techniquement, avec des impacts évalués.",
  c:["Full flow diagram validé par les experts","Prototypes testés auprès des utilisateurs et experts","Solution technique cible validée en comité architecture et SI","Impacts et Value at Stake évalués","Product Vision V4 formalisée"]},
 {type:"client", t:"Démarrage des sprints", d:"Go / No-Go pour le delivery : le MVP est prêt à être développé.",
  c:["Scope du MVP validé","User stories des 3 premiers sprints en Definition of Ready","Roadmap complète et release planning inter-squads","Code, environnements et CI initialisés","Prototype et UX Hand-off Deck livrés","Delivery Readiness Review sans critère bloquant"]},
 {type:"client", t:"Mise en service", d:"Le MVP est validé par les métiers et déployé.",
  c:["Recette métier validée","Release notes publiées avant la MEP","Stratégie de déploiement, pilote et Go / No-Go validés","Formation et supports diffusés","Indicateurs de suivi en place"]},
 {type:"client", t:"Restitution", d:"La valeur créée est évaluée et la suite de la trajectoire décidée.",
  c:["MVP restitué aux parties prenantes","KPIs comparés à la Value at Stake initiale","REX partagé et bonnes pratiques capitalisées","Décision documentée : nouvelle release, extension ou arrêt"]}
];

const RACI_COLS = ["Business","Product","Design","Architecture","IT","Data"];
const RACI = [
 ["Cadrage et kick-off","A","R","C","C","I","I"],["Diagnostic UX et parcours actuels","I","A","R","C","C","C"],
 ["Diagnostic architecture et SI","I","C","C","A","R","C"],["Audit tracking et KPI actuels","C","A","C","I","C","R"],
 ["Vision produit et concepts","A","R","R","C","I","C"],["Architecture cible","I","C","C","A","R","C"],
 ["Prototypes et tests utilisateurs","C","A","R","C","C","I"],["MVP et backlog","C","A/R","C","C","C","C"],
 ["Business case et roadmap","A","R","C","C","C","C"],["Go / No-Go delivery","A","R","C","C","C","C"],
 ["Développement et déploiement","I","C","C","C","A/R","I"],["Design QA et handoff","I","C","A/R","I","C","I"],
 ["Mesure et amélioration continue","C","A","C","I","C","R"]
];

/* ---------- Storage ---------- */
const KEY="playbook-confluence-v1";
let state={};
try{ state=JSON.parse(localStorage.getItem(KEY)||"{}")||{}; }catch(e){ state={}; }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){} }

const STAKE=[
 ["FD","Facilitateur Digital Factory","Garant du cadre et de la méthode sur tous les ateliers, en binôme avec le Scrum master. Ne tranche pas et n'anime pas le contenu."],
 ["SP","Sponsor · Hicham","Porte l'ambition du projet, arbitre les investissements et tranche aux jalons."],
 ["FO","Functional owner","Responsable du périmètre fonctionnel : valide les choix métier et l'expérience cible."],
 ["TO","Technical owner","Responsable de la solution technique : valide les choix d'architecture et de delivery."],
 ["PO","PO / PPO","Porte la vision produit, le backlog et la priorisation."],
 ["SM","Scrum master","Garantit le cadre agile, anime les rituels de delivery et assure le binôme du Facilitateur."],
 ["RM","Référent métier","Expert du terrain et des processus : apporte la connaissance métier."],
 ["UX","UX","Mène la recherche, conçoit l'expérience et anime le contenu des ateliers de design."],
 ["US","Users","Utilisateurs finaux : interviewés, co-concepteurs et testeurs."],
 ["AR","Archis","Analysent l'architecture existante et conçoivent l'architecture cible."],
 ["IO","IT owner","Responsable des systèmes et applications existants (run)."],
 ["TL","Tech lead","Responsable technique de l'équipe : faisabilité, estimation, qualité du code."],
 ["DL","[Data lead]","Responsable des données, du tracking et des KPIs (stream D). À nommer dans la Fiche projet."],
 ["SQ","Squad","Équipe de développement : développeurs et QA."]
];
/* Rôles par atelier, alignés sur le bloc « Rôles de l'atelier » de chaque template Miro.
   F = Facilitateur Digital Factory sur tous les ateliers. Les autres codes par partie prenante. */
const AR_SRC={
 A01:{V:"SP",D:"PO",P:"FO TO RM UX AR TL DL",I:"IO SQ"},
 A02:{V:"FO",D:"UX PO",P:"TO RM AR TL DL",I:"SP IO SQ"},
 A03:{V:"FO",D:"UX PO",P:"TO RM AR TL DL SQ",I:"SP IO"},
 A04:{V:"FO",D:"UX AR",P:"TO PO RM US IO TL DL",I:"SP SQ"},
 A05:{V:"TO",D:"AR TL",P:"FO PO UX IO DL",I:"SP SQ"},
 A06:{V:"SP",D:"PO",P:"FO TO SM RM UX AR TL DL",I:"IO SQ"},
 A07:{V:"SP",D:"PO",P:"FO TO SM RM UX AR TL DL",I:"US IO SQ"},
 Gates:{V:"SP",D:"PO",P:"FO TO RM UX AR IO TL DL",I:"SM SQ"}
};
const ATELIER_ROLES=Object.keys(AR_SRC).map(k=>[k,...STAKE.map(st=>{ if(st[0]==="FD") return "F"; const r=AR_SRC[k]; for(const c of ["V","D","P","I"]){ if(r[c].split(" ").includes(st[0])) return c; } return "-"; })]);
/* Les 7 ateliers : étape, streams réunis (le premier porte l'atelier), livrables nourris. */
const ATELIERS=[
 {k:"A01",step:0,lanes:"abcd",out:"Document de kick-off, gouvernance en place"},
 {k:"A02",step:1,lanes:"babcd",out:"Diagnostic parcours, top 5 des irritants, leviers de valeur"},
 {k:"A03",step:2,lanes:"bacd",out:"Idées priorisées et leurs KPIs de valeur"},
 {k:"A04",step:2,lanes:"bcad",out:"Parcours cible, full flow diagram, Experience Blueprint"},
 {k:"A05",step:2,lanes:"cbd",out:"Solution technique cible"},
 {k:"A06",step:3,lanes:"abcd",out:"Deck MVP, roadmap des 3 premiers sprints"},
 {k:"A07",step:5,lanes:"abcd",out:"Document de REX, décision sur la suite"}
].map(a=>Object.assign(a,{lanes:[...new Set(a.lanes.split(""))]}));
/* Fiches méthode : travaux d'expert faits à 1 ou 2, restitués dans un atelier. */
const FICHES=[
 {k:"T02",lane:"a",owner:"PO",step:0,feeds:"A01"},
 {k:"T03",lane:"b",owner:"UX",step:1,feeds:"A02"},
 {k:"T04",lane:"b",owner:"UX",step:1,feeds:"A02"},
 {k:"T07",lane:"c",owner:"AR",step:1,feeds:"A02"},
 {k:"T08",lane:"c",owner:"AR",step:1,feeds:"A02"},
 {k:"T09",lane:"c",owner:"AR",step:1,feeds:"A02"},
 {k:"T21",lane:"d",owner:"DL",step:1,feeds:"A02"},
 {k:"T20",lane:"a",owner:"PO",step:1,feeds:"A02 et A03"},
 {k:"T15",lane:"b",owner:"UX",step:2,feeds:"A04, puis en sprint"},
 {k:"T23",lane:"d",owner:"DL",step:3,feeds:"A06"}
];
const stakeName=c=>STAKE.find(x=>x[0]===c)[1].replace(" · Hicham","");
const doersOf=k=>AR_SRC[k]?AR_SRC[k].D.split(" ").map(stakeName).join(", "):stakeName(FICHES.find(f=>f.k===k).owner);
const gateLabel=(g,i)=>(g.type==='client'?'Jalon client':'Revue interne')+' · '+g.t;
/* ---------- Jira : une epic par étape, une tâche par activité, un composant par stream ---------- */
const PRJ="[PRJ]";
const JSTATUS=[["À faire","grey"],["En cours","blue"],["Bloqué","red"],["Terminé","green"],["Non applicable","na"]];
const jMotif=t=>state["ji__"+t.id+"__m"]||"";
const STREAM_IDS=["stream-a","stream-b","stream-c","stream-d"];
const COMP=sid=>STREAMS[sid].name;
const EPICS=PH.map((p,i)=>({i,key:`${PRJ}-${i+1}`,name:`${p.n} · ${p.tree}`,sub:p.sub}));
function defaultAssignee(sid,i,txt){
  const m=txt.match(CODE_RE); if(m){ const k=m[0]; if(AR_SRC[k]) return stakeName(AR_SRC[k].D.split(" ")[0]); const f=FICHES.find(x=>x.k===k); if(f) return stakeName(f.owner); }
  return {"stream-a":"PO / PPO","stream-b":"UX","stream-c":i<3?"Archis":"Tech lead","stream-d":"[Data lead]"}[sid];
}
const JTASKS=[]; (function(){ let n=PH.length;
  PH.forEach((_,i)=>{ STREAM_IDS.forEach(sid=>{ STREAMS[sid].phases[i].act.forEach((t,j)=>{ n++;
    JTASKS.push({id:`${sid}-${i}-${j}`,key:`${PRJ}-${n}`,epic:i,sid,lane:STREAMS[sid].lane,txt:t,def:defaultAssignee(sid,i,t)}); }); });
    n++; JTASKS.push({id:`gate-${i}`,key:`${PRJ}-${n}`,epic:i,sid:null,lane:"g",txt:gateLabel(GATES[i],i),def:"PO / PPO",gate:true});
  });
})();
const jStatus=t=>state["ji__"+t.id+"__s"]||"À faire";
const jAssignee=t=>state["ji__"+t.id+"__a"]||t.def;
const ASSIGNEES=STAKE.map(x=>x[1].replace(" · Hicham",""));
const curStep=()=>{const v=parseInt(state.cur_step,10);return isNaN(v)?1:v;};
function jStats(list){ const c={total:list.length,done:0,doing:0,blocked:0,na:0}; list.forEach(t=>{const v=jStatus(t); if(v==="Non applicable"){c.na++;c.total--;} else if(v==="Terminé")c.done++; else if(v==="En cours")c.doing++; else if(v==="Bloqué")c.blocked++;}); c.pct=c.total?Math.round(c.done/c.total*100):0; return c; }
/* Page Confluence (arborescence client) qui porte chaque étape et son jalon. */
const PHASE_PAGE=["equipe","diagnostic","design-base0","design-detaille","dev-agile","post-mep"];
