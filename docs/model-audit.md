# Inwaves — audit scientifique, 23 octobre 2026

## API météo
Schéma Open-Meteo : https://github.com/open-meteo/open-meteo/blob/main/openapi/marine.yml
Modèles documentés : meteofrance_wave, dwd_ewam, ecmwf_wam, ncep_gfswave025. Horizons, mailles et pas de temps différents. Alignement impératif sur hourly.time ; séries nulles et champs manquants possibles. best_match est un secours et ne doit pas compter comme membre indépendant. La dispersion intermodèles ne représente pas un intervalle de confiance validé.

**Limite :** vérification documentaire et tests unitaires exécutés, mais aucune requête API en direct n'a pu être validée depuis l'environnement de développement (DNS indisponible). Un diagnostic exécutable depuis l'application a été ajouté.

## Bathymétrie
EMODnet fournit un modèle numérique de terrain marin, un WMS, un WCS et une API de profils et d'échantillons : https://rest.emodnet-bathymetry.eu/ ; https://emodnet.ec.europa.eu/en/emodnet-web-service-documentation
SHOM levés bathymétriques : https://ecologie.data.gouv.fr/datasets/6997a51b43cdf14439f1e1b8

**Aucune profondeur locale vérifiée n'a été récupérée à ce stade.** Les marqueurs des plages sont approximatifs. Aucune pente, réfraction, hauteur déferlante ou transformation bathymétrique n'est calculée. La couche WMS est destinée à l'inspection et sa disponibilité reste à vérifier en navigateur.

## Prochaines tâches
1. Relever les coordonnées GPS exactes des zones de déferlement et tracer deux transects mer-plage.
2. Extraire les profils EMODnet et SHOM ; documenter la résolution et le référentiel vertical.
3. Mesurer l'incertitude de profondeur et les zones sans données.
4. Calibrer la transformation de la houle contre des observations réelles et conserver un jeu de validation chronologique indépendant.
5. Ne pas ajouter de bonus/malus de marée ou de bathymétrie au score avant validation empirique.

Tests : node tests/audit.test.js && node tests/bathymetry.test.js
