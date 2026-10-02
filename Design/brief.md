# Brief — Trajectoire

## Pitch

Trajectoire est une application web permettant de trouver facilement des balades à moto en Suisse romande grâce à différents filtres.

Elle s’adresse aux motards qui souhaitent trouver rapidement un itinéraire adapté à leur point de départ, leur temps disponible et au type de route ou de paysage qu’ils recherchent.

## Public

Lucas, 24 ans, est électricien à Lausanne. Il possède une Yamaha MT-07 et fait régulièrement des balades à moto pour le plaisir.

Il roule principalement le week-end, seul ou avec des amis, et organise souvent ses sorties quelques heures ou quelques minutes avant de partir.

Il utilise principalement son smartphone à une main pour chercher une balade, comparer les itinéraires et ouvrir Google Maps.

Il souhaite trouver rapidement une balade adaptée sans devoir consulter plusieurs sites différents.

## Écrans

- Écran 1 : Filtres de recherche
- Écran 2 : Liste des balades / résultats filtrés
- Écran 3 : Fiche détaillée d’une balade
- Écran large : Liste des balades avec filtres affichés sur le côté

## Contenu de chaque écran

### Écran 1 — Filtres de recherche

**On y voit :**
- La région
- Le type de trajet : boucle ou aller simple
- Le point de départ
- Le point d’arrivée si le trajet n’est pas une boucle
- Une tolérance autour du point de départ et/ou d’arrivée
- La durée approximative
- La distance
- La difficulté
- Le type de routes
- Le type de paysages

**On peut y faire :**
- Sélectionner ou modifier les critères de recherche
- Choisir entre une boucle et un trajet avec un point d’arrivée différent
- Réinitialiser les filtres
- Lancer la recherche

**Bouton principal :**
- « Appliquer la sélection »

### Écran 2 — Liste des balades / résultats filtrés

**On y voit :**
- Les filtres actuellement appliqués
- Le nombre de résultats trouvés
- Une liste de balades sous forme de cartes
- Pour chaque balade :
  - Nom
  - Région
  - Durée
  - Distance
  - Difficulté
  - Type de route
  - Type de paysage

**On peut y faire :**
- Consulter les résultats correspondant aux filtres
- Retirer ou modifier certains filtres
- Réinitialiser les filtres
- Ouvrir la fiche détaillée d’une balade

**Bouton principal :**
- « Supprimer les filtres »

### Écran 3 — Fiche détaillée d’une balade

**On y voit :**
- Le nom de la balade
- Une image principale
- La région
- La durée
- La distance
- La difficulté
- Le type de trajet
- Le type de route
- Le type de paysage
- Le point de départ
- Le point d’arrivée
- Une carte ou un aperçu du tracé
- Une description de la balade
- Des informations pratiques utiles

**On peut y faire :**
- Consulter toutes les informations de la balade
- Revenir aux résultats
- Ouvrir l’itinéraire dans Google Maps

**Boutons principaux :**
- « Ouvrir dans Google Maps »
- « Revenir aux itinéraires »

### Écran large — Liste des balades avec filtres

**On y voit :**
- Les filtres dans une colonne latérale
- Les résultats sous forme de grille
- Le nombre de balades trouvées
- Les informations principales sur chaque balade

**On peut y faire :**
- Modifier les filtres sans quitter la page
- Comparer plusieurs balades
- Ouvrir une fiche détaillée

**Bouton principal :**
- « Effacer la sélection »

## Fonctionnalités essentielles — MVP

1. Afficher une liste de balades à moto stockées dans une base de données.
2. Filtrer les balades selon plusieurs critères.
3. Afficher uniquement les balades correspondant aux critères sélectionnés.
4. Consulter une fiche détaillée pour chaque balade.
5. Ouvrir l’itinéraire d’une balade dans Google Maps grâce à un lien externe.
6. Afficher un message clair si aucune balade ne correspond aux critères.

## Ambiance visuelle

Moderne, dynamique et épurée.

L’interface doit évoquer une application de navigation moderne mélangée à l’univers de la route et du road trip à moto.

Le design doit rester simple et lisible, avec une priorité donnée aux informations utiles et à la recherche rapide.

## Palette

- **À définir**

Les couleurs précises seront définies pendant la phase de maquettes.

## Interdits

- Pas de compte obligatoire pour consulter les balades
- Pas de système de connexion utilisateur
- Pas de navigation GPS intégrée directement dans le site
- Pas de calcul automatique d’itinéraires
- Pas de filtres cachés dans plusieurs niveaux de menus
- Pas d’interface surchargée
- Pas de Bootstrap
- Pas de React ou autre framework JavaScript

## Contraintes techniques et ergonomiques

- Conception Mobile First
- Largeur mobile de référence : environ 390 px
- HTML5 sémantique
- CSS moderne
- JavaScript natif
- Interface utilisable au clavier
- Contrastes respectant au minimum les recommandations WCAG AA
- Boutons et zones interactives adaptés à une utilisation tactile
- Interface pensée pour une utilisation rapide sur smartphone
