# smartFitness
projet chef d'oeuvre
Mode opératoire pour lancer l'application :
1. Dans mySql Workbench créer un schéma vide intitulé 'db_fitness' 
2. Cloner le lien git https://github.com/laurentpicardLP2/smartFitness.git
3. Dans Eclipse, faire un import gradle depuis le dossier back du repo cloné
4. Dans application.properties, renseigner les user et password de la ligne suivante : spring.datasource.url=jdbc:mysql://localhost:3306/db_fitness?useSSL=false&user=fitness&password=Colis062019!.
5. Modififier dans application.properties la ligne "file.upload-dir" en indiquant le chemin absolue vers le dossier "../assets/images/facilities" (c'est l'endroit où seront stockées les images uploadées).
6. Lancer les serveurs springboot et node.js.

Test de l'application
1.
10. Avec le compte db_user (mot de passe : simplon), on peut ajouter des séances constituées d'activités (chaque activité dure 10').
11. Avec un compte de type 'ROLE_CUSTOMER' (Le compte db_user en est un), on peut souscrire à un abonnement et bénéficier des activités à moitié prix. Pour illustrer ce cas, le compte db_abonne (mot de passe : simplon) visualise les activités à 50% de leur tarif plein.
12. Chaque compte 'ROLE_CUSTOMER' peut consulter le suivi (en cours, à venir et l'historique) de l'ensemble de leurs abonnements souscrits. (TO DO, le tableau étant responsive, ce modèle sera repris pour la feuille de route d'une séance ainsi que le détail d'une commande).
13. L'utilisateur a également la possibilité de vider ou valider son panier. Dans ce dernier cas, il peut visualiser les séances validées par le menu Mon choix > Mes suivis > mes séances. En cliquant sur une ligne, il obtient le détail de la feuille de route de sa séance.
14. Avec les comptes db_admin (mot de passe : simplon) ou db_manager(mot de passe : simplon), on peut ajouter et modifier des salles, des catégories d'équipement et des équipements. Il s'agit donc de créer des équipements, appartenant à une catégorie et localisée dans une salle,  pour que les utilisateurs puissent bénéficier d'un choix élargi d'appareils lorsqu'ils sont sur une séquence de réservation.
15. Toujours avec les comptes db_admin ou db_manager, on peut créer et gérer des abonnements et des modèles de montres connectées en tant que services pour les clients.
16. Le compte db_admin permet de créer et gérer des comptes utilisateurs de profil 'ROLE_MANAGER' ou 'ROLE_ADMIN'
17. Il est possible, pour tout utilisateur lambda de se créer un compte utilsateur 'smartFitness'.
