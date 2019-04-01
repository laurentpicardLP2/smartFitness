# smartFitness
projet chef d'oeuvre
Mode opératoire pour lancer l'application :
1. Dans mySql Workbench créer un schéma vide intitulé 'db_fitness' (pour l'instant data.sql est fonctionnel mais pas schema.sql, par ailleurs le fichier import.sql "drop" et crée bien un schéma, mais il s'exécute en aval du lancement du serveur spring boot))
2. Cloner le lien git
3. Dans Eclipse, faire un import gradle depuis le dossier back du repo cloné
4. Dans application.properties, renseigner les user et password avec les valeurs idoines.
5. Lancement du serveur serveur Tomcat : Exécuter l'application fitness. Les tables mySql sont recréées et le jeu de données contenues dans le script data.sql sont injectées en base.
6. Un trigger ainsi qu'une fonction stockée ont été implémentés. Afin qu'ils soient opérationnels, il faut faire un copier-collé du contenu du ficher triggerFITNESS.txt se trouvant dans back/src/main/resources dans une console query de workbench suivi de son exécution. (Le trigger permet de contrôler qu'au moment de l'insert de la réservation d'un équipement, celui-ci n'a pas été pris entre temps par un autre utilisateur. Ce cas de figure se produit lorsqu'entre le moment où un utilisateur visualise l'ensemble des équipements disponibles lors du choix d'une tranche horaire et le moment où il sélectionne un équipement, celui-ci a été réservé dans ce laps de temps par un autre utilisateur). 
7. Lancement du serveur node : depuis un terminal, saisir l'instruction ng serve depuis le dossier front du repo cloné.
8. Saisir http://localhost:4200
9. Avec le compte db_user (mot de passe : simplon), on peut ajouter des séances constituées d'activités (chaque activité dure 10').
10. Avec un compte de typz 'ROLE_CUSTOMER' (Le compte db_user en est un), on peut souscrire à un abonnement et bénéficier des activités à moitié prix. Pour illustrer ce cas, le compte db_abonne (mot de passe : simplon) visualise les activités à 50% de leur tarif plein.
11. L'utilisateur a également la possibilité de vider ou valider son panier. Dans ce dernier cas, il peut visualiser les séances validées par le menu Mon choix > Mes suivis > mes séances. En cliquant sur une ligne, il obtient le détail de la feuille de route de sa séance.
12. Avec les comptes db_admin (mot de passe : simplon) ou db_manager(mot de passe : simplon), on peut ajouter et modifier des salles, des catégories d'équipement et des équipements. Il s'agit donc de créer des équipements, appartenant à une catégorie et localisée dans une salle,  pour que les utilisateurs puissent bénéficier d'un choix élargi d'appareils lorsqu'ils sont sur une séquence de réservation.
13. Toujours avec les comptes db_admin ou db_manager, on peut créer et gérer des abonnements en tant que services pour les clients.
14. Le compte db_admin permet de créer et gérer des comptes utilisateurs de profil 'ROLE_MANAGER' ou 'ROLE_ADMIN'
15. Il est possible, pour tout utilisateur lambda de se créer un compte utilsateur 'smartFitness'.
