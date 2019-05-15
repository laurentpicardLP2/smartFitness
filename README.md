# Smart Fitness - projet chef d'oeuvre
# Mode opératoire pour lancer l'application :
1. Dans mySql Workbench créer un schéma vide intitulé 'db_fitness' 
2. Clôner le lien git https://github.com/laurentpicardLP2/smartFitness.git
3. Dans Eclipse, faire un import gradle depuis le dossier back du repo cloné
4. Dans application.properties, renseigner les user et password de la ligne suivante : spring.datasource.url=jdbc:mysql://localhost:3306/db_fitness?useSSL=false&user=fitness&password=Colis062019!.
5. Modififier dans application.properties la ligne "file.upload-dir" en indiquant **le chemin absolue** vers le dossier "../assets/images/facilities". Si besoin, créer les sous-dossiers images/facilities (c'est l'endroit où seront stockées les images uploadées).
6. Lancer les serveurs springboot et node.js.

# Test de l'application : Rôle Customer
Test n°1
--------

1. Créer un compte via le module inscription en haut à droite (indiquer une adresse mail permettant de lire les messages)
2. Se connecter avec le compte nouvellement créé.
3. Aller dans le module de réservation (clic sur l'image réservation ou aller dans le menu Nos offres >  Constituer une séance)
4. Réserver trois tranches horaires : deux tranches avec *Elliptique 1* et une tranche avec *Tapis_roulant 2*.
5. Valider la séance -> une page avec une liste de produits favoris s'affiche : séléctionner powerade
6. Choisir la quantité 3, puis cliquer sur *ajouter au panier*.
7. (On se retrouve sur la page *home*) Aller dans le module d'abonnement (clic sur l'image abonnement ou aller dans le menu Nos offres > Souscrire à un abonnement.
8. Choisir l'abonnement annuel. Sur la page suivante, cliquer sur *ajouter au panier*
9. (On se retrouve de nouveau sur la page *home*) Cliquer sur l'icône du panier en haut droite, puis choisir l'option *Voir le panier*.
10. Cliquer sur le bouton *Valider le panier*
11. Attendre la fin du chargement du module paypal
12. Cliquer sur MasterCard
13. Les informations à saisir : 
  - Type de carte : Visa
  - Numéro de carte: 4111 1111 1111 1111
  - Date d'expiration : 02/20
  - Crypto visuel : 123
  - Renseigner les blocs **Adresse de facturation** et **Coordonnées**, choisir l'option *Non, merci* pour l'ouverture d'un compte paypal, puis cliquer *Payer*.
14. Attendre que la page d'accusé réception s'affiche.
15. S'assurer que l'on ne peut pas revenir sur la page de paiement en cliquant sur le bouton *back* du navigateur.
16. S'assurer qu'un mail a bien été envoyé.
lll

Test n°2
--------
1. (On se trouve sur la page *home*) : Aller dans le module de réservation
2. S'assurer que les tranches horaires précédemment réservées affichent l'indication *Votre équipment est réservé pour cette tranche horaire*.
3. Séléctionner une tranche horaire non réservé, et s'assurer que les équipements sont à moitié prix. (le libellé *-50% si vous êtes abonné!* n'apparaît plus dans la description des équipements)
4. Réserver trois équipements.
5. Supprimer dans le bloc à gauche (Votre séance du jj/mm/aa) le second équipement.
6. Rajouter un autre équipement pour la tranche horaire supprimée, puis valider la séance.
7. (On se retrouve sur la page des produits favoris). Aller dans le menu Vos suivis > Vos commandes.
8. Cliquer sur la première ligne (commande en cours d'acquisition)
9. (On se retrouve sur le détail de la commande ) Cliquer sur [Séance](https://localhost:4200) de la première ligne du tableau.
10. On visualise alors la feuille de route de la séance. S'assurer que les éléments sont affichés dans l'ordre chronologique.
11. Aller dans le menu Nos offres > Notre catalogue
12. Séléctionner *Ovotamine* en cliquant sur le bouton *consulter* correspondant.
13. Cliquer sur le bouton *Ajouter au panier*
14. (On se trouve sur la page *home*) : Aller dans le module de réservation
15. Choisir de nouveau deux équipements, puis valider.
16.  (On se retrouve sur la page des produits favoris). Cliquer sur l'icône du panier en haut droite, puis choisir l'option *Voir le panier*.
17. Supprimer la seconde séance.
18. Cliquer en haut à droite sur Vos suivis > Vos commandes
19. (On se retrouve sur la page de la liste des commandes): Cliquer sur la ligne de la commande en cours d'acquisition.
20. S'assurer que le détail de la commande est à jour.
21. Cliquer sur l'icône du panier et choisir l'option *Vider le panier
22. (On se trouve sur la page *home*) : Cliquer en haut à droite sur Vos suivis > Vos commandes
23. S'assurer qu'il n'y a plus de commandes en cours d'acquisition.
24. Cliquer sur l'icône de la maison en haut à gauche.
lll

Test n°3
--------
1. Aller dans le module de réservation
2. Réserver l'équipement Elliptique 1 (se souvenir de la tranche horaire réservé).
3. Actualiser la page (F5)
4. On se retrouve sur la page de login
5. Entrer des identifiants erronés
6. S'assurer que le message *L'identifiant ou le mot de passe sont incorrects* s'affiche.
7. Se conecter avec le compte créé lors du test n°1.
8. S'assurer que la pour la tranche horaire réservé au point 2, le nombre d'Elliptique est de trois et qu'il n
