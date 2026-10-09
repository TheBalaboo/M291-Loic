# Brief — Trajectoire

## Pitch

Trajectoire est une application web qui permet de trouver facilement des balades à moto en Suisse romande grâce à différents filtres.

Elle s’adresse aux motards qui veulent trouver rapidement un itinéraire adapté à leur point de départ, leur temps disponible et au type de route ou de paysage qu’ils recherchent.

## Public

Lucas, 24 ans, est électricien à Lausanne. Il possède une Yamaha MT-07 et fait régulièrement des balades à moto pour le plaisir.

Il roule surtout le week-end, seul ou avec des amis, mais aussi parfois en fin de journée après le travail. Il organise souvent ses sorties peu avant de partir.

Il utilise principalement son smartphone et veut pouvoir chercher une balade, comparer les résultats et ouvrir Google Maps rapidement.

## Écrans

- Écran 1 : Filtres de recherche
- Écran 2 : Liste des balades / résultats
- Écran 3 : Fiche détaillée d’une balade
- Écran large : Liste des balades avec filtres affichés sur le côté

## Contenu de chaque écran

### Écran 1 — Filtres de recherche

**On y voit :**
- La région
- Le type de trajet : boucle ou aller simple
- Le point de départ
- Une zone de recherche autour du point de départ
- Le point d’arrivée si le trajet est un aller simple
- Une zone de recherche autour du point d’arrivée
- La durée approximative
- La distance
- La difficulté
- Le type de route
- Le type de paysage

**On peut y faire :**
- Sélectionner ou modifier les critères
- Choisir entre une boucle et un aller simple
- Réinitialiser les filtres
- Appliquer la sélection

**Bouton principal :**
- « Appliquer la sélection »

### Écran 2 — Liste des balades / résultats

**On y voit :**
- Une barre de recherche
- Un accès aux filtres
- Le nombre de résultats
- Une liste de balades sous forme de cartes
- Pour chaque balade :
  - Une image
  - Le nom
  - La distance
  - La région
  - La difficulté

**On peut y faire :**
- Parcourir les balades
- Rechercher un itinéraire
- Ouvrir ou modifier les filtres
- Consulter la fiche détaillée d’une balade

**Action principale :**
- Ouvrir les détails d’une balade

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
- Une description
- Des informations pratiques

**On peut y faire :**
- Consulter toutes les informations de la balade
- Revenir aux résultats
- Ouvrir l’itinéraire dans Google Maps

**Bouton principal :**
- « Ouvrir dans Google Maps »

### Écran large — Liste des balades avec filtres

**On y voit :**
- Les filtres dans une colonne latérale
- Les résultats sous forme de grille
- Le nombre de balades trouvées
- Les informations principales de chaque balade

**On peut y faire :**
- Modifier les filtres sans quitter la page
- Comparer plusieurs balades
- Ouvrir une fiche détaillée

**Action principale :**
- Ouvrir les détails d’une balade

## Fonctionnalités essentielles — MVP

1. Afficher une liste de balades à moto stockées dans une base de données.
2. Rechercher et filtrer les balades selon plusieurs critères.
3. Afficher uniquement les balades correspondant aux critères sélectionnés.
4. Consulter une fiche détaillée pour chaque balade.
5. Ouvrir l’itinéraire dans Google Maps grâce à un lien externe.
6. Afficher un message clair si aucune balade ne correspond à la recherche.

## Ambiance visuelle

**Moderne, dynamique et technique.**

L’interface s’inspire des applications de navigation et de l’univers de la route à moto.

Le design reste simple et lisible, avec des contrastes forts, une couleur d’accent utilisée pour les actions importantes et une place importante donnée aux images de routes et de motos.

## Palette

- **Fond principal :** `#0E1114`
- **Fond des cartes :** `#171B1F`
- **Texte principal :** `#F3F5F6`
- **Texte secondaire :** `#9AA3AA`
- **Accent :** `#D7FF38`
- **Attention / erreur :** rouge

## Interdits

- Pas de compte obligatoire
- Pas de système de connexion utilisateur
- Pas de navigation GPS intégrée au site
- Pas de génération automatique d’itinéraires
- Pas de filtres cachés dans plusieurs niveaux de menus
- Pas d’interface surchargée
- Pas de Bootstrap
- Pas de React ou autre framework JavaScript

## Contraintes techniques et ergonomiques

- Conception Mobile First
- Largeur mobile de référence : environ 390 px
- HTML5 sémantique
- CSS moderne avec variables
- JavaScript natif sans bibliothèque
- Interface utilisable au clavier
- Contrastes respectant au minimum WCAG AA
- Boutons et zones interactives adaptés au tactile
- Interface pensée pour une utilisation rapide sur smartphone

## États importants

- **Aucun résultat :** message « Aucune balade ne correspond à vos critères » avec un bouton pour modifier les filtres.
- **Filtres appliqués :** le nombre de résultats est mis à jour.
- **Erreur :** un message clair indique qu’un problème est survenu.
