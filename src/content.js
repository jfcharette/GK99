/* =====================================================================
   CONTENU — tout ce qui s'enseigne est ici. Pour ajouter une leçon,
   un défi ou une question, on ajoute un bloc dans ce fichier.
   Terrain : 68 x 105. Ton but est en bas (y = 105), centre x = 34.
   Identifiants : g = gardien, m = coéquipier, o = adversaire, b = ballon.
   ===================================================================== */
const LEVELS = {
  1: { n: 'Fondations', d: 'Les réflexes de base, à maîtriser maintenant.' },
  2: { n: 'Avancé', d: 'Lecture du jeu, terrain à 11, ligne défensive haute.' },
  3: { n: 'Élite', d: 'Lire le tireur, battre le pressing, deuxième action, leadership.' }
};

const MODULES = [
  { id: 'm1', n: 'En possession', k: 'On a le ballon', c: '#3FA7FF', moment: 1,
    intro: "Quand ton équipe a le ballon, tu n'es pas spectateur : tu es le joueur de plus, celui qui est toujours libre." },
  { id: 'm2', n: 'Perte du ballon', k: 'On vient de le perdre', c: '#FF9F2E', moment: 2,
    intro: "Les 5 secondes après la perte sont les plus dangereuses. Ta position de départ décide de tout." },
  { id: 'm3', n: 'Sans possession', k: 'Ils ont le ballon', c: '#FF5A4E', moment: 3,
    intro: "L'adversaire a le ballon. Tu ajustes ta position à chaque passe : angle, profondeur, appuis." },
  { id: 'm4', n: 'Récupération', k: 'On vient de le gagner', c: '#35C97A', moment: 4,
    intro: "Tu viens de récupérer le ballon. Accélérer ou calmer ? C'est toi qui choisis le rythme du match." },
  { id: 'm5', n: 'Un contre un', k: 'Face à l\'attaquant', c: '#B58CFF',
    intro: "Le duel. Il se gagne avec la tête avant de se gagner avec les mains : sortir, rester, quand s'arrêter." },
  { id: 'm6', n: 'Centres et ballons aériens', k: 'Dominer sa surface', c: '#4FD1D9',
    intro: "Un gardien qui sort bien sur les centres enlève dix occasions par match à l'adversaire." },
  { id: 'm7', n: 'Relance et jeu au pied', k: 'Courte, longue, à la main', c: '#F5D547',
    intro: "Tu es le premier attaquant. Chaque relance est une décision : où est l'espace, où est le joueur libre ?" },
  { id: 'm8', n: 'Coups de pied arrêtés', k: 'Corners, coups francs, penaltys', c: '#FF7EB6',
    intro: "Sur phase arrêtée, tu as le temps d'organiser. Profites-en : c'est toi le patron." },
  { id: 'm9', n: 'Communication et mental', k: 'La voix et la tête', c: '#9BE15D',
    intro: "Tu vois tout le terrain. Ta voix est ton deuxième outil, ton calme le troisième." },
  { id: 'm10', n: 'Technique de base', k: 'Appuis, prises, plongeons', c: '#C9CED8',
    intro: "Les gestes qui rendent tout le reste possible. À revoir souvent, même chez les pros." }
];

