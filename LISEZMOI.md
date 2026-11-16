# GK99 · École du gardien — état du projet

## Fichiers
- `index.html` : l'application complète (un seul fichier, à ouvrir dans un navigateur).
- `src/content.js` : tout le contenu (modules, leçons animées, défis, situations, quiz, fiches, exercices, programme jeu au pied, critères du carnet).
- `src/shell.html` : le moteur (terrain animé, navigation, progression, séance du jour, révision, carnet).
- `src/build.py` : assemble le tout en `index.html` (`python build.py` dans le dossier `src` ; écrit `src/index.html` et `index.html` à la racine).
- `src/fonts/` : polices Barlow et Barlow Condensed (4 fichiers .woff2), intégrées dans `index.html` par `build.py` (l'appli marche hors ligne).
- `src/accueil.jpg` : image d'accueil (tirée de `GK99app.jpeg`, recadrée et allégée, ~175 Ko). Intégrée dans `index.html`.
- `src/acces.txt` : mot de passe d'accès (première ligne). Vider ou supprimer le fichier = pas de mot de passe. **Ne pas publier ce fichier** (GitHub : publier seulement `index.html`).

Pour modifier : changer `src/content.js` ou `src/shell.html`, puis reconstruire. Ne pas éditer `index.html` à la main.

## Fait
- Version 1 : 10 modules, 24 leçons animées, 10 défis « Place-toi », 34 questions de quiz, fiches et exercices, 3 niveaux, progression sur l'appareil.
- Lot A : 17 situations interactives — « Dirige ta défense » (7, chronométré), « À qui je parle ? » (4), « Lis le jeu » (6).
- Lot B : 23 situations de plus (40 au total) — « Sortir ou rester ? » (8, chronométré), « Trouve l'erreur » (8, avec la bonne version rejouée), « Courte ou longue ? » en rafale (2 séries de 8), « Place ton mur » (3), « Organise ton corner » (2). Testé sur écran de téléphone (390 et 320 px de large).
- Lot C : nouvel onglet « Séance » (4 onglets au total), testé à 390 et 320 px.
  - 13 · Séance du jour : 4 étapes (révision, leçon animée, défi, exercice sur le terrain) choisies selon le thème le moins avancé ; 3 étapes sur 4 valident la séance ; série de jours de suite ; bouton « Une autre séance » tant qu'aucune étape n'est cochée. Un lien « Ma séance du jour » est aussi sur l'accueil.
  - 15 · Révision espacée (`#revision`) : les 34 questions du quiz en 5 boîtes (revoir après 1, 3, 7, 14, 30 jours) ; une erreur ramène la question à demain et la repose une fois à la fin de la séance ; au plus 5 nouvelles questions à la fois.
  - 14 · Programme jeu au pied (`#pied`) : 4 semaines × 3 séances de 20 min (contrôle, passes précises, jeu long, décider vite) avec un test noté chaque semaine.
  - 10 · Carnet d'après-match (`#carnet`) : résultat, 4 critères notés de 1 à 5, 3 questions ouvertes, objectif du prochain match (rappelé au match suivant), moyenne des 5 derniers matchs, brouillon gardé automatiquement, bouton « Copier le carnet pour mon entraîneur ».
  - Section « Entraînement » ajoutée à l'écran Progrès.

- Lot D : 5 nouveaux écrans, testés à 390 et 320 px (aucune erreur, aucun débordement).
  - 3 · Lexique personnalisable (`#lexique`) : 10 mots-clés du gardien (J'AI, DÉGAGE, SEUL…) avec sens et moment ; chaque mot peut être remplacé par celui de l'équipe, et on peut ajouter jusqu'à 10 mots à soi ; mode « Me tester » (`#lexique/test`).
  - 9 · Routine d'avant-match (`#routine`) : 5 moments (la veille, quelques heures avant, à l'arrivée, échauffement, 5 dernières minutes), cases à cocher qui repartent à zéro chaque jour ; 3 champs perso (objectif, geste de départ, phrase), l'objectif du carnet peut être repris en un clic.
  - 11 · Gestion de l'erreur (`#erreur`) : routine en 4 temps (respire, geste, mot, consigne), choix du geste et du mot, bouton « Répéter ma routine » (4 temps de 3 s), 6 mises en situation (`#erreur/quiz`), lien vers le carnet.
  - 12 · Règles du gardien (`#regles`, aussi dans l'onglet Défis) : résumé en 4 fiches et quiz de 12 questions (`#regles/quiz`). Vérifié le 16 nov. 2026 sur les lois du jeu IFAB 2025/26 : 8 secondes puis corner (loi 12), passe volontaire du pied ou touche d'un coéquipier, main hors de la surface, penalty (au moins une partie d'un pied sur la ligne ou derrière, infraction et reprise), coup de pied de but (en jeu dès qu'il est botté et bouge clairement).
  - 16 · Analyse vidéo guidée (`#video`) : choix de la vidéo (son match ou un autre gardien), du thème (placement, sortir ou rester, centres, relances, voix et calme), 3 questions (souvent / parfois / rarement) et 2 notes ; 30 analyses gardées au maximum.
  - Liens ajoutés : section « Mental et règles » dans l'onglet Séance, ligne « Règles du gardien » dans Défis, « Aller plus loin » dans les modules 4, 8 et 9, deux lignes dans Progrès.

- Lot E (16 nov. 2026) : image d'accueil et mot de passe.
  - L'image `GK99app.jpeg` ouvre l'accueil (pleine largeur, remplace le logo texte) et l'écran de mot de passe.
  - Mot de passe : écran d'accès au lancement, déverrouillage gardé sur l'appareil (`localStorage`, clé `gk99acc`), bouton « Verrouiller l'appli sur cet appareil » dans Progrès. Mot de passe provisoire : `Gardien99` (à changer dans `src/acces.txt`, puis reconstruire). Changer le mot de passe reverrouille tous les appareils.
  - Limite : barrière simple côté appareil (l'appli est un fichier statique). Elle écarte les curieux, mais n'empêche pas quelqu'un de technique de lire le contenu. Pour une vraie protection : accès au niveau de l'hébergeur.
  - Testé à 390 et 320 px : verrou, mauvais mot de passe, rechargement, reverrouillage, aucune erreur.

- Lot F (16 nov. 2026) : Niveau 3 (Élite), 8 sujets. Testé à 390 et 320 px (aucune erreur, aucun débordement), chaque animation relue image par image.
  - 8 leçons animées (`s25` à `s32`) : gardien-libéro et ligne haute (m2), lire le tireur (m3), attirer le pressing (m7), deuxième action (m3), corner rentrant/sortant et bloqueur (m8), zone d'or (m3), deux contre un (m5), après le but (m9).
  - 12 situations de niveau 3 dans les types existants : `o9`, `o10`, `o11` (sortir ou rester), `l7`, `l8`, `l9` (lis le jeu), `e9`, `e10`, `e11` (trouve l'erreur), `k5`, `k6` (à qui je parle), `v8` (dirige ta défense). Total : 32 leçons, 52 situations.
  - Quiz Élite (`#niv/q`) : 16 questions dans `QUIZ3` (fin de `content.js`), record dans `qz.n3`. À part : il n'entre ni dans les quiz par thème ni dans la révision espacée.
  - Écran par niveau (`#niv/1`, `#niv/2`, `#niv/3`) : les trois lignes « Trois niveaux » de l'accueil sont maintenant cliquables et listent leçons, situations et défis du niveau.
  - Fiche « Penalty : ta routine sous pression » ajoutée au module 9.
  - Séance du jour : le défi proposé est pris au niveau le plus bas encore non réussi, pour ne pas donner du niveau 3 trop tôt.
  - Sujet écarté : « Préparer l'adversaire » (pas de données sur les adversaires à ce niveau).

- Lot G (16 nov. 2026) : nouveau look « Soirée de match » et mots anglais. Testé à 390 et 320 px (aucune erreur, aucun débordement).
  - Look : palette tirée de l'image d'accueil (marine `#0B1833`, cartes `#12294D`, jaune but `#FEE438` pour l'action principale et la sélection, rouge maillot `#E8102A` pour adversaires, Stop et niveau Élite, bleu `#2F8FFF`, gazon `#2A6238`). Titres en Barlow Condensed italique gras, texte en Barlow. Boutons et barres aux coins coupés en biais. Niveaux : 1 bleu, 2 jaune, 3 rouge. Variables de couleur en haut de `shell.html` (`:root`). Maquette : canevas « GK99 · Proposition visuelle » (Artifacts).
  - Thème sombre seulement : le thème clair a été retiré. Pour un thème clair, refaire une palette claire dans `:root`.
  - Accueil : l'image se fond dans le fond marine et « Ma séance du jour » est un bouton jaune.
  - Mots anglais : champ `en` dans chaque mot de `LEX` (premier = le plus courant, les autres = variantes) : J'AI = KEEPER! (KEEP!, MINE!), DÉGAGE = AWAY! (CLEAR!), SEUL = TIME! (TURN!), ÇA VIENT = MAN ON! (PRESSURE!), SORS = STEP UP! (PUSH UP!), RETRAIT = HERE! (BACK!), RETARDE = DELAY! (JOCKEY!), DANS TON DOS = BEHIND YOU!, PRENDS-LE = PICK HIM UP! (MARK UP!), DROITE/GAUCHE = RIGHT!/LEFT! (SHIFT!). Autres mots : DROP!, HOLD!/STAY!, WIDE!, SWITCH! (`LEX_EN_EXTRA`).
  - Affichage : ligne « EN » sous chaque mot du lexique, section « D'autres mots en anglais », fiche du module 9 avec l'anglais entre parenthèses, « Test en anglais » (`#lexique/test-en`). Le bouton « Changer » ne modifie que le mot français.

## À faire
- Il restait 12 propositions ; le lot D en couvre 5.
- Hébergement sur GitHub Pages ou sous-domaine de gk99.soccer.

## Repères
- Public : un gardien né en 2014, niveau AAA, Sports-Études ; l'outil le tutoie et s'adresse à lui directement.
- Langue : français du Québec. Interface mobile d'abord.
- Contenu à faire valider par son entraîneur de gardiens (vocabulaire, distances, organisation sur coups de pied arrêtés).
- À valider en priorité dans le lot B : nombre de joueurs dans le mur (4-5 dans l'axe, 2-3 sur le côté, 1-2 de loin), plan de corner (premier poteau, zone devant, marquage, corner court), seuils de temps (2 s pour sortir ou rester, 5 s par relance).
- À valider dans le lot C : le programme jeu au pied (nombre de répétitions, distances de 25 à 30 m pour un gardien de 12 ans, volées et dégagements) et les 4 critères du carnet.
- Technique : les situations du lot B sont dans `SITS` (`content.js`) avec les types `sor`, `err`, `raf`, `mur`, `cor` ; le format est décrit en commentaire au-dessus de `KINDS`. Lot C : `PIED` et `CARNET` en fin de `content.js` ; le moteur est juste avant `function route()` dans `shell.html`. Nouvelles clés de progression sur l'appareil (`localStorage`, clé `gk99`) : `rv` (révision), `sd` (séances du jour), `pp` et `pt` (programme pied et tests), `cn` et `cd` (carnet et brouillon). La révision repère chaque question par son texte : modifier l'énoncé d'une question la remet à zéro.
- À valider dans le lot F (niveau 3) : les indices de lecture du tireur (pied d'appui, élan, hanches), la position de départ sur corner rentrant ou sortant, le partage des rôles à deux contre un, les consignes après un but. L'affirmation « la très grande majorité des buts viennent de l'axe, près du but » est générale, sans chiffre.
- À valider dans le lot G : les mots anglais avec son entraîneur (l'usage varie : KEEPER! ou KEEP!, TIME! ou TURN!, STEP UP! ou PUSH UP!, HERE! ou BACK! pour une passe en retrait). Aucun de ces mots n'est universel.
- À valider dans le lot D : les mots du lexique et leur sens avec son entraîneur de gardiens, la routine d'avant-match (repas, échauffement) et la routine d'erreur. Les règles ne couvrent que les lois IFAB ; la ligue jeunesse peut en ajouter (le quiz le rappelle).
- Technique lot D : données en fin de `content.js` (`LEX`, `ROUTINE`, `ERREUR`, `RULES`, `RULES_BRIEF`, `VIDEO`) ; moteur dans `shell.html` juste avant `function route()`, avec `miniQuiz(qs, options)` pour les quiz au format `QUIZ` (première option = bonne). Nouvelles clés de progression (`gk99`) : `lx` et `lxn` (mots changés et ajoutés), `ro` et `rp` (routine du jour et perso), `er` et `es` (geste et mot d'erreur, record des mises en situation), `av` et `avd` (analyses vidéo et brouillon) ; le record des règles est dans `qz.regles`. Le quiz des règles n'entre pas dans la révision espacée.
