# Étiquettes — data.json

Ce tableau reprend les propriétés utiles au projet **Trajectoire**. Chaque propriété sert soit à afficher une information, soit à filtrer les balades, soit à ouvrir l'itinéraire détaillé.

| Étiquette | Écran | Sert à | Sorte de valeur | Unique ? | Exemple |
|---|---|---|---|:---:|---|
| `id` | Interne | identifier une balade | nombre | Oui | `1` |
| `nom` | Liste + détail | afficher, rechercher | texte | Non | `Tour du lac de Joux` |
| `regionPrincipale` | Liste + détail | afficher, rechercher, filtrer | texte | Non | `Vaud` |
| `distance` | Liste + détail | afficher, filtrer | nombre (km) | Non | `68` |
| `dureeMinutes` | Liste + détail | afficher, filtrer | nombre (minutes) | Non | `68` |
| `difficulte` | Liste + détail | afficher, filtrer | texte | Non | `Moyen` |
| `typeTrajet` | Détail + filtres | afficher, filtrer | texte | Non | `Boucle` |
| `depart` | Détail + filtres | afficher, rechercher, filtrer | texte | Non | `Le Sentier` |
| `arrivee` | Détail + filtres | afficher, rechercher, filtrer | texte | Non | `Le Sentier` |
| `typesRoute` | Détail + filtres | afficher, rechercher, filtrer | liste de textes | Non | `["route secondaire", "lac", "vallée"]` |
| `paysages` | Détail + filtres | afficher, rechercher, filtrer | liste de textes | Non | `["lac", "forêt", "Jura"]` |
| `saisonnier` | Détail | afficher une information pratique | vrai/faux | Non | `false` |
| `attention` | Détail | afficher une information pratique | texte | Non | `Prudence en hiver.` |
| `description` | Détail | afficher | texte | Non | `Une boucle autour du lac...` |
| `image` | Liste + détail | afficher | texte (chemin) | Non | `assets/images/route-lac.svg` |
| `googleMaps` | Détail | ouvrir l'itinéraire externe | texte (URL) | Non | `https://www.google.com/maps/...` |

## Règles retenues

- Les distances sont enregistrées en kilomètres sous forme de nombres.
- Les durées sont enregistrées en minutes pour pouvoir les comparer et les filtrer facilement.
- `saisonnier` reste un booléen pour conserver un vrai/faux utile dans les données.
- `typesRoute` et `paysages` sont des listes de textes car une même balade peut correspondre à plusieurs catégories.
- Les propriétés de provenance qui n'étaient pas utilisées dans l'interface ont été retirées afin de garder uniquement les données utiles au brief.