const SCENES = [
/* ---------- M1 : EN POSSESSION ---------- */
{ id: 's1', m: 'm1', lvl: 1, view: 'half', t: 'Tu es le joueur de plus',
  init: { g:[34,100], b:[34,98.6], m1:[20,96], m2:[48,96], m3:[5,84], m4:[63,84], m5:[34,80], o1:[27,84], o2:[41,84], o3:[34,72] },
  lb: { m1:'DC', m2:'DC', m5:'6' },
  steps: [
    { t: "Sortie de but. Devant ta surface : 2 attaquants contre tes 2 centraux… plus toi. Avec le gardien, ton équipe est toujours en supériorité.", z:[12,90,44,12,'3 contre 2'] },
    { t: "Tu joues court sur ton central gauche. Un attaquant sort le presser.", mv:{ b:[20.6,95.4], o1:[23,91] } },
    { t: "Ne reste pas planté ! Décale-toi pour offrir une passe en retrait, en diagonale derrière le ballon.", mv:{ g:[28,99.5] } },
    { t: "Retrait. Le 2e attaquant sort sur toi : ça veut dire qu'un coéquipier est libre de l'autre côté. Tu l'avais vu AVANT de recevoir.", mv:{ b:[28.4,98.8], o2:[32,92.5] } },
    { t: "Contrôle orienté, passe au central droit. Deux touches, pressing battu : il peut avancer balle au pied.", mv:{ b:[48,95.3] } }
  ],
  keys: ["Avant de recevoir, regarde par-dessus tes épaules : qui est libre ?", "Première touche qui t'ouvre vers le côté opposé au pressing.", "Passe devant ton but seulement si la ligne est 100 % libre."] },

{ id: 's2', m: 'm1', lvl: 1, view: 'full', t: 'Ta hauteur quand ton équipe attaque',
  init: { g:[34,97], b:[34,75], m1:[24,80], m2:[44,80], m3:[34,68], o1:[35,62] },
  lb: { m1:'DC', m2:'DC' },
  steps: [
    { t: "Ballon dans ton tiers : tu es disponible derrière tes centraux, à quelques mètres de ta ligne." },
    { t: "Ballon au milieu : ta défense monte, tu montes avec elle, jusqu'à la limite de ta surface.", mv:{ b:[40,50], m1:[24,62], m2:[44,62], m3:[34,48], o1:[35,58], g:[34,88] } },
    { t: "Ballon dans le tiers adverse : tes centraux sont à la médiane. Tu sors de ta surface pour protéger l'espace dans leur dos. C'est le rôle de gardien-libéro.", mv:{ b:[45,22], m1:[24,49], m2:[44,49], m3:[36,32], o1:[35,47], g:[34,80] }, z:[10,52,48,26,'Espace à protéger'] },
    { t: "Repère : garde à peu près la même distance entre toi et ton dernier défenseur. S'il monte de 10 m, tu montes de 10 m. Adapte les distances à la grandeur du terrain." }
  ],
  keys: ["Tu bouges avec ta défense, comme si un élastique vous reliait.", "Trop bas = tu laisses un immense espace aux longs ballons.", "Trop haut = tu te fais lober. Si tu ne peux pas revenir sur un tir de loin, recule."] },

{ id: 's3', m: 'm1', lvl: 1, view: 'half', t: 'La passe en retrait sous pression',
  init: { g:[34,100], m1:[8,82], b:[9,83], o1:[11,77], o2:[24,84], m2:[22,93], m3:[46,93], m4:[60,80] },
  lb: { m1:'LG', m3:'DC' },
  steps: [
    { t: "Ton latéral est enfermé le long de la touche. Il a besoin de toi." },
    { t: "Décale-toi de son côté, mais à l'EXTÉRIEUR de ton poteau : si la passe est ratée, elle ne finit pas dans ton but. Appelle fort : « Retrait ! »", mv:{ g:[27.5,100] }, c:[27.5,100,3] },
    { t: "La passe arrive, l'attaquant fonce sur toi. Tu as déjà regardé : ton central droit est seul.", mv:{ b:[27.8,99.2], o2:[26,93], o1:[12,82] } },
    { t: "Contrôle vers l'intérieur, passe au central opposé. Calme et propre.", mv:{ b:[46,92.4] } }
  ],
  keys: ["Rappel : passe volontaire du pied d'un coéquipier = interdit de prendre avec les mains.", "Si tout est fermé : dégagement long vers la touche, jamais dans l'axe.", "Pas de dribble devant ton but. Jamais."] },

/* ---------- M2 : PERTE DU BALLON ---------- */
{ id: 's4', m: 'm2', lvl: 2, view: 'full', t: 'Lis le porteur : pression ou pas ?',
  init: { g:[34,82], m1:[24,52], m2:[44,52], m3:[30,38], b:[36,30.5], o1:[36,29], o2:[38,49] },
  lb: { m1:'DC', m2:'DC' },
  steps: [
    { t: "Ton équipe vient de perdre le ballon dans le camp adverse. Ta défense est à la médiane, toi loin devant ton but." },
    { t: "Question n° 1 : le porteur est-il sous pression ? Ici non. Il a la tête levée et le temps de jouer long. Danger !", c:[36,30,5] },
    { t: "Ta ligne recule de quelques mètres. Toi, tu te mets de profil, sur l'avant des pieds : prêt à sprinter vers l'avant OU à reculer.", mv:{ m1:[24,56], m2:[44,56], o2:[38,54] } },
    { t: "Long ballon dans le dos de ta défense. Tu as lu la passe dès le départ : tu arrives le premier, hors de ta surface. Au pied seulement !", mv:{ b:[40,74], o2:[39,66], g:[39.4,75.6], m2:[43,64] } },
    { t: "Dégagement vers le côté. Si le porteur avait été sous pression (tête baissée), le long ballon était impossible : tu pouvais rester haut et tranquille.", mv:{ b:[63,58] } }
  ],
  keys: ["Porteur libre + tête levée = long ballon possible, sois prêt.", "Porteur sous pression = tu restes haut.", "Hors de ta surface, tu es un défenseur : pied ou tête, jamais les mains."] },

{ id: 's5', m: 'm2', lvl: 1, view: 'half', t: 'Contre-attaque : recule face au jeu',
  init: { g:[34,84], b:[30,57.5], o1:[30,56], o2:[46,58], m1:[36,62], m2:[22,60] },
  steps: [
    { t: "Contre-attaque. Tu étais haut, le ballon arrive vite, ton but est derrière toi." },
    { t: "Recule vite en pas croisés, sans jamais quitter le ballon des yeux. Tu restes sur la ligne ballon–centre du but.", mv:{ b:[31,71], o1:[31,69.5], o2:[45,72], m1:[35,76], m2:[24,73], g:[34,95] } },
    { t: "Il arrive à distance de tir. Sois ARRÊTÉ, sur tes appuis, avant qu'il arme. Mieux vaut être un peu trop avancé mais stable que parfaitement placé mais en mouvement.", mv:{ b:[32,82.5], o1:[32,81], o2:[44,84], m1:[35,86], m2:[26,84], g:[33.8,100.5] }, cone:1 },
    { t: "Tir : tu es en place et équilibré. Arrêt.", mv:{ b:[33.6,100] }, shot:1 }
  ],
  keys: ["Reculer ne veut pas dire tourner le dos au ballon.", "Parle à ton défenseur : « Retarde-le ! », « Pousse-le à gauche ! »", "Le temps que ton défenseur te gagne vaut de l'or."] },

/* ---------- M3 : SANS POSSESSION ---------- */
{ id: 's6', m: 'm3', lvl: 1, view: 'third', t: 'La ligne ballon–centre du but',
  init: { g:[34,101.5], b:[34,80], o1:[34,78.5] },
  steps: [
    { t: "Imagine une ligne entre le ballon et le centre de ton but. Tu es toujours dessus. Le triangle montre ce que le tireur peut viser.", cone:1 },
    { t: "Le ballon part à gauche : tu te déplaces en arc de cercle, en petits pas chassés. Toujours sur la ligne.", mv:{ b:[18,84], o1:[17,82.6], g:[31.9,102.2] }, cone:1 },
    { t: "À droite, même chose. Remarque : plus le ballon est sur le côté, plus tu te rapproches de ton premier poteau.", mv:{ b:[52,88], o1:[53,86.6], g:[36.5,102.6] }, cone:1 },
    { t: "Un ou deux pas en avant sur cette ligne et le but devient plus petit pour le tireur. Mais plus tu avances, plus le lob devient dangereux.", mv:{ g:[38.3,100.9] }, cone:1 }
  ],
  keys: ["Ballon – toi – centre du but : toujours alignés.", "Déplacement en arc de cercle, jamais en ligne droite le long de ta ligne.", "Petits pas rapides, les pieds ne se croisent pas près du but."] },

{ id: 's7', m: 'm3', lvl: 1, view: 'half', t: 'Ta profondeur selon la distance du ballon',
  init: { g:[34,92], b:[30,51.5], o1:[30,50], m1:[24,70], m2:[44,70], o2:[36,68] },
  steps: [
    { t: "L'adversaire a le ballon au milieu. Ta ligne défensive est haute, donc toi aussi : vers le point de penalty ou plus haut, pour couvrir la profondeur." },
    { t: "Le ballon approche. Ta défense recule, l'espace dans son dos rétrécit. Tu recules aussi, à 5-7 m de ta ligne.", mv:{ b:[40,68.5], o1:[40,67], m1:[25,80], m2:[43,80], o2:[35,78], g:[34.5,98.5] } },
    { t: "Zone de tir : 2 à 3 m devant ta ligne, arrêté, mains prêtes. Ici la priorité n'est plus la profondeur, c'est le tir.", mv:{ b:[38,84.5], o1:[38,83], m1:[27,90], m2:[41,89], o2:[33,92], g:[34.4,102.3] }, cone:1 },
    { t: "Règle simple : ballon loin = je suis haut, je protège l'espace. Ballon proche = je suis près de mon but, je protège le tir." }
  ],
  keys: ["Ta profondeur change à chaque passe adverse.", "Vérifie souvent où sont tes poteaux (un coup d'œil, une main).", "Entre deux positions, choisis celle où tu peux être arrêté à temps."] },

{ id: 's8', m: 'm3', lvl: 1, view: 'third', t: 'Ballon sur le côté : premier poteau',
  init: { g:[36.3,102.5], b:[56,92.5], o1:[57,91], m1:[53,95], o2:[35,93], m2:[33,96], o3:[26,90] },
  steps: [
    { t: "L'ailier déborde. Tant qu'il peut tirer, tu restes sur la ligne ballon–centre du but." },
    { t: "Il arrive près de la ligne de fond : angle fermé. Place-toi au premier poteau, à un pas de ta ligne, corps ouvert vers le terrain pour voir le centre aussi.", mv:{ b:[61,102], o1:[62.4,101], m1:[58,101.5], g:[37.1,104] } },
    { t: "Danger n° 1 : le centre en retrait. Dès que le ballon part, replace-toi en pas chassés vers le centre du but et ARRÊTE-toi avant la reprise.", mv:{ b:[35.6,94.6], o2:[35,93.4], g:[34.8,103] } },
    { t: "Reprise : tu es déjà en place. Et si le centre passe tout près de toi (2-3 m), coupe-le !", mv:{ b:[34.9,102.6] }, shot:1 }
  ],
  keys: ["Rien ne passe entre toi et ton premier poteau.", "Corps ouvert : tu vois le ballon ET le point de penalty.", "Après un centre en retrait : replace-toi, puis arrête-toi. Dans cet ordre."] },

{ id: 's9', m: 'm3', lvl: 1, view: 'third', t: 'Sois arrêté avant le tir',
  init: { g:[33,100.5], b:[30,84.5], o1:[30,83], m1:[31,89] },
  steps: [
    { t: "Position de base : pieds largeur des épaules, poids sur l'avant des pieds, genoux fléchis, mains devant toi, tête stable." },
    { t: "L'attaquant se décale pour frapper. Tu ajustes en petits pas rapides…", mv:{ b:[36,83.5], o1:[36,82], g:[34.4,101.5] } },
    { t: "…et quand son pied d'appui se pose, tu fais ton pré-saut : un mini-saut qui met tes jambes sous tension. Tu atterris au moment où il frappe.", c:[34.4,101.5,2.6] },
    { t: "Tu es stable, donc tu peux pousser fort dans n'importe quelle direction. Un gardien encore en mouvement est battu par un tir moyen.", mv:{ b:[37.4,104], g:[36.7,103.4] }, shot:1 }
  ],
  keys: ["Pré-saut petit et bas : pas un bond.", "Les mains restent devant, jamais le long du corps.", "Arrêté ne veut pas dire figé : tu es un ressort."] },

/* ---------- M4 : RÉCUPÉRATION ---------- */
{ id: 's10', m: 'm4', lvl: 1, view: 'full', t: 'Contre-attaque éclair',
  init: { g:[34,101.5], b:[12,85.5], o1:[12,84], o2:[32,96], o3:[38,95], o4:[28,90], m1:[33,97.5], m2:[39,97], m3:[56,70], m4:[40,60] },
  steps: [
    { t: "Tu captes un centre. Regarde : quatre adversaires sont près de ta surface, donc loin de leur but !", mv:{ b:[35,99.6], g:[35,100.4] } },
    { t: "Avant même de retomber, tes yeux cherchent LOIN. Du côté opposé au centre, il y a presque toujours de l'espace.", z:[46,40,20,34,'Espace libre'] },
    { t: "Quelques pas rapides vers le bord de ta surface pour gagner du terrain…", mv:{ g:[38,91], b:[38,90.2] } },
    { t: "…et relance dans la COURSE de ton ailier, pas dans ses pieds. En cinq secondes, ton équipe est dans le camp adverse.", mv:{ b:[58,58], m3:[57,62], m4:[42,48] } }
  ],
  keys: ["D'abord sécuriser le ballon, ensuite relancer.", "Regarde loin en premier, proche ensuite.", "Une relance rapide ratée vaut mieux que dix dégagements au hasard… mais jamais dans l'axe."] },

{ id: 's11', m: 'm4', lvl: 2, view: 'half', t: 'Savoir calmer le jeu',
  init: { g:[34,98], b:[34,97.2], m1:[18,92], m2:[50,92], m3:[34,82], o1:[22,88], o2:[46,88], o3:[34,78] },
  steps: [
    { t: "Ballon en main, mais tes coéquipiers sont essoufflés et tous marqués. Relancer vite ici, c'est reperdre le ballon tout de suite." },
    { t: "Garde le ballon, relève-toi calmement, fais signe à ton équipe de se replacer. Attention : tu as 8 secondes ballon en main, sinon c'est corner pour l'adversaire." },
    { t: "Tes défenseurs s'écartent. Une solution apparaît.", mv:{ m1:[7,86], m2:[61,86], m3:[30,80], o1:[20,84] } },
    { t: "Relance simple et sûre. Tu as choisi le rythme : c'est ça, gérer un match.", mv:{ b:[7.6,86.6] } }
  ],
  keys: ["Accélère si : adversaire désorganisé, coéquipier lancé, espace devant.", "Calme si : équipe fatiguée, personne de libre, tu mènes en fin de match.", "Calmer n'est pas perdre du temps : c'est replacer ton équipe."] },

/* ---------- M5 : UN CONTRE UN ---------- */
{ id: 's12', m: 'm5', lvl: 1, view: 'half', t: 'Sortir ou rester ?',
  init: { g:[34,99], o1:[36,72], b:[36,73.5], m1:[30,69] },
  steps: [
    { t: "Un attaquant part seul vers toi. Ta décision dépend d'une chose : le ballon est-il collé à son pied ou loin de son pied ?" },
    { t: "Ballon collé au pied : il contrôle tout. Tu avances prudemment, à petits pas, pour réduire l'angle. Tu ne te jettes pas.", mv:{ o1:[35.5,80], b:[35.5,81.5], m1:[31,77], g:[34.3,96.5] } },
    { t: "Touche trop longue ! Le ballon est entre vous deux, plus près de toi. C'est LE signal.", mv:{ b:[35,91], o1:[35.3,84] }, c:[35,91,2.5] },
    { t: "Tu attaques le ballon à fond, mains en premier, corps en barrière derrière. Une fois parti, tu vas au bout.", mv:{ g:[35,91.8], o1:[35.2,88.5] } }
  ],
  keys: ["Signal pour sortir : touche longue, contrôle raté, tête baissée.", "Signal pour rester : ballon collé, tête levée.", "Hésiter au milieu est la pire option."] },

{ id: 's13', m: 'm5', lvl: 1, view: 'third', t: 'Avancer, s\'arrêter, rester grand',
  init: { g:[34,101], o1:[32,82], b:[32,83.5], m1:[27,80] },
  steps: [
    { t: "Face à face, ballon maîtrisé par l'attaquant. Ton objectif : lui prendre de l'espace et du temps, et le forcer à décider." },
    { t: "Tu avances PENDANT qu'il pousse son ballon : à ce moment-là, il ne peut pas tirer.", mv:{ g:[33.4,96], o1:[32.3,87], b:[32.4,88.5], m1:[28,85] } },
    { t: "Dès qu'il peut frapper, tu es ARRÊTÉ : appuis larges, genoux fléchis, mains basses sur les côtés, buste droit. Reste debout le plus longtemps possible.", cone:1 },
    { t: "Il tire : tu es grand et proche, le ballon te touche. Si tu t'étais couché trop tôt, il te contournait ou piquait son ballon.", mv:{ b:[33.2,95.4] }, shot:1 }
  ],
  keys: ["J'avance quand le ballon roule, je m'arrête quand il peut tirer.", "Le premier qui bouge perd : laisse-le décider.", "Tout près (2-3 m) : blocage, un genou vers le sol, bras écartés et bas."] },

{ id: 's14', m: 'm5', lvl: 2, view: 'half', t: 'Ballon en profondeur : premier dessus',
  init: { g:[34,95], b:[30,61.5], o1:[30,60], o2:[40,70], m1:[36,69], m2:[26,68] },
  steps: [
    { t: "Ton équipe défend haut. Le milieu adverse lève la tête : passe en profondeur possible. Tu es déjà avancé et prêt." },
    { t: "La passe part dans le dos. Calcule vite : qui arrive premier ? Si c'est toi, tu y vas. Si tu doutes, tu restes et tu prépares le un contre un.", mv:{ b:[40,90.5], o2:[40,79], m1:[37,76] } },
    { t: "Tu y vas : « J'AI ! » Dans ta surface, tu captes en plongeant vers le ballon. Hors de ta surface, c'est au pied, fort et vers le côté.", mv:{ g:[39.6,91.4], o2:[40,85], m1:[37,82] } },
    { t: "Ta position de départ fait 80 % du travail : 3 m plus haut au départ, c'est 3 m de moins à courir." }
  ],
  keys: ["Décide dans la première seconde, puis ne change plus d'idée.", "Annonce toujours : ton défenseur doit savoir.", "Si tu restes, recule sur ta ligne ballon–but et arrête-toi."] },

{ id: 's15', m: 'm5', lvl: 2, view: 'third', t: 'Attaquant excentré',
  init: { g:[36.2,102.2], o1:[50,90], b:[50,91.5], m1:[44,88], o2:[30,92], m2:[31,95] },
  steps: [
    { t: "L'attaquant arrive de côté. Son angle de tir est petit : c'est un avantage pour toi.", cone:1 },
    { t: "Ferme d'abord ton premier poteau : rien ne passe entre toi et ce poteau. Reste debout, il n'a presque rien à viser.", mv:{ o1:[47,95], b:[46.6,96.4], g:[37.7,102.5] }, cone:1 },
    { t: "Ne sors pas trop loin : s'il te contourne ou centre en retrait, ton but est vide. Patience, c'est à lui de trouver une solution." },
    { t: "Tir au premier poteau : arrêté. Pour marquer, il devait croiser dans un trou minuscule.", mv:{ b:[38.3,102.2] }, shot:1 }
  ],
  keys: ["Angle fermé = reste debout et patient.", "Premier poteau d'abord, le reste ensuite.", "Garde un œil sur l'attaquant au centre : la passe en retrait arrive vite."] },

/* ---------- M6 : CENTRES ---------- */
{ id: 's16', m: 'm6', lvl: 1, view: 'third', t: 'Ta position de départ sur un centre',
  init: { g:[34.5,101.8], b:[60,79.5], o1:[61,78], o2:[33,93], o3:[40,95], m1:[32,95], m2:[39,97] },
  steps: [
    { t: "Centre de loin : place-toi au milieu de ton but, à 2-4 m de ta ligne. De là, tu peux attaquer un ballon devant toi ou reculer sur une tête." },
    { t: "Centre près de la ligne de fond : rapproche-toi de ta ligne et décale-toi d'un pas ou deux vers le premier poteau.", mv:{ b:[63,97], o1:[64.4,96], g:[36,103.3] } },
    { t: "Dans les deux cas : corps OUVERT, épaules à 45°. Tu dois voir le ballon ET les attaquants. Ne fixe pas seulement le ballon." },
    { t: "Le centre arrive dans ta zone : attaque-le au point le plus haut, genou levé, bras tendus.", mv:{ b:[38,100], g:[37.6,100.7] } }
  ],
  keys: ["Plus le centreur est loin de la ligne de fond, plus tu peux avancer.", "Corps ouvert, toujours.", "Attends que le ballon parte avant de bouger : lis la trajectoire d'abord."] },

{ id: 's17', m: 'm6', lvl: 1, view: 'third', t: '« J\'ai ! » ou « Dégage ! »',
  init: { g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[30,94], o3:[38,93], m1:[31,96], m2:[37,95] },
  steps: [
    { t: "La surface de but (5,5 m) est à toi. Tout ballon aérien qui y tombe, tu y vas. Plus loin : seulement si tu es certain d'arriver le premier.", z:[24.84,99.5,18.32,5.5,'Ta zone'] },
    { t: "Ballon dans ta zone : crie « J'AI ! » fort et tôt. Capte si tu es sûr. S'il y a du monde, boxe à deux poings, loin et vers le côté.", mv:{ b:[32,99.2], g:[32.4,99.9] } },
    { t: "Autre centre, cette fois vers le point de penalty : trop loin pour toi. Crie « DÉGAGE ! » et recule vite sur ta ligne.", rs:{ b:[8,85.5], g:[34.5,102.5] }, mv:{ b:[37,93.4], o3:[37.4,92.6], g:[35,103.8] } },
    { t: "Tu es arrêté sur ta ligne au moment de la tête : arrêt réflexe possible. Le pire choix : sortir à moitié et rester entre les deux.", mv:{ b:[35.4,103.8] }, shot:1 }
  ],
  keys: ["Un mot, fort, tôt : « J'AI ! » ou « DÉGAGE ! »", "Si tu annonces, tu y vas jusqu'au bout.", "Boxer : deux poings, vers le haut, loin, sur le côté."] },

/* ---------- M7 : RELANCE ---------- */
{ id: 's18', m: 'm7', lvl: 1, view: 'full', t: 'Courte ou longue ? Compte les joueurs',
  init: { g:[34,99.5], b:[34,98.2], m1:[20,95], m2:[48,95], m3:[34,82], m4:[5,82], m5:[63,82], o1:[26,82], o2:[42,82], o3:[34,70], o5:[10,70], o6:[58,70], m6:[34,40], o4:[36,44] },
  lb: { m3:'6', m6:'9' },
  steps: [
    { t: "Sortie de but. Compte : près de toi, 2 adversaires contre tes 2 centraux et ton 6, plus toi. Supériorité = on peut jouer COURT.", z:[14,78,40,24,'4 contre 2'] },
    { t: "Passe au central libre. Ton équipe construit depuis l'arrière.", mv:{ b:[48,94.3], o2:[45,89] } },
    { t: "Autre situation : ils pressent en un contre un. Chaque coéquipier proche est marqué. Jouer court ici, c'est perdre le ballon devant ton but.", rs:{ b:[34,98.2], o2:[42,82] }, mv:{ o1:[22,92], o2:[46,92], o3:[34,84], o5:[6,79], o6:[62,79] } },
    { t: "S'ils sont nombreux devant, ils sont peu nombreux derrière ! Joue LONG vers ton attaquant. Toute ton équipe monte pour gagner le deuxième ballon.", mv:{ b:[34.6,41.5], m3:[34,64], m1:[22,80], m2:[46,80] } }
  ],
  keys: ["Supériorité près de toi → court.", "Égalité ou infériorité → long, ou côté opposé.", "La décision se prend AVANT de recevoir ou de poser le ballon."] },

{ id: 's19', m: 'm7', lvl: 2, view: 'half', t: 'Le troisième homme',
  init: { g:[34,99.5], b:[34,98.2], m1:[18,92], m2:[50,92], m3:[34,80], o1:[25,94], o2:[42,87], o3:[35,75] },
  lb: { m1:'DC', m3:'6' },
  steps: [
    { t: "L'attaquant ferme la ligne de passe vers ton central gauche. Passe directe impossible." },
    { t: "Tu joues sur ton milieu défensif, même s'il a un adversaire dans le dos : il n'a pas besoin de se retourner.", mv:{ b:[34,81.2], o3:[34.6,77.5] } },
    { t: "Il remet en une touche au central que tu ne pouvais pas atteindre. A → B → C : c'est le « troisième homme ».", mv:{ b:[18.6,91.4] } },
    { t: "Ton central est libre, face au jeu. Pressing éliminé en deux passes.", mv:{ m1:[18,82], b:[18,80.5] } }
  ],
  keys: ["Passe ferme, au sol, sur le pied éloigné du défenseur.", "Annonce : « Remise ! » ou « Une touche ! »", "Après ta passe, reste disponible : le jeu peut revenir vers toi."] },

{ id: 's20', m: 'm7', lvl: 2, view: 'full', t: 'Relance longue : vise une zone',
  init: { g:[34,97], b:[34,95.8], m1:[62,46], o1:[58,50], m2:[36,42], o2:[34,46], o3:[40,47], m3:[40,60], m4:[26,62], o4:[30,58] },
  steps: [
    { t: "Une relance longue n'est pas un dégagement au hasard. Tu vises une ZONE : ici, l'espace derrière leur latéral.", z:[50,22,18,24,'Zone cible'] },
    { t: "Ballon dans la course de ton ailier, loin de leur gardien et loin de l'axe. Si on le perd là-bas, il est loin de ton but.", mv:{ b:[60,33], m1:[61,36], o1:[58,41] } },
    { t: "Toute l'équipe monte derrière le ballon pour gagner le deuxième ballon. Toi aussi, tu remontes avec ta défense.", mv:{ m3:[46,48], m4:[32,52], m2:[42,30], g:[34,86] } },
    { t: "Deux techniques à travailler des deux pieds : la volée latérale (tendue, rapide) et le dégagement posé au sol (plus haut, plus long)." }
  ],
  keys: ["Vise le côté, rarement l'axe.", "Trajectoire tendue = moins de temps pour l'adversaire.", "Relance longue = tout le monde monte."] },

{ id: 's21', m: 'm7', lvl: 1, view: 'half', t: 'Relance à la main : trois lancers',
  init: { g:[34,95], b:[34,94], m1:[10,80], m2:[34,74], m3:[58,60], o1:[20,72], o2:[42,68], o3:[50,72] },
  steps: [
    { t: "À la main, tu es plus précis qu'au pied. Trois lancers, trois distances." },
    { t: "ROULÉ, comme aux quilles : passe courte, jusqu'à 15 m. Précis et facile à contrôler.", mv:{ b:[10.6,80.6] } },
    { t: "JAVELOT, bras qui part de côté : mi-distance, tendu et rapide, à hauteur de pied.", rs:{ b:[34,94] }, mv:{ b:[34,75] } },
    { t: "PAR-DESSUS l'épaule, bras tendu : longue distance, pour lancer une contre-attaque par-dessus la première ligne adverse.", rs:{ b:[34,94] }, mv:{ b:[58,61] } }
  ],
  keys: ["Vise le pied éloigné de l'adversaire.", "Lance dans la course, pas dans le dos.", "Un bon lancer arrive vite ET facile à contrôler."] },

/* ---------- M8 : COUPS DE PIED ARRÊTÉS ---------- */
{ id: 's22', m: 'm8', lvl: 1, view: 'third', t: 'Corner : organise ta surface',
  init: { g:[34.6,104], b:[0.6,104.4], o1:[2,102], m1:[30.8,104.2], m2:[26,100], m3:[33,99], m4:[38,99], o2:[32,94], o3:[38,93], o4:[43,96], m5:[31,95], m6:[37.4,94] },
  steps: [
    { t: "Avant le corner, c'est toi le patron : un joueur au premier poteau, un dans la zone devant ce poteau, et chaque adversaire est pris. Suis le plan de ton entraîneur et fais-le respecter." },
    { t: "Ta position : milieu du but ou un peu vers le deuxième poteau, à un pas de ta ligne, corps ouvert. Tu vois le tireur ET la surface.", c:[34.6,104,2.4] },
    { t: "Ballon dans tes 5,5 m : « J'AI ! » Tu l'attaques au point le plus haut, genou levé pour te protéger.", mv:{ b:[33,100.2], g:[33.4,100.9] } },
    { t: "Ballon capté : contre-attaque possible. Ballon boxé : crie « SORS ! » pour faire monter toute ta défense." }
  ],
  keys: ["Organise AVANT que le ballon soit posé.", "Corps ouvert, un pas devant ta ligne.", "Après le dégagement : « SORS ! »"] },

{ id: 's23', m: 'm8', lvl: 2, view: 'third', t: 'Coup franc : le mur et toi',
  init: { b:[26,86], o1:[25,83.5], m1:[27,95], m2:[28.1,94.8], m3:[29.2,94.6], m4:[30.3,94.4], g:[36,103.2] },
  steps: [
    { t: "Coup franc à 20 m. Combien dans le mur ? Proche et dans l'axe : 4 ou 5. Sur le côté : 2 ou 3. Très loin : 1 ou 2." },
    { t: "Le mur protège le premier poteau. Aligne-le vite depuis ce poteau : le joueur du bout doit dépasser un peu la ligne ballon–poteau.", cone:1 },
    { t: "Toi, tu prends l'autre côté, là où tu VOIS le ballon. Jamais caché derrière ton mur. À 1-2 m de ta ligne.", c:[36,103.2,2.4] },
    { t: "Patience : ne pars pas avant la frappe. Un pas du mauvais côté et le tireur n'a plus qu'à choisir.", mv:{ b:[37,103.6], g:[36.7,103.4] }, shot:1 }
  ],
  keys: ["Mur = premier poteau. Toi = l'autre côté.", "Si tu ne vois pas le ballon, déplace-toi.", "Attends la frappe."] },

{ id: 's24', m: 'm8', lvl: 1, view: 'third', t: 'Penalty',
  init: { b:[34,94], o1:[34,90.5], g:[34,104.7] },
  steps: [
    { t: "Penalty : la pression est sur le tireur, pas sur toi. Tu n'as rien à perdre." },
    { t: "La règle : au moment de la frappe, au moins un pied sur ta ligne ou au-dessus. Tu peux bouger de côté avant." },
    { t: "Les indices : la course d'élan, le pied d'appui (il pointe souvent vers la cible), les hanches. Choisis un plan et tiens-toi-y.", c:[34,90.5,3] },
    { t: "Pousse fort avec la jambe du côté du plongeon, mains vers le ballon. Et reste prêt pour le rebond !", mv:{ b:[31.6,104.5], g:[32.3,104.5] }, shot:1 }
  ],
  keys: ["Prends ton temps, occupe ton but, sois grand.", "Un plan clair vaut mieux qu'une hésitation.", "Arrêt ou pas : la tête haute, le match continue."] },

/* =====================================================================
   NIVEAU 3 — ÉLITE (lot F) : 8 leçons animées
   ===================================================================== */
{ id: 's25', m: 'm2', lvl: 3, view: 'long', t: 'Gardien-libéro : couper le ballon dans le dos',
  init: { g:[34,80], m1:[24,52], m2:[44,52], m3:[12,50], m4:[56,50], m5:[33.5,41.5], o1:[32,38], b:[32,39.5], o2:[40,49], o3:[20,47] },
  lb: { m1:'DC', m2:'DC' },
  steps: [
    { t: "Ton équipe vient de perdre le ballon. Ta défense est à la médiane : derrière elle, 40 m d'espace. Cet espace, c'est le tien.", z:[10,55,48,24,'Ton espace'] },
    { t: "Le porteur est pressé, tête baissée : il ne peut pas jouer long. Tu restes haut, hors de ta surface, sur la pointe des pieds." },
    { t: "Il se libère et lève la tête : danger. Recule de quelques pas, de profil, prêt à sprinter vers l'avant ou vers l'arrière. Leur attaquant part dans le dos de ton central.", mv:{ o1:[26,40], b:[26,41.5], g:[34,85], o2:[41,56] } },
    { t: "Long ballon. Lis la trajectoire tout de suite : il tombe hors de ta surface et tu y seras le premier. Tu pars sans hésiter : « J'AI ! »", mv:{ b:[39,74], o2:[41,65], m2:[43,60], g:[37.5,78] }, c:[39,74,2.5] },
    { t: "Hors de ta surface : le pied ou la tête, jamais les mains. Pas de contrôle risqué : tu dégages fort vers la touche.", mv:{ g:[38.6,75.2], b:[64,56] } },
    { t: "Puis tu reviens vite vers ton but, en regardant le ballon. Ton travail est fini seulement quand tu es replacé.", mv:{ g:[35,88] } }
  ],
  keys: ["Porteur pressé = tu peux rester haut. Porteur libre, tête levée = prépare-toi au long ballon.", "Décide dans la première seconde. Si tu pars, tu vas au bout.", "Hors de la surface, joue simple : vers la touche, loin de l'axe."] },

{ id: 's26', m: 'm3', lvl: 3, view: 'third', t: 'Lis le tireur avant la frappe',
  init: { g:[32.6,101.8], o1:[22,84], b:[22.8,85.3], m1:[21,89.5], o2:[42,90], m2:[40,93] },
  steps: [
    { t: "Les meilleurs gardiens ne regardent pas seulement le ballon : ils lisent le corps du tireur. Trois indices, dans l'ordre.", cone:1 },
    { t: "Indice 1 : la dernière touche. Quand il pousse le ballon un peu devant lui et baisse la tête, la frappe arrive. C'est ton signal pour t'arrêter.", mv:{ o1:[24.5,85], b:[26,86.6], g:[33,101.9] }, c:[24.5,85,3] },
    { t: "Indice 2 : le pied d'appui. Il se pose à côté du ballon et pointe souvent vers la cible. Ici, il pointe vers ton deuxième poteau.", c:[24.5,85,3] },
    { t: "Indice 3 : l'élan et les hanches. Grand élan = frappe en force. Petit élan, corps ouvert = tir placé, enroulé." },
    { t: "Attention : un indice n'est pas une certitude. Tu ne pars JAMAIS avant la frappe. L'indice te prépare, le ballon décide." },
    { t: "Frappe placée au deuxième poteau. Tu étais arrêté, tu avais lu : un pas, poussée, mains fermes.", mv:{ b:[36.4,102.6], g:[35.6,102.4] }, shot:1 }
  ],
  keys: ["Dernière touche + tête qui baisse = sois arrêté.", "Pied d'appui, élan, hanches : des indices, pas des certitudes.", "Regarde des tirs en vidéo au ralenti : entraîne tes yeux."] },

{ id: 's27', m: 'm7', lvl: 3, view: 'half', t: 'Attire le pressing, joue dans son dos',
  init: { g:[34,100], b:[34,98.6], m1:[20,93], m2:[48,93], m5:[34,81], m3:[5,82], m4:[63,82], o1:[34,86], o2:[18,82], o3:[50,82], o4:[38,72] },
  lb: { m1:'DC', m2:'DC', m5:'6' },
  steps: [
    { t: "Sortie de but. Leur 9 se place devant ton 6 pour le cacher. Leurs deux ailiers attendent ta passe vers un central pour lui sauter dessus : c'est leur déclencheur.", c:[34,86,3] },
    { t: "Les déclencheurs classiques d'un pressing : une passe lente, une passe vers la touche, un contrôle raté, un joueur dos au jeu. Ne leur donne pas le signal." },
    { t: "Garde le ballon et avance de quelques pas, tête levée. Personne ne te presse : c'est toi qui obliges le 9 à choisir.", mv:{ g:[34,96.5], b:[34,95] } },
    { t: "Le 9 sort sur toi. En bougeant, il découvre ton 6. Tu l'as attiré exprès : la porte vient de s'ouvrir.", mv:{ o1:[36.4,91], m5:[28,83] } },
    { t: "Passe au sol vers ton 6, sur son pied le plus loin de l'adversaire. Il se retourne : un joueur éliminé, le jeu est devant lui.", mv:{ b:[28.4,84.3] } },
    { t: "Et s'ils pressent à quatre ou cinq, un homme sur chaque coéquipier ? Alors il n'y a plus grand monde derrière eux : joue par-dessus, vers ton attaquant ou le côté opposé.", z:[8,50,52,16,'L\'espace est ici'] }
  ],
  keys: ["Repère leur déclencheur… et ne le donne pas.", "Attire un adversaire, puis joue dans l'espace qu'il vient de quitter.", "Aucun risque dans l'axe : si rien n'est propre, joue long vers un côté."] },

{ id: 's28', m: 'm3', lvl: 3, view: 'third', t: 'La deuxième action',
  init: { g:[33,101.6], o1:[24,84], b:[24.8,85.4], m1:[29.6,87.4], o2:[46,90], m2:[43,92.6], o3:[38.4,96.6], m3:[37,97.9] },
  steps: [
    { t: "Frappe puissante à venir. Capter, c'est le mieux. Mais parfois c'est impossible : alors c'est TOI qui décides où va le rebond.", cone:1 },
    { t: "La zone interdite : devant ton but, dans l'axe. Un ballon repoussé ici, c'est un deuxième tir à bout portant.", z:[24,90,20,10,'Jamais ici'] },
    { t: "Tir en force. Impossible à capter : paume ferme, poignet solide, tu accompagnes le ballon vers l'extérieur.", mv:{ b:[33.6,101.8] }, shot:1 },
    { t: "Le ballon file sur le côté, loin de l'axe. Deuxième action : debout en une seconde, les yeux sur le ballon.", mv:{ b:[50,99], o2:[49,95.5] } },
    { t: "Replace-toi sur la nouvelle ligne ballon–centre du but, premier poteau fermé, et sois ARRÊTÉ avant la reprise.", mv:{ g:[36.8,103.4] }, cone:1 },
    { t: "Reprise d'un angle fermé : arrêt. Le premier arrêt compte seulement si le deuxième suit.", mv:{ b:[37.4,103.2] }, shot:1 }
  ],
  keys: ["Capte si tu peux. Sinon : sur le côté ou par-dessus la barre, jamais dans l'axe.", "Mains molles = rebond devant toi. Mains fermes = rebond où tu veux.", "Après chaque arrêt : relève-toi vite, replace-toi, arrête-toi."] },

{ id: 's29', m: 'm8', lvl: 3, view: 'third', t: 'Corner : rentrant, sortant et bloqueur',
  init: { g:[34.6,104], b:[0.6,104.4], o1:[2,101.6], m1:[30.8,104.2], m2:[27,99.5], m3:[33,98.6], m4:[41,99.5], o2:[31,92.6], m5:[31.6,94.2], o3:[38,92], m6:[38.6,93.6], o4:[38.4,96] },
  steps: [
    { t: "Avant chaque corner, pose-toi deux questions. Un : le ballon va-t-il tourner VERS mon but ou S'ÉLOIGNER ? Deux : qui vient me gêner ?" },
    { t: "Corner rentrant (il tourne vers ton but) : reste à un pas de ta ligne, au milieu. Il peut entrer directement, et le premier poteau est la zone chaude.", c:[30.4,102.4,2.6] },
    { t: "Corner sortant (il s'éloigne du but) : tu peux partir un ou deux pas plus haut. Le ballon ne vient pas à toi : c'est toi qui vas le chercher dans ta zone, en jaune.", mv:{ g:[34.4,102.6] }, z:[24.84,99.5,18.32,5.5] },
    { t: "Un adversaire vient se coller à toi pour te bloquer. Ne te bats pas avec lui : demande un coéquipier entre lui et toi, et garde de la place pour ton élan.", mv:{ o4:[38.8,100], m3:[36.7,101.2] } },
    { t: "Le ballon part. Zone ou individuel, ton travail est le même : premier pas vers le ballon, genou levé, « J'AI ! ». Si tu ne peux pas capter, boxe loin, vers le côté.", mv:{ b:[32,100.4], g:[32.6,101.1] } }
  ],
  keys: ["Regarde le pied du tireur : rentrant = plus près de ta ligne, sortant = un pas plus haut.", "Défense en zone ou individuelle : apprends le plan de ton équipe et rappelle-le avant chaque corner.", "On te bloque ? Un coéquipier pour te protéger, et tu gardes ton élan."] },

{ id: 's30', m: 'm3', lvl: 3, view: 'third', t: 'D\'où viennent les buts ?',
  init: { g:[34,101.5], b:[34,74.5], o1:[34,73], m1:[29,84], m2:[39,84], o2:[56,96], m4:[53.5,90.5], o3:[37.6,95.4], m3:[31,97] },
  steps: [
    { t: "La très grande majorité des buts sont marqués d'ici : dans l'axe, entre le point de penalty et ton but. Appelons-la la zone d'or.", z:[24,88,20,17,'Zone d\'or'] },
    { t: "Tir de loin : si tu es bien placé et arrêté, très peu entrent. Tu as le temps de voir partir le ballon. Pas de panique.", cone:1 },
    { t: "Ballon sur le côté, angle fermé : le tireur voit un tout petit but. Reste debout, premier poteau fermé. Ce tir-là ne doit pas te faire peur.", mv:{ b:[55,94.6], g:[36.9,103.2] }, cone:1 },
    { t: "Le vrai danger, c'est la passe qui ramène le ballon dans la zone d'or : le centre en retrait. Garde toujours un œil sur le joueur libre dans l'axe.", mv:{ b:[37,93.9], g:[34.6,102.6] }, z:[24,88,20,17,'Zone d\'or'] },
    { t: "Ce que ça change pour toi : tes consignes poussent le jeu vers l'extérieur. « Ferme l'axe ! » Tu préfères dix tirs de côté à un seul tir dans la zone d'or." }
  ],
  keys: ["Protège l'axe d'abord : c'est là que se marquent les buts.", "Tir de loin ou d'angle fermé : placé, arrêté, calme.", "Centre en retrait = alerte maximale. Replace-toi et arrête-toi."] },

{ id: 's31', m: 'm5', lvl: 3, view: 'half', t: 'Deux contre un : gagne du temps',
  init: { g:[34,97], o1:[28,70], b:[28,71.5], o2:[44,72], m1:[33,78], m2:[26,56], m3:[46,54] },
  steps: [
    { t: "Contre-attaque : ils sont deux, il te reste un seul défenseur. Ton but n'est pas de gagner le ballon tout de suite. Ton but, c'est de gagner du TEMPS." },
    { t: "« RETARDE ! » Ton défenseur recule sans se jeter, entre le porteur et l'axe. Chaque seconde ramène tes coéquipiers.", mv:{ o1:[29,79], b:[29,80.5], o2:[43,81], m1:[32.6,85.5], m2:[27,67], m3:[45,65] } },
    { t: "Partagez le travail. Toi : le porteur et son tir, debout sur la ligne ballon–centre du but. Lui : il gêne la passe vers le deuxième attaquant.", cone:1 },
    { t: "La passe part quand même. Tu te déplaces PENDANT que le ballon roule, à petits pas rapides, et tu es arrêté quand il arrive.", mv:{ b:[42.6,88.4], o2:[42.6,87], g:[35.8,100.4], m1:[35,89] }, cone:1 },
    { t: "Tir : tu es placé et stable. Arrêt. Ils ont dû faire une passe de plus, et tes coéquipiers sont revenus.", mv:{ b:[36.4,100], m2:[31.5,82.5], m3:[45,80] }, shot:1 }
  ],
  keys: ["En infériorité, le temps est ton ami : fais-leur faire une passe de plus.", "Ne sors pas sur le porteur tant qu'il contrôle : une passe et ton but est vide.", "Déplace-toi pendant la passe, arrête-toi avant le tir."] },

{ id: 's32', m: 'm9', lvl: 3, view: 'full', t: 'Après le but : les deux minutes qui suivent',
  init: { g:[34,104.2], b:[36.5,106.6], m1:[28,97], m2:[41,96], m3:[12,88], m4:[57,90], m5:[33,84], m6:[36,70], o1:[33,93], o2:[24,86], o3:[46,84] },
  steps: [
    { t: "But encaissé. Les deux minutes qui suivent sont dangereuses : une équipe qui doute en encaisse souvent un deuxième. C'est là que ton équipe a le plus besoin de toi." },
    { t: "D'abord toi. Ta routine : respire, ton geste, ton mot. Dix secondes, pas plus. (Tu l'as construite dans « Gestion de l'erreur ».)", c:[34,104.2,3.2] },
    { t: "Ensuite les autres. Regarde tes défenseurs dans les yeux, pas le sol. Une consigne courte et positive : « On reste serrés ! », « Simple pendant deux minutes ! »", mv:{ b:[34,52.5], m1:[26,84], m2:[42,84], m3:[10,78], m4:[58,78], m5:[34,68], m6:[32.6,54.4], o1:[34,44], o2:[22,46], o3:[46,46] } },
    { t: "Coup d'envoi. Reprends ta hauteur normale tout de suite : un gardien qui se cache sur sa ligne après un but laisse de l'espace et inquiète sa défense.", mv:{ g:[34,92], b:[34,66.6] } },
    { t: "Ton premier ballon arrive : une passe en retrait. Fais simple et propre : un contrôle, une bonne passe. Pas besoin d'un exploit pour te racheter.", mv:{ b:[34,90.4], o1:[39,60] } },
    { t: "Passe réussie vers ton latéral. Le but est derrière toi. On analysera l'erreur après le match, jamais pendant.", mv:{ b:[10.6,79.2] } }
  ],
  keys: ["Dix secondes pour toi, puis tu t'occupes des autres.", "Après un but : voix forte, tête haute, consignes positives.", "Le prochain ballon est le seul qui compte. Fais-le simple."] }
];

