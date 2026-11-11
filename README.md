# Bac PC — Révision des questions de cours

Application de cartes de révision pour la physique-chimie en terminale : 139 questions, 10 chapitres, schémas et autoévaluation. Elle complète les cours, exercices et annales ; elle ne constitue pas une préparation exhaustive au baccalauréat.

## Utilisation

Choisir un chapitre, chercher sa réponse, puis activer **Afficher la réponse**. Choisir ensuite À revoir, Difficile, Bien ou Facile. Le compteur « Maîtrisées » reprend le critère existant : trois validations consécutives autres que À revoir. Il exprime une autoévaluation, pas une note. Les intervalles sont enregistrés mais ne pilotent pas encore un calendrier de révision : les fiches défilent dans l’ordre du chapitre.

La progression reste dans le stockage local du navigateur, sur l’appareil utilisé. Aucun compte n’est requis. Effacer les données du navigateur supprime cette progression.

## Maintenance des questions

Modifier **data.json**, puis exécuter :

~~~sh
npm ci
npm run build:data
npm test
~~~

Le script recalcule les compteurs et synchronise les données intégrées à index.html. Cette copie intégrée permet de démarrer sans requête de données supplémentaire. Le test de cohérence échoue si les deux versions divergent. Les identifiants des questions doivent rester stables pour préserver la progression.

## Fonctionnement hors connexion

Un premier chargement en ligne est nécessaire pour installer le service worker. Les ressources de KaTeX, polices et schémas sont hébergées dans ce dépôt, sans dépendance d’exécution à un CDN. Un schéma facultatif manquant ne bloque pas l’installation du cœur de l’application. La présence en cache des ressources reste soumise aux limites de stockage du navigateur.

Lors d’une mise à jour, changer CACHE_NAME dans sw.js. L’HTML est demandé au réseau en priorité, avec repli vers le cache hors connexion. Les anciens caches dont le nom commence par bacpc- sont nettoyés ; les autres caches de l’origine sont préservés. Les visites déjà ouvertes peuvent nécessiter un rechargement après installation de la nouvelle version.

## Vérification

Les tests utilisent Node.js 20 ou ultérieur et un DOM simulé : données, rendu KaTeX des 139 fiches, boutons, visibilité question/réponse, progression, dialogue des schémas, échappement du texte et service worker. Ils ne remplacent pas une vérification visuelle et avec lecteur d’écran dans de vrais navigateurs.

Corrections scientifiques de cette version : rôles acide/base dans la fiche 36 et signe vectoriel de la poussée d’Archimède dans la fiche 12. Le rendu sans erreur de formule ne constitue pas une validation scientifique exhaustive de toutes les réponses.

Les noms des boutons de schéma indiquent désormais leur contexte. Une description détaillée de chaque information graphique reste à compléter après examen de chaque schéma ; aucun audit complet de conformité à l’accessibilité n’est revendiqué.

## Bibliothèque de formules

KaTeX 0.19.1 est fourni dans vendor/katex avec sa licence MIT. Les dépendances de développement sont verrouillées dans package-lock.json. Le site reste statique et n’a pas besoin de npm à l’exécution.

## Mise en ligne

Cette branche propose des corrections pour revue. Ne fusionner dans main et ne déclencher la publication GitHub Pages qu’après validation du propriétaire du dépôt.
