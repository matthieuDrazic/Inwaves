# Inwaves — moteur scientifique (état réel)

PWA personnelle Longchamp / Grande Plage, Saint-Lunaire.

## Implémenté
- Prévisions horaires Open-Meteo : comparaison des sorties de Météo-France, DWD, ECMWF et NOAA lorsque disponibles, secours best-match ; moyenne simple et dispersion **non calibrée**.
- Distinction houle primaire, mer du vent, direction, vent local.
- Diagnostic de flux énergétique en eau profonde approximé par 0,49 × Hs² × T (kW/m) ; **T fourni n'est pas nécessairement la période énergétique Te**.
- Indice expérimental de surfabilité utilisant incidence, énergie, orientation du vent et clapot ; paramètres et orientation des plages **provisoires**.
- Recherche de fenêtres de deux heures, exclusion des heures déjà passées, comparaison des deux plages.
- Marée : variation du niveau marin modélisé par différence finie, montante / descendante / étale, **affichée mais non intégrée au score** faute de calibration locale.

## Important : ce qui N'EST PAS encore réalisé
- Pas de grille bathymétrique locale vérifiée ni simulation SWAN. Les valeurs au large ne prédisent pas la hauteur des vagues déferlantes.
- Pas de véritable comparaison des prévisions aux observations, pas de correction de biais entraînée ni de validation hors échantillon. Les notes /10 ne sont pas des probabilités.
- Pas de modèle vérifié des courants côtiers ni des obstacles au vent.
- Pas de collecte automatisée des webcams : accès, couverture, licences et horodatage restent à confirmer.
- Pas de données Candhis intégrées : l'API requiert un compte et un jeton ; ne pas intégrer un secret dans une PWA publique.
- Le service de prédictions de marée SHOM par API est payant. Les valeurs Open-Meteo (maille ~8 km) ne remplacent pas des horaires officiels.

## Feuille de route de validation (nécessite les données)
1. Relever les positions exactes des deux zones de déferlement et la géométrie côtière ; vérifier les bathymétries SHOM/EMODnet disponibles et leurs licences.
2. Déterminer les bouées Candhis pertinentes et obtenir un accès à leurs séries historiques ; horodater et aligner chaque observation avec les prévisions émises **avant** l'événement (pas des réanalyses futures).
3. Comparer par horizon (J0, J1, J2...), saison et direction : biais, MAE, RMSE, erreurs de direction circulaires et couverture des intervalles.
4. Appliquer des corrections de biais avec validation chronologique et benchmark contre le meilleur modèle brut ; ne retenir une correction que si elle améliore des données jamais vues.
5. Calibrer les coefficients par spot avec images webcams exploitables et/ou rapports indépendants horodatés, stratifiés par taille de vague et niveau du surfeur.
6. Tester un modèle spectral SWAN seulement si bathymétrie et forçages sont suffisants ; sinon afficher « confiance insuffisante ».

## Sources
- Open-Meteo Marine : https://open-meteo.com/en/docs/marine-weather-api
- Schéma API et modèles : https://github.com/open-meteo/open-meteo/blob/main/openapi/marine.yml
- SHOM marées : https://services.data.shom.fr/support/fr/services/spm
- SHOM vignettes marées gratuites : https://diffusion.shom.fr/services-numeriques/api-shom.html
- Candhis : https://www.data.gouv.fr/dataservices/api-de-candhis-observatoire-cotier-national-de-mesure-in-situ-des-etats-de-mer-france-metropole-et-outre-mer
- SWAN : Booij, Ris & Holthuijsen (1999), https://doi.org/10.1029/98JC02622

## Publication
GitHub Pages : Settings > Pages > Deploy from branch > main / root.

## Audit API et bathymétrie (2026-10-23)
Outils de contrôle dans l'onglet Spots et couche bathymétrique EMODnet dans la Carte. Tests unitaires : `node tests/audit.test.js` et `node tests/bathymetry.test.js`. Rapport : [docs/model-audit.md](docs/model-audit.md). Aucun profil bathymétrique local validé à ce jour ; aucun effet de profondeur n'est appliqué au score.