/* ---------- DÉFIS « PLACE-TOI » : glisse le gardien au bon endroit ---------- */
const PLACES = [
  { id: 'p1', m: 'm3', lvl: 1, view: 'half', t: 'Ballon dans l\'axe, à 35 m',
    q: "L'adversaire a le ballon dans l'axe, à 35 m. Ta défense est en place devant toi. Où te places-tu ?",
    init: { g:[44,103], b:[34,71.5], o1:[34,70], m1:[26,84], m2:[42,84], o2:[34,82] }, ideal:[34,99], tol:3.5,
    why: "Dans l'axe de ton but, à 5-6 m de ta ligne : assez haut pour couper un ballon en profondeur, assez bas pour ne pas te faire lober." },
  { id: 'p2', m: 'm3', lvl: 1, view: 'third', t: 'Ailier à 25 m sur le côté',
    q: "L'ailier a le ballon à gauche, à 25 m, et peut tirer ou centrer. Où te places-tu ?",
    init: { g:[40,104], b:[8,81.5], o1:[8,80], m1:[13,86], o2:[34,92], m2:[33,95] }, ideal:[31.2,102.2], tol:2.6, cone:1,
    why: "Sur la ligne ballon–centre du but, à 3-4 m de ta ligne, donc décalé vers ton premier poteau." },
  { id: 'p3', m: 'm3', lvl: 1, view: 'third', t: 'Débordement jusqu\'à la ligne de fond',
    q: "L'ailier est presque sur la ligne de fond, à droite. Où te places-tu ?",
    init: { g:[31,102], b:[58,102.5], o1:[59.5,101.5], m1:[54,101], o2:[34,94], m2:[33,96.5] }, ideal:[36.9,104], tol:2.2,
    why: "Au premier poteau, à un pas de ta ligne, corps ouvert. Angle fermé : tu protèges le poteau et tu te prépares au centre en retrait." },
  { id: 'p4', m: 'm1', lvl: 2, view: 'full', t: 'Ton équipe attaque',
    q: "Ton équipe a le ballon dans le tiers adverse. Tes centraux sont à la médiane. Où te places-tu ?",
    init: { g:[34,102], b:[30,20], m5:[30,21.5], m1:[24,50], m2:[44,50], o1:[35,48], m3:[36,34] }, ideal:[34,80], tol:6,
    why: "Hors de ta surface, dans l'axe : tu protèges l'espace dans le dos de ta défense et tu restes une solution de passe." },
  { id: 'p5', m: 'm1', lvl: 1, view: 'half', t: 'Ton central est pressé',
    q: "Ton central gauche a le ballon et un attaquant le presse. Offre-lui une passe en retrait. Où te places-tu ?",
    init: { g:[38,103], b:[20.6,88.6], m1:[20,88], o1:[23,83], m2:[48,90], o2:[40,82] }, ideal:[28.5,99.5], tol:3.8,
    why: "De son côté, à l'extérieur de ton poteau et devant ta ligne : la passe est facile pour lui et une passe ratée ne finit pas dans ton but." },
  { id: 'p6', m: 'm3', lvl: 1, view: 'third', t: 'Tir imminent à 19 m',
    q: "Un attaquant arme sa frappe à l'entrée de la surface, dans l'axe. Où es-tu ARRÊTÉ ?",
    init: { g:[40,99], b:[34,86.5], o1:[34,85], m1:[30,89] }, ideal:[34,102.4], tol:2.3, cone:1,
    why: "Dans l'axe, à 2-3 m de ta ligne : tu réduis l'angle sans t'exposer au lob, et tu es stable au moment de la frappe." },
  { id: 'p7', m: 'm5', lvl: 1, view: 'half', t: 'Touche trop longue !',
    q: "L'attaquant a poussé son ballon trop loin. Le ballon est plus près de toi que de lui. Où vas-tu ?",
    init: { g:[34,99], b:[34.5,91], o1:[35,82], m1:[30,79] }, ideal:[34.5,91.4], tol:2.6,
    why: "Sur le ballon ! Touche longue = tu attaques à fond, mains en premier. C'était le signal." },
  { id: 'p8', m: 'm8', lvl: 1, view: 'third', t: 'Corner de la gauche',
    q: "Corner pour l'adversaire, côté gauche. Où te places-tu avant la frappe ?",
    init: { g:[30,101], b:[0.6,104.4], o1:[2,102], m1:[30.8,104.2], m2:[26,100], o2:[32,94], o3:[38,93], m5:[31,95], m6:[37.4,94] }, ideal:[34.8,104], tol:2.2,
    why: "Au milieu du but ou un peu vers le deuxième poteau, à un pas de ta ligne, corps ouvert vers le terrain." },
  { id: 'p9', m: 'm8', lvl: 2, view: 'third', t: 'Coup franc à 20 m',
    q: "Coup franc. Ton mur protège le poteau de gauche. Où te places-tu ?",
    init: { g:[30,104], b:[26,86], o1:[25,83.5], m1:[27,95], m2:[28.1,94.8], m3:[29.2,94.6], m4:[30.3,94.4] }, ideal:[36,103.3], tol:2.2,
    why: "Du côté que le mur ne couvre pas, là où tu vois le ballon, à 1-2 m de ta ligne." },
  { id: 'p10', m: 'm6', lvl: 1, view: 'third', t: 'Centre de loin',
    q: "Un latéral va centrer de loin, à droite, à 27 m de la ligne de fond. Où te places-tu ?",
    init: { g:[38,104.3], b:[60,79.5], o1:[61,78], o2:[33,93], o3:[40,95], m1:[32,95], m2:[39,97] }, ideal:[34.6,101.6], tol:2.6,
    why: "Au milieu de ton but, à 2-4 m de ta ligne, corps ouvert : tu peux sortir sur un ballon devant toi ou reculer sur une tête." }
];

/* ---------- QUIZ : la première réponse est la bonne (l'ordre est mélangé à l'écran) ---------- */
const QUIZ = [
  { m:'m1', q:"Ton équipe attaque dans le camp adverse. Où es-tu ?", o:["Hors de ma surface, prêt à couper les longs ballons","Sur ma ligne, au cas où","Au point de penalty, sans bouger"], w:"Tu montes avec ta défense pour protéger l'espace dans son dos." },
  { m:'m1', q:"Avant de recevoir une passe en retrait, tu dois surtout…", o:["Regarder autour pour savoir où jouer","Fixer le ballon jusqu'au bout","Reculer sur ta ligne"], w:"L'information se prend avant. Quand le ballon arrive, tu sais déjà où tu joues." },
  { m:'m1', q:"Passe en retrait, deux attaquants sur toi, aucune solution courte.", o:["Dégagement long vers la touche","Dribbler le premier attaquant","Passe courte dans l'axe"], w:"Sécurité d'abord : loin de l'axe, loin de ton but." },
  { m:'m1', q:"Où te places-tu pour offrir une passe en retrait ?", o:["À l'extérieur de mon poteau, côté ballon","Au centre de mon but, sur ma ligne","Derrière le porteur, tout près de lui"], w:"Une passe ratée ne doit jamais rouler vers ton but." },
  { m:'m2', q:"Ton équipe perd le ballon. L'adversaire a la tête levée, personne ne le presse.", o:["Je me prépare à un long ballon dans le dos","Je monte encore plus haut","Je ne change rien"], w:"Porteur libre et tête levée : le long ballon est possible. Sois prêt." },
  { m:'m2', q:"Tu sors de ta surface sur un long ballon. Tu peux…", o:["Jouer au pied ou de la tête seulement","Prendre le ballon avec les mains si personne ne voit","Plonger dessus avec les mains"], w:"Hors de la surface, main = coup franc et souvent carton rouge." },
  { m:'m2', q:"Contre-attaque : comment recules-tu vers ton but ?", o:["Vite, en gardant le ballon à l'œil","En tournant le dos et en sprintant","En marchant, pour rester calme"], w:"Tu ne quittes jamais le ballon des yeux, et tu t'arrêtes avant le tir." },
  { m:'m3', q:"Sur quelle ligne te places-tu face à un tireur ?", o:["Ballon – centre du but","Ballon – premier poteau","Toujours au milieu, peu importe le ballon"], w:"C'est la base du placement : ballon, toi, centre du but." },
  { m:'m3', q:"L'attaquant va frapper. Le plus important ?", o:["Être arrêté et équilibré","Continuer d'avancer vers lui","Reculer vers ma ligne"], w:"Un gardien en mouvement ne peut pas pousser. Stable d'abord." },
  { m:'m3', q:"Ballon adverse à la médiane, ta défense est haute.", o:["Je suis haut aussi, pour couvrir la profondeur","Je reste sur ma ligne","Je me place au premier poteau"], w:"Ballon loin = tu protèges l'espace derrière ta défense." },
  { m:'m3', q:"L'ailier est sur la ligne de fond, angle fermé.", o:["Premier poteau, corps ouvert vers le terrain","Milieu du but, face à lui","Deuxième poteau, pour le centre"], w:"Tu fermes le premier poteau tout en voyant le centre en retrait." },
  { m:'m4', q:"Tu captes un corner. Cinq adversaires sont dans ta surface.", o:["Je cherche vite un coéquipier lancé loin","Je garde le ballon le plus longtemps possible","Je dégage au hasard devant"], w:"Ils sont loin de leur but : c'est le moment idéal pour contre-attaquer." },
  { m:'m4', q:"Combien de temps peux-tu garder le ballon en main ?", o:["8 secondes, sinon corner pour l'adversaire","Aussi longtemps que tu veux","3 secondes"], w:"Depuis 2025, la règle est de 8 secondes. Vérifie avec ton entraîneur comment ta ligue l'applique." },
  { m:'m4', q:"Ton équipe est épuisée et tu mènes 1-0 en fin de match.", o:["Je calme le jeu et je replace mon équipe","Je relance le plus vite possible","Je dégage en touche"], w:"Choisir le rythme fait partie de ton travail." },
  { m:'m5', q:"L'attaquant pousse son ballon trop loin devant lui.", o:["Je sors à fond sur le ballon","Je recule sur ma ligne","J'attends qu'il le reprenne"], w:"Touche longue : c'est le signal pour attaquer le ballon." },
  { m:'m5', q:"Un contre un, ballon collé au pied, tête levée.", o:["J'avance prudemment et je reste debout","Je me jette dans ses pieds","Je reste sur ma ligne"], w:"Il contrôle : tu réduis l'angle sans te livrer." },
  { m:'m5', q:"Quand t'arrêtes-tu dans un un contre un ?", o:["Dès que l'attaquant peut frapper","Jamais, je cours jusqu'à lui","Seulement après son tir"], w:"Tu avances quand le ballon roule, tu es arrêté quand il peut tirer." },
  { m:'m5', q:"Attaquant excentré, angle très fermé.", o:["Je ferme mon premier poteau et je reste debout","Je sors très loin vers lui","Je me couche tôt"], w:"L'angle travaille pour toi. Patience." },
  { m:'m6', q:"Un centre tombe dans ta surface de but (5,5 m).", o:["« J'AI ! » et j'y vais au point le plus haut","J'attends sur ma ligne","Je laisse mon défenseur"], w:"C'est ta zone. Annonce fort et va jusqu'au bout." },
  { m:'m6', q:"Centre vers le point de penalty, beaucoup de monde.", o:["« DÉGAGE ! » et je me replace sur ma ligne","Je sors quand même","Je ne dis rien"], w:"Trop loin : tu annonces et tu te prépares à la tête." },
  { m:'m6', q:"Tu sors mais il y a trop de joueurs pour capter.", o:["Je boxe à deux poings, loin et sur le côté","Je boxe vers le point de penalty","J'essaie de capter à une main"], w:"Loin, haut, sur le côté : jamais dans l'axe." },
  { m:'m7', q:"Sortie de but : 2 attaquants pressent tes 2 centraux et ton 6 est libre.", o:["Je joue court, on est en supériorité","Je joue long","Je sors en touche"], w:"Avec toi, c'est 4 contre 2 : construis." },
  { m:'m7', q:"Tous tes coéquipiers proches sont marqués de près.", o:["Je joue long vers l'espace ou mon attaquant","Je force la passe courte","Je dribble"], w:"S'ils sont nombreux devant, il y a de l'espace derrière eux." },
  { m:'m7', q:"Une relance longue se joue de préférence…", o:["Vers un côté, dans la course d'un coéquipier","En plein centre","Le plus haut possible"], w:"Sur le côté, une perte de balle est moins dangereuse." },
  { m:'m7', q:"Ton latéral est libre à 12 m. Quel lancer ?", o:["Roulé au sol","Par-dessus l'épaule","Dégagement de volée"], w:"Court = roulé : précis et facile à contrôler." },
  { m:'m8', q:"Coup franc : ton mur couvre le poteau gauche.", o:["Je me place du côté droit, où je vois le ballon","Je me place derrière le mur","Je reste collé au poteau gauche"], w:"Le mur prend un côté, toi l'autre." },
  { m:'m8', q:"Sur penalty, au moment de la frappe…", o:["Au moins un pied sur ma ligne ou au-dessus","Je peux avancer de deux mètres","Je dois rester immobile"], w:"Tu peux bouger de côté, mais un pied reste sur la ligne à la frappe." },
  { m:'m8', q:"Tu boxes un corner hors de ta surface. Ensuite ?", o:["Je crie « SORS ! » pour faire monter ma défense","Je reste silencieux","Je sors de mon but"], w:"Faire monter la ligne met les attaquants hors-jeu et éloigne le danger." },
  { m:'m9', q:"Tu viens d'encaisser un but sur ton erreur.", o:["Routine de retour au calme, puis prochain ballon","Je m'excuse à tout le monde","Je boude jusqu'à la mi-temps"], w:"L'erreur est passée. Le prochain ballon est le seul qui compte." },
  { m:'m9', q:"Un bon message à ton défenseur, c'est…", o:["Court, fort, précis : « Seul ! », « Ça vient ! »","Une longue explication","Rien : il doit deviner"], w:"Un mot ou deux, tôt, avec son prénom si possible." },
  { m:'m9', q:"Ton coéquipier reçoit dos au jeu, un adversaire arrive dans son dos.", o:["« Ça vient ! »","« Seul ! »","« Tourne ! »"], w:"Tu es ses yeux derrière la tête." },
  { m:'m10', q:"Ballon à hauteur de poitrine ou de tête : quelle prise ?", o:["Mains en W, pouces qui se touchent presque","Mains en panier","Une seule main"], w:"Le W place tes mains derrière le ballon." },
  { m:'m10', q:"Sur un plongeon, tu pousses avec…", o:["La jambe du côté du ballon","La jambe opposée","Les deux pieds en même temps"], w:"Pas latéral, puis poussée de la jambe côté ballon, vers l'avant." },
  { m:'m10', q:"Ballon au sol dans l'axe : que fais-tu ?", o:["Corps derrière le ballon, mains en pelle","Je me penche jambes écartées","Je l'arrête avec le pied"], w:"Toujours une deuxième barrière derrière tes mains." }
];

/* ---------- FICHES (texte) ---------- */
const CARDS = {
  m9: [
    { h: "Tes mots-clés", l: ["« J'AI ! » : je prends le ballon, écartez-vous. (en anglais : KEEPER!)", "« DÉGAGE ! » : je ne sors pas, joue loin. (en anglais : AWAY!)", "« SEUL ! » : tu as le temps, contrôle. (en anglais : TIME!)", "« ÇA VIENT ! » : adversaire dans ton dos. (en anglais : MAN ON!)", "« SORS ! » : toute la ligne monte. (en anglais : STEP UP!)", "« RETRAIT ! » : je suis disponible. (en anglais : HERE!)", "« RETARDE ! » : ne te jette pas, gagne du temps. (en anglais : DELAY!)", "« DANS TON DOS ! » : un adversaire libre derrière toi. (en anglais : BEHIND YOU!)", "« PRENDS-LE ! » : un adversaire est seul, marque-le. (en anglais : PICK HIM UP!)", "« DROITE ! » / « GAUCHE ! » : décale-toi. (en anglais : RIGHT! / LEFT!)"] },
    { h: "Comment parler", l: ["Tôt : avant l'action, pas pendant.", "Fort : toute la surface doit t'entendre.", "Court : un ou deux mots, avec le prénom.", "Positif : tu diriges, tu ne chicanes pas."] },
    { h: "Ta routine après un but encaissé", l: ["1. Ramasse le ballon, respire à fond une fois.", "2. Un geste à toi : taper tes gants, toucher ton poteau.", "3. Un mot dans ta tête : « Suivant. »", "4. Une consigne à voix haute à ta défense.", "On analysera l'erreur après le match, jamais pendant."] },
    { h: "Penalty : ta routine sous pression (niveau 3)", l: ["Prends ton temps pour t'installer : calme, grand, bras ouverts.", "Choisis ton plan AVANT sa course d'élan, et garde-le.", "Une respiration lente, les yeux sur le ballon.", "Au moins un pied sur ta ligne au moment de la frappe.", "Pas de provocation : retarder ou distraire le tireur est interdit.", "Arrêt ou pas : prêt pour le rebond, puis tête haute."] },
    { h: "Avant le match", l: ["Vérifie le terrain : soleil, vent, état de ta surface.", "Imagine trois beaux arrêts et trois bonnes relances.", "Rappelle-toi un seul objectif simple pour la journée."] }
  ],
  m10: [
    { h: "Position de base", l: ["Pieds largeur des épaules.", "Poids sur l'avant des pieds, talons légers.", "Genoux fléchis, buste un peu penché.", "Mains devant, coudes souples.", "Tête immobile, yeux sur le ballon."] },
    { h: "Les prises", l: ["Au sol : mains en pelle, corps ou genou derrière.", "Au ventre : panier, tu enroules le ballon.", "Poitrine et tête : W, bras devant toi.", "Au-dessus : W, ballon pris devant la tête, au point le plus haut."] },
    { h: "Le plongeon", l: ["Un pas de côté ET vers l'avant.", "Poussée de la jambe côté ballon.", "Mains d'abord, tu atterris sur le côté (cuisse, hanche, épaule).", "Au sol, le ballon devient ta troisième main : tu le bloques au sol.", "Si tu ne peux pas capter : repousse sur le côté, jamais dans l'axe."] },
    { h: "Les déplacements", l: ["Pas chassés près du but : les pieds ne se croisent pas.", "Pas croisés pour reculer vite sur un lob.", "Toujours arrêté au moment du tir."] }
  ]
};

