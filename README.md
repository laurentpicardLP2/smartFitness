# smartFitness
projet chef d'oeuvre
Mode opératoire pour lancer l'application :
1. Dans mySql Workbench créer un schéma vide intitulé 'db_fitness' (pour l'instant data.sql est fonctionnel mais pas schema.sql, par ailleurs le fichier import.sql "drop" et crée bien un schéma, mais il s'exécute en aval du lancement du serveur spring boot))
2. Cloner le lien git
3. Dans Eclipse, faire un import gradle depuis le dossier back du repo cloné
4. Dans application.properties, renseigner les user et password avec les valeurs idoines.
5. Lancement du serveur serveur Tomcat : Exécuter l'application fitness. Les tables mySql sont recréées et le jeu de données contenues dans le main sont injectées en base.
6. Lancement du serveur node : depuis un terminal, saisir l'instruction ng serve depuis le dossier front du repo cloné.
7. Saisir http://localhost:4200
8. Avec le compte db_user (mot de passe : simplon), on peut ajouter des séances constituées d'activités (chaque activité dure 10').
9. Avec le compte db_admin (mot de passe : simplon), on peut ajouter et modifier des salles, des catégories d'équipement et des équipements. Il s'agit donc de créer des équipements, appartenant à une catégorie et localisée dans une salle,  pour que les utilisateurs puissent bénéficier d'un choix élargi d'appareils lorsqu'ils sont sur une séquence de réservation.
L'utilisateur a également la possibilité de vider ou valider son panier. Dans ce dernier cas, il peut visualiser les séances validées par le menu Mon choix > Mes suivis > mes séances. En cliquant sur une ligne, il obtient le détail de la feuille de route de sa séance.
10. Il est possible de se créer un compte utilsateur.
