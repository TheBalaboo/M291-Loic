# Journal du jeu du prompt
## Manche 1 — trop vague
Prompt : change le bouton
Ce que l’IA a fait : L'IA a ajouté du JavaScript pour rendre le bouton interactif, avec un changement à la couleur bleu au clic.
Pourquoi c’est un problème : L'IA m'a juste envoyé du code à rajouter dans mon index.html. 
## Manche 2 — précis
Prompt : Je suis élève M291, je débute. Pas de framework, pas de Bootstrap, pas de librairie. Voici mon fichier index.html (ci-dessus). Tâche unique : - le bouton dont l’id est "magic" - au clic, son fond devient #e36414 et le texte devient blanc - tu n’ajoutes qu’un petit script, dans le même fichier - tu ne changes ni le titre, ni le paragraphe, ni la mise en page Ensuite, AVANT le code, explique en 4 phrases : 1. quelle ligne « écoute » le clic 2. quelle ligne change la couleur 3. pourquoi on a besoin de l’id "magic" 4. ce que tu n’as volontairement pas touché
Résultat : le bouton devient orange au clic
Explication que je retiens : 
- getElementById("magic") → récupère le bouton.
- addEventListener("click", ...) → détecte le clic.
- style.backgroundColor → change le fond.
- style.color → change la couleur du texte.
## Ce que je changerais la prochaine fois 
La prochaine fois, le principal truc à améliorer serait de ne pas modifier plus de code que demandé. Être très précis dans les prompts dès le début, préciser tous les paramètres souhaités à l'IA. 