/* ---------- EXERCICES À FAIRE ---------- */
const DRILLS = {
  m1: ["Mur ou parent : 50 passes en deux touches, contrôle d'un pied, passe de l'autre. Regarde par-dessus ton épaule avant chaque contrôle.", "Au prochain match, compte combien de fois tu as offert une passe en retrait."],
  m2: ["Départ à 15 m du but : un parent lance un long ballon, tu décides en une seconde « j'y vais » ou « je reste ».", "Reculs en pas croisés sur 10 m en fixant un ballon tenu par un partenaire, puis arrêt net."],
  m3: ["Place 5 cônes en arc devant ton but. Un partenaire se déplace avec le ballon : à chaque arrêt, vérifie que tu es sur la ligne ballon–centre du but.", "10 tirs : ton partenaire crie « stop » juste avant de frapper. Es-tu arrêté ?"],
  m4: ["Capte un ballon lancé haut, puis relance en moins de 4 secondes vers une cible (cerceau, cône) à 20 m.", "Regarde un match pro : note chaque fois que le gardien accélère ou calme le jeu."],
  m5: ["Un partenaire avance avec le ballon et choisit : touche courte ou touche longue. Tu réagis : avancer et t'arrêter, ou sortir à fond.", "Blocages à 3 m : 10 répétitions, sans te coucher avant le tir."],
  m6: ["20 ballons lancés haut à la main : capte au point le plus haut, genou levé, en criant « J'AI ! ».", "Même chose avec un partenaire qui te gêne légèrement."],
  m7: ["Volée latérale : 10 de chaque pied vers une cible large à 30 m.", "Lancers roulé, javelot et par-dessus : 10 de chaque vers trois cibles à 10, 20 et 30 m."],
  m8: ["Sur 10 penaltys, choisis un indice à observer (pied d'appui) et note ce que tu as vu.", "Avec ton entraîneur de gardiens, apprends le plan de ton équipe sur corner défensif."],
  m9: ["À l'entraînement, donne au moins une consigne à voix haute sur chaque action défensive.", "Choisis ta routine de retour au calme et répète-la après chaque but à l'entraînement."],
  m10: ["Position de base devant un miroir : vérifie pieds, genoux, mains.", "Plongeons à genoux puis accroupi sur une surface molle : 10 de chaque côté, ballon bloqué au sol."]
};

/* ---------- SITUATIONS : l'action se joue, s'arrête, et tu décides ----------
   k : 'voix' (choisis le bon mot, vite), 'qui' (touche le coéquipier, puis le mot),
       'lis' (devine la suite), 'sor' (sortir ou rester, chronométré ; a = 'go' ou 'stay'),
       'err' (pre = l'action ratée, after = la bonne version),
       'raf' (rafale courte/longue ; items : a = 'c' ou 'l', to = où va le ballon),
       'mur' (post = poteau à couvrir 'g' ou 'd', n = nombres de joueurs acceptés),
       'cor' (spots = endroits proposés, ok:1 = bon choix ; free = joueurs à placer).
   pre = avant l'arrêt, after = la suite ; un pas peut avoir un texte t.
   La première option (o) est la bonne. */
const KINDS = {
  voix: { n: 'Dirige ta défense', d: 'Le bon mot, en moins de 3 secondes', fast: 3, slow: 6 },
  qui:  { n: 'À qui je parle ?', d: 'Touche le coéquipier, puis choisis le mot' },
  lis:  { n: 'Lis le jeu', d: 'L\'action s\'arrête : que va-t-il se passer ?' },
  sor:  { n: 'Sortir ou rester ?', d: '« J\'y vais » = tu attaques le ballon à fond. « Je reste » = tu ne te jettes pas. Décide en moins de 2 secondes.', fast: 2, slow: 4 },
  err:  { n: 'Trouve l\'erreur', d: 'Un gardien se fait battre. Regarde bien : qu\'a-t-il mal fait ?' },
  raf:  { n: 'Courte ou longue ?', d: '8 situations en rafale, 5 secondes chacune', slow: 5 },
  mur:  { n: 'Place ton mur', d: 'Choisis le nombre de joueurs, puis aligne ton mur' },
  cor:  { n: 'Organise ton corner', d: 'Envoie tes joueurs libres aux bons endroits' }
};
const SITS = [
/* ---- DIRIGE TA DÉFENSE ---- */
{ id:'v1', k:'voix', m:'m9', lvl:1, view:'half', t:'Dos au jeu',
  ctx:"Ton équipe relance. Ton central joue sur ton 6.", lb:{ m2:'6', m1:'DC' },
  init:{ g:[34,97], m1:[30,84], b:[30.6,83.4], m2:[34,68], o1:[36,57], o2:[22,74], m3:[50,84] },
  pre:[{ mv:{ b:[34,69.2], o1:[35,63] } }],
  q:"Ton 6 reçoit dos au jeu. Que cries-tu ?", o:["ÇA VIENT !","SEUL !","SORS !","J'AI !"],
  after:[{ mv:{ b:[30.6,83.4], o1:[34.6,66] } }],
  w:"Il ne voit pas l'adversaire qui arrive dans son dos. Grâce à toi, il remet en une touche au lieu de se faire voler le ballon." },
{ id:'v2', k:'voix', m:'m9', lvl:1, view:'half', t:'Du temps devant lui',
  ctx:"Tu relances à la main sur ton latéral gauche.", lb:{ m2:'LG' },
  init:{ g:[34,96], b:[34,95], m1:[20,88], m2:[8,78], o1:[30,66], o2:[44,70] },
  pre:[{ mv:{ b:[8.6,78.6] } }],
  q:"Personne à moins de 15 m de lui. Que cries-tu ?", o:["SEUL !","ÇA VIENT !","DÉGAGE !","RETRAIT !"],
  after:[{ mv:{ m2:[8,68], b:[8,66.6] } }],
  w:"Il a le temps de contrôler, de se retourner et d'avancer. Sans ton mot, il aurait peut-être dégagé pour rien." },
{ id:'v3', k:'voix', m:'m9', lvl:1, view:'third', t:'Centre dans tes 5,5 m',
  ctx:"Centre de la gauche. Le cercle montre où le ballon va tomber.",
  init:{ g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[31,95], m1:[32,97], o3:[38,94], m2:[37,96] },
  pre:[{ mv:{ b:[20,92] }, c:[33,99.6,2.2] }],
  q:"Le ballon tombe dans ta surface de but. Que cries-tu ?", o:["J'AI !","DÉGAGE !","SEUL !","SORS !"],
  after:[{ mv:{ b:[33,99.6], g:[33.3,100.3] } }],
  w:"C'est ta zone. Annoncé fort et tôt, tes défenseurs s'écartent et te laissent le ballon." },
{ id:'v4', k:'voix', m:'m9', lvl:1, view:'third', t:'Centre au point de penalty',
  ctx:"Centre de la gauche. Le cercle montre où le ballon va tomber.",
  init:{ g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[31,95], m1:[32,97], o3:[38,92.4], m2:[36.6,94.4] },
  pre:[{ mv:{ b:[22,89] }, c:[37,93.4,2.2] }],
  q:"Trop loin pour toi, beaucoup de monde. Que cries-tu ?", o:["DÉGAGE !","J'AI !","SEUL !","RETRAIT !"],
  after:[{ mv:{ b:[36.8,93.8], g:[35,103.8] } }, { mv:{ b:[54,72] } }],
  w:"Ton défenseur sait que tu ne sors pas : il joue loin, sans hésiter. Toi, tu es replacé sur ta ligne." },
{ id:'v5', k:'voix', m:'m9', lvl:1, view:'half', t:'Ballon dégagé',
  ctx:"Corner repoussé : le ballon part loin de ta surface.",
  init:{ g:[34,101.5], b:[33,99], m1:[30,97], m2:[38,97], m3:[26,95], o1:[32,95], o2:[40,94], o3:[44,90] },
  pre:[{ mv:{ b:[50,60] } }],
  q:"Tes défenseurs sont encore collés à ton but. Que cries-tu ?", o:["SORS !","SEUL !","J'AI !","RETRAIT !"],
  after:[{ mv:{ m1:[30,82], m2:[38,82], m3:[26,82], g:[34,95] } }],
  w:"Toute la ligne monte ensemble : les attaquants restés devant sont hors-jeu et le danger s'éloigne de ton but." },
{ id:'v6', k:'voix', m:'m9', lvl:1, view:'half', t:'Latéral enfermé',
  ctx:"Ton latéral gauche est coincé le long de la touche.", lb:{ m1:'LG' },
  init:{ g:[34,100], m1:[8,82], b:[9,83], o1:[12,75], o2:[22,82], m2:[22,93], m3:[46,93] },
  pre:[{ mv:{ o1:[10.5,80], g:[27.5,100] } }],
  q:"Tu t'es décalé pour l'aider. Que cries-tu ?", o:["RETRAIT !","SORS !","SEUL !","J'AI !"],
  after:[{ mv:{ b:[27.8,99.2] } }, { mv:{ b:[46,92.4] } }],
  w:"Il ne te voit pas : c'est ta voix qui lui montre la sortie. Ensuite, tu changes le jeu de côté." },
{ id:'v7', k:'voix', m:'m9', lvl:2, view:'half', t:'Seul face au porteur',
  ctx:"Contre-attaque. Ton dernier défenseur est seul, les autres reviennent.",
  init:{ g:[34,90], o1:[32,61], b:[32,62.5], m1:[34,70], o2:[48,63], m2:[20,56] },
  pre:[{ mv:{ o1:[32,68], b:[32,69.5], m1:[34,76], m2:[23,65], o2:[47,70] } }],
  q:"Que cries-tu à ton défenseur ?", o:["RETARDE !","SORS !","J'AI !","SEUL !"],
  after:[{ mv:{ o1:[30,74], b:[30,75.5], m1:[32.5,80], m2:[27,75], o2:[46,77], g:[34,96] } }],
  w:"S'il se jette et se fait dribbler, tu es seul. En reculant sans se livrer, il gagne les secondes qui permettent aux autres de revenir." },

/* ---- À QUI JE PARLE ? ---- */
{ id:'k1', k:'qui', m:'m9', lvl:2, view:'third', t:'Le joueur oublié',
  ctx:"Le ballon est à droite. Regarde aussi de l'autre côté.",
  init:{ g:[36.5,102.5], b:[58,90.5], o1:[59,89], m1:[55,93], o2:[35,94], m2:[34,96], o3:[20,92], m3:[27,89] },
  pre:[{ mv:{ o3:[24,97] } }], who:'m3',
  q:"Un adversaire se glisse au deuxième poteau.", o:["DANS TON DOS !","SEUL !","SORS !","J'AI !"],
  after:[{ mv:{ m3:[25.4,95.4] } }],
  w:"Ton latéral regarde le ballon et ne voit pas l'attaquant derrière lui. Toi, tu vois tout : préviens-le avant le centre." },
{ id:'k2', k:'qui', m:'m9', lvl:2, view:'half', t:'La ligne cassée',
  ctx:"L'adversaire a le ballon au milieu. Regarde ta ligne défensive.",
  init:{ g:[34,95], b:[30,58], o1:[30,56.5], m1:[22,73], m2:[34,80], m3:[46,73], o2:[37,76] },
  pre:[{ mv:{ o2:[37,78] } }], who:'m2',
  q:"Un défenseur couvre l'attaquant et le remet en jeu.", o:["SORS !","DÉGAGE !","J'AI !","RETRAIT !"],
  after:[{ mv:{ m2:[34,73.4] } }],
  w:"Un seul défenseur trop bas suffit à remettre l'attaquant en jeu. Aligné avec les autres, il le met hors-jeu." },
{ id:'k3', k:'qui', m:'m8', lvl:2, view:'third', t:'Corner : qui est libre ?',
  ctx:"Corner contre toi. Vérifie que chaque adversaire est pris.",
  init:{ g:[34.6,104], b:[0.6,104.4], o1:[2,102], m1:[30.8,104.2], m2:[32,96], o2:[32.6,94.4], m3:[38,96], o3:[38.6,94.4], o4:[44,91], m4:[27,99.5], m5:[48,99] },
  pre:[{ c:[44,91,2.6] }], who:'m5',
  q:"Un adversaire est seul à l'entrée de la surface.", o:["PRENDS-LE !","SORS !","SEUL !","RETRAIT !"],
  after:[{ mv:{ m5:[44.6,92.8] } }],
  w:"Ton coéquipier ne marquait personne. Les autres ont déjà un joueur ou une zone : c'est lui que tu envoies." },
{ id:'k4', k:'qui', m:'m9', lvl:1, view:'half', t:'Pressing dans l\'angle mort',
  ctx:"Ton équipe construit. Ton central regarde vers la droite.", lb:{ m1:'DC', m2:'DC' },
  init:{ g:[34,97], m1:[22,86], b:[22.8,85.6], m2:[46,86], m3:[34,74], o1:[9,76], o2:[40,72] },
  pre:[{ mv:{ o1:[17,83] } }], who:'m1',
  q:"Un adversaire arrive vite sur le porteur.", o:["ÇA VIENT !","SEUL !","SORS !","J'AI !"],
  after:[{ mv:{ b:[33.6,96.2], o1:[20,85] } }],
  w:"Il ne voyait pas le pressing arriver. Prévenu, il joue simple vers toi au lieu de perdre le ballon devant ton but." },

/* ---- LIS LE JEU ---- */
{ id:'l1', k:'lis', m:'m3', lvl:1, view:'third', t:'Débordement, tête levée',
  ctx:"L'ailier est sur la ligne de fond et lève la tête.",
  init:{ g:[37.1,104], b:[61,102], o1:[62.4,101], m1:[57,100.5], o2:[36,88], m2:[33,97], o3:[30,98] },
  pre:[{ mv:{ o2:[35.4,93.4] } }],
  q:"Que va-t-il faire ?", o:["Centre en retrait vers le point de penalty","Tir direct au premier poteau","Long centre au deuxième poteau"],
  after:[{ mv:{ b:[35.8,94.8], g:[34.8,103] } }, { mv:{ b:[34.9,102.6] }, shot:1 }],
  w:"Angle fermé pour tirer, tête levée, un attaquant libre qui arrive lancé : le centre en retrait est l'option la plus probable. Replace-toi, puis arrête-toi." },
{ id:'l2', k:'lis', m:'m2', lvl:2, view:'half', t:'Milieu libre, appel dans le dos',
  ctx:"Leur milieu a le ballon, sans pression. Regarde leur attaquant.",
  init:{ g:[34,93], b:[30,61.5], o1:[30,60], o2:[40,69], m1:[36,69], m2:[26,68], m3:[22,56] },
  pre:[{ mv:{ o2:[41,72] } }],
  q:"Que va-t-il faire ?", o:["Passe en profondeur dans le dos de ta défense","Tir de loin","Passe en retrait vers son camp"],
  after:[{ mv:{ b:[40,90.5], o2:[40,80], m1:[37,77] } }, { mv:{ g:[39.6,91.4], o2:[40,85] } }],
  w:"Porteur libre, tête levée, attaquant qui démarre : tout annonce la passe en profondeur. Parti tôt, tu es le premier sur le ballon." },
{ id:'l3', k:'lis', m:'m3', lvl:1, view:'third', t:'Il rentre sur son bon pied',
  ctx:"L'ailier repique vers l'axe. Ton défenseur recule.",
  init:{ g:[35.6,101.8], b:[44,86.5], o1:[45,85.5], m1:[42,90], o2:[30,92], m2:[31,94] },
  pre:[{ mv:{ b:[38,85.5], o1:[39,84.4], m1:[37.6,90] } }],
  q:"Que va-t-il faire ?", o:["Tirer","Centrer","Repartir vers la touche"],
  after:[{ mv:{ g:[34.4,102] } }, { mv:{ b:[32.6,103.4], g:[33.2,103.2] }, shot:1 }],
  w:"Il se met sur son bon pied, le défenseur lui laisse de l'espace, la zone de tir est ouverte : c'est une frappe. Sois arrêté avant." },
{ id:'l4', k:'lis', m:'m2', lvl:2, view:'full', t:'Porteur sous pression',
  ctx:"Ballon perdu dans le camp adverse. Deux coéquipiers pressent tout de suite.",
  init:{ g:[34,82], m1:[24,52], m2:[44,52], b:[36,30.5], o1:[36,29], m3:[33,35], m4:[41,32], o2:[38,49] },
  pre:[{ mv:{ m3:[35.4,32], m4:[38,30] } }],
  q:"Que va-t-il se passer ?", o:["Il joue court ou perd le ballon","Long ballon dans le dos de ta défense","Il traverse tout le terrain balle au pied"],
  after:[{ mv:{ b:[35.2,33], m3:[35.2,34.4] } }],
  w:"Deux joueurs sur lui, tête baissée : il ne peut pas armer un long ballon. Tu restes haut et disponible pour la relance." },
{ id:'l5', k:'lis', m:'m6', lvl:2, view:'half', t:'Le dédoublement',
  ctx:"L'ailier est face à ton latéral. Regarde ce qui se passe à l'extérieur.",
  init:{ g:[35.5,101], b:[52,80.5], o1:[52,79], m1:[51,85], o2:[59,72], o3:[34,90], m2:[33,93], m3:[40,92] },
  pre:[{ mv:{ o2:[62,84] } }],
  q:"Que va-t-il se passer ?", o:["Passe au joueur qui dédouble, puis centre","Tir de loin","Dribble vers l'axe"],
  after:[{ mv:{ b:[63,92], o2:[63,90.5], g:[36.2,103] } }, { mv:{ b:[37.6,100.2], g:[37.3,100.9] } }],
  w:"Un joueur libre qui dédouble sur le côté annonce presque toujours un centre. Prends ta position de départ, corps ouvert, avant qu'il parte." },
{ id:'l6', k:'lis', m:'m5', lvl:2, view:'half', t:'Deux contre un',
  ctx:"Contre-attaque à deux contre ton dernier défenseur.",
  init:{ g:[34,97], o1:[30,73], b:[30,74.5], o2:[44,75], m1:[32,81] },
  pre:[{ mv:{ o1:[30,80], b:[30,81.5], o2:[44,84], m1:[31,86.5] } }],
  q:"Ton défenseur ferme le porteur. Que va faire celui-ci ?", o:["Passe latérale au joueur libre","Tir","Retour en arrière"],
  after:[{ mv:{ b:[44,87], o2:[44,85.6], g:[36.2,100.6] } }, { mv:{ b:[36.5,100.3] }, shot:1 }],
  w:"Le porteur est fermé, son coéquipier est seul : la passe est sa meilleure option. Dès que le ballon part, replace-toi sur la nouvelle ligne ballon–but et arrête-toi." },

/* ---- SORTIR OU RESTER ? (lot B) ---- */
{ id:'o1', k:'sor', m:'m5', lvl:1, view:'half', t:'Touche trop longue', a:'go',
  ctx:"Un attaquant part seul vers ton but.",
  init:{ g:[34,98], o1:[35,75], b:[35,76.5], m1:[30,72] },
  pre:[{ mv:{ o1:[35.3,82.5], b:[35,92], m1:[31,79] } }],
  after:[{ mv:{ g:[35,92.7], o1:[35.2,88.5] } }],
  w:"Le ballon est loin de son pied et plus près de toi : c'est LE signal. Tu attaques à fond, mains en premier, et tu vas au bout." },
{ id:'o2', k:'sor', m:'m5', lvl:1, view:'half', t:'Ballon collé au pied', a:'stay',
  ctx:"Un attaquant part seul vers ton but.",
  init:{ g:[34,99], o1:[36,73], b:[36,74.5], m1:[30,70] },
  pre:[{ mv:{ o1:[35.5,82], b:[35.5,83.5], m1:[31,79] } }],
  after:[{ mv:{ g:[34.4,95.5] }, cone:1 }],
  w:"Ballon collé, tête levée : si tu te jettes, il te dribble. Tu avances à petits pas, tu t'arrêtes quand il peut frapper et tu restes grand." },
{ id:'o3', k:'sor', m:'m5', lvl:1, view:'half', t:'Ballon en profondeur dans ta surface', a:'go',
  ctx:"Leur milieu lève la tête. Tu es déjà avancé.",
  init:{ g:[34,95], b:[30,61.5], o1:[30,60], o2:[40,70], m1:[36,69], m2:[26,68] },
  pre:[{ mv:{ b:[40,90.5], o2:[40,78.5], m1:[37,76] } }],
  after:[{ mv:{ g:[39.6,91.3], o2:[40,85], m1:[37,82] } }],
  w:"Le ballon arrive dans ta surface et tu es nettement le premier : « J'AI ! » et tu captes en allant vers le ballon." },
{ id:'o4', k:'sor', m:'m5', lvl:2, view:'half', t:'Il est devant toi', a:'stay',
  ctx:"Passe en profondeur vers leur attaquant, sur le côté de ta surface.",
  init:{ g:[34,97], b:[36,62.5], o1:[36,61], o2:[45,73], m1:[40,70], m2:[28,69] },
  pre:[{ mv:{ b:[46,86.5], o2:[45.6,83], m1:[41,78] } }],
  after:[{ mv:{ g:[36.6,100.2], o2:[45.8,85.4] }, cone:1 }],
  w:"Il est à 3 m du ballon, toi à 15 : il arrive premier, c'est clair. Si tu sors, il te contourne. Replace-toi sur la ligne ballon–but, arrête-toi et prépare le un contre un." },
{ id:'o5', k:'sor', m:'m6', lvl:1, view:'third', t:'Centre dans tes 5,5 m', a:'go',
  ctx:"Centre de la gauche. Le cercle montre où le ballon va tomber.",
  init:{ g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[31,95], m1:[32,97], o3:[38,94], m2:[37,96] },
  pre:[{ mv:{ b:[20,92] }, c:[33,99.6,2.2] }],
  after:[{ mv:{ b:[33,99.6], g:[33.3,100.3] } }],
  w:"Ta surface de but est à toi. « J'AI ! », fort et tôt, et tu prends le ballon au point le plus haut." },
{ id:'o6', k:'sor', m:'m6', lvl:1, view:'third', t:'Centre au point de penalty', a:'stay',
  ctx:"Centre de la gauche. Le cercle montre où le ballon va tomber.",
  init:{ g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[31,95], m1:[32,97], o3:[38,92.4], m2:[36.6,94.4] },
  pre:[{ mv:{ b:[22,89] }, c:[37,93.4,2.2] }],
  after:[{ mv:{ b:[36.8,93.8], g:[35,103.8] } }, { mv:{ b:[35.4,103.8] }, shot:1 }],
  w:"Trop loin et trop de monde : « DÉGAGE ! » Tu recules sur ta ligne et tu es arrêté au moment de la tête. Le pire choix : sortir à moitié." },
{ id:'o7', k:'sor', m:'m2', lvl:2, view:'half', t:'Long ballon hors de ta surface', a:'go',
  ctx:"Ta défense est haute. Long ballon dans son dos.",
  init:{ g:[34,84], b:[36,52], o1:[36,50.5], m1:[26,60], m2:[44,60], o2:[39,58] },
  pre:[{ mv:{ b:[40,75], o2:[39.4,63.5], m2:[43,65] } }],
  after:[{ mv:{ g:[39.5,76.4], o2:[39.6,69] } }, { mv:{ b:[63,58] } }],
  w:"Tu es à 10 m du ballon, lui à plus de 11, et le ballon roule vers toi : tu y vas. Hors de ta surface, c'est au pied, fort et vers le côté." },
{ id:'o8', k:'sor', m:'m5', lvl:2, view:'third', t:'Attaquant excentré', a:'stay',
  ctx:"L'attaquant arrive de côté, ballon au pied.",
  init:{ g:[36.2,102.2], o1:[52,89], b:[52,90.5], m1:[45,87], o2:[30,92], m2:[31,95] },
  pre:[{ mv:{ o1:[47,95], b:[46.6,96.4], m1:[43,92] } }],
  after:[{ mv:{ g:[37.7,102.6] }, cone:1 }, { mv:{ b:[38.3,102.3] }, shot:1 }],
  w:"Angle fermé, ballon maîtrisé : l'angle travaille pour toi. Tu fermes ton premier poteau, debout et patient. Si tu sors loin, un centre en retrait trouve ton but vide." },

/* ---- TROUVE L'ERREUR (lot B) ---- */
{ id:'e1', k:'err', m:'m3', lvl:1, view:'third', t:'Battu par un tir moyen',
  ctx:"L'attaquant se décale pour frapper. Regarde les pieds du gardien.",
  init:{ g:[32,101], b:[28,85.5], o1:[28,84], m1:[30,90] },
  pre:[{ mv:{ b:[36,84.5], o1:[36,83], g:[33,101.2] } }, { mv:{ b:[31,106.2], g:[36.4,101.6] }, shot:1, t:"Tir… et but." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il se déplace encore au moment du tir","Il est trop loin de sa ligne","Il aurait dû sortir dans les pieds"],
  after:[{ rs:{ b:[36,84.5], g:[33,101.2] }, mv:{ g:[34.4,101.6] }, c:[34.4,101.6,2.6], t:"La bonne version : petits pas, puis ARRÊTÉ avant la frappe." }, { mv:{ b:[32.3,102.8], g:[33.1,102.5] }, shot:1 }],
  w:"Un gardien en mouvement ne peut pas pousser de l'autre côté. Petits pas rapides, pré-saut, et tu es stable quand il frappe." },
{ id:'e2', k:'err', m:'m3', lvl:1, view:'third', t:'But au premier poteau',
  ctx:"Le ballon est sur le côté. Le triangle montre ce que le tireur peut viser.",
  init:{ g:[35.4,102], b:[14,86], o1:[13,84.6], m1:[19,90] },
  pre:[{ mv:{ b:[16,88], o1:[15,86.6] }, cone:1 }, { mv:{ b:[31,106.2] }, shot:1, t:"Tir au premier poteau… et but." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il n'est pas sur la ligne ballon–centre du but","Il est sorti trop loin","Il aurait dû reculer sur sa ligne"],
  after:[{ rs:{ b:[16,88] }, mv:{ g:[31.3,102.4] }, cone:1, t:"La bonne version : ballon, toi, centre du but, alignés." }, { mv:{ b:[31.2,103] }, shot:1 }],
  w:"Resté au milieu de son but, il laisse tout le premier poteau ouvert. Quand le ballon va sur le côté, tu te décales en arc de cercle pour rester sur la ligne." },
{ id:'e3', k:'err', m:'m5', lvl:1, view:'third', t:'Contourné en un contre un',
  ctx:"Face à face. L'attaquant a le ballon collé au pied, tête levée.",
  init:{ g:[34,100], o1:[32,84], b:[32,85.5], m1:[26,81] },
  pre:[{ mv:{ o1:[32.4,88.5], b:[32.6,90], g:[33.4,95.5], m1:[27,86] } }, { mv:{ g:[32.9,92.4] }, t:"Le gardien plonge dans ses pieds." }, { mv:{ o1:[38,92], b:[38.6,93.4] } }, { mv:{ b:[35.6,106.2] }, shot:1, t:"But dans le but vide." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il se couche trop tôt, alors que le ballon est collé au pied","Il aurait dû rester sur sa ligne","Il s'est arrêté trop loin de l'attaquant"],
  after:[{ rs:{ g:[33.4,95.5], o1:[32.4,88.5], b:[32.6,90] }, cone:1, t:"La bonne version : arrêté, debout, grand. C'est à lui de décider." }, { mv:{ b:[33.3,95] }, shot:1 }],
  w:"Tant que l'attaquant contrôle son ballon, le premier qui bouge perd. Tu sors à fond seulement sur une touche trop longue." },
{ id:'e4', k:'err', m:'m6', lvl:1, view:'third', t:'Lobé sur un centre',
  ctx:"Centre de la gauche vers le point de penalty. Beaucoup de monde.",
  init:{ g:[34.5,102.5], b:[8,85.5], o1:[7,84], o2:[31,95], m1:[32,97], o3:[38,92.4], m2:[36.6,94.4] },
  pre:[{ mv:{ b:[22,89] }, c:[37,93.4,2.2] }, { mv:{ b:[36.8,93.8], g:[35.6,98.8] }, t:"Le gardien part… puis s'arrête." }, { mv:{ b:[33,106.2] }, shot:1, t:"Tête par-dessus lui. But." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il sort à moitié et reste entre les deux","Il aurait dû se placer au premier poteau","Il est resté sur sa ligne"],
  after:[{ rs:{ b:[22,89], g:[34.5,102.5] }, mv:{ b:[36.8,93.8], g:[35,103.8] }, t:"La bonne version : « DÉGAGE ! » et retour sur la ligne." }, { mv:{ b:[35.4,103.8] }, shot:1 }],
  w:"Ce ballon était trop loin pour lui. Soit tu annonces « J'AI ! » et tu vas au bout, soit « DÉGAGE ! » et tu te replaces. Jamais entre les deux." },
{ id:'e5', k:'err', m:'m1', lvl:2, view:'full', t:'Seul face à l\'attaquant',
  ctx:"Son équipe attaque dans le camp adverse. Regarde où est le gardien.",
  init:{ g:[34,102], b:[45,22], m4:[45,23.5], m1:[24,49], m2:[44,49], m3:[36,32], o1:[35,47], o2:[43,27] },
  pre:[{ mv:{ b:[43,28.5] }, t:"Ballon perdu." }, { mv:{ b:[38,73], o1:[36.5,58] }, t:"Long ballon dans le dos de la défense." }, { mv:{ o1:[37.5,80], b:[37.5,81.5], m2:[42,68], m1:[27,66] } }],
  q:"Quelle est l'erreur du gardien ?", o:["Il est resté sur sa ligne pendant que son équipe attaquait","Il aurait dû sortir prendre le ballon avec les mains","Il n'a pas fait son pré-saut"],
  after:[{ rs:{ b:[43,28.5], o1:[35,47], m1:[24,49], m2:[44,49], g:[34,80] }, t:"La bonne version : tu montes avec ta défense." }, { mv:{ b:[38,73], o1:[36.5,58], g:[37.6,74.2] } }, { mv:{ b:[62,56] } }],
  w:"Tes centraux sont à la médiane : tu sors de ta surface pour protéger l'espace dans leur dos. De là, tu arrives premier sur le long ballon, au pied." },
{ id:'e6', k:'err', m:'m1', lvl:1, view:'half', t:'La passe en retrait qui finit au fond',
  ctx:"Son latéral est enfermé. Le gardien demande le ballon.", lb:{ m1:'LG' },
  init:{ g:[34,102], m1:[8,82], b:[9,83], o1:[12,76], o2:[24,86], m2:[22,93], m3:[46,93] },
  pre:[{ mv:{ o1:[10.5,80] } }, { mv:{ b:[32.6,106.2] }, t:"Passe trop forte, un peu ratée… dans son propre but." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il attend la passe devant son but, entre ses poteaux","Il est trop loin de sa ligne","Il aurait dû l'arrêter avec les mains"],
  after:[{ rs:{ b:[9,83], g:[27.5,100] }, c:[27.5,100,3], t:"La bonne version : à l'extérieur de ton poteau." }, { mv:{ b:[26.4,106.4] }, t:"Même passe ratée : corner, pas but." }],
  w:"Une passe en retrait ne doit jamais rouler vers ton but. Décale-toi à l'extérieur du poteau, côté ballon. Et rappel : sur une passe volontaire du pied, pas les mains." },
{ id:'e7', k:'err', m:'m8', lvl:2, view:'third', t:'Coup franc : il ne l\'a pas vu partir',
  ctx:"Coup franc à 20 m. Regarde où se place le gardien.",
  init:{ b:[26,86], o1:[25,83.5], m1:[27,95], m2:[28.1,94.8], m3:[29.2,94.6], m4:[30.3,94.4], g:[31,103.6] },
  pre:[{ cone:1 }, { mv:{ b:[36.8,106.2] }, shot:1, t:"Frappe du côté ouvert. But." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il est caché derrière son mur et ne voit pas le ballon","Son mur a trop de joueurs","Il est trop avancé"],
  after:[{ rs:{ b:[26,86], g:[36,103.2] }, c:[36,103.2,2.4], t:"La bonne version : le mur prend un côté, toi l'autre." }, { mv:{ b:[37,103.6], g:[36.7,103.4] }, shot:1 }],
  w:"Le mur protège déjà ce poteau. Toi, tu prends le côté libre, là où tu vois le ballon du début à la fin." },
{ id:'e8', k:'err', m:'m7', lvl:1, view:'half', t:'Relance interceptée',
  ctx:"Sortie de but. Regarde le marquage autour du gardien.", lb:{ m3:'6', m6:'9' },
  init:{ g:[34,99.5], b:[34,98.2], m1:[20,95], m2:[48,95], m3:[34,82], o1:[22,92.4], o2:[46,92.4], o3:[35,79.6], m6:[30,54], o4:[38,60] },
  pre:[{ mv:{ b:[34.2,87.6], o3:[34.4,86] }, t:"Le gardien joue court dans l'axe. Intercepté !" }, { mv:{ b:[31.2,106.2] }, shot:1, t:"Tir. But." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il joue court alors que tous ses coéquipiers proches sont marqués","Il aurait dû dribbler l'attaquant","Il a joué trop vite"],
  after:[{ rs:{ b:[34,98.2], o3:[35,79.6] }, t:"La bonne version : ils sont nombreux devant, donc peu derrière." }, { mv:{ b:[30.6,55.4], m3:[34,70], m1:[22,84], m2:[46,84] } }],
  w:"Égalité près de toi, chaque relais est marqué : jouer court, c'est perdre le ballon devant ton but. Long vers ton attaquant, et tout le monde monte." },

/* ---- COURTE OU LONGUE EN RAFALE (lot B) ----
   base = joueurs communs à toutes les situations ; chaque item ajoute les siens. */
{ id:'r1', k:'raf', m:'m7', lvl:1, view:'long', t:'Sorties de but',
  ctx:"Sortie de but. Compte les joueurs près de toi : supériorité = courte ; égalité ou infériorité = longue.", lb:{ m3:'6', m6:'9' },
  base:{ g:[34,99.5], b:[34,98.2], m1:[20,95], m2:[48,95], m3:[34,82], m4:[5,82], m5:[63,82], m6:[34,40], o4:[36,44] },
  items:[
    { s:"Deux attaquants pressent.", a:'c', to:[47.4,94.4], init:{ o1:[26,80], o2:[42,80], o3:[34,66], o5:[10,66], o6:[58,66] }, w:"Avec toi, c'est 4 contre 2 : construis." },
    { s:"Marquage partout.", a:'l', to:[34.6,41.6], init:{ o1:[22,92.4], o2:[46,92.4], o3:[34.6,84.4], o5:[6.4,79.6], o6:[61.6,79.6] }, w:"Chaque coéquipier proche est marqué. Ils sont nombreux devant, donc peu derrière." },
    { s:"Un seul attaquant.", a:'c', to:[20.6,94.4], init:{ o1:[34,88], o2:[40,60], o3:[34,64], o5:[12,62], o6:[56,62] }, w:"Un seul joueur presse : tes deux centraux sont libres." },
    { s:"Tes centraux sont pris.", a:'c', to:[34,83.2], init:{ o1:[22.4,92.6], o2:[45.6,92.6], o3:[34,68], o5:[10,68], o6:[58,68] }, w:"Tes centraux sont marqués, mais ton 6 est seul : passe ferme dans ses pieds." },
    { s:"Ils sont quatre devant ta surface.", a:'l', to:[34.6,41.6], init:{ o1:[22,92.4], o2:[46,92.4], o3:[34.6,84.4], o7:[30,89], o5:[8,74], o6:[60,74] }, w:"Quatre adversaires contre tes trois relais : infériorité. Joue long." },
    { s:"Ils attendent dans leur camp.", a:'c', to:[20.6,94.4], init:{ o1:[26,50], o2:[42,50], o3:[30,45], o5:[14,47], o6:[54,47] }, w:"Personne ne presse : ne donne pas le ballon. Sors court et avance." },
    { s:"Tout est fermé, sauf ton ailier.", a:'l', to:[60.4,45], init:{ o1:[22,92.4], o2:[46,92.4], o3:[34.6,84.4], o5:[6.4,79.6], o6:[61.6,79.6], m7:[60,54], o8:[48,52] }, w:"Rien de sûr près de toi, de l'espace sur le côté : vise la course de ton ailier." },
    { s:"Égalité près de toi.", a:'l', to:[46.6,41.4], init:{ o1:[21.6,92.6], o2:[46.4,92.6], o3:[34.6,84.4], o5:[6.4,79.6], o6:[61.6,79.6], m6:[46,40], o4:[30,45] }, w:"Trois contre trois devant toi, ton 9 a de l'espace : cherche-le." }
  ] },
{ id:'r2', k:'raf', m:'m7', lvl:2, view:'long', t:'Ballon en main ou en retrait',
  ctx:"Tu viens de récupérer le ballon. Qui est libre près de toi ? Où est l'espace ? Courte ou longue ?",
  items:[
    { s:"Tu captes un centre.", a:'l', to:[57.6,57], init:{ g:[35,100.4], b:[35,99.6], o1:[12,84], o2:[32,96], o3:[38,95], o4:[28,90], m1:[33,97.5], m2:[39,97], m3:[56,68], m4:[40,60], o5:[30,62] }, w:"Quatre adversaires près de ta surface, ton ailier lancé : contre-attaque." },
    { s:"Ballon en main.", a:'c', to:[10.6,86.6], init:{ g:[34,97], b:[34,96.2], m1:[10,86], m2:[58,86], m3:[34,80], o1:[30,60], o2:[40,58], o3:[20,56], o4:[50,56], m4:[34,46], o5:[32,42], o6:[37,43] }, w:"Ils sont tous replacés et ton attaquant est seul contre deux : roule sur ton latéral libre." },
    { s:"Passe en retrait.", a:'l', to:[64,56], init:{ g:[32,99], b:[32.4,98], o1:[27,93], o2:[38,93], m1:[20,92], o3:[21.4,89.6], m2:[48,92], o4:[46.6,89.6], m3:[34,82], o5:[34.6,84.4], m4:[60,50], m5:[30,48], o6:[32,52] }, w:"Deux attaquants sur toi, aucune solution courte : long, vers le côté, jamais dans l'axe." },
    { s:"Passe en retrait.", a:'c', to:[47.4,92.4], init:{ g:[28,99.5], b:[28.4,98.8], o1:[25,92], m1:[18,90], m2:[48,93], m3:[34,80], o2:[35,74], o3:[52,72], m4:[34,48], o4:[35,52] }, w:"Un seul joueur te presse et ton central opposé est seul : change de côté." },
    { s:"Ballon en main.", a:'l', to:[45,42], init:{ g:[34,96], b:[34,95.2], m1:[16,88], o1:[17.6,86], m2:[52,88], o2:[50.4,86], m3:[34,80], o3:[34.6,77.6], m4:[44,45], o4:[34,52] }, w:"Tous les proches sont marqués, ton attaquant a de l'espace : joue dans sa course." },
    { s:"Passe en retrait.", a:'c', to:[36,85], init:{ g:[38,99.5], b:[38,98.4], m1:[58,86], o1:[52,91], m2:[20,93], o2:[28,82], m3:[36,84], o3:[30,68], m4:[34,46], o4:[35,50] }, w:"Le pressing vient d'un seul côté : ton 6 est libre, face à toi." },
    { s:"Ballon en main.", a:'l', to:[7,49], init:{ g:[34,96], b:[34,95.2], m1:[14,86], o1:[15.6,84], m2:[54,86], o2:[52.4,84], m3:[34,78], o3:[34.6,75.6], m4:[6,53], o4:[22,57], m5:[40,44], o5:[39,47] }, w:"Rien de sûr près de toi ; ton ailier est seul le long de la touche : lance par-dessus ou joue de volée." },
    { s:"Tu captes un tir.", a:'c', to:[14.6,91.6], init:{ g:[34,101], b:[34,100.2], o1:[30,90], o2:[40,88], o3:[36,80], m1:[14,92], m2:[26,94], m3:[44,94], o4:[50,74], m4:[34,50], o5:[32,54], o6:[37,55] }, w:"Ton latéral est seul et ton attaquant est pris à deux : relance courte et sûre." }
  ] },

/* ---- PLACE TON MUR (lot B) ---- */
{ id:'w1', k:'mur', m:'m8', lvl:1, view:'third', t:'Coup franc à 20 m, dans l\'axe', post:'g', n:[4,5],
  ctx:"Coup franc à 20 m, presque en face de ton but. Le triangle montre ce que le tireur peut viser.",
  init:{ b:[27,85.5], o1:[26,83], g:[36,103.2], o2:[41,91], m5:[40,93.4] },
  w:"Proche et dans l'axe : 4 ou 5 joueurs. Le mur protège le poteau le plus proche du ballon, et le joueur du bout dépasse un peu la ligne ballon–poteau. Toi, tu prends l'autre côté, là où tu vois le ballon." },
{ id:'w2', k:'mur', m:'m8', lvl:2, view:'third', t:'Coup franc sur le côté', post:'g', n:[2,3],
  ctx:"Coup franc à gauche de ta surface. L'angle de tir est petit, le centre est probable.",
  init:{ b:[10,91], o1:[8.4,89.4], g:[35,102.6], o2:[33,93], m5:[32.4,95.2], o3:[40,94], m6:[39.4,96.2] },
  w:"Sur le côté : 2 ou 3 joueurs suffisent pour fermer le premier poteau. Les autres sont plus utiles au marquage, parce que le ballon sera souvent centré." },
{ id:'w3', k:'mur', m:'m8', lvl:2, view:'third', t:'Coup franc à plus de 30 m', post:'d', n:[1,2],
  ctx:"Coup franc à 33 m, un peu à droite. C'est loin.",
  init:{ b:[42,71.5], o1:[42.6,69], g:[33.4,102], o2:[30,90], m5:[30,92.4], o3:[38,91], m6:[38.4,93.4] },
  w:"Très loin : 1 ou 2 joueurs, seulement pour gêner la frappe directe. Tu vois partir le ballon de loin, alors garde tes coéquipiers pour le marquage." },

/* ---- ORGANISE TON CORNER (lot B) ---- */
{ id:'c1', k:'cor', m:'m8', lvl:1, view:'third', t:'Corner de la gauche', need:3, free:['m7','m8','m9'],
  ctx:"Corner contre toi, de la gauche. Il te reste trois joueurs à placer (marqués « ? »).", lb:{ m7:'?', m8:'?', m9:'?' },
  init:{ g:[34.6,104], b:[0.6,104.4], o1:[2,102], o2:[32,94], m5:[31,95.6], o3:[38,93], m6:[37.4,94.6], o4:[44,93], m7:[50,82], m8:[54,84.5], m9:[58,82] },
  spots:[
    { p:[30.9,104.1], ok:1, n:"Premier poteau", w:"Sur la ligne, il sort les ballons que tu ne peux pas atteindre." },
    { p:[25.6,99.6], ok:1, n:"Zone devant le premier poteau", w:"Il coupe les corners tendus avant qu'ils arrivent dans ta surface de but." },
    { p:[43,95.6], ok:1, n:"Adversaire seul", w:"Chaque adversaire doit être pris." },
    { p:[38.2,100.6], ok:0, n:"Collé à toi", w:"Il te bloque la vue et te gêne pour sortir." },
    { p:[28.6,91.6], ok:0, n:"Deuxième joueur sur le même adversaire", w:"Cet adversaire est déjà pris : tu gaspilles un joueur." },
    { p:[57,99], ok:0, n:"Coin opposé de la surface", w:"Personne à marquer là, et trop loin du ballon." }
  ],
  w:"Un joueur au premier poteau, un dans la zone devant ce poteau, et chaque adversaire est pris. C'est le plan de base : celui de ton entraîneur passe en premier." },
{ id:'c2', k:'cor', m:'m8', lvl:2, view:'third', t:'Corner court de la droite', need:3, free:['m7','m8','m9'],
  ctx:"Corner contre toi, de la droite. Attention : ils sont deux près du ballon. Trois joueurs à placer (« ? »).", lb:{ m7:'?', m8:'?', m9:'?' },
  init:{ g:[33.4,104], b:[67.4,104.4], o1:[66,102], o5:[60,98.4], m1:[37.2,104.2], m2:[42.4,99.6], o2:[36,94], m5:[36.6,95.6], o3:[30,92], m6:[30.4,93.6], o6:[34,86], o7:[25,96.6], m7:[10,82], m8:[14,84.5], m9:[18,82] },
  spots:[
    { p:[57.6,101], ok:1, n:"Corner court", w:"Ils sont deux au coin : sans lui, ils centrent tranquilles, de plus près." },
    { p:[34.2,88.6], ok:1, n:"Adversaire à l'entrée de la surface", w:"C'est lui qui frappe quand le ballon ressort." },
    { p:[26,98.6], ok:1, n:"Adversaire au deuxième poteau", w:"Seul derrière tout le monde : très dangereux sur un corner long." },
    { p:[30,101.2], ok:0, n:"Collé à toi", w:"Il te bloque la vue et te gêne pour sortir." },
    { p:[39.6,91.6], ok:0, n:"Deuxième joueur sur le même adversaire", w:"Cet adversaire est déjà pris : tu gaspilles un joueur." },
    { p:[9,72], ok:0, n:"Resté devant pour la contre-attaque", w:"Souvent une bonne idée, mais ici trois adversaires sont libres : tu as besoin de tout le monde." }
  ],
  w:"Corner court = deux contre un au coin : envoie vite un joueur. Ensuite, vérifie les adversaires seuls, surtout loin du ballon. Suis le plan de ton entraîneur s'il est différent." },
/* ---- NIVEAU 3 — ÉLITE (lot F) : 12 situations ---- */
{ id:'o9', k:'sor', m:'m2', lvl:3, view:'half', t:'Long ballon : course perdue d\'avance', a:'stay',
  ctx:"Long ballon dans le dos de ta défense. Leur attaquant est déjà lancé.",
  init:{ g:[34,86], b:[30,52], o1:[30,50.5], o2:[40,60], m1:[36,58], m2:[24,57] },
  pre:[{ mv:{ b:[41,74], o2:[41,69], m1:[38,65] } }],
  after:[{ mv:{ o2:[41,77], b:[41,78.5], g:[35,93], m1:[39,73] }, cone:1 }],
  w:"L'attaquant est lancé et bien plus près du ballon que toi : si tu sors, tu arrives deuxième, loin de ton but. Tu recules sur la ligne ballon–centre du but, tu t'arrêtes et tu joues le un contre un." },
{ id:'l7', k:'lis', m:'m3', lvl:3, view:'third', t:'Pied d\'appui et corps ouvert',
  ctx:"Il rentre vers l'axe. Petit élan, corps ouvert, pied d'appui tourné vers ton deuxième poteau.",
  init:{ g:[32.4,101.8], o1:[19,86], b:[20.4,87], m1:[18,91], o2:[44,90], m2:[42,93] },
  pre:[{ mv:{ o1:[25,85], b:[26.5,86.4], m1:[22.5,89.5], g:[33,101.9] } }],
  q:"Quelle frappe est la plus probable ?", o:["Tir placé, enroulé vers le deuxième poteau","Frappe en force au premier poteau","Passe en retrait"],
  after:[{ mv:{ b:[36.5,102.4], g:[35.7,102.3] }, shot:1 }],
  w:"Petit élan et corps ouvert : il cherche la précision, pas la force. Son pied d'appui montrait le deuxième poteau. Tu ne pars pas avant la frappe, mais tu es prêt à pousser de ce côté." },
{ id:'e9', k:'err', m:'m5', lvl:3, view:'third', t:'Parti avant la frappe',
  ctx:"Un contre un dans la surface. L'attaquant arme sa frappe… regarde le gardien.",
  init:{ g:[34,99], o1:[36,86], b:[36,87.5], m1:[28,84] },
  pre:[{ mv:{ o1:[35.6,90], b:[35.6,91.5], g:[34.3,97.5] } }, { mv:{ g:[30.8,98.2] }, t:"L'attaquant fait semblant de frapper. Le gardien plonge." }, { mv:{ b:[37,106.2] }, shot:1, t:"Il attend une demi-seconde et tire de l'autre côté. But." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il choisit un côté avant que le ballon parte","Il est trop avancé","Il aurait dû sortir dans ses pieds"],
  after:[{ rs:{ g:[34.3,97.5], b:[35.6,91.5] }, cone:1, t:"La bonne version : debout sur la feinte, tu réagis au vrai ballon." }, { mv:{ b:[36.6,97.4], g:[35.9,97.6] }, shot:1 }],
  w:"Une feinte marche seulement sur un gardien qui devine. Lis les indices, mais ton corps attend le ballon : c'est lui qui te dit où aller." },
{ id:'l8', k:'lis', m:'m7', lvl:3, view:'half', t:'Le piège près de la touche',
  ctx:"Sortie de but. Tout le monde est marqué, sauf ton latéral gauche, collé à la touche. Leur ailier le surveille.", lb:{ m3:'LG', m5:'6' },
  init:{ g:[34,99], b:[34,97.6], m1:[22,92], m2:[46,92], m3:[5,84], m5:[34,80], o1:[30,88], o2:[14,78], o3:[44,86], o4:[34,76] },
  pre:[{ c:[5,84,3.2] }],
  q:"Si tu lui passes le ballon, que va-t-il se passer ?", o:["Ils l'enferment contre la touche","Il aura le temps d'avancer","Leur équipe va reculer"],
  after:[{ mv:{ b:[5.6,85.2], o2:[8.4,80.6], o1:[17,90] }, t:"La passe part : leur ailier saute, leur 9 coupe le retour vers toi." }, { mv:{ o4:[15,80] } }],
  w:"Un joueur laissé libre près de la touche, c'est souvent un piège : la ligne de touche lui enlève la moitié de ses solutions. Préfère l'intérieur, l'autre côté ou le jeu long." },
{ id:'e10', k:'err', m:'m3', lvl:3, view:'third', t:'Le rebond dans l\'axe',
  ctx:"Frappe à mi-hauteur, droit sur le gardien. Regarde où va le ballon après l'arrêt.",
  init:{ g:[34,102], o1:[34,84], b:[34,85.5], m1:[29,88], o2:[40,93], m2:[44,95] },
  pre:[{ mv:{ b:[34,101] }, shot:1 }, { mv:{ b:[36,95.4], o2:[37.8,94.2] }, t:"Il repousse devant lui…" }, { mv:{ b:[32,106.2] }, shot:1, t:"Reprise à bout portant. But." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il repousse le ballon dans l'axe, devant son but","Il était trop avancé","Il aurait dû plonger plus tôt"],
  after:[{ rs:{ b:[34,101], o2:[40,93] }, mv:{ b:[52,100] }, t:"La bonne version : capter, ou repousser loin sur le côté." }, { mv:{ g:[36.7,103.2], o2:[49,97] }, cone:1 }],
  w:"Sur un tir à ta portée, deux bonnes réponses : tu captes, ou tu envoies le ballon sur le côté. Un ballon rendu dans l'axe donne un deuxième tir, de plus près." },
{ id:'o10', k:'sor', m:'m3', lvl:3, view:'third', t:'Ballon libre après ton arrêt', a:'go',
  ctx:"Tu viens de repousser un tir. Le ballon reste dans ta surface de but.",
  init:{ g:[33,102.5], b:[33.4,101.4], o1:[30,88], o2:[43,93], m1:[38,94] },
  pre:[{ mv:{ b:[37,100.2], o2:[42.6,95.5] } }],
  after:[{ mv:{ g:[36.5,100.6] } }],
  w:"Le ballon est libre et plus près de toi que de lui : tu plonges dessus tout de suite, mains en premier, et tu le serres contre toi. La deuxième action, c'est ça." },
{ id:'k5', k:'qui', m:'m8', lvl:3, view:'third', t:'Le bloqueur',
  ctx:"Corner contre toi. Un adversaire vient se placer juste devant toi.",
  init:{ g:[34.6,104], b:[0.6,104.4], o1:[2,101.6], m1:[30.8,104.2], m2:[31.6,95.4], o2:[31,93.8], m3:[40.6,95.4], o3:[40,93.8], o4:[36,96], m5:[42,100.5] },
  pre:[{ mv:{ o4:[36.6,101] } }], who:'m5',
  q:"Il veut t'empêcher de sortir. Que dis-tu à ton coéquipier libre ?", o:["PRENDS-LE !","DÉGAGE !","SEUL !","SORS !"],
  after:[{ mv:{ m5:[38.6,101.9] } }],
  w:"Ton coéquipier en zone n'avait personne. Il vient se coller au bloqueur : tu retrouves la place pour t'élancer, sans te battre toi-même." },
{ id:'l9', k:'lis', m:'m8', lvl:3, view:'third', t:'Rentrant au premier poteau',
  ctx:"Corner rentrant : le ballon va tourner vers ton but. Regarde leurs courses.",
  init:{ g:[34.6,104], b:[0.6,104.4], o1:[2,101.6], m1:[30.8,104.2], o2:[30,92], m2:[30.6,93.6], o3:[37,91], m3:[37.6,92.6], m4:[26,100] },
  pre:[{ mv:{ o2:[28.4,97.6], o3:[32,95.6], m2:[29.6,98.4], m3:[33.4,96.4] } }],
  q:"Où est le danger numéro un ?", o:["Une déviation au premier poteau","Une tête au deuxième poteau","Un tir de loin"],
  after:[{ mv:{ b:[28.6,99.2], g:[32.6,103.8] } }, { mv:{ b:[32.4,103.7] }, shot:1 }],
  w:"Corner rentrant et courses vers le premier poteau : une petite déviation suffit pour marquer. Tu restes près de ta ligne, prêt à réagir de près, sans te faire attirer trop loin." },
{ id:'k6', k:'qui', m:'m3', lvl:3, view:'third', t:'Libre dans la zone d\'or',
  ctx:"L'ailier a le ballon sur le côté. Regarde aussi devant ton but.",
  init:{ g:[36.6,102.6], b:[57,92.5], o1:[58,91], m1:[54,94], o2:[40,96], m2:[39,98], o3:[33,83], m3:[24,91] },
  pre:[{ mv:{ o3:[33.6,92.2] } }], who:'m3',
  q:"Un adversaire arrive seul au point de penalty.", o:["PRENDS-LE !","SEUL !","J'AI !","SORS !"],
  after:[{ mv:{ m3:[32.2,93.6] } }],
  w:"Le joueur le plus dangereux n'est pas celui qui a le ballon sur le côté : c'est celui qui est libre dans la zone d'or. Tu le fais marquer AVANT le centre en retrait." },
{ id:'e11', k:'err', m:'m5', lvl:3, view:'half', t:'Sorti trop tôt à deux contre un',
  ctx:"Deux attaquants contre ton dernier défenseur. Regarde le gardien.",
  init:{ g:[34,97], o1:[28,76], b:[28,77.5], o2:[43,78], m1:[32,83] },
  pre:[{ mv:{ o1:[29,82], b:[29,83.5], o2:[42,84], m1:[34.5,89.5] } }, { mv:{ g:[30.4,88.6] }, t:"Le gardien fonce sur le porteur." }, { mv:{ b:[41.6,88.4], o2:[42,87] } }, { mv:{ b:[36,106.2] }, shot:1, t:"Passe sur le côté, but vide." }],
  q:"Quelle est l'erreur du gardien ?", o:["Il sort alors que le porteur contrôle et a une passe facile","Il est resté debout trop longtemps","Il aurait dû rester collé à sa ligne de but"],
  after:[{ rs:{ g:[34,98], b:[29,83.5], o2:[42,84] }, cone:1, t:"La bonne version : debout sur la ligne ballon–but, et « RETARDE ! »" }, { mv:{ b:[41.6,88.4], o2:[42,87], g:[35.8,100.4] } }, { mv:{ b:[36.3,100.1] }, shot:1 }],
  w:"À deux contre un, sortir sur un porteur qui contrôle, c'est lui offrir la passe et le but vide. Tu restes debout, tu fais retarder, tu bouges pendant la passe." },
{ id:'o11', k:'sor', m:'m5', lvl:3, view:'half', t:'Deux contre un : passe trop longue', a:'go',
  ctx:"Deux contre un. Le porteur donne à son coéquipier… mais sa passe est trop forte.",
  init:{ g:[34,97], o1:[28,80], b:[28,81.5], o2:[44,80], m1:[34.5,83.5] },
  pre:[{ mv:{ b:[40,95.5], o2:[44,85] } }],
  after:[{ mv:{ g:[39.4,95.7], o2:[42.6,89.5] } }],
  w:"La passe est trop longue : le ballon entre dans ta surface, plus près de toi que de lui. C'est le signal. Même en infériorité, un ballon mal donné, tu l'attaques à fond." },
{ id:'v8', k:'voix', m:'m9', lvl:3, view:'half', t:'Juste après le but',
  ctx:"Tu viens d'encaisser. Deux de tes défenseurs se chicanent sur la faute.", lb:{ m1:'DC', m2:'DC' },
  init:{ g:[34,101], m1:[29,90], m2:[39,90], m3:[12,84], m4:[56,84], b:[34,53] },
  pre:[{ c:[34,90,7] }],
  q:"Que leur cries-tu ?", o:["PROCHAIN BALLON !","C'EST TA FAUTE !","RÉVEILLEZ-VOUS !","(Je ne dis rien)"],
  after:[{ mv:{ m1:[26,82], m2:[42,82], g:[34,94] } }],
  w:"Un leader ne cherche pas de coupable pendant le match. Une consigne courte et positive ramène tout le monde dans le jeu. On reparlera du but après." }
];


/* =====================================================================
   LOT C — carnet d'après-match et programme jeu au pied
   ===================================================================== */

/* ---------- CARNET D'APRÈS-MATCH : les 4 critères notés de 1 à 5 ---------- */
const CARNET = {
  crit: [
    { id: 'pl', n: 'Mon placement', h: 'Ballon – toi – centre du but, hauteur selon la phase de jeu' },
    { id: 'vo', n: 'Ma voix', h: 'Des consignes courtes, fortes et tôt' },
    { id: 're', n: 'Mes relances', h: 'Bon choix entre courte et longue, bonne exécution' },
    { id: 'ca', n: 'Mon calme après une erreur', h: 'Routine de retour au calme, prochain ballon' }
  ],
  q: {
    bien: "Un ou deux beaux gestes ou bonnes décisions",
    trav: "Une chose à travailler cette semaine",
    err: "Une erreur et ce que tu en retiens",
    obj: "Ton objectif pour le prochain match (un seul, simple)"
  }
};

/* ---------- PROGRAMME JEU AU PIED : 4 semaines, 3 séances de 20 minutes ----------
   w = semaine, t = thème, obj = objectif, test = mesure de fin de semaine (sur max),
   s = séances (t = titre, items = déroulement). Pas plus de 3 séances par semaine. */
const PIED = [
  { w: 1, t: 'Contrôle et première touche', obj: "Recevoir le ballon dans le bon pied, tête levée, sans le perdre.",
    test: { q: "Mur à 8 m : sur 10 passes, combien reviennent contrôlées en une seule touche ?", max: 10 },
    s: [
      { t: 'Séance 1 · Mur et deux pieds', items: [
        "Échauffement (3 min) : jogging léger, balancements de jambes, quelques passes faciles.",
        "Mur à 6 m : contrôle d'un pied, passe de l'autre pied. 3 séries de 10, puis on inverse les pieds.",
        "Mur à 6 m : tu joues en une touche seulement. 2 séries de 10.",
        "Retour au calme (2 min) : marche et étirements des jambes."] },
      { t: 'Séance 2 · Contrôle orienté', items: [
        "Échauffement (3 min) : comme la séance 1.",
        "Place un cône à 2 m de chaque côté de toi. Un partenaire te passe le ballon : tu le contrôles vers le cône de gauche, puis de droite. 3 séries de 8.",
        "Même chose, mais tu dois choisir le côté en regardant d'abord par-dessus ton épaule.",
        "Retour au calme (2 min)."] },
      { t: 'Séance 3 · Tête levée', items: [
        "Échauffement (3 min).",
        "Un partenaire se place derrière toi et montre un chiffre avec ses doigts. Avant chaque contrôle, tu regardes par-dessus ton épaule et tu dis le chiffre. 3 séries de 8.",
        "Au mur : contrôle, regard au loin, passe. Le but est de lever la tête avant que le ballon arrive. 2 séries de 10.",
        "Retour au calme (2 min)."] }
    ] },
  { w: 2, t: 'Passes précises', obj: "Mettre le ballon où tu veux, au sol, des deux pieds.",
    test: { q: "10 passes au sol vers une cible de 2 m de large, à 15 m : combien dedans ?", max: 10 },
    s: [
      { t: 'Séance 1 · Cibles à 10 et 15 m', items: [
        "Échauffement (3 min).",
        "Deux cônes à 2 m d'écart, à 10 m de toi : 10 passes du pied fort, 10 du pied faible. Compte les passes dedans.",
        "Même exercice à 15 m. Écris ton meilleur score.",
        "Retour au calme (2 min)."] },
      { t: 'Séance 2 · Passer en mouvement', items: [
        "Échauffement (3 min).",
        "Un partenaire te fait une passe : tu contrôles, tu fais 2 pas vers l'avant, puis tu passes vers la cible à 12 m. 3 séries de 6.",
        "Même chose, mais tu choisis la cible de gauche ou de droite selon l'indication de ton partenaire, donnée à la dernière seconde.",
        "Retour au calme (2 min)."] },
      { t: 'Séance 3 · Avec un peu de pression', items: [
        "Échauffement (3 min).",
        "Un partenaire avance vers toi lentement (à la marche) pendant que tu contrôles et passes vers la cible. 3 séries de 6.",
        "Il avance un peu plus vite à chaque série. Ta passe doit partir avant qu'il arrive à 2 m.",
        "Retour au calme (2 min)."] }
    ] },
  { w: 3, t: 'Le jeu long', obj: "Envoyer le ballon loin, avec une trajectoire que tu contrôles.",
    test: { q: "10 dégagements vers une zone de 15 m de large, à 30 m : combien dedans ?", max: 10 },
    s: [
      { t: 'Séance 1 · Dégagement au sol', items: [
        "Échauffement (5 min) : jogging, étirements dynamiques des jambes et des hanches.",
        "Ballon posé au sol : dégagement vers une zone à 25 m. 8 du pied fort, 6 du pied faible. Pas à pleine puissance : vise d'abord la précision.",
        "Même exercice, mais en prenant un élan de 2 pas. 6 de chaque pied.",
        "Retour au calme (3 min). Si une jambe ou le dos fait mal, arrête."] },
      { t: 'Séance 2 · La volée', items: [
        "Échauffement (5 min).",
        "Volée latérale : tu lances le ballon de la main et tu le frappes avant qu'il touche le sol, vers une cible large à 25 m. 8 de chaque pied.",
        "Même chose, mais avec le ballon qui rebondit une fois (demi-volée). 6 de chaque pied.",
        "Retour au calme (3 min)."] },
      { t: 'Séance 3 · Les lancers', items: [
        "Échauffement (3 min).",
        "Lancer roulé vers un cerceau à 10 m, lancer javelot vers un cerceau à 20 m, lancer par-dessus vers un cerceau à 30 m. 8 de chaque.",
        "Un partenaire court : lance le ballon dans sa course, devant lui.",
        "Retour au calme (3 min)."] }
    ] },
  { w: 4, t: 'Décider vite', obj: "Choisir le bon type de relance en moins de 5 secondes.",
    test: { q: "Un partenaire place deux cibles (courte et longue) : sur 8 relances, combien de bons choix ?", max: 8 },
    s: [
      { t: 'Séance 1 · Courte ou longue', items: [
        "Échauffement (3 min).",
        "Deux partenaires bougent entre toi et la cible courte. Quand l'un est libre, tu joues court. Quand les deux sont bloqués, tu joues long. 10 répétitions.",
        "Dis à voix haute ton choix avant de jouer : « Courte » ou « Longue ».",
        "Retour au calme (2 min)."] },
      { t: 'Séance 2 · Le compte à rebours', items: [
        "Échauffement (3 min).",
        "Un partenaire compte jusqu'à 5. Tu dois relancer avant la fin du compte. 3 séries de 6.",
        "Un attaquant arrive en pressing après 3 secondes. Tu relances avant qu'il arrive.",
        "Retour au calme (2 min)."] },
      { t: 'Séance 3 · Dans le match', items: [
        "Échauffement (3 min).",
        "Au prochain entraînement ou match, compte tes relances : combien de courtes, combien de longues, combien réussies ?",
        "Note ces chiffres dans ton carnet d'après-match.",
        "Choisis un objectif de relance pour le prochain match (un seul)."] }
    ] }
];

/* =====================================================================
   LOT D — lexique, routine d'avant-match, gestion de l'erreur,
   quiz des règles, analyse vidéo guidée
   ===================================================================== */

/* ---------- LEXIQUE : mots d'origine (le gardien peut les remplacer) ----------
   w = mot, s = ce que ça veut dire, q = quand le dire */
/* Équivalents anglais (en : le premier est le plus courant, les autres sont des variantes).
   À valider avec son entraîneur : les mots anglais varient d'un entraîneur et d'une région à l'autre. */
const LEX_EN_NOTE = "Certains entraîneurs utilisent les mots anglais. Il n'y a pas de règle unique : demande ceux que ton équipe emploie, et garde les mêmes mots que tes coéquipiers.";
const LEX_EN_EXTRA = [
  { w: "DROP!", s: "Recule vers ton but.", q: "Ton défenseur est trop haut : un ballon en profondeur ou un lob est possible." },
  { w: "HOLD! / STAY!", s: "Tiens ta position, ne monte pas.", q: "Ton défenseur veut sortir ou monter, mais il faut garder la ligne." },
  { w: "WIDE!", s: "Pousse-le vers l'extérieur.", q: "Ton défenseur oriente l'attaquant vers la touche, loin de l'axe." },
  { w: "SWITCH!", s: "Change de côté.", q: "Un coéquipier peut jouer vers l'autre aile : ouvre le jeu." }
];
const LEX = [
  { id: 'jai', w: "J'AI !", s: "Je prends le ballon, écartez-vous.", q: "Centre ou long ballon dans ma zone, et je suis sûr d'arriver en premier.", en: ["KEEPER!", "KEEP!", "MINE!"] },
  { id: 'degage', w: "DÉGAGE !", s: "Je ne sors pas, joue loin.", q: "Le ballon est trop loin pour moi ou il y a trop de monde : ton défenseur frappe fort et loin.", en: ["AWAY!", "CLEAR!"] },
  { id: 'seul', w: "SEUL !", s: "Tu as le temps, contrôle.", q: "Ton coéquipier reçoit le ballon sans adversaire proche.", en: ["TIME!", "TURN!"] },
  { id: 'cavient', w: "ÇA VIENT !", s: "Un adversaire arrive dans ton dos.", q: "Ton coéquipier reçoit dos au jeu et ne voit pas qui arrive.", en: ["MAN ON!", "PRESSURE!"] },
  { id: 'sors', w: "SORS !", s: "Toute la ligne monte.", q: "Juste après un boxé ou un dégagement, pour éloigner le danger.", en: ["STEP UP!", "PUSH UP!"] },
  { id: 'retrait', w: "RETRAIT !", s: "Je suis disponible pour une passe en retrait.", q: "Ton coéquipier est pressé et ne trouve pas de solution devant.", en: ["HERE!", "BACK!"] },
  { id: 'retarde', w: "RETARDE !", s: "Ne te jette pas, gagne du temps.", q: "Ton défenseur est seul face à l'attaquant, mais l'équipe revient.", en: ["DELAY!", "JOCKEY!"] },
  { id: 'dos', w: "DANS TON DOS !", s: "Un adversaire libre est derrière toi.", q: "Ton coéquipier ne voit pas l'adversaire qui s'approche par-derrière.", en: ["BEHIND YOU!"] },
  { id: 'prends', w: "PRENDS-LE !", s: "Un adversaire est seul : marque-le.", q: "Un attaquant est libre dans la surface ou près de ton but.", en: ["PICK HIM UP!", "MARK UP!"] },
  { id: 'cote', w: "DROITE ! / GAUCHE !", s: "Décale-toi de ce côté.", q: "Ton mur ou ta ligne défensive n'est pas bien placé.", en: ["RIGHT! / LEFT!", "SHIFT!"] }
];

/* ---------- ROUTINE D'AVANT-MATCH : 5 moments, une liste de gestes chacun ---------- */
const ROUTINE = [
  { id: 'veille', t: "La veille", q: "Prépare tout pour être tranquille", items: [
    "Prépare ton sac : gants propres, souliers, bouteille d'eau, vêtements de rechange.",
    "Vérifie avec ton parent l'heure et le lieu du match.",
    "Couche-toi à une heure raisonnable : bien dormir aide autant que s'entraîner.",
    "Écrans éteints au moins une heure avant de dormir."] },
  { id: 'matin', t: "Quelques heures avant", q: "Le jour du match", items: [
    "Mange un vrai repas que tu connais déjà. Rien de nouveau le jour du match.",
    "Bois de l'eau pendant la journée, pas seulement juste avant le match.",
    "Relis ton objectif du match : un seul, simple."] },
  { id: 'arrivee', t: "À l'arrivée", q: "Environ une heure avant", items: [
    "Marche le terrain : où est le soleil, d'où vient le vent, comment est ta surface.",
    "Vérifie tes gants et tes souliers.",
    "Dis à tes défenseurs tes mots-clés du jour.",
    "Range ton téléphone dans ton sac, en mode « Ne pas déranger »."] },
  { id: 'chauffe', t: "L'échauffement", q: "Avec ton équipe ou ton entraîneur de gardiens", items: [
    "Suis l'échauffement prévu par ton entraîneur.",
    "Fais quelques ballons vers les coins et deux sorties sur un centre.",
    "Crie « J'AI ! » au moins deux fois : réveille ta voix."] },
  { id: 'cinq', t: "Les 5 dernières minutes", q: "Juste avant le coup d'envoi", items: [
    "Respire lentement par le nez, trois fois, en expirant plus longtemps que tu inspires.",
    "Imagine trois beaux arrêts et trois bonnes relances.",
    "Fais ton geste de départ et répète ton objectif."] }
];
const ROUTINE_PERSO = {
  obj: "Mon objectif d'aujourd'hui",
  geste: "Mon geste de départ (ex. : taper mes gants, toucher mon poteau)",
  mot: "Ma phrase (ex. : « Je suis prêt. »)"
};

/* ---------- GESTION DE L'ERREUR ----------
   steps : les 4 temps de la routine ; gestes et mots : propositions ;
   scen : mises en situation (la première option est la bonne), même format que QUIZ */
const ERREUR = {
  steps: [
    { t: "Respire", d: "Une grande respiration, les épaules qui descendent." },
    { t: "Fais ton geste", d: "Le geste que tu as choisi, toujours le même." },
    { t: "Dis ton mot", d: "Une phrase courte dans ta tête." },
    { t: "Parle à ta défense", d: "Une consigne à voix haute : tu reprends le contrôle." }
  ],
  gestes: ["Taper mes gants", "Toucher mon poteau", "Replacer mes gants", "Regarder le ciel un instant"],
  mots: ["Suivant.", "Prochain ballon.", "Je suis prêt.", "Un ballon à la fois."],
  scen: [
    { q: "Tu laisses passer un tir facile. 1-0. Tes coéquipiers te regardent.", o: ["Je ramasse le ballon, je fais ma routine et je donne une consigne", "Je me retourne pour expliquer pourquoi ce n'est pas ma faute", "Je baisse la tête et je repense à l'erreur"], w: "La routine te ramène dans le match. Les explications viennent après, avec ton entraîneur." },
    { q: "Ta relance est interceptée et ça devient un but. Quelques minutes plus tard, le ballon revient dans ta zone.", o: ["Je choisis ma relance comme d'habitude, selon la situation", "Je dégage n'importe où pour ne plus prendre de risque", "Je laisse un coéquipier jouer le ballon à ma place"], w: "Une erreur ne change pas ton rôle. Tu relances encore, avec la même tête." },
    { q: "Tu sors trop tard sur un centre et tu manques ton ballon. Un autre ballon arrive tout de suite.", o: ["Je me replace et je ne pense qu'au prochain ballon", "Je continue à penser à ma sortie", "Je décide de ne plus sortir du match"], w: "Le prochain ballon est le seul qui compte. La sortie, tu la revois après le match." },
    { q: "Un coéquipier te chicane parce que tu as encaissé.", o: ["Je réponds calmement : « Suivant, on y va »", "Je lui crie dessus", "Je ne parle plus à personne"], w: "Rester calme montre que tu diriges. La chicane enlève l'attention du jeu." },
    { q: "À la mi-temps, tu sais que ton erreur a mené à un but.", o: ["Je prends une chose à retenir et je repars", "Je me promets de ne plus jamais sortir", "Je répète l'erreur dans ma tête pendant toute la pause"], w: "Une seule chose à retenir : simple et utile. Ensuite, nouvelle mi-temps." },
    { q: "Après le match, tu penses encore à ton erreur.", o: ["Je l'écris dans mon carnet avec ce que j'en retiens", "Je me répète que j'ai tout raté", "Je ne veux plus en parler à personne"], w: "Écrire aide à tourner la page. Et tu peux en parler avec ton entraîneur ou un parent." }
  ]
};

/* ---------- QUIZ DES RÈGLES DU GARDIEN ----------
   Vérifié le 16 nov. 2026 d'après les lois du jeu IFAB 2025/26 (theifab.com) :
   loi 12 (8 secondes, passe de coéquipier, main hors de la surface),
   loi 14 (penalty), loi 16 (coup de pied de but).
   Les ligues jeunesse peuvent ajouter leurs propres règles : à faire valider
   avec l'entraîneur. Même format que QUIZ (première option = bonne). */
const RULES_NOTE = "Lois du jeu IFAB 2025/26, vérifiées le 16 novembre 2026. Ta ligue jeunesse peut avoir des règles à elle : demande à ton entraîneur.";
const RULES = [
  { q: "Tu gardes le ballon dans les mains, dans ta surface, plus de 8 secondes.", o: ["Corner pour l'adversaire", "Coup franc indirect pour l'adversaire", "Rien, tu as tout ton temps"], w: "Depuis 2025-2026, c'est un corner (avant : coup franc indirect après 6 secondes). L'arbitre compte les 5 dernières secondes avec la main levée." },
  { q: "Pendant que tu tiens le ballon, tu le fais rebondir. Ça remet le compte des 8 secondes à zéro ?", o: ["Non, le compte continue", "Oui, il recommence à zéro", "Oui, mais seulement une fois"], w: "Faire rebondir ou lancer le ballon dans les airs ne remet rien à zéro : tu es encore en train de le contrôler." },
  { q: "Un coéquipier te passe volontairement le ballon du pied, dans ta surface.", o: ["Je ne peux pas le prendre avec les mains : coup franc indirect", "Je le prends avec les mains, c'est permis", "Je dois le prendre avec les mains"], w: "Passe volontaire du pied : interdit de la prendre avec les mains. Tu la joues au pied." },
  { q: "Tu reçois le ballon directement d'une touche lancée par un coéquipier.", o: ["Pas de mains : coup franc indirect", "Je peux le prendre avec les mains", "Seulement s'il vient de côté"], w: "Même règle que la passe du pied : une touche d'un coéquipier ne se prend pas avec les mains." },
  { q: "Un coéquipier tente de dégager, rate son coup et le ballon roule vers toi par accident.", o: ["Je peux le prendre : la passe n'était pas volontaire", "Je ne peux jamais le prendre avec les mains", "Je dois le laisser sortir"], w: "La règle vise les passes volontaires. L'arbitre juge si c'était voulu. Si tu as un doute, joue-le au pied." },
  { q: "Tu es sorti de ta surface et tu touches le ballon avec les mains.", o: ["Coup franc direct, et peut-être un carton", "Rien : tu es un gardien", "Coup franc indirect seulement"], w: "Hors de ta surface, tu es un joueur comme les autres. Une main qui arrête une occasion de but peut mener à un carton rouge." },
  { q: "Tu tiens bien le ballon. Un attaquant essaie de le sortir de tes mains.", o: ["Il fait faute : il n'a pas le droit de te défier", "C'est de bonne guerre, le jeu continue", "Tu dois lâcher le ballon"], w: "Tant que tu contrôles le ballon avec les mains, on ne peut pas te défier." },
  { q: "Sur un penalty, au moment de la frappe, ton pied doit…", o: ["Toucher la ligne, être au-dessus ou derrière elle (au moins une partie d'un pied)", "Être entièrement derrière la ligne", "Être à deux mètres devant la ligne"], w: "Tu peux bouger de côté, mais au moins une partie d'un pied reste sur la ligne ou derrière elle." },
  { q: "Avant la frappe d'un penalty, tu peux…", o: ["Rester sur ta ligne, face au tireur, entre les poteaux", "Toucher la barre ou le filet pour le distraire", "Avancer de deux pas"], w: "Tu restes sur ta ligne, face au tireur. Toucher les poteaux, la barre ou le filet, ou retarder le tir, est interdit." },
  { q: "Penalty : tu avances trop tôt, ton arrêt est bon.", o: ["Le penalty est repris, et tu reçois un avertissement", "L'arrêt compte, le jeu continue", "But automatique pour l'équipe adverse"], w: "Arrêt avec infraction : on reprend le tir. Premier avertissement de la partie, ensuite carton jaune. Si le tireur marque, le but compte." },
  { q: "Sur un coup de pied de but, à partir de quand le ballon est-il en jeu ?", o: ["Dès qu'il est botté et qu'il bouge clairement", "Quand il sort de la surface", "Quand un autre joueur le touche"], w: "Il est en jeu dès qu'il est botté et qu'il bouge clairement. Les adversaires doivent rester hors de la surface jusque-là." },
  { q: "Ton coup de pied de but entre directement dans le but adverse.", o: ["But valable", "Dégagement à reprendre", "Coup franc pour l'adversaire"], w: "On peut marquer directement sur coup de pied de but, mais seulement contre l'adversaire. Dans ton propre but, ce serait un corner pour eux." }
];

/* ---------- ANALYSE VIDÉO GUIDÉE ----------
   src : de qui est la vidéo ; focus : le thème de l'analyse ;
   q : [pour toi, pour un autre gardien] ; steps : le déroulement. */
const VIDEO = {
  src: [['moi', 'Mon match'], ['pro', 'Un autre gardien']],
  steps: [
    "Regarde l'extrait une fois en entier, sans arrêter.",
    "Recommence et arrête la vidéo trois à cinq fois, aux moments qui t'intéressent.",
    "Après tes arrêts, réponds aux questions plus bas : est-ce vrai souvent, parfois ou rarement ?",
    "Écris une chose à garder et une chose à travailler."
  ],
  focus: [
    { id: 'pl', n: 'Placement', h: "Quand l'adversaire a le ballon", q: [
      ["Es-tu sur la ligne ballon – centre du but ?", "Est-il sur la ligne ballon – centre du but ?"],
      ["Es-tu arrêté et équilibré quand le ballon est frappé ?", "Est-il arrêté et équilibré quand le ballon est frappé ?"],
      ["Ta hauteur suit-elle celle de ta défense ?", "Sa hauteur suit-elle celle de sa défense ?"]] },
    { id: 'sr', n: 'Sortir ou rester', h: "Les ballons dans le dos de la défense et les un contre un", q: [
      ["As-tu décidé avant que le ballon arrive ?", "A-t-il décidé avant que le ballon arrive ?"],
      ["Es-tu arrêté quand l'attaquant peut frapper ?", "Est-il arrêté quand l'attaquant peut frapper ?"],
      ["Annonces-tu ta décision à voix haute ?", "Annonce-t-il sa décision à voix haute ?"]] },
    { id: 'ce', n: 'Centres', h: "Les ballons aériens dans la surface", q: [
      ["Décides-tu tôt : « J'AI ! » ou « DÉGAGE ! » ?", "Décide-t-il tôt : « J'ai » ou « Dégage » ?"],
      ["Prends-tu le ballon au point le plus haut ?", "Prend-il le ballon au point le plus haut ?"],
      ["Quand tu boxes : loin, haut et sur le côté ?", "Quand il boxe : loin, haut et sur le côté ?"]] },
    { id: 're', n: 'Relances', h: "Courte, longue, à la main ou au pied", q: [
      ["As-tu regardé autour avant de recevoir le ballon ?", "A-t-il regardé autour avant de recevoir le ballon ?"],
      ["Ton choix entre courte et longue était-il bon ?", "Son choix entre courte et longue était-il bon ?"],
      ["Ton ballon arrive-t-il dans la course ou l'espace du coéquipier ?", "Son ballon arrive-t-il dans la course ou l'espace du coéquipier ?"]] },
    { id: 'vo', n: 'Voix et calme', h: "Communication et réaction après une erreur", q: [
      ["Parles-tu à ta défense avant l'action ?", "Parle-t-il à sa défense avant l'action ?"],
      ["Tes consignes sont-elles courtes et fortes ?", "Ses consignes sont-elles courtes et fortes ?"],
      ["Après une erreur, fais-tu ta routine, sans baisser la tête ?", "Après une erreur, reste-t-il calme, sans baisser la tête ?"]] }
  ]
};

const RULES_BRIEF = [
  { h: "Dans ta surface, avec les mains", l: ["Tu as 8 secondes pour te débarrasser du ballon une fois que tu le contrôles. Au-delà : corner pour l'adversaire.", "Personne ne peut te défier quand tu contrôles le ballon avec les mains.", "Passe volontaire du pied d'un coéquipier, ou ballon reçu directement d'une touche : tu ne peux pas le prendre avec les mains (coup franc indirect). Tu le joues au pied."] },
  { h: "Hors de ta surface", l: ["Tu es un joueur comme les autres : une main volontaire est un coup franc direct, et peut mener à un carton jaune ou rouge."] },
  { h: "Au penalty", l: ["Tu restes sur ta ligne, face au tireur, entre les poteaux, jusqu'à la frappe.", "À la frappe, au moins une partie d'un pied touche la ligne ou est derrière elle.", "Tu ne retardes pas le tir et tu ne touches ni les poteaux, ni la barre, ni le filet.", "Si tu fais une infraction et que tu arrêtes le tir : penalty repris, avec un avertissement la première fois, puis un carton jaune."] },
  { h: "Coup de pied de but", l: ["Le ballon est en jeu dès qu'il est botté et qu'il bouge clairement.", "Les adversaires attendent hors de ta surface jusque-là.", "Tu peux marquer directement, mais seulement contre l'adversaire."] }
];

/* =====================================================================
   LOT F — NIVEAU 3 (ÉLITE) : quiz à part (n'entre pas dans les quiz par
   thème ni dans la révision espacée). Première réponse = la bonne.
   Contenu à faire valider par son entraîneur de gardiens.
   ===================================================================== */
const QUIZ3 = [
  { q:"Ta défense est à la médiane. Le porteur adverse est pressé, tête baissée.", o:["Je peux rester haut : il ne peut pas jouer long","Je recule sur ma ligne de but","Je monte encore, jusqu'à la médiane"], w:"Un porteur pressé qui regarde son ballon ne peut pas viser le dos de ta défense. Dès qu'il lève la tête, tu te prépares." },
  { q:"Long ballon hors de ta surface. Tu arrives le premier, un attaquant est à 8 m.", o:["Je dégage fort vers la touche","Je contrôle et je le dribble","Je le prends avec les mains"], w:"Hors de la surface : le pied ou la tête, et simple. La touche est ton amie." },
  { q:"Quel indice t'annonce que la frappe arrive ?", o:["Il pousse le ballon devant lui et baisse la tête","Il lève la tête et regarde ses coéquipiers","Il ralentit et protège son ballon"], w:"Dernière touche et regard sur le ballon : il va frapper. Sois arrêté." },
  { q:"Tu as lu un indice : son pied d'appui pointe vers ta gauche.", o:["Je suis prêt à pousser de ce côté, mais j'attends le ballon","Je plonge à gauche avant la frappe","Je me décale tout de suite à gauche"], w:"Un indice prépare, il ne décide pas. Si tu pars avant, une simple feinte te bat." },
  { q:"Lequel est un déclencheur de pressing pour l'adversaire ?", o:["Une passe lente vers un joueur près de la touche","Une passe rapide vers un joueur libre, face au jeu","Un long ballon vers ton attaquant"], w:"Passe lente, touche, contrôle raté, joueur dos au jeu : ce sont leurs signaux pour sauter." },
  { q:"Leur 9 cache ton 6 et personne ne te presse. Que fais-tu ?", o:["Je garde le ballon et j'avance pour l'obliger à sortir","Je passe vite à un central marqué","Je dégage tout de suite"], w:"Attire-le : s'il sort sur toi, il libère ton 6. C'est toi qui décides du rythme." },
  { q:"Tir puissant, impossible à capter. Où envoies-tu le ballon ?", o:["Sur le côté ou par-dessus la barre","Devant moi, dans l'axe","Peu importe, tant que je le touche"], w:"Un rebond dans l'axe, c'est un deuxième tir à bout portant. C'est toi qui choisis où va le ballon." },
  { q:"Tu viens de repousser un tir sur le côté. Ensuite ?", o:["Debout tout de suite, replacé sur la nouvelle ligne, arrêté","Je reste au sol pour souffler","Je cours vers le ballon sans réfléchir"], w:"La deuxième action : relève-toi vite, replace-toi, arrête-toi avant la reprise." },
  { q:"Corner rentrant : le ballon tourne vers ton but. Ta position de départ ?", o:["Près de ma ligne, au milieu du but","Deux ou trois mètres devant ma ligne","Collé au deuxième poteau"], w:"Un corner rentrant peut entrer directement ou être dévié au premier poteau : reste près de ta ligne." },
  { q:"Un adversaire se colle à toi avant le corner.", o:["Je demande un coéquipier entre lui et moi","Je le pousse des deux mains","Je recule dans mon but"], w:"Le pousser, c'est risquer un penalty. Un coéquipier te protège et tu gardes ton élan." },
  { q:"D'où sont marqués la plupart des buts ?", o:["Dans l'axe, près du but","De l'extérieur de la surface","Des côtés, avec un angle fermé"], w:"C'est la zone d'or. Tes consignes et ton placement la protègent en premier." },
  { q:"L'ailier est sur la ligne de fond. Un attaquant est libre au point de penalty. Le plus grand danger ?", o:["Le centre en retrait vers le joueur libre","Le tir direct de l'ailier","Un dribble de l'ailier"], w:"Angle fermé pour l'ailier, joueur libre dans la zone d'or : le centre en retrait est la vraie menace." },
  { q:"Deux contre un face à ton dernier défenseur. Ta consigne ?", o:["« RETARDE ! »","« SORS ! »","« J'AI ! »"], w:"S'il se jette, c'est deux contre zéro. En retardant, il ramène des coéquipiers." },
  { q:"À deux contre un, le porteur fait la passe. Quand te déplaces-tu ?", o:["Pendant que le ballon roule, pour être arrêté à l'arrivée","Après le contrôle du receveur","Je ne bouge pas, je reste sur le premier joueur"], w:"Le temps de la passe, c'est ton temps de déplacement. À l'arrivée, tu es arrêté." },
  { q:"Ton équipe vient d'encaisser. Tes premières secondes ?", o:["Ma routine, puis une consigne positive à ma défense","Je cherche qui a fait l'erreur","Je reste sur ma ligne sans parler"], w:"Dix secondes pour toi, puis tu t'occupes des autres. Les deux minutes suivantes comptent double." },
  { q:"Penalty contre toi à la dernière minute. Dans ta tête ?", o:["La pression est sur le tireur : un plan clair, et je m'y tiens","Si je ne l'arrête pas, ce sera ma faute","Je changerai d'idée pendant sa course d'élan"], w:"Personne ne s'attend à ce que tu l'arrêtes : tu n'as rien à perdre. Choisis ton plan avant sa course et garde-le." }
];


/* =====================================================================
   LOT I — Onglets PHYSIQUE et NUTRITION, objectifs, thèmes vidéo
   (repris du plan d'entraînement de départ, sans division, catégorie d'âge, club ni jours)
   ===================================================================== */
const YT = q => 'https://www.youtube.com/results?search_query=' + q;

/* ---------- PHYSIQUE : un surplus à l'entraînement de l'École ---------- */
const PHYS = {
  tips: [
    "Ces exercices s'ajoutent à ton entraînement à l'École. Ils sont un surplus, pas une obligation.",
    "Choisis un ou deux exercices, ou un circuit, quand tu as de l'énergie.",
    "La technique d'abord, la vitesse ensuite. 20 secondes bien faites valent mieux que 2 minutes mal faites.",
    "Échauffe-toi 5 minutes avant. Pour les sauts et les chutes, demande à un adulte de te regarder et choisis une surface adaptée.",
    "Fatigué ou mal quelque part ? Arrête et saute l'exercice. L'entraînement de l'École passe en premier.",
    "Demande à ton entraîneur quels exercices lui semblent les plus utiles pour toi."
  ],
  cats: [['agi', 'Agilité'], ['pli', 'Pliométrie'], ['gai', 'Gainage'], ['gar', 'Technique'], ['mur', 'Solo au mur']],
  ex: [
    { id: 'echelle', c: 'agi', n: "Échelle d'agilité", d: "Motifs de base au sol : un pied par case, deux pieds, pas chassés. Maîtrise-les lentement avant d'accélérer.", k: ["Poids sur l'avant du pied, talons jamais au sol", "Bras en mouvement comme à la course", "Regarde devant, pas tes pieds", "Maîtrise lentement avant d'accélérer"], dose: ["3 passages par motif", "15 à 20 min"], q: 'agility+ladder+drills+soccer+youth+beginner+tutorial' },
    { id: 'tdrill', c: 'agi', n: "T-drill (cônes)", d: "Sprint avant, déplacements latéraux, retour en arrière. Ça ressemble aux vrais mouvements dans les buts.", k: ["Touche chaque cône avec la main", "Ne croise jamais les pieds en latéral", "Reste bas, en position athlétique", "Sprint maximum sur le retour final"], dose: ["5 à 6 répétitions", "Récupération 45 s"], q: 'T+drill+agility+soccer+goalkeeper+tutorial' },
    { id: 'box', c: 'pli', n: "Sauts sur caisse", d: "Sauts sur une caisse stable pour développer l'explosivité verticale. Apprends d'abord à bien atterrir, ensuite seulement à aller vite.", k: ["Fléchis les genoux à l'atterrissage", "Atterris sur l'avant du pied, sans bruit", "Balance les bras pour t'aider à sauter", "Descends en marchant, jamais en sautant"], dose: ["3 × 8", "Récupération 90 s"], q: 'box+jump+technique+youth+beginner+tutorial' },
    { id: 'lateral', c: 'pli', n: "Sauts latéraux", d: "Sauts d'un pied à l'autre, sur le côté. C'est l'exercice de saut le plus proche d'un plongeon : même poussée.", k: ["Pousse avec une seule jambe, atterris sur l'autre", "Passe le moins de temps possible au sol", "Va loin, pas seulement vite", "Le genou d'atterrissage reste fléchi"], dose: ["3 × 8 bonds", "Récupération 60 s"], q: 'lateral+bounds+plyometric+goalkeeper+soccer+tutorial' },
    { id: 'corde', c: 'pli', n: "Corde à sauter", d: "Coordination, rythme des pieds, activation des mollets. En début de séance, comme échauffement et non comme cardio.", k: ["Saute bas : juste assez pour passer la corde", "Poids sur l'avant du pied en tout temps", "Coudes près du corps, les poignets font tourner la corde", "Respire de façon régulière et calme"], dose: ["3 × 1 min", "En début de séance"], q: 'jump+rope+technique+beginner+kids+tutorial' },
    { id: 'planche', c: 'gai', n: "Planche frontale", d: "Le gainage contrôle la direction et la précision de ton corps pendant un plongeon. 20 secondes bien faites valent mieux que 2 minutes mal faites.", k: ["Corps droit : pas de dos creux, pas de fesses en l'air", "Contracte les abdos et les fessiers", "Regard vers le sol, cou dans l'axe du dos", "Respire normalement, ne retiens pas ton souffle"], dose: ["3 × 25 s", "Récupération 20 s"], q: 'perfect+plank+form+tutorial+kids+beginner' },
    { id: 'lat', c: 'gai', n: "Planche latérale", d: "Elle renforce les muscles des côtés du tronc, ceux qui travaillent dans les plongeons latéraux. Fais les deux côtés.", k: ["Hanches soulevées : ne les laisse pas descendre", "Pied du dessus aligné avec celui du dessous", "Épaule directement au-dessus du coude"], dose: ["3 × 20 s par côté"], q: 'side+plank+correct+form+tutorial+youth' },
    { id: 'super', c: 'gai', n: "Superman", d: "Couché sur le ventre, lève les bras et les jambes en même temps. Ça renforce le bas du dos, important pour ta stabilité.", k: ["Lève en expirant, tiens 2 à 3 secondes en haut", "Regard vers le sol : ne force pas sur ton cou", "Les bras et les jambes montent ensemble", "Mouvement lent et contrôlé"], dose: ["3 × 10", "Pause de 2 s en haut"], q: 'superman+exercise+back+kids+tutorial+form' },
    { id: 'chutes', c: 'gar', n: "Chutes depuis les genoux", d: "La base de tous les plongeons. Apprends à tomber correctement depuis les genoux : ça protège tes hanches et ça enseigne la bonne technique.", k: ["La hanche du bas touche le sol en premier, pas le coude", "Mains en W derrière le ballon imaginaire", "Bras du dessus au-dessus de la tête", "Relève-toi vite et recommence"], dose: ["3 × 10 par côté", "Surface molle"], q: 'goalkeeper+collapse+dive+technique+from+knees+beginner+youth' },
    { id: 'set', c: 'gar', n: "Position de base et déplacements latéraux", d: "La position de base et les déplacements sur le côté. On les néglige souvent, mais un bon placement vaut plus que des réflexes.", k: ["Pieds à la largeur des épaules, un peu fléchis", "Poids sur la pointe des pieds, jamais sur les talons", "En latéral : glisse (pas chassés), ne croise jamais les pieds"], dose: ["5 min", "Avant chaque séance"], q: 'goalkeeper+set+position+footwork+lateral+movement+tutorial' },
    { id: 'mur', c: 'mur', n: "Réflexes au mur : ballon", d: "Lance le ballon contre le mur et attrape le rebond. Varie la force, la hauteur et la distance. C'est l'un des meilleurs exercices en solo.", k: ["Prise en W à chaque ballon (les pouces se touchent)", "Utilise les deux mains, pas toujours la main forte", "Lance de plus en plus fort, progressivement", "Déplace-toi sur le côté entre les lancers"], dose: ["5 à 10 min", "Aussi possible à la maison"], q: 'goalkeeper+solo+wall+drill+reaction+handling+tutorial' },
    { id: 'tennis', c: 'mur', n: "Réflexes au mur : balle de tennis", d: "Une balle de tennis contre le mur. Le rebond est plus rapide et imprévisible : ton cerveau doit réagir plus vite.", k: ["Commence de près (1 m), puis recule peu à peu", "Attrape à une main, en alternant gauche et droite", "Variante : lance-la sur le sol devant le mur"], dose: ["3 à 5 min", "Aussi possible à la maison"], q: 'goalkeeper+tennis+ball+wall+reflex+drill+tutorial' }
  ],
  circ: [
    { id: 'c1', n: "Circuit force et agilité", min: "environ 45 minutes", note: "Mets une minuterie et suis l'ordre. Si un mouvement n'est pas clair, ouvre sa fiche dans Exercices.", s: [
      ["Corde à sauter", "3 × 1 min · échauffement"],
      ["Mobilité dynamique : hanches, chevilles, épaules", "5 min"],
      ["Échelle d'agilité : 3 motifs différents", "3 passages par motif"],
      ["T-drill (cônes)", "5 à 6 répétitions · récupération 45 s"],
      ["Sauts latéraux", "3 × 8 bonds · récupération 60 s"],
      ["Sauts sur caisse", "3 × 8 · récupération 90 s"],
      ["Planche frontale", "3 × 25 s · récupération 20 s"],
      ["Planche latérale, côté gauche puis côté droit", "3 × 20 s par côté"],
      ["Superman", "3 × 10 · pause de 2 s en haut"],
      ["Étirements : quadriceps, ischios, hanches", "10 min"]
    ] },
    { id: 'c2', n: "Circuit activation légère", min: "environ 35 minutes", note: "Intensité légère, environ 60 %. Le but est de t'activer, pas de te fatiguer.", s: [
      ["Corde à sauter et mobilité", "5 min"],
      ["Position de base et déplacements latéraux", "5 min"],
      ["Ballon de soccer contre le mur, prise en W", "8 min"],
      ["Chutes depuis les genoux", "3 × 10 par côté"],
      ["Balle de tennis, réflexes", "3 à 5 min"],
      ["Dégagements à la volée, technique du pied", "5 min · vise une zone"],
      ["Planche et gainage latéral, légers", "2 × 20 s de chaque"],
      ["Étirements et retour au calme", "5 min"]
    ] }
  ]
};

/* ---------- NUTRITION ----------
   Chiffres tirés de Santé Canada, de la Société canadienne de pédiatrie, de SickKids, de Nemours,
   de l'Académie américaine de pédiatrie et de Sports Dietitians Australia (voir NUTR.src).
   Information générale : pas un avis médical. */
const NUTR = {
  base: [
    "Mange pour jouer, récupérer et grandir. Pas pour te priver.",
    "Tu t'entraînes presque chaque jour : ton corps a besoin de beaucoup d'énergie, plus que celui d'un enfant peu actif.",
    "Ne saute jamais un repas. Vise 3 repas et 1 à 3 collations, aux 2 à 4 heures environ.",
    "Dans ton assiette : la moitié en légumes et fruits, un quart en grains entiers (pâtes, riz, pain), un quart en protéines (guide alimentaire canadien).",
    "Environ la moitié de ton énergie vient des glucides : pâtes, riz, pain, fruits, patate douce, gruau.",
    "Si tu as une allergie ou une intolérance, adapte les idées de cette page. Rien de nouveau le jour d'un match."
  ],
  repartition: "Santé Canada : pour un garçon de 9 à 18 ans, les glucides fournissent 45 à 65 % de l'énergie, les gras 25 à 35 % et les protéines 10 à 30 %.",
  prot: [
    "Besoin de base selon Santé Canada : 0,95 g de protéines par kg et par jour de 9 à 13 ans (environ 34 g à 36 kg), puis 0,85 g par kg de 14 à 18 ans (52 g par jour).",
    "Pour de jeunes athlètes, Nemours parle d'environ 1,0 à 1,3 g par kg (0,45 à 0,6 g par livre). À 40 kg, ça fait environ 40 à 53 g par jour. Manger bien plus que ça n'apporte pas de bénéfice supplémentaire.",
    "Répartis-les sur la journée, à chaque repas et chaque collation, plutôt qu'en une seule fois.",
    "Repères approximatifs : 1 verre de lait (250 mL) ≈ 8 g · 1 œuf ≈ 6 g · 100 g de poulet ou de dinde cuit ≈ 25 à 30 g · 1 petite conserve de thon ≈ 20 g · ¾ tasse de lentilles cuites ≈ 12 à 14 g · 2 c. à soupe de beurre d'amande ≈ 7 g."
  ],
  quand: [
    { t: "La veille", l: ["Souper riche en glucides : pâtes ou riz, avec du poulet et des légumes cuits.", "Bois régulièrement tout au long de la journée.", "Évite les aliments très gras, frits ou que tu ne connais pas.", "Dessert léger : fruit ou compote sans sucre ajouté."] },
    { t: "3 à 4 heures avant : le vrai repas", l: ["Glucides + protéines maigres, peu de gras. Exemples : gruau avec lait et fruits + œufs ; pâtes avec poulet ; sandwich à la dinde sur pain de blé entier + fruit.", "Laisse au moins 2 heures entre le repas et l'effort. Match tôt le matin : déjeune environ 2 heures avant.", "Bois 400 à 600 mL d'eau, 2 à 3 heures avant (repère de la Société canadienne de pédiatrie)."] },
    { t: "30 à 60 minutes avant : la collation", l: ["Petite et facile à digérer : pomme, compote, raisins, tranche de pain avec confiture, barre de céréales douce.", "Peu de gras et peu de fibres. Rien de nouveau.", "Pendant l'échauffement, bois environ 240 mL (8 oz). Boire trop juste avant le match peut donner un point de côté."] },
    { t: "Pendant", l: ["L'eau d'abord : environ 150 à 300 mL toutes les 15 à 20 minutes d'effort.", "À la mi-temps : un quartier d'orange, quelques raisins, de l'eau.", "Tournoi avec plusieurs matchs dans la journée : bois 100 à 200 mL après chaque match, et grignote des glucides légers (fruit, compote, craquelins).", "Boisson sportive : seulement pour un effort long (plus de 60 à 75 minutes), une journée chaude ou un tournoi. Sinon, l'eau suffit.", "Évite les boissons énergisantes (caféine et sucre). La limite de caféine de Santé Canada est de 85 mg par jour à 10-12 ans, et de 2,5 mg par kg dès 13 ans. Évite aussi les boissons gazeuses autour de l'effort."] },
    { t: "Dans les 30 minutes après", l: ["Glucides + un peu de protéines : lait au chocolat + fruit ; smoothie (lait, fruits rouges, graines de chia) ; sandwich à la dinde.", "Repère de SickKids pour jeunes athlètes : environ 45 à 60 g de glucides avec 15 à 20 g de protéines (3 glucides pour 1 protéine).", "Un vrai repas complet dans les 2 heures : protéines + féculents + légumes.", "Bois après l'effort, à raison d'environ ½ tasse toutes les 15 minutes. Après un match très chaud, bois davantage."] }
  ],
  menus: [
    { t: "Une journée d'entraînement", l: [
      ["Déjeuner", "Gruau avec lait, fruits rouges ou pomme tranchée, filet de miel. Œufs brouillés (2) + rôtie de blé entier. Jus d'orange pressé."],
      ["Dîner", "Sandwich au poulet, au thon ou à la dinde sur pain de blé entier. Légumes coupés (carottes, céleri, poivrons) avec houmous, un fruit."],
      ["1 h avant", "Tranche de pain avec beurre d'amande ou de tournesol + petite pomme, ou barre de céréales faible en gras + eau."],
      ["Après (30 min)", "Lait au chocolat, ou smoothie de lait, fruits rouges congelés et graines de chia. Poignée d'amandes ou de noix de cajou."],
      ["Souper", "Protéine (poulet, saumon, bœuf haché, lentilles) + féculent (riz, pâtes, patate douce) + légumes (brocoli, épinards, carottes). Huile d'olive."]
    ] },
    { t: "Un jour de match", l: [
      ["Déjeuner (2 h 30 avant)", "Gruau ou pain doré, fruits (pomme, raisins, orange), un œuf à la coque. Évite les aliments lourds, frits ou nouveaux."],
      ["30 à 45 min avant", "Petite portion de raisins ou une pomme, et de l'eau. Ni l'estomac vide, ni trop plein."],
      ["Mi-temps", "Quartier d'orange, quelques raisins. Eau, ou boisson légèrement sucrée s'il fait chaud."],
      ["Après (30 min)", "Lait au chocolat et un fruit. Puis un repas complet dans l'heure : protéine + glucides + légumes."]
    ] }
  ],
  prots: ["Œufs", "Poulet, dinde", "Thon, saumon", "Lait de vache ou de soya", "Lait au chocolat", "Beurre d'amande ou de tournesol", "Amandes, noix de cajou", "Lentilles, pois chiches, haricots", "Edamame", "Bœuf maigre"],
  eau: [
    "Le repère le plus simple : urine jaune pâle = bien hydraté. Plus foncée que d'habitude : bois plus.",
    "Santé Canada fixe l'apport total en eau (boissons et aliments) à environ 2,4 L par jour de 9 à 13 ans, et 3,3 L de 14 à 18 ans. Plus les jours d'effort ou de chaleur.",
    "L'eau est le choix de base. Le lait et le lait au chocolat comptent aussi. Limite les jus industriels et les boissons sucrées.",
    "Étourdissements, crampes, nausées ou mal de tête par temps chaud : va à l'ombre, repose-toi, bois frais et préviens un adulte.",
    "Commence à bien boire la veille du match, pas seulement le jour même."
  ],
  shake: {
    intro: "Beaucoup de jeunes athlètes boivent des shakes de protéines, comme ceux de Good Protein. Voici ce que disent les sources, pour que le parent et toi décidiez en connaissance de cause.",
    sci: [
      "L'Académie américaine de pédiatrie : les besoins d'un jeune athlète sont mieux couverts par une alimentation équilibrée que par des suppléments. Les poudres de protéines n'apportent pas mieux qu'une protéine d'aliment (viande, œuf, lait, soya).",
      "SickKids (AboutKidsHealth) classe les poudres de protéines parmi les suppléments de performance : préfère les œufs, le lait, la viande, le poisson, les légumineuses ou le soya, et consulte un diététiste sportif ou un médecin avant d'en prendre.",
      "Les suppléments ne sont pas contrôlés comme des aliments : certains contiennent des ingrédients non indiqués sur l'étiquette."
    ],
    prod: [
      "Page du fabricant (shake « High Protein », vanille française) : 32 g de protéines par portion d'environ 47 g (sac de 470 g = 10 portions), protéine de pois, 0 g de sucre, 4 g de glucides nets, sans produits laitiers.",
      "Gamme « All-in-One » (fiche communautaire Open Food Facts, non vérifiée) : portion de 44 g = 21 g de protéines, 170 kcal, 13 g de glucides, 6 g de fibres, 5 g de gras.",
      "Il existe plusieurs produits : lis l'étiquette de ton pot. Les valeurs ci-dessus ne remplacent pas le tableau de valeur nutritive."
    ],
    sens: [
      "Une portion complète (21 à 32 g) représente à elle seule environ 60 à 95 % du besoin de base d'une journée pour un garçon de 36 kg (34 g).",
      "Avec 3 repas et 2 collations qui contiennent des protéines, le besoin est généralement déjà couvert sans shake. Un shake de plus n'ajoute rien si ton besoin est déjà comblé.",
      "Un shake ne remplace pas un repas ou une collation en vrais aliments : tu perds les vitamines, les fibres et la variété."
    ],
    quand: [
      "Un dépannage utile : après un entraînement ou un match, quand un vrai repas n'est pas possible avant une heure ou deux.",
      "Un verre de lait au chocolat apporte aussi des protéines et des glucides pour récupérer."
    ],
    regles: [
      "Compte-le dans ta journée : si tu en bois un, tes repas peuvent contenir un peu moins de protéines, pas plus.",
      "Pas dans les 2 heures avant un match ou un entraînement : le volume et les fibres ralentissent la digestion.",
      "Vérifie l'étiquette : pas de caféine, de créatine, de stimulant, de « brûle-gras » ni de « booster ».",
      "Cherche un sceau de test indépendant (Informed Sport, Informed Choice, NSF Certified for Sport ou BSCG). Je n'ai pas pu confirmer si ton produit en porte un.",
      "Pour la bonne portion selon son poids, demande au médecin de famille, au pharmacien ou à un diététiste sportif."
    ]
  },
  src: [
    ["Santé Canada : équations des besoins énergétiques (2023, mises à jour en 2025)", "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/equations-estimate-energy-requirement.html"],
    ["Santé Canada : valeurs de référence des macronutriments", "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-macronutrients.html"],
    ["Société canadienne de pédiatrie : boissons énergisantes et sportives", "https://cps.ca/en/documents/position/energy-and-sports-drinks"],
    ["Soigner nos enfants (SCP) : nutrition du jeune athlète", "https://caringforkids.cps.ca/handouts/nutrition_for_your_young_athlete"],
    ["SickKids AboutKidsHealth : nutrition sportive", "https://www.aboutkidshealth.ca/healthaz/nutrition/sports-nutrition/"],
    ["Sports Dietitians Australia : guide du soccer jeunesse", "https://www.sportsdietitians.com.au/wp-content/uploads/2015/04/Soccer_FINAL.pdf"],
    ["Nemours : nutrition, hydratation et récupération du jeune athlète", "https://blog.nemours.org/2026/01/young-athlete-nutrition/"],
    ["Académie américaine de pédiatrie (HealthyChildren) : nutrition et suppléments", "https://healthychildren.org/English/healthy-living/nutrition/Pages/Nutrition-and-Supplement-Use.aspx"],
    ["Good Protein : fiche produit (shake vanille française)", "https://goodprotein.ca/products/french-vanilla-32g-high-protein-shake"],
    ["Open Food Facts : Good Protein All-in-One", "https://world.openfoodfacts.org/product/0628678203938"]
  ]
};

/* Estimation Santé Canada (2023) : besoin énergétique d'un garçon de 9 à 18 ans selon l'âge, la taille et le poids */
const EER_M = { ac: [-388.19, 12.66, 20.46], va: [-671.75, 15.38, 23.25] };
const eerM = (age, h, w, lv) => { const c = EER_M[lv]; return c[0] + 3.68 * age + c[1] * h + c[2] * w + (age < 14 ? 25 : 20); };

/* ---------- OBJECTIFS (dans Progrès) ---------- */
const OBJ = [
  { t: "Dans 3 mois", l: ["Je me place sur la ligne ballon, centre du but avant chaque tir direct.", "Je choisis ma relance (courte ou longue) avant de recevoir le ballon.", "Je parle à ma défense à chaque action défensive du match.", "Ma routine d'avant-match est écrite, et je la répète."] },
  { t: "Dans 6 mois", l: ["Je sors sur les centres en sécurité dans ma surface.", "Je réussis un dégagement long, technique et précis vers une zone visée.", "Après une erreur, je reviens au calme avec ma routine, sans baisser la tête.", "J'ai analysé 5 gardiens pros différents."] }
];

/* ---------- THÈMES VIDÉO (dans Analyse vidéo) ---------- */
const VTHEMES = [
  { t: "Positionnement et angles", l: [["Positionnement et angles de tir", "La bissectrice et les angles : pourquoi se déplacer avec le ballon.", 'goalkeeper+positioning+angles+tutorial'], ["Un gardien qui joue haut", "Observe comment Neuer coupe les angles avec des ralentis.", 'neuer+sweeper+goalkeeper+positioning+analysis']] },
  { t: "Technique de parade et mains", l: [["Prise en W", "Arrêts à deux mains, sécuriser le ballon. Imite le mouvement.", 'goalkeeper+handling+technique+W+catch+tutorial'], ["Arrêts au ralenti", "Pied d'appui, mains, direction du plongeon.", 'goalkeeper+saves+slow+motion+technique+analysis']] },
  { t: "Jeu aux pieds et distribution", l: [["Relances modernes", "Relances courtes, dégagements longs à la volée.", 'goalkeeper+distribution+passing+technique+modern'], ["Jeu au pied d'Ederson", "Étudie ses relances.", 'ederson+goalkeeper+passing+distribution+analysis']] },
  { t: "Mental et leadership", l: [["Gérer l'erreur", "Rester concentré 90 minutes, rebondir après une erreur.", 'goalkeeper+mental+toughness+psychology+focus'], ["Communication défensive", "Quand crier, comment organiser ton équipe.", 'goalkeeper+communication+organizing+defense+tutorial']] }
];
const VPROS = [["Manuel Neuer", "positionnement, gardien-libéro"], ["Ederson", "jeu au pied, relances"], ["Alisson Becker", "communication, sorties"], ["Gianluigi Donnarumma", "parades, présence physique"], ["David de Gea", "réflexes, arrêts au sol"]];
const VCHAINES = [["GK Workouts", "Exercices de gardien filmés, séances reproductibles seul.", 'GK+Workouts+goalkeeper+training'], ["Tanner Speed Academy", "Vitesse et agilité pour jeunes sportifs.", 'Tanner+Speed+Academy+agility+soccer'], ["En français", "Tutoriels adaptés aux jeunes gardiens.", 'entra%C3%AEnement+gardien+but+jeune+technique']];

/* ---------- ÉCRANS ET TÉLÉPHONE avant un match ou un entraînement ---------- */
const ECRANS = {
  intro: "Ton téléphone n'est pas un ennemi. Mais avant un match ou un entraînement, la façon dont tu l'utilises peut changer ta concentration et ton sommeil.",
  pourquoi: [
    "Une étude publiée en 2020 dans le Journal of Sports Sciences a fait jouer 25 joueurs professionnels (adultes) après 30 minutes de réseaux sociaux ou de jeu vidéo. Leurs décisions de passe ont été moins bonnes, et leur attention plus lente, qu'après 30 minutes de vidéos publicitaires.",
    "Selon les chercheurs, ces activités créent une fatigue mentale, même quand on est assis. On ne la sent pas toujours, mais elle peut se voir sur le terrain.",
    "Ton poste demande justement ça : de l'attention pendant tout le match et des décisions rapides (sortir ou rester, courte ou longue).",
    "L'étude portait sur des adultes professionnels, pas sur des jeunes. Mais toi aussi, tu as besoin d'une tête fraîche pour décider vite."
  ],
  plan: [
    { t: "La veille", l: ["Écrans éteints au moins une heure avant de dormir (Société canadienne de pédiatrie).", "Le plus simple : charge ton téléphone hors de ta chambre.", "Couche-toi et lève-toi à des heures régulières."] },
    { t: "Le jour du match", l: ["Pas de longue séance de jeux vidéo le matin d'un match.", "Si tu utilises ton téléphone, préfère des messages courts aux vidéos qui défilent."] },
    { t: "La dernière heure avant", l: ["Pas de réseaux sociaux ni de jeux vidéo dans les 30 à 60 minutes avant le match ou l'entraînement.", "Musique pour te concentrer : correct si ça t'aide, à condition de la choisir d'avance, sans faire défiler.", "Garde ton téléphone pour l'essentiel : savoir l'heure, joindre ton parent."] },
    { t: "À l'arrivée", l: ["Téléphone rangé dans ton sac, en mode « Ne pas déranger ».", "Ta tête est au terrain : regarde le soleil, le vent, ta surface, parle à tes défenseurs.", "Remplace le téléphone par ta routine : respiration, geste de départ, objectif."] },
    { t: "Après le match", l: ["D'abord ton carnet et la discussion avec ton entraîneur, ensuite les messages.", "Évite de lire les commentaires sur le match le soir même.", "Revoir une vidéo de ton match : oui, avec un adulte et en mode analyse (page Vidéo), pas pour te juger."] }
  ],
  sommeil: [
    "Directives canadiennes en matière de mouvement sur 24 heures : de 9 à 11 heures de sommeil par nuit entre 5 et 13 ans, et de 8 à 10 heures entre 14 et 17 ans.",
    "Les mêmes directives recommandent au plus 2 heures d'écran de loisir par jour.",
    "Le sommeil fait partie de l'entraînement : c'est là que ton corps récupère et que tu grandis."
  ],
  src: [
    ["Fortes et coll. (2020), Journal of Sports Sciences 38(5) : téléphone, jeux vidéo et décisions des joueurs", "https://lida.sport-iat.de/ta/Record/4060134?lng=en"],
    ["Société canadienne de pédiatrie : promouvoir une saine utilisation des écrans", "https://www.cps.ca/en/media/promoting-healthy-screen-use-in-children-and-teens"],
    ["Directives canadiennes en matière de mouvement sur 24 heures (5 à 17 ans)", "https://cichprofile.ca/module/9/section/3/page/canadian-24-hour-movement-guidelines-for-children-and-youth-ages-5-17-years-canada-2017/"]
  ]
};
